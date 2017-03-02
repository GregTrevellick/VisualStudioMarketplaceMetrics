//gregt try catch
//gregt use strict
//gregt try diff locales (should work for free)
//gregt disable til dom loaded
//gregt sort icons overlapping col hdr text
//gregt total nbr of extensions
//gregt total for reviews col (weighted & unweighted)

//YES
//https://marketplace.visualstudio.com
//https://marketplace.visualstudio.com/vs
//https://marketplace.visualstudio.com/vsts
//https://marketplace.visualstudio.com/vscode
//https://marketplace.visualstudio.com/search  IDE & VSTS & Code
//https://marketplace.visualstudio.com/manage
//https://visualstudiogallery.msdn.microsoft.com/site/mydashboard
//https://social.msdn.microsoft.com/profile/Greg%20Trevellick/extensions

//NO
//https://marketplace.visualstudio.com/subscriptions
//https://marketplace.visualstudio.com/items?itemName=vs-publisher-1455028.OpsHubVisualStudioOnlineMigrationUtility




$(function () {

    onLoadRequestDomFromVsmp();

    function onLoadRequestDomFromVsmp() {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { action: "requestDomFromVsmpPopUp" },
                    popUpCallBack
                    );
            });
    };

    function popUpCallBack(vsmpDom) {

        var totalInstallCount = 0;
        var totalReviewCount = 0;
        var rowOpen = "<tr>";
        var rowClose = "</tr>";

        for (var i = 0; i < vsmpDom.length; i++)
        {
            var numericInstallCount = parseInt(vsmpDom[i]["InstallCount"]);
            var numericReviewCount = parseInt(vsmpDom[i]["ReviewCount"]);
            var numericReviewsAsPercentageOfInstalls = parseFloat(vsmpDom[i]["ReviewsAsPercentageOfInstalls"]).toFixed(3)

            totalInstallCount += numericInstallCount;
            totalReviewCount += numericReviewCount;

            var colInstallCount = "<td class='numeric'>" + numericInstallCount.toLocaleString() + "</td>";

            var colItemTitle = "<td>"
                + "<div title=\"" + vsmpDom[i]["FullDescription"] + "\">"
                + "<a href=\"" + vsmpDom[i]["URL"] + "\" target=\"_blank\">"
                + "<img src=\"" + vsmpDom[i]["Icon"] + "\" style=\"width: 18%; height: 18%;\">"
                + vsmpDom[i]["ItemTitle"]
                + "</a></div></td>";

            var colReviewCount = "<td class='numeric'>" + numericReviewCount.toLocaleString() + "</td>";

            var colReviewsAsPercentageOfInstalls = "<td><div title=\""
                + vsmpDom[i]["ReviewsAsPercentageOfInstalls"] + "\">"
                + numericReviewsAsPercentageOfInstalls.toLocaleString() + "</div></td>";

            var colPublisher = "<td>"
                + "<a href=\""
                + "https://marketplace.visualstudio.com/search?term=publisher%3A%22"
                + vsmpDom[i]["Publisher"]
                + "%22&target=VS&sortBy=Relevance"
                + "\" target=\"_blank\">"
                + vsmpDom[i]["Publisher"]
                + "</a></td>";
            
            var colPriceLower = vsmpDom[i]["Price"].toLowerCase();
            var colPrice = "<td>"
                + colPriceLower.charAt(0).toUpperCase()
                + colPriceLower.slice(1)
                + "</td>";

            var colAverageReview = "<td>" + vsmpDom[i]["AverageReview"] + "</td>";

            $("#DetailGridTableBody").append(
                rowOpen +
                colInstallCount +
                colItemTitle +
                colReviewCount +
                colReviewsAsPercentageOfInstalls +
                colPublisher +
                colPrice +
                colAverageReview +
                rowClose);
        }

        document.getElementById('TotalInstallCount').innerHTML = totalInstallCount.toLocaleString();
        document.getElementById('TotalReviewCount').innerHTML = totalReviewCount.toLocaleString();
        document.getElementById('GridTotalInstallCount').innerHTML = totalInstallCount.toLocaleString();
        document.getElementById('GridTotalReviewCount').innerHTML = totalReviewCount.toLocaleString();

        var totalReviewsAsPercentageOfTotalInstalls = (totalReviewCount / totalInstallCount) * 100;//gregt divide by zero ! //gregt dedupe
        document.getElementById('TotalReviewsAsPercentageOfTotalInstalls').innerHTML = totalReviewsAsPercentageOfTotalInstalls.toLocaleString();

        //Enable table sorting
        $(document).ready(function () {
            $("#DetailGridTable").tablesorter();

        }); 

    }
});
