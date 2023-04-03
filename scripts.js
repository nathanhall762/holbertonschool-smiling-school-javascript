document.addEventListener('DOMContentLoaded', function() {
	// testimonials
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

	// popular videos
	$.ajax({
		url: "https://smileschool-api.hbtn.info/popular-tutorials",
		type: "GET",
		dataType: "json",
		beforeSend: function () {
			// show loader
		},
		// handle success response
		success: function loadContent(data) {
	
			// Remove any existing content
	
			// Add each tutorial card to the section
			data.forEach((tutorial) => {
				console.log(tutorial);
				$('#popular-tutorials-section').append(
					`<div id="tutorial-${tutorial.id}" class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 px-" data-slide-to="${tutorial.id}">
					<div class="card border-0">
						<img class="bg-img card-img-top img-fluid" src="${tutorial.thumb_url}">
						<img class="card-img-overlay w-50 mx-auto mt-2" src="images/play.png">
						<div class="card-body px-0">
							<h5>${tutorial.title}</h5>
							<p>${tutorial['sub-title']}</p>
							<div class="d-flex row" style="flex-wrap: nowrap;">
								<img class="mx-3 rounded-circle" src="${tutorial.author_pic_url}" alt="Author image" height="25px">
								<h6 class="purple">${tutorial.author}</h6>
							</div>
							<div class="d-flex row mx-auto">
								<img src="images/star_on.png" height="15px">
								<img src="images/star_on.png" height="15px">
								<img src="images/star_on.png" height="15px">
								<img src="images/star_on.png" height="15px">
								<img src="images/star_off.png" height="15px">
								<p class="purple col ml-auto">${tutorial.duration}</p>
							</div>
						</div>
					</div>
					`
				);
			});
	
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// handle error response
		},
		complete: function () {
			// make first slide active and disable automatic sliding
			$('#tutorial-1').addClass('active');
			$('#carousel-popular').attr('data-interval', false);

			// modify number of slides that are displayed at a time
			$('#carousel-popular').attr('data-ride', 'carousel').find('.carousel-item').removeClass('col-12 col-sm-6 col-md-4 col-lg-3').addClass('col-12 col-md-6 col-lg-4');

		
			// remove loader
			$('#tutorialLoader').remove();
			$('#carousel-popular-controls').removeClass('d-none');
		}
	});

	// latest videos
	$.ajax({
		url: "https://smileschool-api.hbtn.info/latest-videos",
		type: "GET",
		dataType: "json",
		beforeSend: function () {
			// show loader
		},
		// handle success response
		success: function loadContent(data) {
	
			// Remove any existing content
	
			// Add each tutorial card to the section
			data.forEach((video) => {
				console.log(video);
				$('#latest-tutorials-section').append(
					`<div id="video-${video.id}" class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 px-" data-slide-to="${video.id}">
					<div class="card border-0">
						<img class="bg-img card-img-top img-fluid" src="${video.thumb_url}">
						<img class="card-img-overlay w-50 mx-auto mt-2" src="images/play.png">
						<div class="card-body px-0">
							<h5>${video.title}</h5>
							<p>${video['sub-title']}</p>
							<div class="d-flex row" style="flex-wrap: nowrap;">
								<img class="mx-3 rounded-circle" src="${video.author_pic_url}" alt="Author image" height="25px">
								<h6 class="purple">${video.author}</h6>
							</div>
							<div class="d-flex row mx-auto">
								<img src="images/star_on.png" height="15px">
								<img src="images/star_on.png" height="15px">
								<img src="images/star_on.png" height="15px">
								<img src="images/star_on.png" height="15px">
								<img src="images/star_off.png" height="15px">
								<p class="purple col ml-auto">${video.duration}</p>
							</div>
						</div>
					</div>
					`
				);
			});
	
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// handle error response
		},
		complete: function () {
			// make first slide active and disable automatic sliding
			$('#video-1').addClass('active');
			$('#carousel-latest').attr('data-interval', false);

			// modify number of slides that are displayed at a time
			$('#carousel-latest').attr('data-ride', 'carousel').find('.carousel-item').removeClass('col-12 col-sm-6 col-md-4 col-lg-3').addClass('col-12 col-md-6 col-lg-4');

		
			// remove loader
			$('#latestLoader').remove();
			$('#carousel-latest-controls').removeClass('d-none');
		}
	});
})
