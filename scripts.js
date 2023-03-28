$(document).ready(function() {
	// fetch quotes from API
	$.ajax({
		url: 'https://smileschool-api.hbtn.info/quotes',
		method: 'GET',
		success: function(data) {
			console.log('AJAX success'); // AJAX success
			console.log(data); // (2) [{...}, {...}]
			const quotes = data[0];
			console.log(`Quotes: ${quotes}`); // Quotes: [object Object]
			const carousel = $('#testimonial');
			console.log(`Carousel: ${carousel}`); // Quotes: [object Object]

			// loop through each quote and create a carousel item
			data.forEach(function createCard(quote, index) {
				console.log(quote);
				const item = $('<div>').addClass('carousel-item px-5');
				const helper = $('<div>').addClass('d-flex flex-column align-items-center flex-sm-row col-sm-10 carousel-helper m-md-5');
				const avatar = $('<img>').addClass('rounded-circle carousel-avatar').attr('src', quote['pic_url']).attr('width', '210px');
				console.log(quote['pic_url'])
				const content = $('<div>').addClass('px-sm-5');
				const text = $('<p>').addClass('px-2 mt-4 mt-md-0').text(quote['text']);
				console.log(quote['text']);
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
					console.log('active');
				}
			});

			// remove loader and show carousel
			$('#testimonialLoader').remove();
			$('.testimonialCarousel').removeClass('d-none');
		},
		error: function() {
			// handle error
			console.log('Error fetching quotes');
		}
	});
});