using game_app_api_repository.Context;
using game_app_api_repository.Models;
using Microsoft.AspNetCore.Mvc;

namespace game_app_api_repository.Controllers
{
    [ApiController]
    public class PaymentController : Controller
    {
        private readonly GameAppDbContext context;

        public PaymentController(GameAppDbContext context)
        {
            this.context = context;

        }


        [HttpGet]
        [Route("api/Payment/Read/{ORNo}")]
        public async Task<ActionResult<TblPayment>> GetPayment(string ORNo)
        {
            try
            {
                var py = await context.TblPayment.FindAsync(ORNo);

                if (py == null)
                {
                    return new TblPayment();
                }
                return py;
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());

            }
        }


        [HttpPost]
        [Route("api/Payment/Create")]
        public async Task<ActionResult> Create(TblPayment tblPayment)
        {
            try
            {
                context.TblPayment.Add(tblPayment);
                await context.SaveChangesAsync();
                return Ok("Payment successfully saved.");
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }
    }
}
