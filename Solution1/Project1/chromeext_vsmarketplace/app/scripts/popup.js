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
        var display = document.getElementById('daTotal');

        var tbl = $("<table/>").attr("id", "mytable");
        $("#div1").append(tbl);
        for (var i = 0; i < obj.length; i++)
        {
            var tr = "<tr>";
            var td1 = "<td>" + obj[i]["DlCount"] + "</td>";
            var tdLast = "<td>" + obj[i]["ExtnNam"] + "</td></tr>";
            $("#mytable").append(tr + td1 + tdLast);
        }

        daGrid.innerHTML = tbl;
        //display.innerHTML = domDetailsJsonArray.DlCount;

    }
});