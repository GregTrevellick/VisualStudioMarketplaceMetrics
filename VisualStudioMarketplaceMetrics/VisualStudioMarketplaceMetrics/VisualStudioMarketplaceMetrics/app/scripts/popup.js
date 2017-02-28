$(function () {

    psuedoClick();

    function psuedoClick() {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "sendTotalsToPopUp" }, domCallBack);
            });
    };

        
    function domCallBack(obj) {

        var totalInstallCount = 0;
        var totalReviewCount = 0;
        var rowOpen = "<tr>";
        var rowClose = "</tr>";

        //Data rows
        for (var i = 0; i < obj.length; i++)
        {
            //gregt alt text with full description 
            //gregt href to the site for the vsix
            //gregt add publish date
            //gregt full description
            //gregt publisher
            totalInstallCount += parseInt(obj[i]["InstallCount"]);
            totalReviewCount += parseInt(obj[i]["ReviewCount"]);
            var colInstallCount = "<td class='numeric'>" +obj[i]["InstallCount"]+ "</td>";
            var colItemTitle = "<td>" + obj[i]["ItemTitle"] + "</td>";
            var colReviewCount = "<td class='numeric'>" + obj[i]["ReviewCount"] + "</td>";
            $("#DetailGridTableBody").append(rowOpen + colInstallCount + colItemTitle + colReviewCount + rowClose);
        }

        //Set the totals
        document.getElementById('TotalInstallCount').innerHTML = totalInstallCount;
        document.getElementById('TotalReviewCount').innerHTML = totalReviewCount;
        document.getElementById('GridTotalInstallCount').innerHTML = totalInstallCount;
        document.getElementById('GridTotalReviewCount').innerHTML = totalReviewCount;

        $(document).ready(function () {
            $("#DetailGridTable").tablesorter();

        }); 

    }
});
