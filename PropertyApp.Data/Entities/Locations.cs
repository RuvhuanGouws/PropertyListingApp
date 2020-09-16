using System;
using System.Collections.Generic;
using System.Text;

namespace PropertyApp.Data
{
  public class Locations
  {
    //Dictionary<string, List<string>> ProvinceList = new Dictionary<string, List<string>>();
    public Dictionary<string, List<string>> ProvinceList = new Dictionary<string, List<string>>()
    {
      { "Northern Cape", new List<string>() { "Kimberley", "Upington" } },
      { "Eastern Cape", new List<string>() { "Kimberley", "Upington" } },
      { "Western Cape", new List<string>() { "Kimberley", "Upington" } },
      { "Free State", new List<string>() { "Kimberley", "Upington" } },
      { "Gauteng", new List<string>() { "Kimberley", "Upington" } }
    };

    public Locations()
    {

    }
  }
}
