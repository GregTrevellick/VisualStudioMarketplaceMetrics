//https://marketplace.visualstudio.com/services/VStudio/Extension.svc
//http://visualstudiogallery.msdn.microsoft.com/Services/v2011/Extension.svc

//using Project1.VsIdeServiceClient;
//using System.Collections.Generic;

//namespace Project1
//{
//    public class vsmpGateway_v2
//    {
//        static void Main()
//        {
//            var client = new VsIdeServiceClient.VsIdeServiceClient();

//            var items = Search(client);

//            if (items.Length > 0)
//            {
//                var foundItem = items[0];

//                foundItem.Project.Metadata.TryGetValue("VsixVersion", out string vers);
//                foundItem.Project.Metadata.TryGetValue("VsixId", out string v6id);

//                var downloadCount = foundItem.Files[0].DownloadCount;
//                var metaData = foundItem.Project.Metadata;
//                var modifiedDate = foundItem.Project.ModifiedDate;
//                var title = foundItem.Project.Title;
//                var version = vers;
//                var vsixId = v6id;
//            }
//        }

//        private static Release[] Search(VsIdeServiceClient.VsIdeServiceClient client)
//        {
//            var whereClause = "(Project.MetaData['VsixId'] = '41521019-e4c7-480c-8ea8-fc4a2c6f50aa') AND (Project.Metadata['SupportedVSEditions'] LIKE '%15.0.26430.16,Pro;%')";
//            var orderClause = "Project.Metadata['Ranking'] desc";
//            var requestContext = new Dictionary<string, string>()
//            {
//                { "LCID", "1033" },
//                {"SearchSource", "ExtensionManagerQuery"},
//                {"OSVersion","10.0.15063.0"}
//            };

//            var result = client.SearchReleases2("ErikEJ.SQLServerCompactSQLiteToolbox", whereClause, orderClause, 0, 1, requestContext);
//            return result.Releases;
//        }
//    }
//}
