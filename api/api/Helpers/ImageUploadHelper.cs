using api.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Linq;
using api.Exceptions;

namespace api.Helpers
{
    public class ImageUploadHelper
    {
        public static string[] AllowedExtensions { get; set; } = { ".jpg", ".jpeg", ".png" };
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
    }
}
