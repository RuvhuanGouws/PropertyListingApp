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

namespace PropertyApp.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdvertsController : ControllerBase
    {
        private readonly PropertyContext _context; // implement service

        public AdvertsController(PropertyContext context)
        {
            _context = context;
        }

        // GET: api/Adverts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Advert>>> GetAdverts()
        {
            return await _context.Adverts.ToListAsync();
        }

        [HttpGet("locations")]
        public Dictionary<string, List<string>> GetLocations() //temp - move to service
        {
          var locations = new Dictionary<string, List<string>>();
          locations.Add("Northern Cape", new List<string>() { "Kimberley", "Upington" });
          locations.Add("Eastern Cape", new List<string>() { "East London", "George" });
          locations.Add("Western Cape", new List<string>() { "Cape Town", "Stellenbosch" });
          locations.Add("Free State", new List<string>() { "Bloemfontein", "Welkom" });
          locations.Add("Gauteng", new List<string>() { "Pretoria", "Johannesburg" });
          return locations;
        }
        // GET: api/Adverts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Advert>> GetAdvert(int id)
        {
            var advert = await _context.Adverts.FindAsync(id);

            if (advert == null)
            {
                return NotFound();
            }

            return advert;
        }

        // PUT: api/Adverts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public async Task<IActionResult> PutAdvert(Advert advert)
        {
            //if (id != advert.Id)
            //{
            //    return BadRequest();
            //}

            _context.Entry(advert).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!AdvertExists(id))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
            }

            return NoContent();
        }

        // POST: api/Adverts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Advert>> PostAdvert(Advert advert)
        {
            _context.Adverts.Add(advert);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdvert", new { id = advert.Id }, advert);
        }

        // DELETE: api/Adverts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Advert>> DeleteAdvert(int id)
        {
            var advert = await _context.Adverts.FindAsync(id);
            if (advert == null)
            {
                return NotFound();
            }

            _context.Adverts.Remove(advert);
            await _context.SaveChangesAsync();

            return advert;
        }

        private bool AdvertExists(int id)
        {
            return _context.Adverts.Any(e => e.Id == id);
        }
    }
}
