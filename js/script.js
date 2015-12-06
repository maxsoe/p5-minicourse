
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address +'?');

    var streetviewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewURL + '">');

    // NY Times Ajax request
    var mynytimeskey = '5e4af54df9115fd5451b40563f2a94b7:11:73680588';
    var nytimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=' + mynytimeskey;

    $.getJSON(nytimesURL, function(data) {
      $nytHeaderElem.text('New York Times Articles About ' + cityStr);
      articles = data.response.docs;
      for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        console.log("Current article says " + article.web_url);
        $nytElem.append('<li class="article">' +
          '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
          '<p>' + article.snippet + '</p>' +
        '</li>');
      };

    }).fail(function(e){
      $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    

    return false;
};

$('#form-container').submit(loadData);

// loadData();
