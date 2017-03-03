//Set up the active tab to listen to for messages from popup.js 
chrome.runtime.onMessage.addListener(

    function (request, sender, popUpCallBackFn) {

        

        if (request.action === "requestDomFromVsmpPopUp") {

            //YES
            //https://marketplace.visualstudio.com/manage
            //NO
            //https://marketplace.visualstudio.com/subscriptions

            var typ = "";
            var href = window.location.href;
            switch (href) {
                case "http://marketplace.visualstudio.com/":
                case "https://marketplace.visualstudio.com/":
                    typ = "browse_Root";
                    break;
                case "http://marketplace.visualstudio.com/vs":
                case "https://marketplace.visualstudio.com/vs":
                    typ = "browse_VS";
                    break;
                case "http://marketplace.visualstudio.com/vsts":
                case "https://marketplace.visualstudio.com/vsts":
                    typ = "browse_VSTS";
                    break;
                case "http://marketplace.visualstudio.com/vscode":
                case "https://marketplace.visualstudio.com/vscode":
                    typ = "browse_VSCode";
                    break;
                default:
                    if (href.indexOf("marketplace.visualstudio.com/search") != -1) {
                        if (href.indexOf("&target=VS&") != -1) {
                            typ = "search_VS";
                        }
                        else {
                            if (href.indexOf("&target=VSCode&") != -1) {
                                typ = "search_VSCode";
                            }
                            else {
                                if (href.indexOf("&target=VSTS&") != -1) {
                                    typ = "search_VSTS";
                                }
                            }
                        }
                    }
                    break;
            }
            
            var vsmpDomJsonDataArray = new Array();

            if (typ == "search_VS" ||
                typ == "search_VSCode")
            {
                $("[class^=grid-item]").each(function () {
                    var installCountRounded = $(this).find('.install-count')[0].innerText;
                    var installCount = installCountRounded.replace("M", "000000").replace("K", "000").replace(".", "");//gregt 1.9M is not 19000000
                    var icon = $(this).find('.item-icon')[0].src;
                    var itemTitle = $(this).find('.item-title')[0].innerText;
                    var reviewTitle = $(this).find('.rating')[0].title;
                    var startReview = reviewTitle.indexOf('(') + 1;
                    var endReview = reviewTitle.indexOf(' ', startReview);
                    var reviewCount = reviewTitle.substring(startReview, endReview);
                    var publisher = $(this).find('.publisher')[0].innerText;
                    var price = $(this).find('.pricing-tag')[0].innerText;
                    var averageReviewFull = $(this).find('.rating')[0].title;
                    var averageReviewSplit = averageReviewFull.replace(" ", "").split(":");
                    var averageReviewNumberPlus = averageReviewSplit[1].split("(");
                    var averageReview = averageReviewNumberPlus[0];
                    var fullDescription = $(this).find('.description')[0].innerText;
                    var url = $(this).find('.gallery-item-card-container')[0].href;
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
                    };
                    vsmpDomJsonDataArray.push(vsmpDomJsonData);
                });
            }

            if (typ == "browse_Root" ||
                typ == "browse_VS" ||
                typ == "browse_VSTS" ||
                typ == "browse_VSCode" ||
                typ == "search_VSTS")
            {
                $("[class^=gallery-item-card]").each(function () {
                    var installCountRounded = $(this).find('.install-count')[0].innerText;
                    var installCount = installCountRounded.replace("M", "000000").replace("K", "000").replace(".", "");//gregt 1.9M is not 19000000
                    var icon = $(this).find('.item-icon')[0].src;
                    var itemTitle = $(this).find('.item-title')[0].innerText;
                    var reviewTitle = $(this).find('.rating')[0].title;
                    var startReview = reviewTitle.indexOf('(') + 1;
                    var endReview = reviewTitle.indexOf(' ', startReview);
                    var reviewCount = reviewTitle.substring(startReview, endReview);
                    var publisher = $(this).find('.publisher')[0].innerText;
                    var price = $(this).find('.pricing-tag')[0].innerText;
                    var averageReviewFull = $(this).find('.rating')[0].title;
                    var averageReviewSplit = averageReviewFull.replace(" ", "").split(":");
                    var averageReviewNumberPlus = averageReviewSplit[1].split("(");
                    var averageReview = averageReviewNumberPlus[0];
                    var fullDescription = $(this).find('.icon-cell')[0].title;
                    var url = "asadssa";//$(this).find('.gallery-item-card-container')[0].href;
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
                    };
                    vsmpDomJsonDataArray.push(vsmpDomJsonData);
                });
            }          

            // Call the specified callback
            popUpCallBackFn(vsmpDomJsonDataArray);
        }
    }
);

chrome.runtime.sendMessage({ action: "openPopUp" });