using System;
using System.Collections.Generic;
using System.Text;

namespace PropertyApp.Data
{
    public class PasswordChange
    {
      public PasswordChange()
      {

      }
      public User user { get; set; }
      public string pw { get; set; }
      public string newPw { get; set; }
  }
}
