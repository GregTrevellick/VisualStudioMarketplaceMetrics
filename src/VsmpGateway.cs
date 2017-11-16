//https://marketplace.visualstudio.com/services/VStudio/Extension.svc
//http://visualstudiogallery.msdn.microsoft.com/Services/v2011/Extension.svc

using Project1.VsIdeServiceClient;
using System.Collections.Generic;

namespace Project1
{
    public class VsmpGateway
    {
        static void Main()
        {
            var client = new VsIdeServiceClient.VsIdeServiceClient();

            var items = Search(client);

            if (items.Length > 0)
            {
                var foundItem = items[0];

                foundItem.Project.Metadata.TryGetValue("VsixVersion", out string vers);
                foundItem.Project.Metadata.TryGetValue("VsixId", out string v6id);

                var downloadCount = foundItem.Files[0].DownloadCount;
                var metaData = foundItem.Project.Metadata;
                var modifiedDate = foundItem.Project.ModifiedDate;
                var title = foundItem.Project.Title;
                var version = vers;
                var vsixId = v6id;
            }
        }

        private static Release[] Search(VsIdeServiceClient.VsIdeServiceClient client)
        {
            var whereClause = "(Project.MetaData['VsixId'] = '41521019-e4c7-480c-8ea8-fc4a2c6f50aa') AND (Project.Metadata['SupportedVSEditions'] LIKE '%15.0.26430.16,Pro;%')";
            var orderClause = "Project.Metadata['Ranking'] desc";
            var requestContext = new Dictionary<string, string>()
            {
                { "LCID", "1033" },
                {"SearchSource", "ExtensionManagerQuery"},
                {"OSVersion","10.0.15063.0"}
            };

            var result = client.SearchReleases2("ErikEJ.SQLServerCompactSQLiteToolbox", whereClause, orderClause, 0, 1, requestContext);
            return result.Releases;
        }


        //static void Main()
        //{
        //    var client = new VsIdeServiceClient();

        //    var vsixIds = new string[]
        //    {
        //        "OpeninXamarinStudio",
        //        "WhackWhackTerminal",
        //        "ArduinoIDEforVisualStudio",
        //        "MadsKristensen.EditorEnhancements",
        //        "2d5de770-50e9-4dcf-87e9-ea1ed1b43b68",
        //        "VSProPack.Microsoft.15893CD4-2422-4427-BEA8-4E28DCC26346"
        //    };

        //    var requestContext = new Dictionary<string, string>();
        //    requestContext.Add("OSVersion", "10.0.10240.0");//MUST BE SUPPLIED
        //    requestContext.Add("LCID", "1033");//MUST BE SUPPLIED
        //    requestContext.Add("SearchSource", "ExtensionManagerUpdate");//MUST BE SUPPLIED
        //    //requestContext.Add("VSVersion", "14.0");//NOT required
        //    //requestContext.Add("TemplateType", null);//NOT required
        //    //requestContext.Add("SubSkus", null);//NOT required
        //    //requestContext.Add("Skus", null);//NOT required

        //    //https://gist.githubusercontent.com/lbargaoanu/8e3e0dd2d771c43e8eaa43eff5963cdd/raw/04a6724c96852e7307c5ab9b87ce3a4bbe37ec01/CheckVSExtensionsUpdates.txt
        //    //<requestContext xmlns:b="http://schemas.microsoft.com/2003/10/Serialization/Arrays" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
        //    //  <b:KeyValueOfstringstring>
        //    //    <b:Key>LCID</b:Key>
        //    //    <b:Value>1033</b:Value>
        //    //  </b:KeyValueOfstringstring>
        //    //  <b:KeyValueOfstringstring>
        //    //    <b:Key>SearchSource</b:Key>
        //    //    <b:Value>ExtensionManagerUpdate</b:Value>
        //    //  </b:KeyValueOfstringstring>
        //    //  <b:KeyValueOfstringstring>
        //    //    <b:Key>TemplateType</b:Key>
        //    //    <b:Value i:nil="true"/>
        //    //  </b:KeyValueOfstringstring>
        //    //  <b:KeyValueOfstringstring>
        //    //    <b:Key>Skus</b:Key>
        //    //    <b:Value/>
        //    //  </b:KeyValueOfstringstring>
        //    //  <b:KeyValueOfstringstring>
        //    //    <b:Key>SubSkus</b:Key>
        //    //    <b:Value/>
        //    //  </b:KeyValueOfstringstring>
        //    //  <b:KeyValueOfstringstring>
        //    //    <b:Key>OSVersion</b:Key>
        //    //    <b:Value>10.0.10240.0</b:Value>
        //    //  </b:KeyValueOfstringstring>
        //    //  <b:KeyValueOfstringstring>
        //    //    <b:Key>VSVersion</b:Key>
        //    //    <b:Value>14.0</b:Value>
        //    //  </b:KeyValueOfstringstring>
        //    //</requestContext>

        //    var currentVersionsForVsixList = client.GetCurrentVersionsForVsixList(vsixIds, requestContext);

        //    //var c = string.Empty;
        //    //var a = client.SearchReleases("trevellick",c, c,null,null,null);
        //    //var b = client.SearchReleases("OpeninXamarinStudio", c, c, null, null, null);
        //    //var a = client.SearchReleases2("trevellick", c, c, null, null, requestContext);
        //    //var b = client.SearchReleases2("OpeninXamarinStudio", c, c, null, null, requestContext);

        //    //var rootCategories = client.GetRootCategories("en-GB");

        //    //ALWAYS close the client
        //    client.Close();
        //}
    }
}
