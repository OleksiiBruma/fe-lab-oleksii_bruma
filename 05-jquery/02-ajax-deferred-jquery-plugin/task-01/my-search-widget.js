(function ($) {
    $.fn.mySearchWidget = function (obj) {

        function buildWikiSearchUrl(searchQuery, limit) {
            return `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=allpages&inprop=url&gapfrom=${searchQuery}&gaplimit=${limit}`;
        }

        function buildGoogleBooksSearchUrl(searchQuery, limit) {
            return `https://www.googleapis.com/books/v1/volumes?maxResults=${limit}&q=${searchQuery}%20value`
        }

        function startWidget(e) {
            const currentWidget = $(this).parent();
            const limit = obj.limit || currentWidget.data("search-limit") || 15;
            const type = obj.type || currentWidget.data("search-type") || "wikipedia";
            const searchQuery = currentWidget.children(".msw-search").val().trim();
            const resultsField = currentWidget.children(".msw-results");
            if (!searchQuery) {
                alert("please type query")
            } else if (limit < 1 || limit > 30) {
                return alert("Validation error!\nLimit should not be less than 1 or more than 30");
            } else if (type === "wikipedia" || "google") {

                let url = buildWikiSearchUrl(searchQuery, limit);
                if (type === "google-books") {
                    url = buildGoogleBooksSearchUrl(searchQuery, limit);
                }
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: 'jsonp',
                    success: function (data) {
                        $("a").off("click");
                        const resultsList = resultsField.append('<ul class="msw-results__list"></ul>');
                        resultsField.children().remove();

                        if (type === "google-books") {
                            const books = data.items;
                            if (!books) {
                                resultsList.append(`<li class="msw-results__item">Could not find :(</li>`);
                            } else {
                                books.forEach((book) => {
                                    const fullUrl = book.volumeInfo.canonicalVolumeLink;
                                    const title = book.volumeInfo.title;
                                    addNewLink(resultsList, fullUrl, title);
                                })
                            }
                        }
                        if (type === "wikipedia") {
                            const pages = data.query.pages;
                            Object.keys(pages).forEach((page) => {
                                const fullUrl = pages[page].fullurl;
                                const title = pages[page].title;
                                addNewLink(resultsList, fullUrl, title);
                            });
                        }
                        $("a").click(setLinkColorAndReadTag);

                    },
                    error: function (errorMessage) {
                        alert("something went wrong :(");
                    }
                });
            } else {
                return alert("Validation error!\nType accepts only 'wikipedia' and 'google-books' as values");
            }
        }

        function setLinkColorAndReadTag(e) {
            if ($(this).data("visited")) {
                return
            }
            $(this).data("visited", "true");
            $(this).prepend("[READ] ");
            $(this).css("background-color", "mediumseagreen");
        }

        function addNewLink(resultsList, fullUrl, title) {
            resultsList.append(`<li class="msw-results__item"><a class="msw-results__link" href="${fullUrl}" target="_blank">${title}</a></li>`);
        }
// works on unfocus :(
        $(this).children(".msw-button").on("widget.startWidget", startWidget);
        $(this).children('.msw-button').click(function (e) {
            $(this).trigger("widget.startWidget");
        });

        $(this).children('.msw-search').change(function (e) {
            $(this).parents(".msw-widget").children('.msw-button').trigger("click");
        });

/*
        function catchEnter(e) {
            if (e.key === "Enter") {
                $(this).parents(".msw-widget").children('.msw-button').trigger("click");
            }
        }

        function getElementOnFocus(e) {
            $(this).keyup(catchEnter);
            $(this).off("focus");
        }

        $(this).children('.msw-button').click(startWidget);
        $(this).children('.msw-search').focus(getElementOnFocus)

*/

    };
}(jQuery));
