using Microsoft.EntityFrameworkCore;


namespace PropertyApp.Data
{
  public class PropertyContext : DbContext
    {
      private const string connectionString = "Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = PropertiesAppData";

      public PropertyContext(DbContextOptions<PropertyContext> options): base(options)
      {
        ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
      }

      public DbSet<User> Users { get; set; }
      public DbSet<Advert> Adverts { get; set; }
  }
}
