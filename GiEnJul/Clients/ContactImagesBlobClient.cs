using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using GiEnJul.Infrastructure;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Clients
{
    public interface IContactImagesBlobClient
    {
        string BlobContainerUrl { get; }

        Task<string> UpdateProfileImage(string municipality, IFormFile file);
        Task<(Stream, string)> GetProfileImage(string municipality);
    }

    public class ContactImagesBlobClient : IContactImagesBlobClient
    {
        private readonly BlobContainerClient _client;
        public string BlobContainerUrl { get; }

        public ContactImagesBlobClient(ISettings settings)
        {
            var containerClient = new BlobContainerClient(settings.TableConnectionString, "contactimages");
            var created = containerClient.CreateIfNotExists();

            containerClient.SetAccessPolicy(PublicAccessType.BlobContainer);
            _client = containerClient;

            BlobContainerUrl = _client.Uri.AbsoluteUri;
        }

        public async Task<string> UpdateProfileImage(string municipality, IFormFile file)
        {
            var imageData = file.OpenReadStream();
            var blobName = $"{municipality}.webp";
            var potentialImages = _client.GetBlobs(prefix: Path.GetFileNameWithoutExtension(municipality));
            if (potentialImages != null && potentialImages.Any())
            {
                var image = potentialImages.First();
                var oldBlob = _client.GetBlobClient(image.Name);
                await oldBlob.DeleteIfExistsAsync();
            }
            var blob = _client.GetBlobClient(blobName);
            await blob.UploadAsync(imageData, new BlobUploadOptions { HttpHeaders = new BlobHttpHeaders { ContentType = file.ContentType } });
            return $"{_client.Uri.AbsoluteUri}/{blobName}";
        }

        public async Task<(Stream, string)> GetProfileImage(string municipality)
        {
            var potentialImages = _client
                .GetBlobs(prefix: municipality)
                .Where(x => Path.GetFileNameWithoutExtension(x.Name).ToLowerInvariant() == municipality.ToLowerInvariant());
            if (potentialImages == null || potentialImages.Count() != 1)
                return (null, "none");

            var image = potentialImages.First();
            
            var blob = _client.GetBlobClient(image.Name);
            var response = await blob.DownloadAsync();
            
            return (response.Value.Content, response.Value.Details.ContentType);
        }
    }
}
