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

        var grandDLCount = 0;

        var tbl = $("<table/>").attr("id", "DetailTable");
        $("#DetailGrid").append(tbl);

        for (var i = 0; i < obj.length; i++)
        {
            var tr = "<tr>";
            var td1 = "<td>" + obj[i]["DlCount"] + "</td>";
            grandDLCount += parseInt(obj[i]["DlCount"]);
            var tdLast = "<td>" + obj[i]["ExtnNam"] + "</td></tr>";
            $("#DetailTable").append(tr + td1 + tdLast);
        }

        var display = document.getElementById('OverallDownloadTotal');
        display.innerHTML = grandDLCount;
    }
});