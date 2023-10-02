using game_app_api_repository.Context;
using game_app_api_repository.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace game_app_api_repository.Controllers
{
    [ApiController]
    public class PlanholderController : Controller
    {
        private readonly GameAppDbContext context;

        public PlanholderController(GameAppDbContext context)
        {
            this.context = context;

        }

        [HttpGet]
        [Route("api/Planholder/GetPlanholders")]
        public async Task<ActionResult<IEnumerable<TblPlanholder>>> GetPlanholders()
        {;
            try
            {
                //return NotFound("{ \"responseData\": \"masamang request\" }");
                //return BadRequest("masamang request");

                return await context.TblPlanholder.ToListAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
                
            }
        }

        [HttpGet]
        [Route("api/Planholder/Read")]
        public async Task<ActionResult<TblPlanholder>> Read(string LPANo)
        {
            try
            {
                var ph = await context.TblPlanholder.FindAsync(LPANo);

                if (ph != null)
                {
                    return ph;
                }
                else
                {
                    return NotFound("Record not found.");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());

            }
        }

        [HttpPost]
        [Route("api/Planholder/Create")]
        public async Task<ActionResult> Create(TblPlanholder tblPlanholder)
        {
            try
            {
                context.TblPlanholder.Add(tblPlanholder);
                await context.SaveChangesAsync();
                return Ok("Record successfully added.");
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpPut]
        [Route("api/Planholder/Update")]
        public async Task<ActionResult> Update(TblPlanholder tblPlanholder)
        {
            try
            {
                context.Entry(tblPlanholder).State = EntityState.Modified;

                await context.SaveChangesAsync();

                return Ok("Record successfully updated.");
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpDelete]
        [Route("api/Planholder/Delete/{LPANo}")]
        public async Task<ActionResult> Delete(string LPANo)
        {
            try
            {
                var emp = await context.TblPlanholder.FindAsync(LPANo);
                if (emp == null)
                {
                    return NotFound("Record(s) not found.");
                }

                context.TblPlanholder.Remove(emp);
                await context.SaveChangesAsync();

                return Ok("Record successfully removed.");
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }

            
        }

     
    }
}
