using System;
using Newtonsoft.Json;

namespace PropertyApp.Domain
{
  public class User
  {
    public User()
    {

    }
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    [JsonIgnore]
    public string Password { get; set; }
  }
}
