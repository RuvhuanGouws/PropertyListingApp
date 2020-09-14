using System;
using System.Collections.Generic;
using System.Text;

namespace PropertyApp.Data
{
  public class Advert
  {
    public Advert()
    {

    }
    public int Id { get; set; }
    public string Header { get; set; }
    public string Details { get; set; }
    public string Province { get; set; }
    public string City { get; set; }
    public decimal Price { get; set; }
    public int UserID { get; set; }
    public string Status { get; set; }
  }
 
}
