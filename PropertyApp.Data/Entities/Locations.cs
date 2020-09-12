using System;
using System.Collections.Generic;
using System.Text;

namespace PropertyApp.Data
{
  public class Locations
  {
    Dictionary<string, List<string>> ProvinceList = new Dictionary<string, List<string>>();

    public Locations()
    {
      ProvinceList.Add("Northern Cape", new List<string>() { "Kimberley", "Upington" });
      ProvinceList.Add("Eastern Cape", new List<string>() { "Kimberley", "Upington" });
      ProvinceList.Add("Western Cape", new List<string>() { "Kimberley", "Upington" });
      ProvinceList.Add("Free State", new List<string>() { "Kimberley", "Upington" });
      ProvinceList.Add("Gauteng", new List<string>() { "Kimberley", "Upington" });

    }
  }
}
