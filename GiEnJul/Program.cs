using Azure.Data.Tables;
using GiEnJul.Auth;
using GiEnJul.Infrastructure;
using GiEnJul.Utilities;
using GiEnJul.Utilities.ScheduledJobs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Quartz;
using Serilog;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

var logger = new LoggerConfiguration()
                                .MinimumLevel.Verbose()
                                .WriteTo.Console()
                                .WriteTo.AzureTableStorage(new TableServiceClient(builder.Configuration["TableConnectionString"]),
                                                       storageTableName: builder.Configuration["LogTableName"])
                                .CreateLogger();

builder.Services.AddSingleton<ILogger>(l => logger);
builder.Services.ConfigureServices(builder.Configuration, builder.Environment);

builder.Services.AddControllers().AddNewtonsoftJson();

string domain = $"https://{builder.Configuration["Auth0:Domain"]}/";
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    
    var section = builder.Configuration.GetSection("Auth0");
    options.Authority = domain;
    options.Audience = section[builder.Environment.IsDevelopment() ? "LocalAudience" : "AzureAudience"];
    options.Events = new JwtBearerEvents { OnForbidden = async (ctx) => await OnAuthorizationErrors(ctx, logger) };
});

builder.Services.AddAuthorization(options =>
    Authconfig.SetPolicies(options)
);

builder.Services.AddQuartz(q =>
{
    q.AddScheduledJob<CleanupConnectionsJob>(builder.Configuration);
    q.AddScheduledJob<AnonymizeUserDataJob>(builder.Configuration);
});

builder.Services.AddQuartzHostedService(
    q => q.WaitForJobsToComplete = true);



var app = builder.Build();

SetCulture();
if (app.Environment.IsDevelopment())
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

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

var settings = app.Services.GetRequiredService<ISettings>();
var log = app.Services.GetRequiredService<ILogger>();
log.Information("React App: {@0}", settings.ReactAppUri);

app.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");

app.UseCors(p =>
    p.AllowAnyMethod()
       .AllowAnyHeader()
       .SetIsOriginAllowed(x =>
       {
           log.Verbose(x);
           return IsOriginAllowed(x, settings);
       }));


app.Run();


bool IsOriginAllowed(string x, ISettings settings)
{
    var allowedOrigins = settings.ReactAppUri.Split(';');
    return allowedOrigins.Contains(x);
}

static void SetCulture()
{
    var culture = new CultureInfo("no-NB");
    CultureInfo.CurrentCulture = culture;
    CultureInfo.CurrentUICulture = culture;
}

async Task OnAuthorizationErrors(ForbiddenContext ctx, ILogger logger)
{
    await Task.Run(() => logger.Warning("Authorization failed for endpoint {0}", ctx.Request.Path));
}