using GiEnJul.Infrastructure;
using Microsoft.Extensions.Configuration;

internal static class ScriptHelpers
{

    public static Settings CreateSettings()
    {
        var path = Path.GetFullPath("..\\..\\..\\..\\GiEnJul");
        var config = new ConfigurationBuilder().SetBasePath(path).AddJsonFile("appsettings.json").Build();

        var settings = new Settings(config);
        return settings;
    }
}