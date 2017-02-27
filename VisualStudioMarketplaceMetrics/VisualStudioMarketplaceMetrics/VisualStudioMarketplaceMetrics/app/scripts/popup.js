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
        var rowClose = "</tr>";

        //Create table
        var detailGridTable = $("<table/>").attr("id", "DetailGridTable");
        $("#DetailGrid").append(detailGridTable);

        //Header row
        var hdrRowOpen = "<tr class='hdr'>";
        var hdrInstallCount = "<td>" + "Installs" + "</td>";
        var hdrItemTitle = "<td>" + "Title" + "</td>";
        var hdrReviewCount = "<td>" + "Reviews" + "</td>";

        $("#DetailGridTable").append(hdrRowOpen + hdrInstallCount + hdrItemTitle + hdrReviewCount + rowClose);

        //Data rows
        for (var i = 0; i < obj.length; i++)
        {
            totalInstallCount += parseInt(obj[i]["InstallCount"]);
            totalReviewCount += parseInt(obj[i]["ReviewCount"]);
            var rowOpen = "<tr>";
            var colInstallCount = "<td class='nbr'>" +obj[i]["InstallCount"]+ "</td>";
            var colItemTitle = "<td>" + obj[i]["ItemTitle"] + "</td>";//gregt alt text with full description //gregt href to the site for the vsix
            var colReviewCount = "<td class='nbr'>" + obj[i]["ReviewCount"] + "</td>";//gregt split "Average rating: 5.0 (3 ratings)" into 2 .nbr columns
            $("#DetailGridTable").append(rowOpen + colInstallCount + colItemTitle + colReviewCount + rowClose);
        }

        //Set the totals
        document.getElementById('TotalInstallCount').innerHTML = totalInstallCount;
        document.getElementById('TotalReviewCount').innerHTML = totalReviewCount;

        //Footer (totals) row
        var ftrRowOpen = "<tr class='ftr'>";
        var ftrInstallCount = "<td class='nbr'>" +totalInstallCount + "</td>";
        var ftrItemTitle = "<td>" + "</td>";
        var ftrReviewCount = "<td class='nbr'>" + totalReviewCount + "</td>";
        $("#DetailGridTable").append(ftrRowOpen + ftrInstallCount + ftrItemTitle + ftrReviewCount + rowClose);
    }
});