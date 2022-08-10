using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using GiEnJul.Infrastructure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Clients
{
    public interface IMunicipalityBlobClient
    {
        string BlobContainerUrl { get; }

        Task<List<string>> GetImageUrlsForMunicipality(string municipality);
        Task<Dictionary<string, List<string>>> GetAllImages();
        Task UploadImageForMunicipality(string municipality, Stream stream, string fileExt = "");
        Task DeleteImageForMunicipality(string imageName);
    }

    public class MunicipalityBlobClient : IMunicipalityBlobClient
    {
        private readonly BlobContainerClient _client;
        public string BlobContainerUrl { get; private set; }

        public MunicipalityBlobClient(ISettings settings)
        {
            var containerClient = new BlobContainerClient(settings.TableConnectionString, "municipalities");
            containerClient.CreateIfNotExists();
            _client = containerClient;

            BlobContainerUrl = _client.Uri.AbsoluteUri;
        }

        public async Task DeleteImageForMunicipality(string imageName)
        {
            var blobClient = _client.GetBlobClient(imageName);
            var result = await blobClient.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);
        }

        public async Task<Dictionary<string, List<string>>> GetAllImages()
        {
            var blobs = _client.GetBlobsAsync();
            var all = new List<string>();

            await foreach (var blob in blobs)
            {
                all.Add(blob.Name);
            }

            return all
                .GroupBy(x => x.Split("/")[0])
                .ToDictionary(k => k.Key, v => v.Select(x => $"{_client.Uri.AbsoluteUri}/{x}").ToList());
        }

        public async Task<List<string>> GetImageUrlsForMunicipality(string municipality)
        {
            var images = _client.GetBlobsAsync(prefix: municipality);

            var result = new List<string>();

            await foreach (var blob in images)
            {
                result.Add($"{_client.Uri.AbsolutePath}/{blob.Name}");
            }

            return result;
        }

        public async Task UploadImageForMunicipality(string municipality, Stream stream, string fileExt = "")
        {
            var blobName = $"{municipality}/{Guid.NewGuid()}{(string.IsNullOrWhiteSpace(fileExt) ? "" : $".{fileExt}")}";
            await _client.UploadBlobAsync(blobName, stream);
        }
    }
}
