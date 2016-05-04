

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "fe3ba86e524018c1db0d00224e9e813c",
  // TODO
  imageBaseUrl: "TODO"
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    },
    fail: function() {
      console.log("fail!");
    }
  });
}


/**
 * Makes an AJAX request to the /search endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {
  // TODO

  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    },
    fail: function() {
      console.log("search failed");
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  var watchlistElement = $("#section-watchlist ul");
  var browseElement = $("#section-browse ul");

  // clear everything
  watchlistElement.empty();
  browseElement.empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    // TODO
    // create a bootstrap panel for each watchlist item.
    // The movie title should go in the panel heading.
    // The panel body should contain a poster image,
    // and also a button to cross the item off the watchlist.

    var delButton = $('<button class="btn btn-danger"></button>')
      .text("I watched it")
      .click(function() {
       var delMovie = model.watchlistItems.indexOf(movie)
        model.watchlistItems.splice(delMovie, 1);
        render();
      });
    
    var image = $("<img>").attr("src", movie.poster_path);
    
    var panelBody = $("<div></div>")
                    .attr("class", "panel-body")
                    .append(image)
                    .append(delButton);
                    
    var title = $('<h4></h4>').text(movie.original_title).attr("class", "panel-heading");
    
    var itemView = $("<li></li>")
    .append(title)
    .append(panelBody)
    .attr("class", "panel panel-default");
    watchlistElement.append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<h4></h4>").text(movie.original_title);
    var overview = $("<p></p>").text(movie.overview);
    var button = $('<button class="btn btn-primary"></button>')
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);

    // TODO
    // use Bootstrap to improve the style of these list items
    var itemView = $('<li class="list-group-item"></li>')
      .append(title)
      .append(overview)
      .append(button);

    browseElement.append(itemView);
  });
  
}



function posterUrl(movie, width) {
  // TODO
  
}