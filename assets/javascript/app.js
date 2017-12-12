var loc, keyword, price, radius, rating;
var formValid;

function validateForm() {
	formValid = true;

	if (loc === "") { formValid = false; } 
	if (keyword === "") { formValid = false; }
	if (price === "") { formValid = false; } 
	if (radius === "") { formValid = false; } 
	if (rating === "") { formValid = false; }  

	return formValid;
}

$(".loading").hide();

$("#yelp-icon").on("click", function() {

	//get the user form input stored in variables
	loc 	= $("#location-input").val().trim();
	keyword = $("#keyword-input").val().trim();
	price 	= parseInt($("#price-input").val());
	radius 	= parseInt($("#distance-input").val()) * 1600;
	rating 	= $("#rating-input").val();
	
	//call validateForm() function to make sure all fields are completed
	validateForm();

	//if all fields are completed, the api results will be requested
	if (formValid === true) {
		$(".loading").show();
		$("#img-box").hide();
		$("#result").hide();

		//ajax call to yelp api with user location  
		const ywsid = "l-P4nQ-2wji4g-38vo_Eln9tkxP2DQrT7-c7yJ_Z4w047wrlRa1WIw86YQw1cRE3HtTwOLcyXBgN6ycXdsea-Bgx-QmZf4w79h44yht4cZyPCLCuy3A58uAiAP4pWnYx";
		const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
		var yurl = "https://api.yelp.com/v3/businesses/search?term=" + keyword + "&location=" + loc + "&limit=50&radius=" + radius + "&price=" + price;
		console.log(keyword);

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
			console.log(response);

			// $body.removeClass("loading");

			var index 	= Math.floor(Math.random() * response.businesses.length);
			var result 	= response.businesses[index].name;
			var address = response.businesses[index].location.display_address[0];
			var city 	= response.businesses[index].location.display_address[1];
			var image 	= response.businesses[index].image_url;
			// rndIndex = response.businesses.length

			console.log(result);
			$("#result").html(result + "<br>");
			$("#result").append(address + "<br>");
			$("#result").append(city);

			var img = $("<img>");
			img.addClass("img-result img-thumbnail");
			img.attr("src", image);
			$("#img-box").html(img);
			$("#img-box").append("<h3><b>Enjoy this selection</b></h3>");
		}); 

	} else {
		alert("Make sure all fields are completed!");
	}

});

