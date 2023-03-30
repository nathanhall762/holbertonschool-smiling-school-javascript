document.addEventListener('DOMContentLoaded', function() {
	// fetch quotes from API
	$.ajax({
		url: 'https://smileschool-api.hbtn.info/quotes',
		method: 'GET',
		success: function (data) {
			// console.log('AJAX success'); // AJAX success
			// console.log(data); // (2) [{...}, {...}]
			const quotes = data[0];
			// console.log(`Quotes: ${quotes}`); // Quotes: [object Object]
			const carousel = $('#testimonial');
			// console.log(`Carousel: ${carousel}`); // Quotes: [object Object]

			// loop through each quote and create a carousel item
			data.forEach(function createCard(quote, index) {
				// console.log(quote);
				const item = $('<div>').addClass('carousel-item px-5');
				const helper = $('<div>').addClass('d-flex flex-column align-items-center flex-sm-row col-sm-10 carousel-helper m-md-5');
				const avatar = $('<img>').addClass('rounded-circle carousel-avatar').attr('src', quote['pic_url']).attr('width', '210px');
				// console.log(quote['pic_url'])
				const content = $('<div>').addClass('px-sm-5');
				const text = $('<p>').addClass('px-2 mt-4 mt-md-0').text(quote['text']);
				// console.log(quote['text']);
				const name = $('<p>').addClass('font-weight-bold pl-2 pt-2 mb-1 align-self-start').text(quote['name']);
				const occupation = $('<cite>').addClass('pl-2 align-self-start').text(quote['title']);

				// add content to carousel item
				content.append(text, name, occupation);
				helper.append(avatar, content);
				item.append(helper);
				carousel.append(item);

				// set first carousel item as active
				if (index === 0) {
					item.addClass('active');
					// console.log('active');
				}
			});

			// remove loader and show carousel
			$('#testimonialLoader').remove();
			$('.testimonialCarousel').removeClass('d-none');
		},
		error: function () {
			// handle error
			console.log('Error fetching quotes');
		}
	});
	$.ajax({
		url: "https://smileschool-api.hbtn.info/popular-tutorials",
		type: "GET",
		dataType: "json",
		beforeSend: function () {
			// show loader
		},
		// handle success response
		success: function loadContent(data) {
			const popularTutorialsSection = document.querySelector('.popular-tutorials');
	
			// Remove any existing content
			popularTutorialsSection.innerHTML = '';
	
			// Add each tutorial card to the section
			data.forEach((tutorial) => {
				console.log(tutorial);
				const tutorialCard = `
				<div id="tutorial-${tutorial.id}" class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3">
				<div class="card border-0">
				<img class="card-img-overlay w-50 ml-5 mt-3" src="${tutorial.thumb_url}">
				<img class="card-img-overlay mx-auto mt-4 play" src="images/play.png">
				<div class="card-body">
					<h5>${tutorial.title}</h5>
					<p class="card-text text-secondary">${tutorial['sub-title']}</p>
					<div class="row">
						<img class="rounded-circle ml-3" src="${tutorial.author_pic_url}" alt="Author image" height="25px>
						<p class="ml-3 purple">${tutorial.author}</p>
					</div>
					<div class="row align-items-center justify-content-between px-4">
						<div class="row">
							<img src="images/star_on.png" height="15px">
							<img src="images/star_on.png" height="15px">
							<img src="images/star_on.png" height="15px">
							<img src="images/star_on.png" height="15px">
							<img src="images/star_off.png" height="15px">
						</div>
						<p class="purple ml-3 pt-3">${tutorial.duration}</p>
					</div>
				</div>
				</div>
				`;
				console.log(tutorialCard);
				const popularTutorialsSection = document.querySelector('#popular-tutorials-section');
				console.log(popularTutorialsSection);
				popularTutorialsSection.insertAdjacentHTML('beforeend', tutorialCard);

				console.log(popularTutorialsSection);
	
				// Initialize the carousel
				$('#popular-tutorials-section').slick({
					slidesToShow: 3,
					// other options
				});
	
				// make first slide active
				$('#tutorial-1').addClass('active');
		
				// remove loader
				$('.loader').hide();
				// show carousel
				$('.popular-tutorials').show();
			});
	
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// handle error response
		},
		complete: function () {
			// hide loader
		}
	});
}	)
