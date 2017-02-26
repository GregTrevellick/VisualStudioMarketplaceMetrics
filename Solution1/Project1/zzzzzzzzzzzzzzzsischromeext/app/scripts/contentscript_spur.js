


chrome.runtime.onMessage.addListener(
    
    function (request, sender, sendResponse) {


        if (request.action == "ocmPcnVrm1") {
            $('#ctl00_ContentPlaceHolder1_strFormattedCaseNo').val('TX10155046');
            $('#ctl00_ContentPlaceHolder1_strVRM').val('SP01ACS');
        }



    }
);

chrome.runtime.sendMessage({ action: "show" });
