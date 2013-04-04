var main = function () {
  var happyWords = ["happy", "cheerful","chipper","content","ecstatic","elated","glad","joyful","merry","pleased"],
      sadWords = ["sad","dismal","distressed","heartbroken","morbid","morose","somber","sorrowful","glum","dejected"];
  function consoleResults(response){
    console.log(response);
  }
  function wordCounts(response){
    $("body").append("<p>"+response.key+" : "+response.value+"</p>");
  }
  console.log("hello world! Yay!"); 
   $.getJSON("/counts.json", function (response) {    
    response.forEach(wordCounts);      
    });
};

//original was: $("body").append("<p>happy: "+response.happy+"</p>");
$(document).ready(main);