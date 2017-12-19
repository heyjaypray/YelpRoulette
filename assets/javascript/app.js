var keyword, price, radius, rating;
var formIsValid;

$("i").hide();

// If any input field is missing, this function returns false.
function validateForm() {
	formIsValid = true;

	if (keyword === "") { 
		formIsValid = false; 
		$("#keyword").addClass("focus"); 
		$(".i-keyword").show(); 
	}
	
	if (price === 0) { 
		formIsValid = false; 
		$("#price").addClass("focus"); 
		$(".i-price").show(); 
	}

	if (radius === 0) { 
		formIsValid = false; 
		$("#radius").addClass("focus"); 
		$(".i-radius").show(); 
	}

	if (rating === "") { 
		formIsValid = false; 
		$("#rating").addClass("focus"); 
		$(".i-rating").show(); 
	}  

	return formIsValid;
}

$(".foc").focus(function() {
	$(this).removeClass("focus");
	var id = $(this).attr("id");
	$(".i-" + id).hide();
})

$(".loading").hide();
$("#map").hide();
$("#no-result").hide();

// Click event on search button
$("#search-btn").on("click", function() {
	// Get the user form input stored in variables
	keyword = $("#keyword").val().trim();
	price 	= parseInt($("#price").val());
	radius 	= parseInt($("#radius").val()) * 1600;
	rating 	= $("#rating").val();
	
	// Call validateForm() function to make sure all fields are completed
	validateForm();

	//if all fields are completed, the api results will be requested
	if (formIsValid === true) {
		$(".loading").show();
		$("#img-box").hide();
		$("#result").hide();
		$("#map").hide();
		$("#time-to-dest").hide();
		$("#div-main").hide();
		$(".search").hide();

		// Api key and cors check declared for ajax call to yelp api  
		const ywsid 		= "l-P4nQ-2wji4g-38vo_Eln9tkxP2DQrT7-c7yJ_Z4w047wrlRa1WIw86YQw1cRE3HtTwOLcyXBgN6ycXdsea-Bgx-QmZf4w79h44yht4cZyPCLCuy3A58uAiAP4pWnYx";
		const corsAnywhere 	= "https://cors-anywhere.herokuapp.com/";
        var loc, lati, long, origin_lat, origin_long, org;

	    // Google geolocation api call function
		navigator.geolocation.getCurrentPosition(function(position) {
	        console.log(position);
			origin_long 	= position.coords.longitude;
			origin_lat 		= position.coords.latitude;	
		    var yurl  		= "https://api.yelp.com/v3/businesses/search?term=" + keyword + "&location=" + position.coords.latitude + "," + position.coords.longitude + "&limit=50";
		    console.log(yurl);
		
			$.ajax({
				method: "GET",
				url: corsAnywhere + yurl,
				headers: {
					"authorization": "Bearer " + ywsid
				}	
			}).done(function(response) {
				// If response.business array is not empty, this block of code will work. 
				if (response.businesses.length > 0) {
					$(".loading").hide();
					$("#img-box").show();
					$("#result").show();
					$("#map").show();
					$("#time-to-dest").show();
					$(".search").show();
					
					console.log(response);

					// $body.removeClass("loading");

					var index 	= Math.floor(Math.random() * response.businesses.length);
					var result 	= response.businesses[index].name;
					var address = response.businesses[index].location.display_address[0];
					var city 	= response.businesses[index].location.display_address[1];
					var image 	= response.businesses[index].image_url;
					var web 	= response.businesses[index].url;
					var phone	= response.businesses[index].display_phone;
					lati 		= Number(response.businesses[index].coordinates.latitude);
					long 		= Number(response.businesses[index].coordinates.longitude);

					// rndIndex = response.businesses.length

					console.log(result, lati,long);
					$("#result").html("<i class=\"ion-android-restaurant text-danger\"></i> " + result + "<br>");
					$("#result").append("<i class=\"ion-ios-location text-danger\"></i> " + address + " " + city + "<br>");
					$("#result").append("<i class=\"ion-android-call text-danger\"></i> " + phone);

					if (image === "") {
						$("#img-box").html("<img src=\"assets/images/No_Image_Available.jpg\" class=\"img-result\">");
					} else {
						var img = $("<img>");
						img.addClass("img-result");
						img.attr("src", image);
						var link = $("<a href=\"" + web + "\" target=\"_blank\">");
						link.html(img);
						$("#img-box").html(link);
					}

		            // Google map function declared  
					function initMap() {
						var uluru = {lat: lati, lng: long};
						
						// Adding code for directions from origin to destination restaurant
						// Create 2 variables to get directions from origing to destination and display on map
						var directionsService = new google.maps.DirectionsService;
		        		var directionsDisplay = new google.maps.DirectionsRenderer;	
						var map = new google.maps.Map(document.getElementById('map'), {
							zoom: 15,
							center: uluru,
							fullscreenControl: false, // disable fullscreen toggle button
						});
						
			   			// Function that calls google api to superimpose directions on map called below
		 				directionsDisplay.setMap(map);
			   			calculateAndDisplayRoute(directionsService, directionsDisplay); // Calls calculate and display route function

			   			// A button to resize the map 
			   			var resizeBtn = $("<button>");
				   		resizeBtn.addClass("btn btn-warning btn-sm");
				   		resizeBtn.html("Resize");
				   		resizeBtn.css({position : "absolute", top : "10px", right: "10px", cursor: "pointer"});
				   		$("#map").append(resizeBtn);

				   		// When the button on the map is clicked, the size of the map changes
				   		var fullscreen = false;
				   		
						resizeBtn.on("click", function() {
							
							var winWidth = $(window).width();
					   		var winHeight = $(window).height();
					   		var left = winWidth < 768 ? "0" : "25%"; 

							if (!fullscreen) {
								$("#map").hide();
								$("#logo").hide();
								$("#img-box").hide();
								$("#result").hide();
								$("#time-to-dest").hide();
								$(".search").hide(); 
								$("#map").css({width : "100%", height : winHeight, position : "fixed", top : "0", left : left});
								setTimeout(function(){
									$("#map").show();
								}, 100)
								fullscreen = true;
							} else {
								$("#map").hide();
								$("#logo").show();
								$("#img-box").show();
								$("#result").show();
								$("#time-to-dest").show();
								$(".search").show();
								$("#map").css({height : "200px", position : "relative", top : "0", left : "0"});
								setTimeout(function(){
									$("#map").show();
								}, 100)
								fullscreen = false;
							}
							
						});
			   		}

		     		// Google map function for rendering directions declared
		            function calculateAndDisplayRoute(directionsService, directionsDisplay) {						        
				        directionsService.route({
					        origin: {lat:origin_lat, lng:origin_long},
					        destination:{lat:lati, lng:long} ,
					        travelMode: 'DRIVING'
				        }, function(response, status) {
				        	if (status === 'OK') {
					            directionsDisplay.setDirections(response);
					            var route = response.routes[0];
			            	} else {
			            		window.alert('Directions request failed due to ' + status);
			          		}
				        });
				    }
					
					// Calls google  map function
					initMap(); 
				
		          	// Adding time to reach destination as a timeout function
			        setTimeout(function() { 
				        // New ajax call to googlemap api  to get time to destination
				        var gurl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial" + "&origins=" + origin_lat + "," + origin_long + "&destinations=" + lati + "," + long + "&key=" + "AIzaSyBOrrP3F9BuMmSkdtiCkVdvjNFtbYQCZAE";
				        
				        $.ajax({
							method: "GET",
							url: corsAnywhere + gurl,		
						}).done(function(response1) {
				        	console.log(response1.rows[0].elements[0].duration.text);
			            	$("#time-to-dest").html("Time to destination:<br>" + "<i class=\"ion-ios-timer text-danger\"></i> <strong>" 
			            		+ response1.rows[0].elements[0].duration.text + "</strong>");
				        }); // End of ajax call to find time to reach destination
		            }, 1000); 
		        // This will be displayed if response has no results to display 
				} else { 
					console.log("No result!"); 
					$(".loading").hide(); 
					$("#no-result").show();
				} 
			}).fail(function(response){
				alert("We are experiencing problems");
			}); // End of YELP ajax call function
 
		}); // Closes the google geolocation  api call function
	} 
	else 
	{
		console.log("Make sure all fields are completed!");
	} // End of if else function for validateForm

}); // End of function on click event

// Reload the page when the back button is clicked.
$("#back").on("click", function() {
	location.reload(false);
});



