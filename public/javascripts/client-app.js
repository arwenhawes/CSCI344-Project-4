var main = function () {
        "use strict";
        var happyWords = ["happy", "cheerful", "chipper", "content", "ecstatic", "elated", "glad", "joyful", "merry", "pleased"],
            sadWords = ["sad", "dismal", "distressed", "heartbroken", "morbid", "morose", "somber", "sorrowful", "glum", "dejected"],
            happyWordCount = 0,
            sadWordCount = 0;
        function wordCounts(response) {
            for (var i = 0; i < happyWords.length; i++) {
                if (happyWords[i]===response.key) {
                happyWordCount = happyWordCount+parseInt(response.value);
                }else if(sadWords[i]===response.key) {
                sadWordCount = sadWordCount+parseInt(response.value);
                }
            }  
        }
    //$("body").append("<p>HWC: "+happyWordCount+"</p>");
    //console.log("hello world! Yay!"); 
    $.getJSON("/counts.json", function (response) { 
        response.forEach(wordCounts);
        $("body").prepend("<p>Happy Word Count: "+happyWordCount+"</p>");
        $("body").prepend("<p>Sad Word Count: "+sadWordCount+"</p>");
        if (happyWordCount>sadWordCount) {
        $(".sad").fadeOut(3000);
        $(".happy").append("<p>Happy wins!</p>");
        }else if (happyWordCount<sadWordCount) {
        $(".happy").fadeOut(3000);
        $(".sad").prepend("<p>Sad wins...</p>");
        }
    });
};

$(document).ready(main);

