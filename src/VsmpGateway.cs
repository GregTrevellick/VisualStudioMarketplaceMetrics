using Project1.VsIdeExtensionService;

namespace Project1
{
    public class VsmpGateway
    {
        static void Main()
        {
            var client = new VsIdeServiceClient();

            //var vsixIds = new string[] { "OpeninXamarinStudio", "WhackWhackTerminal", "ArduinoIDEforVisualStudio" };
            //var requestContext = new Dictionary<string, string>();
            //var currentVersionsForVsixList = client.GetCurrentVersionsForVsixList(vsixIds, requestContext);

            var currentVersionsForVsixList = client.GetRootCategories("en-GB");

            //ALWAYS close the client
            client.Close();
        }
    }
}
