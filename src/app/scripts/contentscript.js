chrome.runtime.onMessage.addListener(

    function (request, sender, popUpCallBackFn) {

        //////////////////////console.log("contentScriptJs_entry point");

        if (request.action === "requestDomFromVsmmPopUp") {

            ///////////////////////////console.log("contentScriptJs_request action is requestDomFromVsmmPopUp");

            var vsmpDomJsonDataArray = new Array();
            var pageUrl = window.location.href;

            try {
                //dummyError = y.z;
                var visitType = GetVisitType(pageUrl);
                var vsmpDomSelector = GetVsmpDomSelector(visitType);
                var vsmpDomParentSelector = GetVsmpDomParentSelector(visitType);

                if (vsmpDomSelector != "") {

                    $(vsmpDomSelector).each(function () {

                        var thisTabSource = $(this).parent().parent()[0].id;

                        if (thisTabSource.startsWith(vsmpDomParentSelector)) {

                            PopulateJsonArrayFromDom($(this));

                            function PopulateJsonArrayFromDom(vsmpExtn) {

                                var installCount = 0;
                                var domInstallCount = vsmpExtn.find('.install-count')[0];
                                if (typeof domInstallCount != "undefined") {
                                    //Avoids issues if an extension has zero downloads
                                    var installCountRounded = domInstallCount.innerText;
                                    installCount = GetInstallCount(installCountRounded);
                                }

                                var icon = vsmpExtn.find('.item-icon')[0].src;
                                var itemTitle = vsmpExtn.find('.item-title')[0].innerText;
                                var reviewTitle = vsmpExtn.find('.rating')[0].title;
                                var startReview = reviewTitle.indexOf('(') + 1;
                                var endReview = reviewTitle.indexOf(' ', startReview);
                                var reviewCount = reviewTitle.substring(startReview, endReview);
                                var publisher = vsmpExtn.find('.publisher')[0].innerText;
                                var price = vsmpExtn.find('.pricing-tag')[0].innerText;
                                var averageReviewFull = vsmpExtn.find('.rating')[0].title;
                                var averageReviewSplit = averageReviewFull.replace(" ", "").split(":");
                                var averageReviewNumberPlus = averageReviewSplit[1].split("(");
                                var averageReview = averageReviewNumberPlus[0].trim();

                                if (visitType == "search_VS" ||
                                    visitType == "search_VSCode") {
                                    $(vsmpDomSelector).each(function () {
                                        fullDescription = vsmpExtn.find('.description')[0].innerText;
                                        url = vsmpExtn.find('.gallery-item-card-container')[0].href;
                                    });
                                }

                                if (visitType == "browse_Root" ||
                                    visitType == "browse_VS" ||
                                    visitType == "browse_VSTS" ||
                                    visitType == "browse_VSCode" ||
                                    visitType == "search_VSTS") {
                                    $(vsmpDomSelector).each(function () {
                                        fullDescription = vsmpExtn.find('.icon-cell')[0].title;
                                        url = vsmpExtn.find('.gallery-item-card-container').href;
                                    });
                                }

                                var vsmpDomJsonData =
                                        {
                                            InstallCount: installCount,
                                            Icon: icon,
                                            ItemTitle: itemTitle,
                                            ReviewCount: reviewCount,
                                            Publisher: publisher,
                                            Price: price,
                                            AverageReview: averageReview,
                                            FullDescription: fullDescription,
                                            URL: url,
                                            PageUrl: pageUrl
                                        };

                                vsmpDomJsonDataArray.push(vsmpDomJsonData);
                            }

                        };

                    });
                }

                if (visitType == "" || visitType == "notAllowed") {
                    var vsmpDomJsonData =
                        {
                            PageUrl: pageUrl,
                            URL: "notAllowed"
                        };
                    vsmpDomJsonDataArray.push(vsmpDomJsonData);
                }

                // Call the specified callback
                //////////////////console.log("contentScriptJs_about to call pop up call back function");
                ////////////globalvsmpDom = vsmpDom;

                popUpCallBackFn(vsmpDomJsonDataArray);

                function GetVisitType(pageUrl) {

                    var visitType = "";

                    switch (pageUrl) {
                        case "http://marketplace.visualstudio.com/":
                        case "https://marketplace.visualstudio.com/":
                            visitType = "browse_Root";
                            break;
                        case "http://marketplace.visualstudio.com/vs":
                        case "https://marketplace.visualstudio.com/vs":
                            visitType = "browse_VS";
                            break;
                        case "http://marketplace.visualstudio.com/vsts":
                        case "https://marketplace.visualstudio.com/vsts":
                            visitType = "browse_VSTS";
                            break;
                        case "http://marketplace.visualstudio.com/vscode":
                        case "https://marketplace.visualstudio.com/vscode":
                            visitType = "browse_VSCode";
                            break;
                        default:

                            if (pageUrl.indexOf("marketplace.visualstudio.com/search") != -1) {
                                if (pageUrl.indexOf("target=VS&") != -1) {
                                    visitType = "search_VS";
                                }
                                else {
                                    if (pageUrl.indexOf("target=VSCode&") != -1) {
                                        visitType = "search_VSCode";
                                    }
                                    else {
                                        if (pageUrl.indexOf("target=VSTS&") != -1) {
                                            visitType = "search_VSTS";
                                        }
                                    }
                                }
                            }
                            else {
                                if (pageUrl.indexOf("marketplace.visualstudio.com/manage") != -1
                                 || pageUrl.indexOf("marketplace.visualstudio.com/subscriptions") != -1
                                 || pageUrl.indexOf("marketplace.visualstudio.com/items?itemName=") != -1) {
                                    visitType = "notAllowed";
                                }
                            }
                            break;
                    }
                    return visitType;
                }

                function GetVsmpDomSelector(visitType) {

                    var vsmpDomSelector = "";
                    if (visitType == "search_VS" ||
                        visitType == "search_VSCode" ||
                        visitType == "search_VSTS") {
                        vsmpDomSelector = "[class^=grid-item]";
                    }
                    else {
                        if (visitType == "browse_Root" ||
                            visitType == "browse_VS" ||
                            visitType == "browse_VSTS" ||
                            visitType == "browse_VSCode") {
                            vsmpDomSelector = "[class^=gallery-item-card-container]";
                        }
                    }
                    return vsmpDomSelector;
                }

                function GetVsmpDomParentSelector(visitType) {

                    var vsmpDomParentSelector = "";
                    if (visitType == "browse_Root" ||
                        visitType == "browse_VS") {
                        vsmpDomParentSelector = "vs_";
                    }
                    else {
                        if (visitType == "browse_VSTS") {
                            vsmpDomParentSelector = "vsts_";
                        }
                        else {
                            if (visitType == "browse_VSCode") {
                                vsmpDomParentSelector = "vscode_";
                            }
                        }
                    }                 

                    //Cater for user clicks vsts tab, then vscode tab or user clicks vsts tab, then home icon (vsts tab is the highlighted tab)
                    if ($(vsmpDomParentSelector).length == 0) {
                        if ($("[id^=vsts_]").length &&
                            (visitType == "browse_VSTS" || visitType == "browse_Root")) {
                            vsmpDomParentSelector = "vsts_";
                        }
                        else {
                            if ($("[id^=vscode_]").length &&
                                (visitType == "browse_VSCode" || visitType == "browse_Root")) {
                                vsmpDomParentSelector = "vscode_";
                            }
                        }
                    }

                    return vsmpDomParentSelector;
                }

            } catch (e) {
                var vsmpDomJsonData =
                    {
                        PageUrl: pageUrl,
                        URL: "errorOccurred",
                        Error: e.stack
                    };
                vsmpDomJsonDataArray.push(vsmpDomJsonData);
                popUpCallBackFn(vsmpDomJsonDataArray);
            }
        }
    });

chrome.runtime.sendMessage({ action: "openPopUp" });

try {
    console.log(GetTranslation("VsmmThankYouForUsing"));
    console.image("http://i.imgur.com/NfNVskCl.png");
} catch (e) {
    //Doesn't matter if it failed
}

function GetInstallCount(installCountRounded) {

    if (installCountRounded.indexOf("M") != -1) {
        if (installCountRounded.indexOf(".") != -1) { //e.g. "4.8M"
            return installCountRounded.replace(".", "").replace("M", "00000");
        }
        else { //e.g. "4M"
            return installCountRounded.replace("M", "000000");
        }
    }
    else {
        if (installCountRounded.indexOf("K") != -1) {
            if (installCountRounded.indexOf(".") != -1) { //e.g. "4.8K"
                return installCountRounded.replace(".", "").replace("K", "00");
            }
            else { //e.g. "4K"
                return installCountRounded.replace("K", "000");
            }
        }
        else {
            return installCountRounded;
        }
    }
};