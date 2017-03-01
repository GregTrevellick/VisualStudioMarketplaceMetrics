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
            var numericInstallCount = parseInt(obj[i]["InstallCount"]);
            var numericReviewCount = parseInt(obj[i]["ReviewCount"]);

            totalInstallCount += numericInstallCount;
            totalReviewCount += numericReviewCount;

            var colInstallCount = "<td class='numeric'>" + numericInstallCount.toLocaleString() + "</td>";
            var colIcon = "<td><img src=\"" + obj[i]["Icon"] + "\" style=\"height: 15%\"></td>";
            var colItemTitle = "<td><div title=\"" + obj[i]["FullDescription"] + "\">" + obj[i]["ItemTitle"] + "</div></td>";
            var colReviewCount = "<td class='numeric'>" + numericReviewCount.toLocaleString() + "</td>";
            var colReviewsAsPercentageOfInstalls = "<td>" + obj[i]["ReviewsAsPercentageOfInstalls"] + "</td>";
            var colPublisher = "<td>" + obj[i]["Publisher"] + "</td>";
            var colPrice = "<td>" + obj[i]["Price"] + "</td>";
            var colAverageReview = "<td>" + obj[i]["AverageReview"] + "</td>";
            var colURL = "<td><a href=\"" + obj[i]["URL"] + "\" target=\"_blank\">url</a></td>";

            $("#DetailGridTableBody").append(
                rowOpen +
                colInstallCount +
                colIcon +
                colItemTitle +
                colReviewCount +
                colReviewsAsPercentageOfInstalls +
                colPublisher +
                colPrice +
                colAverageReview +
                colURL +
                rowClose);
        }

        //Set the totals
        document.getElementById('TotalInstallCount').innerHTML = totalInstallCount.toLocaleString();
        document.getElementById('TotalReviewCount').innerHTML = totalReviewCount.toLocaleString();
        document.getElementById('GridTotalInstallCount').innerHTML = totalInstallCount.toLocaleString();
        document.getElementById('GridTotalReviewCount').innerHTML = totalReviewCount.toLocaleString();

        //Enable table sorting
        $(document).ready(function () {
            $("#DetailGridTable").tablesorter();

        }); 

    }
});
