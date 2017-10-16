$(document).ready(function() {
    //title:'',answer:'',distractor1:'',distractor2:'',distractor3:'',answeredCorrectly:false,id:0
	var questions = [{title:'Who invented the light bulb?',answer:'Thomas Edison',distractor1:'Albert Einstein',distractor2:'Ghandi',distractor3:'Jeff',answeredCorrectly:false,id:0},
	{title:'Where is Argentina located?',answer:'South America',distractor1:'North America',distractor2:'Europe',distractor3:'Africa',answeredCorrectly:false,id:0},
	{title:'What is the shape of Earth?',answer:'Sphere',distractor1:'Square',distractor2:'Triangle',distractor3:'Yes',answeredCorrectly:false,id:0}];
	var questionsRandomized = [];
	var currentQuestionIndex = 0;
	var time = 12;

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
		setInterval(timeDec, 1000);
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
			currentQuestionIndex++;
			$(".answer-button").removeClass("btn-success");
			$(".answer-button").addClass("btn-primary");
			displayNextQuestion();

			if (currentQuestionIndex > 0){
				$(".go-back-button").css("display", "unset");
			}
		}
	})
	
	$(".go-back-button").on("click", function(){
		if(currentQuestionIndex > 0){
			currentQuestionIndex--;
			if(currentQuestionIndex === 0){
				$(".go-back-button").css("display", "none");
			}
			$(".answer-button").removeClass("btn-success");
			$(".answer-button").addClass("btn-primary");
			displayNextQuestion();
		}
	})

	
});




