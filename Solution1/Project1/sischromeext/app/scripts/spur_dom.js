chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    //debugger;

    if (request.action == "easiPermitsPermitNbrPin") {

        chrome.storage.sync.get('permNbr', function (items) {
            $('#PermitNumber').val(items.permNbr);            
            ////Notify user
            //var opt = {
            //     type: "basic",
            //     title: "Applied",
            //     message: "Total has been reseted"
            //     //iconUrl: "icon_xerox.png"
            // };
            //chrome.notifications.create('done123456', opt, function () { });            
        });
        chrome.storage.sync.get('pinNbr', function (items) {
            $('#PinNumber').val(items.pinNbr);
        });
    }

    if (request.action == "ocmPcnVrm1") {
        $('#ctl00_ContentPlaceHolder1_strFormattedCaseNo').val('TX10155046');
        $('#ctl00_ContentPlaceHolder1_strVRM').val('SP01ACS');
    }

    if (request.action == "ocmPcnVrm2") {
        $('#ctl00_ContentPlaceHolder1_strFormattedCaseNo').val('BS73738187');
        $('#ctl00_ContentPlaceHolder1_strVRM').val('AAAAAA');
    }

    if (request.action == "OcmPcnVrm3GetTotal") {
        $('#ctl00_ContentPlaceHolder1_strFormattedCaseNo').val('BS94092010');
        $('#ctl00_ContentPlaceHolder1_strVRM').val('DJC20A');
    }

    if (request.action == "ocmPcnVrm4") {
        $('#ctl00_ContentPlaceHolder1_strFormattedCaseNo').val('BS00007001');
        $('#ctl00_ContentPlaceHolder1_strVRM').val('M812DWV');
    }

    if (request.action == "ocmPcnVrm5") {
        $('#ctl00_ContentPlaceHolder1_strFormattedCaseNo').val('BS00031094');
        $('#ctl00_ContentPlaceHolder1_strVRM').val('ABC123');
    }

    if (request.action == "ocmPcnVrm6") {
        $('#ctl00_ContentPlaceHolder1_strFormattedCaseNo').val('SP39181024');
        $('#ctl00_ContentPlaceHolder1_strVRM').val('AB38291');
    }

    if (request.action == "ocmPcnVrm8") {
        $('#ctl00_ContentPlaceHolder1_strFormattedCaseNo').val('YA03703184');
        $('#ctl00_ContentPlaceHolder1_strVRM').val('HN65VRZ');
    }

    if (request.action == "ocmPcnVrm9") {
        $('#ctl00_ContentPlaceHolder1_strFormattedCaseNo').val('BS98383911');
        $('#ctl00_ContentPlaceHolder1_strVRM').val('AJDSBAA');
    }

});

chrome.runtime.sendMessage({ action: "show" });
