'use strict';

$(document).ready(function() {

	window.index = 0;

	// Tracks the steps of the test
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


	// Loads the questions
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


	// Shows the next question
	window.question = function() {
		// If the questions are over, records to database and show the result
		if(window.index >= window.json.length) {
			$('.questions').fadeOut(1000, function(){
				$.post('http://localhost:8888/teste/index.php?save', { 'name': 'John', 'age': '21', 'gender': 'm', 'religion': 'crente', 'answers': '1,2,3,4,1,2,3,4,1,2,3' }).done(function(data) {
					$('.results').removeClass('hide').fadeIn('slow', function() {
						$('#total').html(((window.sum / 110) * 100).toFixed(1) + '%');
						$('#total').fadeIn(1000);
					});
				}).fail(function() {
					window.alert('Não é possível! Ocorreu um erro! :-O\nSe o Chapolin não vier para nos defender, tente novamente daqui a pouquinho.');
				});
			});
		} else {
			window.index++;
			window.createMenu(window.json,window.index);
			$('input[name=answer]').attr('checked',false);
			$('.questions').removeClass('hide');
			$('#question').html(window.json[window.index-1].title);
			$('#option-1').html(window.json[window.index-1].option1);
			$('#option-2').html(window.json[window.index-1].option2);
			$('#option-3').html(window.json[window.index-1].option3);
			$('#option-4').html(window.json[window.index-1].option4);
		}
	};


	// Writes the answers
	window.validate = function() {
		if(!$('input[name=answer]').is(':checked')) {
			window.alert('Ei! Você se esqueceu de marcar a resposta!');
			return false;
		}
		$('#answers').val($('#answers').val() + ',' + $('input[name=answer]:checked').val());
		var result = $('#answers').val().split(',');
		var sum = 0, i, points = 0;
		for(i = 1; i < result.length; i++) {
			if(parseInt(result[i]) === 1) { points = 1; }
			else if(parseInt(result[i]) === 2) { points = 2; }
			else if(parseInt(result[i]) === 3) { points = 10; }
			else if(parseInt(result[i]) === 4) { points = 0; }
			sum += points;
		}
		window.sum = sum;
		window.question();
	};

	// Shortcut to press enter
	$(document).keypress(function(e) {
		if(e.which === 13) { window.validate(); }
	});
});