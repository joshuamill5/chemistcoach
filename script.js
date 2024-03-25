document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.nav-button');
    var infoContents = document.querySelectorAll('.info-content');
    var introContents = document.querySelectorAll('intro-content');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            // First, hide all information sections
            infoContents.forEach(function (content) {
                content.style.display = 'none';
            });

            // Then, show the related information section
            var target = this.getAttribute('data-target');
            var info = document.getElementById(target);
            info.style.display = 'block';
        });
    });
});


//The duolingo style quiz

document.addEventListener('DOMContentLoaded', function () {
    var answerButtons = document.querySelectorAll('#answer-options .option, #answer-options .answer');
    var checkButton = document.querySelector('.check');
    var selectedAnswer = null;
    var correctAnswer = 'Matter'; // Correct answer for the current question

    // Function to remove highlights from all answer buttons
    function clearHighlights() {
        answerButtons.forEach(function (button) {
            button.classList.remove('highlighted');
        });
    }

    // Add click event listeners to answer buttons
    answerButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            clearHighlights();
            button.classList.add('highlighted');
            selectedAnswer = button.textContent.trim();
        });
    });

    // Add click event listener to check button
    checkButton.addEventListener('click', function () {
        if (selectedAnswer === correctAnswer) {
            displayNextQuestion();
        } else if (selectedAnswer) {
            displayTryAgain();
        } else {
            alert('Please select an option.');
        }
    });

    function displayNextQuestion() {
        // Implement logic to display the next question here
        alert('Correct! Moving to the next question.'); // Placeholder
        // For example, you could change the question text and options dynamically here
    }

    function displayTryAgain() {
        // Implement logic to encourage the user to try again
        alert('Incorrect. Try again.'); // Placeholder
        // You could also highlight the correct or incorrect answers here
    }
});

//-----------------------------------------------------------------------------------------------


