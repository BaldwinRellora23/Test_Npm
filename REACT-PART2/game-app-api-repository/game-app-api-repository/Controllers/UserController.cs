using game_app_api_repository.Context;
using game_app_api_repository.Models;
using Microsoft.AspNetCore.Mvc;

namespace game_app_api_repository.Controllers
{
    [ApiController]
    public class UserController : Controller
    {

        private TblUser _TblUser;

        private readonly GameAppDbContext context;

        public UserController(GameAppDbContext context)
        {
            this.context = context;
            _TblUser = new TblUser()
            {
                UserName = "ADMIN POGI",
                EmpCode = "MAINO BALDWIN",
                FirstName = "BALDWIN",
                LastName = "RELLORA"
            };
        }

        [HttpGet]
        [Route("api/User/Read/{UserName}/{Password}")]
        public async Task<ActionResult<TblUser>> Read(string UserName, string Password)
        {
            try
            {
                var user = await context.TblUser.FindAsync(UserName,Password);

                if (user != null)
                {
                    return _TblUser;
                }
                else
                {
                    return NotFound("Invalid username or password.");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());

            }
        }

        [HttpPost]
        [Route("api/User/PostUser/{UserName}/{Password}")]
        public async Task<ActionResult<TblUserAccessInfo>> PostUser(string UserName, string Password)
        {
            try
            {
                    var user = await context.TblUser.FindAsync(UserName, Password);
                    if (user != null)
                    {
                        TblUserAccessInfo _TblUserAccessInfo = new TblUserAccessInfo()
                        {
                            EmpCode = user.EmpCode,
                            FirstName = user.FirstName,
                            LastName = user.LastName
                        };

                        return Ok(_TblUserAccessInfo);
                    }
                    else
                    {
                        return NotFound("Invalid username or password.");
                    }
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());

            }
        }
    }
}
