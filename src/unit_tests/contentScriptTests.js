/// <reference path="..\app\scripts\contentscript.js" />

test("GetInstallCountTest", function () {

    equal(GetInstallCount("1"), "1");
    equal(GetInstallCount("22"), "22");
    equal(GetInstallCount("333"), "333");

    equal(GetInstallCount("4000"), "4000");
    equal(GetInstallCount("4K"), "4000");

    equal(GetInstallCount("4500"), "4500");
    equal(GetInstallCount("4.5K"), "4500");


    equal(GetInstallCount("50000"), "50000");
    equal(GetInstallCount("50K"), "50000");
    equal(GetInstallCount("50.1K"), "50100");

    equal(GetInstallCount("183K"), "183000");
    equal(GetInstallCount("183.2K"), "183200");

    equal(GetInstallCount("4000K"), "4000000");
    equal(GetInstallCount("4M"), "4000000");
    equal(GetInstallCount("4.8M"), "4800000");
    equal(GetInstallCount("14.8M"), "14800000");
    equal(GetInstallCount("300M"), "300000000");

    equal(GetInstallCount("123456789"), "123456789");
});