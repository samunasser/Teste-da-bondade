'use strict';

$(document).ready(function() {

	window.index = 0;
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
			window.question();
		});
	};

	window.question = function() {
		window.index++;
		if(window.index > window.json.length) { 
			window.alert('acabou');
		}
		window.createMenu(window.json,window.index);
		$('input[name=answer]').attr('checked',false);
		$('.questions').removeClass('hide');
		$('#question').html(window.json[window.index].title);
		$('#option-1').html(window.json[window.index].option1);
		$('#option-2').html(window.json[window.index].option2);
		$('#option-3').html(window.json[window.index].option3);
		$('#option-4').html(window.json[window.index].option4);

	};

});