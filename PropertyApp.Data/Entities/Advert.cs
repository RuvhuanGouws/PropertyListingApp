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
    public string header { get; set; }
    public string details { get; set; }
    public string province { get; set; }
    public string city { get; set; }
    public decimal price { get; set; }
    public int UserID { get; set; }
    public string status { get; set; }
  }
 
}
