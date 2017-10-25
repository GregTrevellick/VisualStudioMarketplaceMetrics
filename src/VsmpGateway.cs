using Project1.VsIdeExtensionService;
using System.Collections.Generic;

namespace Project1
{
    public class VsmpGateway
    {
        static void Main()
        {
            var client = new VsIdeServiceClient();

            var vsixIds = new string[]
            {
                "OpeninXamarinStudio",
                "WhackWhackTerminal",
                "ArduinoIDEforVisualStudio",
                "2d5de770-50e9-4dcf-87e9-ea1ed1b43b68",
                "VSProPack.Microsoft.15893CD4-2422-4427-BEA8-4E28DCC26346"
            };

            var requestContext = new Dictionary<string, string>();
            requestContext.Add("OSVersion", "10.0.10240.0");//MUST BE SUPPLIED
            requestContext.Add("LCID", "1033");//MUST BE SUPPLIED
            requestContext.Add("SearchSource", "ExtensionManagerUpdate");//MUST BE SUPPLIED
            //requestContext.Add("VSVersion", "14.0");//NOT required
            //requestContext.Add("TemplateType", null);//NOT required
            //requestContext.Add("SubSkus", null);//NOT required
            //requestContext.Add("Skus", null);//NOT required

            //https://gist.githubusercontent.com/lbargaoanu/8e3e0dd2d771c43e8eaa43eff5963cdd/raw/04a6724c96852e7307c5ab9b87ce3a4bbe37ec01/CheckVSExtensionsUpdates.txt
            //<requestContext xmlns:b="http://schemas.microsoft.com/2003/10/Serialization/Arrays" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            //  <b:KeyValueOfstringstring>
            //    <b:Key>LCID</b:Key>
            //    <b:Value>1033</b:Value>
            //  </b:KeyValueOfstringstring>
            //  <b:KeyValueOfstringstring>
            //    <b:Key>SearchSource</b:Key>
            //    <b:Value>ExtensionManagerUpdate</b:Value>
            //  </b:KeyValueOfstringstring>
            //  <b:KeyValueOfstringstring>
            //    <b:Key>TemplateType</b:Key>
            //    <b:Value i:nil="true"/>
            //  </b:KeyValueOfstringstring>
            //  <b:KeyValueOfstringstring>
            //    <b:Key>Skus</b:Key>
            //    <b:Value/>
            //  </b:KeyValueOfstringstring>
            //  <b:KeyValueOfstringstring>
            //    <b:Key>SubSkus</b:Key>
            //    <b:Value/>
            //  </b:KeyValueOfstringstring>
            //  <b:KeyValueOfstringstring>
            //    <b:Key>OSVersion</b:Key>
            //    <b:Value>10.0.10240.0</b:Value>
            //  </b:KeyValueOfstringstring>
            //  <b:KeyValueOfstringstring>
            //    <b:Key>VSVersion</b:Key>
            //    <b:Value>14.0</b:Value>
            //  </b:KeyValueOfstringstring>
            //</requestContext>

            var currentVersionsForVsixList = client.GetCurrentVersionsForVsixList(vsixIds, requestContext);

            var rootCategories = client.GetRootCategories("en-GB");

            //ALWAYS close the client
            client.Close();
        }
    }
}
