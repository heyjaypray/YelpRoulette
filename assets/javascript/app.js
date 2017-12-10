var index, rnd, slider, image, rndIndex;

var loc= "Tucson";
var price, distance, rating;

$(".loading").hide();

$("#yelp-icon").on("click", function() {

	$(".loading").show();
	$("#img-box").hide();
	$("#result").hide();


		
	//get the user form input stored in variables
	price = parseInt($("#price-input").val().trim());
	rating =$("#rating-input").val().trim();
	keyword =$("#keyword-input").val().trim();
	radius = (parseInt($("#distance-input").val().trim())*1600);

 
	//ajax call to yelp api with user location  
	const ywsid = 'l-P4nQ-2wji4g-38vo_Eln9tkxP2DQrT7-c7yJ_Z4w047wrlRa1WIw86YQw1cRE3HtTwOLcyXBgN6ycXdsea-Bgx-QmZf4w79h44yht4cZyPCLCuy3A58uAiAP4pWnYx'
	const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
	console.log(keyword);
	var yurl = 'https://api.yelp.com/v3/businesses/search?term='+keyword+'&location='+ loc+ '&limit=50' +'&radius='+radius+'&price='+price

	$.ajax({
	method: 'GET',
	url: corsAnywhere + yurl,
	headers: {
	'authorization': 'Bearer ' + ywsid
	}
	})
	
	.done(function(response) {

		$(".loading").hide();
		$("#img-box").show();
		$("#result").show();
		console.log(response);

		// $body.removeClass("loading");

		var index = Math.floor(Math.random() * response.businesses.length);
		var result = response.businesses[index].name;
		var address = response.businesses[index].location.display_address[0];
		var city = response.businesses[index].location.display_address[1];
		var image = response.businesses[index].image_url
		// rndIndex = response.businesses.length

		console.log(result);
		$("#result").html(result + "<br>");
		$("#result").append(address + "<br>");
		$("#result").append(city );

		var img = $("<img>");
		img.addClass("img-result img-thumbnail");
		img.attr("src", image);
		$("#img-box").html(img);
		$("#img-box").append("<h3><b>Enjoy this selection</b></h3>");


	});





});

