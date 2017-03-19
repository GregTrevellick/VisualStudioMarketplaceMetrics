//$(function () {
   
    InitialiseGoogleAnalytics();
    var useChrome = false;
    var userLanguageSelected = GetLocaleBySource(); 
    latestError = GetTranslation("VsmmUninitialised");
    try {
        console.log(GetTranslation("VsmmThankYouForUsing"));
        console.image("http://i.imgur.com/NfNVskCl.png");
    } catch (e) {
        //Do nothing - doesn't matter if it failed
    }
    //////document.getElementById('PopUpTitle').innerHTML = GetTranslation("VsmmTitle_Page");
    onLoadRequestDomFromVsmp();

    function InitialiseGoogleAnalytics() {
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-93512771-1']);
        _gaq.push(['_trackPageview']);
        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = 'https://ssl.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    }

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

        try {

            document.getElementById('VisualStudioHelpText').innerHTML = GetTranslation("VsmmVisualStudioHelpText") + ".";

            if (vsmpDom.length == 0) {
                document.getElementById('NilSearchResultsInner').innerHTML = GetTranslation("VsmmNilSearchResultsText") + ".";
                document.getElementById('SlowerConnections').innerHTML = GetTranslation("VsmmOnSlowerConnectionsText") + ".";
                document.getElementById('nilSearchResults').removeAttribute("hidden");
            }
            else {
                ProcessVsmpDom();
            }

            HideSpinner();

            function ProcessVsmpDom() {
                vsmpDomPageUrl = vsmpDom[0]["PageUrl"];
                //dummyError = b.c;
           
                if (vsmpDom[0]["URL"] == "errorOccurred") {
                    throw vsmpDom[0]["Error"];
                };

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

                    //gregt dedupe
                    document.getElementById('errorOccuredPagePlease').innerHTML = GetTranslation("VsmmPleaseClick");
                    document.getElementById('dataUnavailableForPagePlease').innerHTML = GetTranslation("VsmmIfYouSuspectSeeingIncorrectlyText") + " ";
                    document.getElementById('DataUnavailableEmail').innerHTML = GetTranslation("VsmmHere");
                    document.getElementById('toNotifyAuthor').innerHTML = GetTranslation("VsmmToNotifyAuthorText") + ":";
                    //

                    //////document.getElementById('dataUnavailableForPageTextInner').innerHTML = GetTranslation("VsmmDataUnavailableForPageText") + ".";
                    document.getElementById('PageUrl').innerHTML = vsmpDomPageUrl;
                    document.getElementById('UserAgent').innerHTML = GetUserAgent();
                    document.getElementById('Locale').innerHTML = GetChromeLocale();
                    document.getElementById('dataUnavailableForPage').removeAttribute("hidden");
                    document.getElementById('dataUnavailableForPagePlease').removeAttribute("hidden");
                    document.getElementById('notificationItems').removeAttribute("hidden");                   
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

                        var numericReviewsAsPercentageOfInstalls = 0;
                        if (numericInstallCount > 0)
                        {
                            numericReviewsAsPercentageOfInstalls = (numericReviewCount / numericInstallCount) * 100;
                        }
                        
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

                        if (vsmpDom[i]["Price"] == undefined) {
                            var colPrice = "<td>" + GetTranslation("VsmmUnknown") + "</td>";
                        }
                        else {
                            var colPriceLower = vsmpDom[i]["Price"].toLowerCase();
                            var colPrice = "<td>"
                            + colPriceLower.charAt(0).toUpperCase()
                            + colPriceLower.slice(1)
                            + "</td>";
                        }

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

                        document.getElementById('CopyToClipboard').innerHTML = GetTranslation("VsmmCopyTableToClipboard");
                        //////////////////////document.getElementById('GridHeaderNoOfInstalls').innerHTML = GetTranslation("VsmmNoOfInstalls");
                        //////////////////document.getElementById('GridHeaderTitle').innerHTML = GetTranslation("VsmmTitle_Grid");
                        //////////////////document.getElementById('GridHeaderNoOfReviews').innerHTML = GetTranslation("VsmmNoOfReviews");
                        //////////////////document.getElementById('GridHeaderReviewsAsPercentageOfInstalls').innerHTML = GetTranslation("VsmmReviewsAsPercentageOfInstalls");
                        //////////////////document.getElementById('GridHeaderPublisher').innerHTML = GetTranslation("VsmmPublisher");
                        //////////////////document.getElementById('GridHeaderPrice').innerHTML = GetTranslation("VsmmPrice");
                        //////////////////document.getElementById('GridHeaderAverageReviewScore').innerHTML = GetTranslation("VsmmAverageReviewScore");

                        var totalExtensionsCount = vsmpDom.length;
                        var totalReviewsAsPercentageOfTotalInstalls = 0;
                        if (totalInstallCount > 0) {
                            totalReviewsAsPercentageOfTotalInstalls = (totalReviewCount / totalInstallCount) * 100;
                        }
                        
                        var overallAverageReview = (numericAverageReviewSum / totalExtensionsCount);
                        var totalOverallAverageReview = overallAverageReview.toFixed(2).toLocaleString();

                        if (totalExtensionsCount != 1) {
                            extensionIl8n = GetTranslation("VsmmExtensions");
                        } else {
                            extensionIl8n = GetTranslation("VsmmExtension");
                        };
                        document.getElementById('TotalExtensionsCount').innerHTML = totalExtensionsCount.toLocaleString() + " " + extensionIl8n + " " + GetTranslation("VsmmShown");

                        if (totalInstallCount != 1) {
                            installIl8n = GetTranslation("VsmmInstalls");
                        } else {
                            installIl8n = GetTranslation("VsmmInstall");
                        };
                        document.getElementById('TotalInstallCount').innerHTML = totalInstallCount.toLocaleString() + " " + installIl8n;

                        if (totalReviewCount != 1) {
                            reviewIl8n = GetTranslation("VsmmReviews");
                        } else {
                            reviewIl8n = GetTranslation("VsmmReview");
                        };
                        document.getElementById('TotalReviewCount').innerHTML = totalReviewCount.toLocaleString() + " " + reviewIl8n;

                        if (totalReviewsAsPercentageOfTotalInstalls > 0) {
                            document.getElementById('TotalReviewCount').innerHTML += " ("
                            + totalReviewsAsPercentageOfTotalInstalls.toFixed(3).toLocaleString()
                            + GetTranslation("VsmmPercentageOfInstallations")
                            + ")";
                        };
                        document.getElementById('TotalReviewCount').title = totalReviewCount + " " + GetTranslation("VsmmDividedBy") + " " + totalInstallCount;
                        if (totalReviewCount > 0) {
                            document.getElementById('TotalOverallAverageReview').removeAttribute("hidden");
                            document.getElementById('TotalOverallAverageReview').innerHTML = totalOverallAverageReview + " " + GetTranslation("VsmmAverageReviewScore_Lower");
                        };

                        document.getElementById('FooterGridTotalInstallCount').innerHTML = totalInstallCount.toLocaleString();
                        document.getElementById('FooterGridTotalReviewCount').innerHTML = totalReviewCount.toLocaleString();
                        document.getElementById('FooterReviewsAsPercentageOfInstalls').innerHTML = totalReviewsAsPercentageOfTotalInstalls.toFixed(2).toLocaleString();
                        document.getElementById('FooterOverallAverageReview').innerHTML = totalOverallAverageReview;
                    };

                };
            }
        } catch (e) {
            CommonErrorHandler(e);
        }
    };

    $('#DataUnavailableEmail').click(function (e) {
        try {
            var mailto = "vsmarketplacemetrics@gmail.com";
            var subject = GetTranslation("VsmmFeedbackEmailSubject");
            var body = GetUserAgent() +
                       "\n" + "\n" +
                       GetPageUrl() +
                       "\n" + "\n" +
                       GetChromeLocale() +
                       "\n" + "\n" +
                       GetJavascriptError();
            var emailUrl = encodeURI("mailto:" + mailto + "?subject=" + subject + "&body=" + body);
            chrome.tabs.create({ url: emailUrl }, function (tab) {
                setTimeout(function () {
                    chrome.tabs.remove(tab.id);
                }
                , 500
               );
            });
        } catch (e) {
            CommonErrorHandler(e);
        }
    });

    $('#VisualStudioHelpIcon').click(function (e) {
        try {
            var elem = document.getElementById('VisualStudioHelpText')
            var hdn = elem.getAttribute("hidden");
            if (hdn == null) {
                elem.setAttribute("hidden", "hidden");
            }
            else {
                elem.removeAttribute("hidden");
            };
        } catch (e) {
            CommonErrorHandler(e);
        }
    });

    $('#CopyToClipboard').click(function (e) {

        try {
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
            };
            document.execCommand('copy');
            document.getSelection().removeAllRanges();
        } catch (e) {
            CommonErrorHandler(e);
        }
    });

    //gregt to be deleted
    ////gregt eliminate this function & the '#UserLanguageSelection' id too ?
    //$('#UserLanguageSelection').change(function (e) {
    //    try {
    //        var element = document.getElementById("UserLanguageSelection");
    //        userLanguageSelected = element.options[element.selectedIndex].value;
    //        //  RELOAD THE SCREEN (or labels at least)
    //    } catch (e) {
    //        CommonErrorHandler(e);
    //    }
    //});

    function CommonErrorHandler(e) {
        try {
            if (e != undefined) {
                if (e.stack != undefined) {
                    latestError = e.stack;
                }
                else {
                    latestError = e;
                }
            }

            //gregt dedupe
            document.getElementById('errorOccuredPagePlease').innerHTML = GetTranslation("VsmmPleaseClick");
            document.getElementById('dataUnavailableForPagePlease').innerHTML = GetTranslation("VsmmIfYouSuspectSeeingIncorrectlyText") + " ";
            document.getElementById('DataUnavailableEmail').innerHTML = GetTranslation("VsmmHere");
            document.getElementById('toNotifyAuthor').innerHTML = GetTranslation("VsmmToNotifyAuthor");
            //
            document.getElementById('errorOccuredPageTextInner').innerHTML = GetTranslation("VsmmErrorOccuredPageText") + ".";
            document.getElementById('PageUrl').innerHTML = GetPageUrl();
            document.getElementById('UserAgent').innerHTML = GetUserAgent();
            document.getElementById('Locale').innerHTML = GetChromeLocale();
            document.getElementById('JavaScriptErrorText').innerHTML = GetJavascriptError(e);
            document.getElementById('errorOccuredPage').removeAttribute("hidden");
            document.getElementById('errorOccuredPagePlease').removeAttribute("hidden");
            document.getElementById('notificationItems').removeAttribute("hidden");
            document.getElementById('JavaScriptErrorText').removeAttribute("hidden");

            HideSpinner();
        } catch (e) {
            console.log(e);
            console.log("A serious error occured within the Visual Studio Marketplace Metrics extension. Please re-try at your convenience.");
        }
    }

    function HideSpinner() {
        $('.ajaxLoader').hide();
    }

    function GetUserAgent() {
        return navigator.userAgent;
    }

    function GetPageUrl() {
        if (vsmpDomPageUrl != undefined) {
            return vsmpDomPageUrl;
        } else {
            return "";
        };
    }

    function GetJavascriptError(e) {
        if (e != undefined) {
            if (e.stack != undefined) {
                return e.stack;
            }
            else {
                return e;
            }
        } else {
            if (latestError != undefined) {
                return latestError;
            } else {
                return "Indeterminate error";
            }
        };
    }

//});

function GetLocaleBySource() {
    if (useChrome) {
        return GetChromeLocale();
    }
    else {
        return GetUiSelectedLocale();
    }

    function GetUiSelectedLocale() {
        if (typeof userLanguageSelected == "undefined") {
            //gregt todo handle this scenario i.e. first time into the popup the DDL value hasn't been picked, so default the DDL to the browser prefered language, and then this "if" clause should not be required, but retain it just-in-case (albeit it returning "en" not "de")
            return "de";
        }
        else {
            return userLanguageSelected;
        }
    }
}

function GetChromeLocale() { //gregt move inside 'GetLocaleBySource'
    var locale = chrome.i18n.getMessage("@@ui_locale");
    return locale;
}

function GetTranslation(textKey) {

    var result = "";
    var locale = GetLocaleBySource();

    if (useChrome == true) {
        result = GetTranslationForChromeLocale(textKey);
    }
    else {
        result = GetTranslationForUiSelectedLocale(textKey, locale);
    }

    if (typeof result == "undefined" || result == "") {
        console.log("Missing VSMM translation=" + textKey + " Locale=" + locale + " UseChrome=" + useChrome);
        return "###" + textKey + "###";
    } else {
        return result;
    }

    function GetTranslationForChromeLocale(textKey) {
        var result = chrome.i18n.getMessage(textKey);
        return result;
    }

    function GetTranslationForUiSelectedLocale(textKey, locale) {

        var messages;
        var result;
        if (typeof messages == "undefined") {
            $.ajax({
                url: "/_locales/" + locale + "/messages.json",
                async: false,
                success: function (data) {
                    messages = JSON.parse(data);
                    result = messages[textKey].message;
                }
                //,error: GREG-TODO e.g. result = "ajax error";in caller check for this & show opps message
            });
        }

        return result;
    }
}
