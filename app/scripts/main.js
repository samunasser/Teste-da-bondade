'use strict';

$(document).ready(function() {

	window.createMenu = function (json, currentQuestion) {
		$('#menu').html('');
		var buttonClass = 'btn-primary';
		if(!currentQuestion) { currentQuestion = 0; }
		for(var i = 1; i < json.length + 1; i++) {
			if(currentQuestion < i) { buttonClass = 'btn-info'; }
			if(currentQuestion === i) { buttonClass = 'btn-primary active'; }
			$('#menu').append('<li class="btn ' + buttonClass + '">' + i + '</li>');
		}
	};

	window.start = function() {
		window.json = '';
		$('header').removeClass('hide');
		$('footer').removeClass('hide');
		$('.jumbotron').remove();
		$.getJSON('questions.json', function(json) {
			console.log('JSON Data: ' + json);
			window.json = json;
			window.createMenu(json,0);
		});
	};

	window.question = function(index) {
		window.alert(window.json[index].title);
	};

});