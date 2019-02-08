(function ($) {
    $.fn.mySearchWidget = function (obj) {
        function build_wiki_search_url(pattern) {
            const request_url = "https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&list=search&srlimit=5&srsearch="+pattern+"";
            let url = request_url + pattern;
            return url;
        }
        function startWidget(e){
            let limit = obj.limit || $(this).parent().data("search-limit") || 15;
            let type = obj.type || $(this).parent().data("search-type") || "wikipedia";
            let searchQuery = $(this).parent().children(".msw-search").val();
            if ( limit < 1 || limit > 30) {
                return alert("Validation error!\nLimit should be less than 1 and more than 30");
            }
            else if(type === "wikipedia" || "google"){
                console.log("limit: " + limit, "type: " + type, "search:" + searchQuery);
            }
            else{
                return alert("Validation error!\nType accepts only 'wikipedia' and 'google-books' as values");
            }

            let url = build_wiki_search_url(searchQuery);
            $.ajax( {
                type: "GET",
                url: url,
                dataType: 'jsonp',
                success: function(data) {
                    console.log(data);
                },
                error: function(errorMessage) {
                    console.log("damnn");
                }
            });


        }
        function catchEnter(e){
            if(e.key === "Enter"){
                $(this).parents(".msw-widget").children('.msw-button').trigger( "click" );
            }
        }
        function getElementOnFocus(e){
            $(this).keyup(catchEnter)
        }
        $(this).children('.msw-button').click(startWidget);
        $(this).children('.msw-search').focus(getElementOnFocus)

    };
}(jQuery));
