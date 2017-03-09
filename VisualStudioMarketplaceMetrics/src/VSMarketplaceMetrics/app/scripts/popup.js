//bug - go to home, then vsts, then home (so vsts tab is still selected), page action says nil data !
//try catch 
//capture console errors into pre-populated email
//defer javascript loading
//TODO dedupe this


//email hyperlink styling
//add github issues to email link section
//when hitting help question mark, dont scroll to the top !
//create DataUnavailable.VisualStudioMarketplaceMetrics@gmail.com
//cdn for jquery, with a fallback
//use strict
//jslint



$(function () {

    try {
        var a = b.c;
    } catch (e) {
        document.getElementById('errorOccuredPage').removeAttribute("hidden");
        $('.ajaxLoader').hide();//TODO dedupe this
    }
    

    console.image("http://i.imgur.com/oGiMR.gif"); //gregt upload my image to imgur.com

    onLoadRequestDomFromVsmp();

    function onLoadRequestDomFromVsmp() {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { action: "requestDomFromVsmmPopUp" },
                    popUpCallBack
                    );
            });
    };

    function popUpCallBack(vsmpDom) {

        if (vsmpDom.length == 0) {
            document.getElementById('nilSearchResults').removeAttribute("hidden");
        }
        else {
            ProcessVsmpDom();
        }

        $('.ajaxLoader').hide();//TODO dedupe this

        function ProcessVsmpDom() {

            if (vsmpDom[0]["URL"] == "notAllowed") {
                ShowDataUnavailableMessage();
            }
            else {
                ShowDataTable();
            }

            //Enable table sorting
            $(document).ready(function () {
                $("#DetailGridTable").tablesorter();
            });

            function ShowDataUnavailableMessage() {

                document.getElementById('PageUrl').innerHTML = "Page url: " + vsmpDom[0]["PageUrl"];
                document.getElementById('UserAgent').innerHTML = "Browser version: " + vsmpDom[0]["UserAgent"];
                document.getElementById('dataUnavailableForPage').removeAttribute("hidden");
            };

            function ShowDataTable() {

                var totalInstallCount = 0;
                var totalReviewCount = 0;
                var numericAverageReviewSum = 0;

                for (var i = 0; i < vsmpDom.length; i++) {
                    AddRowsToTable(i);
                }

                SetHeadersAndFooters();

                document.getElementById('dataAvailable').removeAttribute("hidden");

                function AddRowsToTable(i) {

                    var rowOpen = "<tr>";
                    var rowClose = "</tr>";

                    var numericInstallCount = parseInt(vsmpDom[i]["InstallCount"]);
                    var numericReviewCount = parseInt(vsmpDom[i]["ReviewCount"]);
                    var numericReviewsAsPercentageOfInstalls = (numericReviewCount / numericInstallCount) * 100;
                    var numericAverageReview = parseInt(vsmpDom[i]["AverageReview"]);

                    totalInstallCount += numericInstallCount;
                    totalReviewCount += numericReviewCount;
                    numericAverageReviewSum += numericAverageReview;

                    var colInstallCount = "<td class='numeric'>" + numericInstallCount + "</td>";

                    var colItemTitle = "<td>"
                        + "<div title=\"" + vsmpDom[i]["FullDescription"] + "\">"
                        + "<a href=\"" + vsmpDom[i]["URL"] + "\" target=\"_blank\">"
                        + "<img src=\"" + vsmpDom[i]["Icon"] + "\" style=\"width: 18%; height: 18%;\">"
                        + "&nbsp;"
                        + vsmpDom[i]["ItemTitle"]
                        + "</a></div></td>";

                    var colReviewCount = "<td class='numeric'>" + numericReviewCount + "</td>";

                    var colReviewsAsPercentageOfInstalls = "<td class='numeric'><div title=\""
                       + numericReviewsAsPercentageOfInstalls.toFixed(9) + "\">"
                       + numericReviewsAsPercentageOfInstalls.toFixed(2) + "</div></td>";

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

                    var colAverageReview = "<td class='numeric'>" + vsmpDom[i]["AverageReview"] + "</td>";

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
                };

                function SetHeadersAndFooters() {

                    var totalExtensionsCount = vsmpDom.length;
                    var totalReviewsAsPercentageOfTotalInstalls = (totalReviewCount / totalInstallCount) * 100;
                    var overallAverageReview = (numericAverageReviewSum / totalExtensionsCount);
                    var totalOverallAverageReview = overallAverageReview.toFixed(2).toLocaleString();

                    var totalExtensionsCountSuffix = "";
                    if (totalExtensionsCount != 1) {
                        totalExtensionsCountSuffix = "s";
                    };
                    document.getElementById('TotalExtensionsCount').innerHTML = totalExtensionsCount.toLocaleString() + " extension" + totalExtensionsCountSuffix;

                    var totalInstallCountSuffix = "";
                    if (totalInstallCount != 1) {
                        totalInstallCountSuffix = "s";
                    };
                    document.getElementById('TotalInstallCount').innerHTML = totalInstallCount.toLocaleString() + " install" + totalInstallCountSuffix;

                    var totalReviewCountSuffix = "";
                    if (totalReviewCount != 1) {
                        totalReviewCountSuffix = "s";
                    };
                    document.getElementById('TotalReviewCount').innerHTML = totalReviewCount.toLocaleString() + " review" + totalReviewCountSuffix;

                    if (totalReviewsAsPercentageOfTotalInstalls > 0) {
                        document.getElementById('TotalReviewCount').innerHTML += " ("
                        + totalReviewsAsPercentageOfTotalInstalls.toFixed(3).toLocaleString()
                        + "% of installations)";
                    };
                    document.getElementById('TotalReviewCount').title = totalReviewCount + " divided by " + totalInstallCount;
                    if (totalReviewCount > 0) {
                        document.getElementById('TotalOverallAverageReview').removeAttribute("hidden");
                        document.getElementById('TotalOverallAverageReview').innerHTML = totalOverallAverageReview + " average review score";
                    };

                    document.getElementById('FooterGridTotalInstallCount').innerHTML = totalInstallCount.toLocaleString();
                    document.getElementById('FooterGridTotalReviewCount').innerHTML = totalReviewCount.toLocaleString();
                    document.getElementById('FooterReviewsAsPercentageOfInstalls').innerHTML = totalReviewsAsPercentageOfTotalInstalls.toFixed(2).toLocaleString();
                    document.getElementById('FooterOverallAverageReview').innerHTML = totalOverallAverageReview;
                };

            };

        };


    }

    $('#DataUnavailableEmail').click(function (e) {
        var mailto = "support.vsmarketplacemetrics@gmail.com";
        var subject = "VS Marketplace Metrics Data Unavailable Page";
        var userAgent = navigator.userAgent;//TODO dedupe
        var pageUrl = window.location.href;//TODO dedupe
        var body = "User agent: " + userAgent +
                   "\n" + "\n" +
                   "Page url: " + pageUrl;
        var emailUrl = encodeURI("mailto:" + mailto + "?subject=" + subject + "&body=" + body);
        chrome.tabs.create({ url: emailUrl }, function (tab) {
            setTimeout(function () {
                chrome.tabs.remove(tab.id);//gregt mailto tab not auto-closing
            }
            , 500
           );
        });
    });

    $('#VisualStudioHelpIcon').click(function (e) {
        var elem = document.getElementById('VisualStudioHelpText')
        var hdn = elem.getAttribute("hidden");
        if (hdn == null) {
            elem.setAttribute("hidden", "hidden");
        }
        else {
            elem.removeAttribute("hidden");
        }
    });

    $('#CopyToClipboard').click(function (e) {
        var element = document.getElementById('ClipboardBuffer');

        var body = document.body, range, sel;

        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(element);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(element);
                sel.addRange(range);
            }
        } else {
            if (body.createTextRange) {
                range = body.createTextRange();
                range.moveToElementText(element);
                range.select();
            }
        }

        document.execCommand('copy');

        document.getSelection().removeAllRanges();
    });

});
