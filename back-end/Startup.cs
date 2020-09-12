using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PropertyApp.Data;
using WebApi.Controllers;
using WebApi.Helpers;
using PropertyApp.API;

namespace WebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // add services to the DI container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
              options.AddPolicy("CorsPolicy",
                builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            });
            services.AddControllers();

            services.AddDbContext<PropertyContext>(opt =>
              opt.UseSqlServer(Configuration.GetConnectionString("UserConnex"))
                .EnableSensitiveDataLogging()
            );
            // configure strongly typed settings object
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            // configure DI for application services
            services.AddScoped<IUserService, UserService>();
        }

        // configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseHttpsRedirection();
            app.UseRouting();

            // global cors policy
            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            //custom jwt auth middleware
            //app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(x => x.MapControllers());
        }
    }
}
