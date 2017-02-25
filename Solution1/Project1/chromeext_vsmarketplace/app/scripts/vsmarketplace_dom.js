chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    //debugger;

    if (request.action == "GetTotalBtn") {
        //$('#ctl00_ContentPlaceHolder1_strFormattedCaseNo').val('BS94092010');
        //$('#ctl00_ContentPlaceHolder1_strVRM').val('DJC20A');
        console.log("it was pressed");
    }

});

chrome.runtime.sendMessage({ action: "show" });
