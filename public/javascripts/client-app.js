var main = function () {
   console.log("hello world!"); 
   $.getJSON("/counts.json", function (response) {
        $("body").append("<p>awesome: "+response.awesome+"</p>");
    });
};

$(document).ready(main);