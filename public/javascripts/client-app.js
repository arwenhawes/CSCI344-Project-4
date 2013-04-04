var main = function () {
  var happyWords = ["happy", "cheerful","chipper","content","ecstatic","elated","glad","joyful","merry","pleased"],
      sadWords = ["sad","dismal","distressed","heartbroken","morbid","morose","somber","sorrowful","glum","dejected"],
      happyWordCount = 0,
      sadWordCount = 0;
  
  function wordCounts(response){
      var resp = response.toString();
      for (var i = 0; i < happyWords.length; i++){
        if (happyWords[i]===response.key){
        $(".happy").append("<p>"+response.key+" : "+response.value+"</p>");
        happyWordCount = happyWordCount+parseInt(response.value);
        
      }else if(sadWords[i]===response.key){
        $(".sad").append("<p>"+response.key+" : "+response.value+"</p>");
        sadWordCount = sadWordCount+parseInt(response.value);
      }
    }
     
  }
  //$("body").append("<p>HWC: "+happyWordCount+"</p>");
  console.log("hello world! Yay!"); 
   $.getJSON("/counts.json", function (response) { 
    response.forEach(wordCounts);
    $("body").prepend("<p>HWC: "+happyWordCount+"</p>");
    $("body").prepend("<p>SWC: "+sadWordCount+"</p>");
  });
};

$(document).ready(main);

