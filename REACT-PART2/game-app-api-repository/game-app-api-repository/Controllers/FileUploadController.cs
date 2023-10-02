using game_app_api_repository.Models;
using Microsoft.AspNetCore.Mvc;

namespace game_app_api_repository.Controllers
{
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly ILogger<FileUploadController> _logger;


        public FileUploadController(ILogger<FileUploadController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("api/File/Upload")]
        public async Task<IActionResult> UploadFile([FromForm] FileUploadModel model)
        {
            try
            {
                if (model.File == null || model.File.Length == 0)
                    return BadRequest("No file uploaded.");

                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

                if (!Directory.Exists(uploadPath))
                    Directory.CreateDirectory(uploadPath);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.File.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.File.CopyToAsync(stream);
                }

                return Ok("File uploaded successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading file.");
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
