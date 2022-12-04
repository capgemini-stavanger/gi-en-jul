using Autofac;
using Autofac.Extensions.DependencyInjection;
using GiEnJul.Auth;
using GiEnJul.Infrastructure;
using GiEnJul.Utilities;
using GiEnJul.Utilities.ScheduledJobs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.WindowsAzure.Storage;
using Quartz;
using Serilog;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

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
            var logger = new LoggerConfiguration()
                                .MinimumLevel.Verbose()
                                .WriteTo.Console()
                                .WriteTo.AzureTableStorage(CloudStorageAccount.Parse(Configuration.GetValue<string>("TableConnectionString")),
                                                       storageTableName: Configuration.GetValue<string>("LogTableName"),
                                                       writeInBatches: true)
                                .CreateLogger();

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
                options.Events = new JwtBearerEvents { OnForbidden = async (ctx) => await OnAuthorizationErrors(ctx, logger) };
            }
            );

            services.AddAuthorization(options =>
                Authconfig.SetPolicies(options)
            );

            services.AddQuartz(q =>
                { 
                    q.UseMicrosoftDependencyInjectionJobFactory();
                    q.AddScheduledJob<CleanupConnectionsJob>(Configuration);
                });

            services.AddQuartzHostedService(
                q => q.WaitForJobsToComplete = true);
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            AutofacConfiguration.Configure(builder, Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            SetCulture();
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

        private static void SetCulture()
        {
            var culture = new CultureInfo("no-NB");
            CultureInfo.CurrentCulture = culture;
            CultureInfo.CurrentUICulture = culture;
        }

        public async Task OnAuthorizationErrors(ForbiddenContext ctx, ILogger logger)
        {
            await Task.Run(() => logger.Warning("Authorization failed for endpoint {0}", ctx.Request.Path));
        }
    }
}
