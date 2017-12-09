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

$("#yelp-icon").on("click", function() {

	index = 0;
	rnd = Math.floor(Math.random() * imgArray.length);
	console.log(rnd);
	
	if (!yelpPressed) {

		changeImage();
		yelpPressed = true;

	} else {

		clearInterval(slider);
		changeImage();

	}
	
});

