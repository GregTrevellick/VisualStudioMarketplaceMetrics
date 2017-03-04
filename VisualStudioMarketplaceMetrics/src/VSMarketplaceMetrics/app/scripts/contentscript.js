//Set up the active tab to listen to for messages from popup.js 
chrome.runtime.onMessage.addListener(

    function (request, sender, popUpCallBackFn) {

        if (request.action === "requestDomFromVsmmPopUp") {

            var visitType = "";
            var href = window.location.href;

            switch (href) {
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
                    if (href.indexOf("marketplace.visualstudio.com/search") != -1) {
                        if (href.indexOf("&target=VS&") != -1) {
                            visitType = "search_VS";
                        }
                        else {
                            if (href.indexOf("&target=VSCode&") != -1) {
                                visitType = "search_VSCode";
                            }
                            else {
                                if (href.indexOf("&target=VSTS&") != -1) {
                                    visitType = "search_VSTS";
                                }
                            }
                        }
                    }
                    else {
                        if (href.indexOf("marketplace.visualstudio.com/manage") != -1
                         || href.indexOf("marketplace.visualstudio.com/subscriptions") != -1
                         || href.indexOf("marketplace.visualstudio.com/items?itemName=") != -1) {
                            visitType = "notAllowed";
                        }
                    }
                    break;
            }

            var vsmpDomJsonDataArray = new Array();



            var vsmpDomSelector = "";
            if (visitType == "search_VS" || visitType == "search_VSCode") {
                vsmpDomSelector = "[class^=grid-item]";
            }
            else {
                if (visitType == "browse_Root" ||
                    visitType == "browse_VS" ||
                    visitType == "browse_VSTS" ||
                    visitType == "browse_VSCode" ||
                    visitType == "search_VSTS") {
                    vsmpDomSelector = "[class^=gallery-item-card]";
                }
            }
                

            if (vsmpDomSelector != "") {

                $(vsmpDomSelector).each(function () {
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

                    if (visitType == "search_VS" ||
                        visitType == "search_VSCode") {
                        $(vsmpDomSelector).each(function () {
                            fullDescription = $(this).find('.description')[0].innerText;
                            url = $(this).find('.gallery-item-card-container')[0].href;
                            //var vsmpDomJsonData =
                            //{
                            //    InstallCount: installCount,
                            //    Icon: icon,
                            //    ItemTitle: itemTitle,
                            //    ReviewCount: reviewCount,
                            //    Publisher: publisher,
                            //    Price: price,
                            //    AverageReview: averageReview,
                            //    FullDescription: fullDescription,
                            //    URL: url,
                            //};
                            //vsmpDomJsonDataArray.push(vsmpDomJsonData);
                        });
                    }

                    if (visitType == "browse_Root" ||
                        visitType == "browse_VS" ||
                        visitType == "browse_VSTS" ||
                        visitType == "browse_VSCode" ||
                        visitType == "search_VSTS") {
                        $(vsmpDomSelector).each(function () {
                            fullDescription = $(this).find('.icon-cell')[0].title;
                            url = $(this).find('.gallery-item-card-container').href;
                            //var vsmpDomJsonData =
                            //{
                            //    InstallCount: installCount,
                            //    Icon: icon,
                            //    ItemTitle: itemTitle,
                            //    ReviewCount: reviewCount,
                            //    Publisher: publisher,
                            //    Price: price,
                            //    AverageReview: averageReview,
                            //    FullDescription: fullDescription,
                            //    URL: url,
                            //};
                            //vsmpDomJsonDataArray.push(vsmpDomJsonData);
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
                            };
                    vsmpDomJsonDataArray.push(vsmpDomJsonData);
                });

                
            }




            if (visitType == "") {
                //notify gregt !!!
            }

            if (visitType == "" || visitType == "notAllowed") {
                var vsmpDomJsonData = { URL: "notAllowed" };
                vsmpDomJsonDataArray.push(vsmpDomJsonData);
            }

            // Call the specified callback
            popUpCallBackFn(vsmpDomJsonDataArray);
        }
    });

chrome.runtime.sendMessage({ action: "openPopUp" });