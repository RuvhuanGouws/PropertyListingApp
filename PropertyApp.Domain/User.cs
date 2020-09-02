using System;

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
    public string Password { get; set; }
  }
}
