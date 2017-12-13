var loc, keyword, price, radius, rating;
var formValid;

$("i").hide();

function validateForm() {
	formValid = true;

	//if (loc === "") { formValid = false; $("#location").addClass("focus"); $(".i-location").show(); } 
	if (keyword === "") { formValid = false; $("#keyword").addClass("focus"); $(".i-keyword").show(); }
	if (price === 0) { formValid = false; $("#price").addClass("focus"); $(".i-price").show(); } 
	if (radius === 0) { formValid = false; $("#radius").addClass("focus"); $(".i-radius").show(); } 
	if (rating === "") { formValid = false; $("#rating").addClass("focus"); $(".i-rating").show(); }  

	return formValid;
}

$(".foc").focus(function() {

	$(this).removeClass("focus");
	var id = $(this).attr("id");
	$(".i-" + id).hide();
	
})

$(".loading").hide();
$("#map").hide();


$("#yelp-icon").on("click", function() {

	//get the user form input stored in variables
	loc 	= $("#location").val().trim();
	keyword = $("#keyword").val().trim();
	price 	= parseInt($("#price").val());
	radius 	= parseInt($("#radius").val()) * 1600;
	rating 	= $("#rating").val();
	
	//call validateForm() function to make sure all fields are completed
	validateForm();

	//if all fields are completed, the api results will be requested
	if (formValid === true) {
		$(".loading").show();
		$("#img-box").hide();
		$("#result").hide();
		$("#map").hide();
		$("#div-main").hide();
		$("#yelp-icon").hide();



		//ajax call to yelp api with user location  
		const ywsid = "l-P4nQ-2wji4g-38vo_Eln9tkxP2DQrT7-c7yJ_Z4w047wrlRa1WIw86YQw1cRE3HtTwOLcyXBgN6ycXdsea-Bgx-QmZf4w79h44yht4cZyPCLCuy3A58uAiAP4pWnYx";
		const corsAnywhere = "https://cors-anywhere.herokuapp.com/"
		
		console.log(keyword);
        var loc,lati,long;
// geolocation api call
	$.get("https://api.ipdata.co", function (data) {
		console.log(JSON.stringify(data, null, 4));
	 loc= data.postal;
	 	

	 console.log(loc);
	
	//ajax call to yelp has to be inside geolocation call function
	 var yurl = "https://api.yelp.com/v3/businesses/search?term=" + keyword + "&location=" + loc + "&limit=50"+ "&radius=" + radius + "&price=" + price;

		$.ajax({
			method: "GET",
			url: corsAnywhere + yurl,
			headers: {
				"authorization": "Bearer " + ywsid
			}
		}).done(function(response) {
			$(".loading").hide();
			$("#img-box").show();
			$("#result").show();
			$("#map").show();
			$("#yelp-icon").show();
			
			
			console.log(response);

			// $body.removeClass("loading");

			var index 	= Math.floor(Math.random() * response.businesses.length);
			var result 	= response.businesses[index].name;
			var address = response.businesses[index].location.display_address[0];
			var city 	= response.businesses[index].location.display_address[1];
			var image 	= response.businesses[index].image_url;
			lati= Number(response.businesses[index].coordinates.latitude);
			long= Number(response.businesses[index].coordinates.longitude);

			// rndIndex = response.businesses.length

			console.log(result, lati,long);
			$("#result").html(result + "<br>");
			$("#result").append(address + "<br>");
			$("#result").append(city);

			var img = $("<img>");
			img.addClass("img-result img-thumbnail");
			img.attr("src", image);
			$("#img-box").html(img);
			$("#img-box").append("<h3><b>Enjoy this selection</b></h3>");


			function initMap() {
				var uluru = {lat:  lati, lng: long};
				console.log(result, lati,long);
						
				var map = new google.maps.Map(document.getElementById('map'), {
					zoom: 15,
					center: uluru
				});
				var marker = new google.maps.Marker({
					position: uluru,
					map: map
       });
     }

initMap();




		});



	}, "jsonp");
 

	} else {
		console.log("Make sure all fields are completed!");
	}






});

