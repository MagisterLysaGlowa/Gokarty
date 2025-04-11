using api.Exceptions;

namespace api.Helpers
{
    public class ImageHelper
    {
        public static string[] AllowedExtensions { get; } = { ".jpg", ".jpeg", ".png", ".webp" };
        public static string[] DefaultImages { get; } = { "defaultGokartImage.jpg", "defaultTournamentImage.jpg" };
        public async static Task<string> SaveImage(IFormFile? image)
        {
            if (image != null && image.Length > 0) {
                if (!image.ContentType.StartsWith("image/"))
                    throw new UploadedFileIsNotAnImageException();

                var extension = Path.GetExtension(image.FileName).ToLowerInvariant();
                if (!AllowedExtensions.Contains(extension))
                    throw new NotAllowedExtensionException();

                if (image.Length > 5 * 1024 * 1024)
                    throw new FileSizeTooBigException();

                var fileName = $"{Guid.NewGuid()}_{image.FileName}";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", fileName);
                Directory.CreateDirectory(Path.GetDirectoryName(path)!);
                using var stream = new FileStream(path, FileMode.Create);
                await image.CopyToAsync(stream);
                return fileName;
            }
            return "";
        }

        public async static Task<string> UpdateImage(IFormFile? newImage, string oldPath)
        {
            if (newImage != null && newImage.Length > 0) {
                if (!newImage.ContentType.StartsWith("image/"))
                    throw new UploadedFileIsNotAnImageException();

                var extension = Path.GetExtension(newImage.FileName).ToLowerInvariant();
                if (!AllowedExtensions.Contains(extension))
                    throw new NotAllowedExtensionException();

                if(newImage.Length > 5 * 1024 * 1024)
                    throw new FileSizeTooBigException();

                var fileName = $"{Guid.NewGuid()}_{newImage.FileName}";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", fileName);
                Directory.CreateDirectory(Path.GetDirectoryName(path)!);
                using (var stream = new FileStream(path, FileMode.Create))
                    await newImage.CopyToAsync(stream);

                if(await DeleteImage(oldPath)) {
                    return fileName;
                } else {
                    await DeleteImage(fileName);
                    throw new CouldNotDeleteFileException();
                }
            }
            return oldPath;
        }

        public async static Task<bool> DeleteImage(string fileName)
        {
            if (DefaultImages.Contains(fileName))
                return true;
            if (string.IsNullOrWhiteSpace(fileName))
                return false;

            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", fileName);
            if (!File.Exists(path))
                return false;

            try {
                await Task.Run(() => File.Delete(path));
                return true;
            } catch {
                return false;
            }
        }
    }
}
