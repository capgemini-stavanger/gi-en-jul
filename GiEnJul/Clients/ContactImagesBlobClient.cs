using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using GiEnJul.Infrastructure;
using System;
using System.IO;
using System.Threading.Tasks;

namespace GiEnJul.Clients
{
    public interface IContactImagesBlobClient
    {
        string BlobContainerUrl { get; }

        Task<string> UpdateProfileImage(string municipality, Stream imageData);
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

        public async Task<string> UpdateProfileImage(string municipality, Stream imageData)
        {
            var blobName = $"{municipality}";
            var blob = _client.GetBlobClient(blobName);
            await blob.DeleteIfExistsAsync();
            await _client.UploadBlobAsync(blobName, imageData);
            return $"{_client.Uri.AbsoluteUri}/{blobName}";
        }
    }
}
