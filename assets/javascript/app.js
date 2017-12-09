var index, rnd, slider;
var yelpPressed = false;
var imgArray = ["Doner-Kebab.jpg", "Chicken-Kebab.jpg", "Kofte-Kebab.jpg", "Shish-Kebab.jpg",
				"Doner-Kebab.jpg", "Chicken-Kebab.jpg", "Kofte-Kebab.jpg", "Shish-Kebab.jpg",
				"Doner-Kebab.jpg", "Chicken-Kebab.jpg", "Kofte-Kebab.jpg", "Shish-Kebab.jpg",
				"Doner-Kebab.jpg", "Chicken-Kebab.jpg", "Kofte-Kebab.jpg", "Shish-Kebab.jpg", 
				"Doner-Kebab.jpg", "Chicken-Kebab.jpg", "Kofte-Kebab.jpg", "Shish-Kebab.jpg"];

var width = $(window).width();

function changeImage() {

	slider = setInterval(function() {

		var img = $("<img>");
		img.addClass("img-result img-thumbnail");
		img.attr("src", "assets/images/" + imgArray[index]);
		$("#img-box").html(img);
		
		if (index === rnd) {

			clearInterval(slider);
			yelpPressed = false;
			$("#img-box").append("<h3><b>Enjoy this selection</b></h3>");

		}

		index++;

	}, 200);

}
var loc= "33 S fifth avenue";
var price, distance, rating;

$("#yelp-icon").on("click", function() {

	index = 0;
	rnd = Math.floor(Math.random() * imgArray.length);
	//console.log(rnd);
	
	if (!yelpPressed) {

		changeImage();
		yelpPressed = true;

	} else {

		clearInterval(slider);
		changeImage();

	}
	
//get the user form input stored in variables
price = parseInt($("#price-input").val().trim());
console.log(price);
console.log($("#price-input").val().trim());
rating =$("#rating-input").val().trim();
console.log(rating);
keyword =$("#keyword-input").val().trim();

radius = (parseInt($("#distance-input").val().trim())*1600);

console.log(radius);


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
}).done(function(response) {
console.log(response);

var index = Math.floor(Math.random() * response.businesses.length);
console.log(index);
var result = response.businesses[index].name;

console.log(result);
$("#result").append(result);


});





});

