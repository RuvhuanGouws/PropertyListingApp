using System.Text.Json.Serialization;

namespace WebApi.Entities
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
