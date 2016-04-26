

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "fe3ba86e524018c1db0d00224e9e813c" 
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
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			model.browseItems = response.results;
			
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything from both lists
  
  //clear the watchlist
  $("#section-watchlist ul").empty();
  
  //clear the browse list
  $("#section-browse ul").empty();
  

  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {

		var watch =	$("<li><p></p></li>").text(movie);
		$("#section-watchlist ul").append(watch);
  });

  model.browseItems.forEach(function(movie) {
  	
		// insert a list item into the <ul> in the browse section
		var new_movie =	$("<li><p></p></li>").text(movie.original_title);
		$("#section-browse ul").append(new_movie);
		
		// the list item should include a button that says "Add to Watchlist"
		var title = movie.original_title;
		var button = $('<button type="button" id=" ">Add To Watchlist!</button>');
		button.attr("id", title);
		$("#section-browse ul").append(button);
		
		
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
		button.click(function(){
			var add_movie = $(this).attr("id");
			model.watchlistItems.push(add_movie);
			render();
			})
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

