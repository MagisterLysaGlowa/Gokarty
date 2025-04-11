using api.Exceptions;

namespace api.Helpers
{
    public class ImageHelper
    {
        public static string[] AllowedExtensions { get; set; } = { ".jpg", ".jpeg", ".png", ".webp" };
        public async static Task<string> UploadImage(IFormFile? image)
        {
            if (image != null && image.Length > 0) {
                if (!image.ContentType.StartsWith("image/"))
                    throw new UploadedFileIsNotAnImageException();
                var extension = Path.GetExtension(image.FileName).ToLowerInvariant();
                if (!AllowedExtensions.Contains(extension))
                    throw new NotAllowedExtensionException();
                var fileName = $"{Guid.NewGuid()}_{image.FileName}";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", fileName);
                Directory.CreateDirectory(Path.GetDirectoryName(path)!);
                using var stream = new FileStream(path, FileMode.Create);
                await image.CopyToAsync(stream);
                return fileName;
            }
            return "https://www.tuningblog.eu/wp-content/uploads/2015/05/Lazareth-Twingo-V8-Widebody-Tuning-1.jpg";
        }
        public async static Task<bool> DeleteImage(string fileName)
        {
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
