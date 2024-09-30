using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoCellController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetPhotoCellInfo()
        {
            var api = "http://192.168.0.1/awp/1/index.html";

            using HttpClient client = new HttpClient();
            try
            {
                HttpResponseMessage response = await client.GetAsync(api);
                return Ok(response.Content.ReadAsStringAsync().Result);
            }
            catch(Exception ex)
            {
                return NotFound();
            }

        }
    }
}
