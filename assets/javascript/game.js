$(document).ready(function() {
    //title:'',answer:'',distractor1:'',distractor2:'',distractor3:'',answeredCorrectly:false,id:0
	var questions = [{title:'Who invented the light bulb?',answer:'Thomas Edison',distractor1:'Albert Einstein',distractor2:'Ghandi',distractor3:'Jeff',answeredCorrectly:false,id:0},
	{title:'Where is Argentina located?',answer:'South America',distractor1:'North America',distractor2:'Europe',distractor3:'Africa',answeredCorrectly:false,id:0},
	{title:'What is the shape of Earth?',answer:'Sphere',distractor1:'Square',distractor2:'Triangle',distractor3:'Yes',answeredCorrectly:false,id:0},
	{title:'The United States has how many States?',answer:'50',distractor1:'55',distractor2:'40',distractor3:'22',answeredCorrectly:false,id:0},
	{title:'Which artist created the sculpture "The Thinker"?',answer:'Auguste Rodin',distractor1:'Leonardo Davinci',distractor2:'Pablo Picasso',distractor3:'Claude Monet',answeredCorrectly:false,id:0},
	{title:'What is the Largest Ocean on Planet Earth',answer:'Pacific',distractor1:'Atlantic',distractor2:'Indian',distractor3:'Arctic',answeredCorrectly:false,id:0},
	{title:'What popular soda beverage was originally developed as a mixer for whiskey?',answer:'Mountain Dew',distractor1:'Pepsi',distractor2:'Coca Cola',distractor3:'Sprite',answeredCorrectly:false,id:0},
	{title:'Au is the Symbol for what Chemical Element?',answer:'gold',distractor1:'silver',distractor2:'copper',distractor3:'nickel',answeredCorrectly:false,id:0},
	{title:'What is the sleepiest animal in the world, sleeping around 22 hours each day?',answer:'Koala',distractor1:'Sloth',distractor2:'Lion',distractor3:'Black bear',answeredCorrectly:false,id:0},
	{title:'Who was the first person to travel into space?',answer:'Yuri Gagarin',distractor1:'Neil Armstrong',distractor2:'Buzz Aldrin',distractor3:'Sally Ride',answeredCorrectly:false,id:0},];
	var questionsRandomized = [];
	var currentQuestionIndex = 0;
	var time = 30;
	var questionIndex = 1;
	var interval;

	function randomizeQuestions(){
		for(i = 0; i < questions.length; i++){
			questions[i].id = Math.floor(Math.random() * 10000) + 1;
		}
		for(u = 0; u < questions.length;){
			var maxValue = 0;
			var maxIndex;
			for(j = 0; j < questions.length; j++){
				if(questions[j].id > maxValue){
					maxValue = questions[j].id;
					maxIndex = j;
				}
			}
			questionsRandomized.push(questions[maxIndex]);
			questions.splice(maxIndex, 1);
		}
	}

	function randomizeAnswers(answer1, answer2, answer3, answer4){
		var answerArray = [answer1, answer2, answer3, answer4];
		var rand1 = Math.floor(Math.random() * answerArray.length);
		$(".button-1").text(answerArray[rand1]);
		answerArray.splice(rand1, 1);
		var rand2 = Math.floor(Math.random() * answerArray.length);
		$(".button-2").text(answerArray[rand2]);
		answerArray.splice(rand2, 1);
		var rand3 = Math.floor(Math.random() * answerArray.length);
		$(".button-3").text(answerArray[rand3]);
		answerArray.splice(rand3, 1);
		var rand4 = Math.floor(Math.random() * answerArray.length);
		$(".button-4").text(answerArray[rand4]);
		answerArray.splice(rand4, 1);

	}

	function resetTimer(){
		interval = setInterval(timeDec, 1000);
	}

	function gameOver(){
		clearInterval(interval);
		var correctQuestions = 0;
		var totalQuestions = 10;
		questionsRandomized.forEach(function(element){
			if(element.answeredCorrectly === true){
				$("#question-results").append("<p>" + element.title + ": " + "Correct!");
				correctQuestions++;
			}else if(element.answeredCorrectly === false){
				// totalQuestions++;
				$("#question-results").append("<p>" + element.title + ": " + "Incorrect!");
			}

			
		})


		$("#results").text(correctQuestions.toString() + "/" + totalQuestions.toString());
		$(".question-container").css("display","none");
		$(".results-container").css("display","block");

	}

	function timeDec(){
		if(time >= 10){
			$(".timer").text("00:" + time);
		}else if(time < 0){
			time = 0;
		}else{
			$(".timer").text("00:0" + time);
			$(".timer").addClass("animated").addClass("infinite").addClass("pulse");
			$(".timer").css("color","red");
		}
		time--;
		if(time === 0){
			setTimeout(function(){
				gameOver();
			}, 2000);
			
		}
	}

	function displayNextQuestion(){
		randomizeAnswers(questionsRandomized[currentQuestionIndex].answer, questionsRandomized[currentQuestionIndex].distractor1, questionsRandomized[currentQuestionIndex].distractor2, questionsRandomized[currentQuestionIndex].distractor3);
		$(".question-text").text(questionsRandomized[currentQuestionIndex].title);
	}

	$(".begin-button").on("click", function(){
		randomizeQuestions();
		displayNextQuestion();
		$(".start-container").css("display","none");
		$(".question-container").css("display","block");
		resetTimer();
	})

	$(".answer-button").on("click", function(){
		$(".answer-button").removeClass("btn-success");
		$(".answer-button").addClass("btn-primary");
		$(this).removeClass("btn-primary");
		$(this).addClass("btn-success");

	})
		
	$(".submit-answer-button").on("click", function(){
		
		if($(".btn-success").text() === questionsRandomized[currentQuestionIndex].answer){
			questionsRandomized[currentQuestionIndex].answeredCorrectly = true;
		}else{
			questionsRandomized[currentQuestionIndex].answeredCorrectly = false;
		}
		if(currentQuestionIndex !== questionsRandomized.length - 1){
			questionIndex++;
			currentQuestionIndex++;
			$(".answer-button").removeClass("btn-success");
			$(".answer-button").addClass("btn-primary");
			$(".submit-answer-button").text(questionIndex.toString() + "/10 Next Question ►");
			displayNextQuestion();

			if (currentQuestionIndex > 0){
				$(".go-back-button").css("display", "unset");
			}
		}else{
			gameOver();
		}
	})
	
	$(".go-back-button").on("click", function(){
		
		if(currentQuestionIndex > 0){
			currentQuestionIndex--;
			if(currentQuestionIndex === 0){
				$(".go-back-button").css("display", "none");
			}
			questionIndex--;
			$(".submit-answer-button").text(questionIndex.toString() + "/10 Next Question ►");
			$(".answer-button").removeClass("btn-success");
			$(".answer-button").addClass("btn-primary");
			displayNextQuestion();
		}
	})

	
});




