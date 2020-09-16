using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PropertyApp.Data;
using PropertyApp.ViewModels;

namespace PropertyApp.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdvertsController : ControllerBase
    {
        private readonly AdvertService _advertService;
        public AdvertsController(AdvertService advertService)
        {
            _advertService = advertService;
        }

        // GET: api/Adverts
        [HttpGet("ads/{order}")]
        public IEnumerable<Advert> GetAdverts(string order)
        {
            return _advertService.GetAll(order);
        }

        [HttpGet]
        public IEnumerable<Advert> GetAdvertsAll()
        {
            return _advertService.GetAll();
        }

        [HttpGet("locations")]
        public Dictionary<string, List<string>> GetLocations()
        {
            return _advertService.GetLocations();
        }
        // GET: api/Adverts/5
        [HttpGet("{id}")]
        public ActionResult<Advert> GetAdvert(int id)
        {
            var advert = _advertService.GetById(id);

            if (advert == null)
            {
                return NotFound();
            }

            return advert;
        }

        [HttpGet("current/{id}")]
        public ActionResult<IEnumerable<Advert>> GetAdvertCurrentUser(int id)
        {
          var advert = _advertService.GetCurrentAdverts(id);

          if (advert == null)
          {
            return NotFound();
          }

          return advert;
        }

        //PUT: api/Adverts/5
        //     To protect from overposting attacks, enable the specific properties you want to bind to, for
        //     more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public IActionResult PutAdvert(Advert advert)
        {
          //if (id != advert.Id)
          //{
          //  return BadRequest();
          //}

          _advertService.Update(advert);

          //_context.Entry(advert).State = EntityState.Modified;

          //try
          //{
          //  await _context.SaveChangesAsync();
          //}
          //catch (DbUpdateConcurrencyException)
          //{
          //  if (!AdvertExists(id))
          //  {
          //    return NotFound();
          //  }
          //  else
          //  {
          //    throw;
          //  }
          //}

          //return NoContent();
          return Ok();
        }

        // POST: api/Adverts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<Advert> PostAdvert(Advert advert)
        {
            _advertService.AddAdvert(advert);

            return CreatedAtAction("GetAdvert", new { id = advert.Id }, advert);
        }

            // DELETE: api/Adverts/5
        [HttpDelete("{id}")]
        public ActionResult<Advert> DeleteAdvert(int id)
        {
            return _advertService.DeleteAdvert(id);
        }
     }
}
