/// <reference path="VsmmController.js" />

InitialiseGoogleAnalytics();
var useChromeLocale = false;
var userLanguageSelected = GetLocaleBySource(); 
latestError = GetTranslation("VsmmUninitialised");
try {
    console.log(GetTranslation("VsmmThankYouForUsing"));
    console.image("http://i.imgur.com/NfNVskCl.png");
} catch (e) {
    //Do nothing - doesn't matter if it failed
}
document.getElementById('PopUpTitle').innerHTML = GetTranslation("VsmmTitle_Page");
onLoadRequestDomFromVsmp();
window.globalvsmpDom = { vdom: "" };
var myVarWatch = (function () {
    var watches = {};
    return {
        watch: function (callback) {
            var id = Math.random().toString();
            watches[id] = callback;
            // Return a function that removes the listener
            return function () {
                watches[id] = null;
                delete watches[id];
            }
        },
        trigger: function () {
            for (var k in watches) {
                watches[k](window.globalvsmpDom);
            }
        }
    }
})();

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
        {
            active: true,
            currentWindow: true
        },
        function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "requestDomFromVsmmPopUp" },
                popUpCallBack
            );
        });
};

function popUpCallBack(vsmpDom) {

    window.globalvsmpDom.vdom = vsmpDom;
    myVarWatch.trigger();

    try {
            if (vsmpDom.length == 0) {
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
                    document.getElementById('dataAvailable').removeAttribute("hidden");
                }

                //Enable table sorting
                $(document).ready(function () {
                    $("#DetailGridTable").tablesorter();
                });
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
                       GetLocaleBySource() +
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

            PopulateDataUnavailableElements();
            document.getElementById('JavaScriptErrorText').innerHTML = GetJavascriptError(e);
            document.getElementById('errorOccuredPage').removeAttribute("hidden");
            document.getElementById('errorOccuredPagePlease').removeAttribute("hidden");
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
    };

function GetLocaleBySource() {
    if (useChromeLocale) {
        return GetChromeLocale();
    }
    else {
        return GetUiSelectedLocale();
    }

    function GetChromeLocale() { 
        var locale = chrome.i18n.getMessage("@@ui_locale").substring(0, 2);

        return locale;
    }

    function GetUiSelectedLocale() {
        if (typeof userLanguageSelected == "undefined") {
            return "en";
        }
        else {
            return userLanguageSelected;
        }
    }
}

function GetTranslation(textKey) {

    var result = "";
    var locale = GetLocaleBySource();

    if (useChromeLocale) {
        result = GetTranslationForChromeLocale(textKey);
    }
    else {
        result = GetTranslationForUiSelectedLocale(textKey, locale);
    }

    if (typeof result == "undefined" || result == "") {
        console.log("Missing VSMM translation=" + textKey + " Locale=" + locale + " UseChromeLocale=" + useChromeLocale);
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
                //,error: GREGt-TODO e.g. result = "ajax error";in caller check for this & show opps message
            });
        }

        return result;
    }
}

function ShowDataUnavailableMessage() {
    PopulateDataUnavailableElements();
    document.getElementById('dataUnavailableForPage').removeAttribute("hidden");
    document.getElementById('dataUnavailableForPagePlease').removeAttribute("hidden");    
};

function PopulateDataUnavailableElements() {
    document.getElementById('errorOccuredPagePlease').innerHTML = GetTranslation("VsmmPleaseClick");
    document.getElementById('dataUnavailableForPagePlease').innerHTML = GetTranslation("VsmmIfYouSuspectSeeingIncorrectlyText") + " ";
    document.getElementById('DataUnavailableEmail').innerHTML = GetTranslation("VsmmHere");
    document.getElementById('toNotifyAuthor').innerHTML = GetTranslation("VsmmToNotifyAuthorText") + ":";
    document.getElementById('PageUrl').innerHTML = vsmpDomPageUrl;
    document.getElementById('UserAgent').innerHTML = GetUserAgent();
    document.getElementById('Locale').innerHTML = GetLocaleBySource();
    document.getElementById('notificationItems').removeAttribute("hidden");
};