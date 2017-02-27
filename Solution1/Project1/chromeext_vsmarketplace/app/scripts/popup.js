$(function () {

    psuedoClick();

    function psuedoClick() {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "sendTotalsToPopUp" }, doStuffWithDomCallBack);
            });
    };

        
    function doStuffWithDomCallBack(obj) {

        var totalInstallCount = 0;

        var tbl = $("<table/>").attr("id", "DetailTable");
        $("#DetailGrid").append(tbl);

        for (var i = 0; i < obj.length; i++)
        {
            var tr = "<tr>";
            var td1 = "<td>" + obj[i]["InstallCount"] + "</td>";
            totalInstallCount += parseInt(obj[i]["InstallCount"]);
            var tdLast = "<td>" + obj[i]["ItemTitle"] + "</td></tr>";
            $("#DetailTable").append(tr + td1 + tdLast);
        }

        document.getElementById('TotalInstallCount').innerHTML = totalInstallCount;
    }
});