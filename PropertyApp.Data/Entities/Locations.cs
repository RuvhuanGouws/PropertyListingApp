using System;
using System.Collections.Generic;
using System.Text;

namespace PropertyApp.Data
{
  public class Locations
  {
    public Locations()
    {
      locations.Add("Northern Cape", new List<string>() { "Kimberley", "Upington" });
      locations.Add("Eastern Cape", new List<string>() { "East London", "George" });
      locations.Add("Western Cape", new List<string>() { "Cape Town", "Stellenbosch" });
      locations.Add("Free State", new List<string>() { "Bloemfontein", "Welkom" });
      locations.Add("Gauteng", new List<string>() { "Pretoria", "Johannesburg" });
    }
    //Dictionary<string, List<string>> ProvinceList = new Dictionary<string, List<string>>();
    public Dictionary<string, List<string>> locations = new Dictionary<string, List<string>>();

    
  }
}
