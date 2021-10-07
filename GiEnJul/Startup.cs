using Autofac;
using Autofac.Extensions.DependencyInjection;
using GiEnJul.Auth;
using GiEnJul.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Linq;

namespace GiEnJul
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }
        public ILifetimeScope AutofacContainer { get; private set; }
        private readonly IWebHostEnvironment _env;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddNewtonsoftJson();

            string domain = $"https://{Configuration["Auth0:Domain"]}/";
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var section = Configuration.GetSection("Auth0");
                options.Authority = domain;
                options.Audience = section.GetValue<string>(_env.IsDevelopment() ? "LocalAudience" : "AzureAudience");
            }
            );
            services.AddAuthorization(options =>
                Authconfig.SetPolicies(options)
            );
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            AutofacConfiguration.Configure(builder, Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseExceptionHandler("/error-local-development");
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            var container = app.ApplicationServices.GetAutofacRoot();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            var settings = container.Resolve<ISettings>();
            var log = container.Resolve<ILogger>();
            log.Information("React App: {@0}", settings.ReactAppUri);

            app.UseCors(p =>
                p.AllowAnyMethod()
                   .AllowAnyHeader()
                   .SetIsOriginAllowed(x =>
                   {
                       log.Verbose(x);
                       return IsOriginAllowed(x, settings);
                   }));

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }

        private bool IsOriginAllowed(string x, ISettings settings)
        {
            var allowedOrigins = settings.ReactAppUri.Split(';');
            return allowedOrigins.Contains(x);
        }
    }
}