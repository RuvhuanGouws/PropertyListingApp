using Microsoft.EntityFrameworkCore;


namespace PropertyApp.Data
{
  public class UserContext : DbContext
    {
      private const string connectionString = "Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = PropertiesAppData";

      public UserContext(DbContextOptions<UserContext> options): base(options)
      {
        ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
      }

      public DbSet<User> Users { get; set; }
    }
}
