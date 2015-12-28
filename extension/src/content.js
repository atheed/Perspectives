var textResponse;
var jsonResponse;

// sample jQuery.ajax() call to get related articles for a particular stirng
$.ajax({
    type: "POST",
    url: "https://news-api.lateral.io/recommend-by-text/",
    headers: { 
        "subscription-key": "21b109cfad5536905f5cf081ed599cee"
    },
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
        "text":"Machine learning is a subfield of computer science that evolved from the study of pattern recognition and computational learning theory in artificial intelligence. Machine learning explores the construction and study of algorithms that can learn from and make predictions on data."
    }),
    success: function (data) {
        jsonResponse = JSON.stringify(data);
    },
    error: function () {
        jsonResponse = "Error";
    }
});

// sample jQuery.ajax() call to get important keywords in a text
$.ajax({
    type: "POST",
    url: "https://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords",
    data: {
        "text":"US Vice-President Joe Biden has urged Japan and South Korea to improve their relations and co-operation. Mr Biden was in Seoul on the third leg of an Asian tour dominated by tensions over China newly-declared air defence zone.",
        "apikey":"70feaf9092b12babf41a9a9909499c1307091db0",
        "maxRetrieve":"10",
        "keywordExtractMode":"strict",
        "outputMode":"json"
    },
    success: function (data) {
        textResponse = JSON.stringify(data);
    },
    error: function () {
        textResponse = "Error";
    }
});


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            console.log(jsonResponse);
            console.log("-----------");
            console.log(textResponse);
        }
    }
);