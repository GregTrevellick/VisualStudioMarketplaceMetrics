using Project1.VsIdeExtensionService;
using System.Collections.Generic;

namespace Project1
{
    public class VsmpGateway
    {
        static void Main()
        {
            var client = new VsIdeServiceClient();

            var vsixIds = new string[] { "OpeninXamarinStudio", "WhackWhackTerminal", "ArduinoIDEforVisualStudio" };
            var requestContext = new Dictionary<string, string>();
            var currentVersionsForVsixList = client.GetCurrentVersionsForVsixList(vsixIds, requestContext);

            // Always close the client.
            client.Close();
        }
    }
}
