'use strict';

$(document).ready(function() {

	window.index = 0;

	// Shortcut to press enter
	$(document).keypress(function(e) {
		if(e.which === 13) { window.validate(); }
	});



	// Tracks the steps of the test in the header
	window.createMenu = function () {
		$('#menu').html('');
		var buttonClass = 'btn-primary';
		for(var i = 1; i < window.questions.length + 1; i++) {
			if(window.index < i) { buttonClass = 'btn-info'; }
			if(window.index === i) { buttonClass = 'btn-primary active'; }
			$('#menu').append('<li class="btn ' + buttonClass + '">' + i + '</li>');
		}
	};



	// Loads the questions
	window.start = function() {
		window.questions = '';
		$('header').removeClass('hide');
		$('footer').removeClass('hide');
		$('.jumbotron').remove();
		$.getJSON('questions.json', function(json) {
			window.questions = json;
			window.question();
		});
	};



	// Shows the next question
	window.question = function() {
		// If the questions are over, brings the survey form
		if(window.index >= window.questions.length) {
			$('.questions').fadeOut(750, function(){
				$('.survey').removeClass('hide').fadeIn(750);
			});
		} else {
			window.index++;
			window.createMenu();
			$('input[name=answer]').attr('checked',false);
			$('.questions').removeClass('hide');
			$('#question').html(window.questions[window.index-1].title);
			$('#option-1').html(window.questions[window.index-1].option1);
			$('#option-2').html(window.questions[window.index-1].option2);
			$('#option-3').html(window.questions[window.index-1].option3);
			$('#option-4').html(window.questions[window.index-1].option4);
		}
	};


	// Show results
	window.results = function() {
		$('.survey').remove();
		$('.results').removeClass('hide').fadeIn('slow', function() {
			$('#total').html(((window.sum / 110) * 100).toFixed(1) + '%');
			$('#total').fadeIn(1000);
		});
		window.startAnswers();
	};


	// Record to database
	window.validateResults = function() {
		if(!$('input[name=age]').is(':checked') || !$('input[name=gender]').is(':checked') || !$('input[name=religion]').is(':checked')) {
			window.alert('Por favor, preencha todos os dados da nossa pesquisa. :)');
			return false;
		}
		$.post('index.php?save', {
			'age': $('input[name=age]:checked').val(),
			'gender': $('input[name=gender]:checked').val(),
			'religion': $('input[name=religion]:checked').val(),
			'answers': $('#answers').val()
		}).done(function() {
			window.results();
		}).fail(function() {
			window.alert('Não é possível! Ocorreu um erro! :-O\nSe o Chapolin não vier para nos defender, tente novamente daqui a pouquinho.');
		});
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



	// Loads the answers
	window.startAnswers = function() {
		window.answers = '';
		window.index = 0;

		$.getJSON('answers.json', function(json) {
			window.answers = json;
		});
	};



	// Shows the next answer
	window.answer = function() {
		$('.results').addClass('hide');
		// If the questions are over, records to database and show the result
		if(window.index >= window.questions.length) {
			$('.answers').remove();
			$('.results').removeClass('hide');
		} else {
			window.index++;
			window.createMenu();
			$('.answers').removeClass('hide');
			$('#answer-question').html(window.questions[window.index-1].title);
			$('#god-answer').html(window.questions[window.index-1].option3);
			$('#explanation').html(window.answers[window.index-1].answer);
		}
	};
});