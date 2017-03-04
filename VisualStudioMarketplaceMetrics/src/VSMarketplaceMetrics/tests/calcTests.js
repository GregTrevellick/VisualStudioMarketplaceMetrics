/// <reference path="C:\Users\greg\Source\Repos\ciugjgfhvjgh\VisualStudioMarketplaceMetrics\src\VSMarketplaceMetrics\tests\calc.js" />

test("Adding 0 and 0", function () {
    var result = add(0, 0);
    equal(result, 0, "should equal 0");
});

test("Adding 4 and 5", function () {
    var result = add(4, 5);
    equal(result, 9, "should equal 9");
});