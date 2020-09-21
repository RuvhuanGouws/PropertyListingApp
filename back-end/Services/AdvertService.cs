using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyApp.Data;
using PropertyApp.ViewModels;

namespace PropertyApp.API
{
  public interface IAdvertService
  {

    IEnumerable<Advert> GetAll(string order);
    Advert GetById(int id);
    Advert Find(Advert advert);
    Advert AddAdvert(Advert advert);
  }
  public class AdvertService
  {
    private readonly PropertyContext _advertContext;

    public AdvertService(PropertyContext advertContext)
    {
      _advertContext = advertContext;
    }

    public IEnumerable<Advert> GetAll(string order)
    {
      if(order == "lowHigh")
      {
        return _advertContext.Adverts.Where(x => x.Status == "LIVE").OrderBy(x => x.Price).ToList();
      }
      else if(order == "highLow")
      {
        return _advertContext.Adverts.Where(x => x.Status == "LIVE").OrderByDescending(x => x.Price).ToList();
      }
      return _advertContext.Adverts.Where(x => x.Status == "LIVE").ToList();
    }

    public IEnumerable<Advert> GetAll()
    {
      return _advertContext.Adverts.Where(x => x.Status == "LIVE").ToList();
    }

    public Advert GetById(int id)
    {
      return _advertContext.Adverts.FirstOrDefault(x => x.Id == id);
    }

    public ActionResult<IEnumerable<Advert>> GetCurrentAdverts(int id)
    {
      return _advertContext.Adverts.Where(a => a.UserID == id).ToList();
    }

    public ActionResult<Advert> AddAdvert(Advert advert)
    {
      _advertContext.Adverts.Add(advert);
      _advertContext.SaveChanges();

      return advert;
    }

    public ActionResult<Advert> DeleteAdvert(int id)
    {
      var advert = _advertContext.Adverts.Find(id);
      
      _advertContext.Adverts.Remove(advert);
      _advertContext.SaveChanges();

      return advert;
    }

    public void Update(Advert advert)
    {
      var adTemp = _advertContext.Adverts.SingleOrDefault(ad => ad.Id == advert.Id);
      if(adTemp != null)
      {
        _advertContext.Entry(advert).State = EntityState.Detached;
        _advertContext.Adverts.Attach(advert);
        _advertContext.Entry(advert).State = EntityState.Modified;
        _advertContext.SaveChanges();
      }
    }
    public Dictionary<string, List<string>> GetLocations()
    {
      var locations = new Dictionary<string, List<string>>();
      locations.Add("Northern Cape", new List<string>() { "Kimberley", "Upington" });
      locations.Add("Eastern Cape", new List<string>() { "East London", "George" });
      locations.Add("Western Cape", new List<string>() { "Cape Town", "Stellenbosch" });
      locations.Add("Free State", new List<string>() { "Bloemfontein", "Welkom" });
      locations.Add("Gauteng", new List<string>() { "Pretoria", "Johannesburg" });
      //Locations locations = new Locations();
      return locations;
    }
    private AdvertModel Map(Advert advert)
    {
      return new AdvertModel
      {
        Id = advert.Id,
        Header = advert.Header,
        Details = advert.Details,
        Province = advert.Province,
        City = advert.City,
        Price = advert.Price,
        UserID = advert.UserID,
        Status = advert.Status,
        Featured = advert.Featured
      };
    }
  }
}
