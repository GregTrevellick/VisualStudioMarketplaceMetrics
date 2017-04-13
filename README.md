# Visual Studio Marketplace Metrics

[![License](https://img.shields.io/github/license/gittools/gitlink.svg)](/LICENSE.txt)

A repository for the [Visual Studio Marketplace Metrics][ChromeExtensionURL] Chrome browser extension, that allows the user to see the total install count and other metrics for all their Visual Studio Marketplace extensions in one place.

This [Chrome extension][ChromeExtensionURL] is officially available at the [Chrome webstore][ChromeExtensionURL].

![](ReadMeAnimatedUsage.gif)

If you like this ***free*** extension, please give it a [review][ChromeExtensionReviewsUrl].

Contributions to this project are welcome by raising an [Issue][GitHubRepoIssuesURL] or submitting a [Pull Request][GitHubRepoPullRequestsURL].

Bugs can be logged [here][GitHubRepoIssuesURL].

See the [change log](CHANGELOG.md) for release history.

Software License is available [here](/LICENSE.txt).

---------------------------------------

![](src/app/img/icon_128x128.png)

## Features

 - Works for Visual Studio IDE extensions, VSTS extensions and VS Code extensions
 - Shows total number of extensions, installs and reviews for the visible extension thumbnails on [Visual Studio Marketplace][VSMarketplaceURL]
 - Includes number of reviews as a percentage of downloads
 - Includes a summary grid of data per extension
 - Multi-lingual support 
   - Bulgarian
   - Catalan
   - Dutch
   - English
   - French
   - German
   - Italian
   - Polish
   - Portuguese
   - Romanian
   - Spainish
   - Swedish
   - Ukranian
 - Results initially appear in same sort order as chosen on [Visual Studio Marketplace][VSMarketplaceURL]
 - Results grid contains hyperlinks directly to each extension and to each publisher
 - The results grid has a 'copy to clipboard' feature to allow easy pasting into Excel, etc
 - Various mouseover texts exist for extra information

#### Note
Data for this extension is derived from the [Visual Studio Marketplace][VSMarketplaceURL] DOM, which is of course subject to change by Microsoft at anytime, and which would cause the  extension to cease functioning correctly. If this occurs the extension will inform the user and present them with details of how to inform the extension author - although I will have already spotted this myself of course.
 
## Legal

The [owner](https://github.com/GregTrevellick) of this [GitHub repository / software][GitHubRepoURL] is not affiliated, associated, authorized, endorsed by, employed by, sponsored by, or in any way officially connected with [Microsoft][MicrosoftURL] or [Google][GoogleURL] or any of its subsidiaries or its affiliates.

Nor has [this][GitHubRepoURL] software been authorised, approved, verified or in anyway assessed by [Microsoft][MicrosoftURL] or [Google][GoogleURL], or any of its subsidiaries or its affiliates.

All Trademark, intellectual property rights, and other rights belonging to [Microsoft][MicrosoftURL] or [Google][GoogleURL] apply.

All logos and links belong to [Microsoft][MicrosoftURL] or [Google][GoogleURL] and their use here and any associated goodwill inures to [Microsoft][MicrosoftURL] or [Google][GoogleURL].

In no event shall [Microsoft][MicrosoftURL] or [Google][GoogleURL] be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or dealings in the software.

## Credits

[Table sorter](http://tablesorter.com/docs/)

[Console image](https://github.com/adriancooney/console.image)

[![](chart.png)][GitHubPagesURL]




[GitHubPagesURL]: https://gregtrevellick.github.io/VisualStudioMarketplaceMetrics/
[GitHubRepoURL]: https://github.com/GregTrevellick/VisualStudioMarketplaceMetrics
[GitHubRepoIssuesURL]: https://github.com/GregTrevellick/VisualStudioMarketplaceMetrics/issues
[GitHubRepoPullRequestsURL]: https://github.com/GregTrevellick/VisualStudioMarketplaceMetrics/pulls
[ChromeExtensionURL]: https://www.google.com/extensions/VisualStudioMarketplaceMetrics
[ChromeExtensionReviewsUrl]: https://www.google.com/extensions/VisualStudioMarketplaceMetrics/reviews
[GoogleURL]: https://www.google.com/
[MicrosoftURL]: https://www.microsoft.com/
[VSMarketplaceURL]: https://marketplace.visualstudio.com/