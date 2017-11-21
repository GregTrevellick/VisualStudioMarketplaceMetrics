//https://marketplace.visualstudio.com/services/vstudio/extension.svc
//http://visualstudiogallery.msdn.microsoft.com/services/v2011/extension.svc

//using project1.vsideserviceclient;
//using system.collections.generic;

//namespace project1
//{
//    public class vsmpGateway_v1
//    {
//        static void main()
//        {
//            var client = new vsideserviceclient();

//            var vsixids = new string[]
//            {
//                "openinxamarinstudio",
//                "whackwhackterminal",
//                "arduinoideforvisualstudio",
//                "madskristensen.editorenhancements",
//                "2d5de770-50e9-4dcf-87e9-ea1ed1b43b68",
//                "vspropack.microsoft.15893cd4-2422-4427-bea8-4e28dcc26346"
//            };

//            var requestcontext = new dictionary<string, string>();
//            requestcontext.add("osversion", "10.0.10240.0");//must be supplied
//            requestcontext.add("lcid", "1033");//must be supplied
//            requestcontext.add("searchsource", "extensionmanagerupdate");//must be supplied
//            requestcontext.add("vsversion", "14.0");//not required
//            requestcontext.add("templatetype", null);//not required
//            requestcontext.add("subskus", null);//not required
//            requestcontext.add("skus", null);//not required

//            https://gist.githubusercontent.com/lbargaoanu/8e3e0dd2d771c43e8eaa43eff5963cdd/raw/04a6724c96852e7307c5ab9b87ce3a4bbe37ec01/checkvsextensionsupdates.txt
//            <requestcontext xmlns:b="http://schemas.microsoft.com/2003/10/serialization/arrays" xmlns:i="http://www.w3.org/2001/xmlschema-instance">
//              <b:keyvalueofstringstring>
//                <b:key>lcid</b:key>
//                <b:value>1033</b:value>
//              </b:keyvalueofstringstring>
//              <b:keyvalueofstringstring>
//                <b:key>searchsource</b:key>
//                <b:value>extensionmanagerupdate</b:value>
//              </b:keyvalueofstringstring>
//              <b:keyvalueofstringstring>
//                <b:key>templatetype</b:key>
//                <b:value i:nil="true"/>
//              </b:keyvalueofstringstring>
//              <b:keyvalueofstringstring>
//                <b:key>skus</b:key>
//                <b:value/>
//              </b:keyvalueofstringstring>
//              <b:keyvalueofstringstring>
//                <b:key>subskus</b:key>
//                <b:value/>
//              </b:keyvalueofstringstring>
//              <b:keyvalueofstringstring>
//                <b:key>osversion</b:key>
//                <b:value>10.0.10240.0</b:value>
//              </b:keyvalueofstringstring>
//              <b:keyvalueofstringstring>
//                <b:key>vsversion</b:key>
//                <b:value>14.0</b:value>
//              </b:keyvalueofstringstring>
//            </requestcontext>

//            var currentversionsforvsixlist = client.getcurrentversionsforvsixlist(vsixids, requestcontext);

//            var c = string.empty;
//            var a = client.searchreleases("trevellick",c, c,null,null,null);
//            var b = client.searchreleases("openinxamarinstudio", c, c, null, null, null);
//            var a = client.searchreleases2("trevellick", c, c, null, null, requestcontext);
//            var b = client.searchreleases2("openinxamarinstudio", c, c, null, null, requestcontext);

//            var rootcategories = client.getrootcategories("en-gb");

//            always close the client
//            client.close();
//        }
//    }
//}
