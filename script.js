document.getElementById('loveButton').addEventListener('click', function() {
    // Hide the button and show the thermometer
    this.style.display = 'none';
    var thermometer = document.getElementById('thermometer');
    thermometer.classList.remove('hidden');
    var message = document.getElementById('message');
    var intermediateMessage = document.getElementById('intermediateMessage');
    
    // Start the animation
    var mercury = document.getElementById('mercury');
    var valueDisplay = document.getElementById('thermometerValue');
    var height = 0;
    var maxHeight = 200; // Height of the thermometer in pixels
    var maxValue = 1000; // Maximum value to display
    var stopValue = 100; // Value to stop at before continuing
    var heightBeyondMax = 800; // Extra height to exceed thermometer
    var totalHeight = maxHeight + heightBeyondMax;
    var pauseDuration = 3000; // Duration to pause at stopValue in milliseconds (3 seconds)
    var intermediateMessageDuration = 2000; // Duration to show intermediate message (2 seconds)
    var increaseSpeed = 15; // Speed of height increase before pause (faster)
    var resumeSpeed = 2; // Speed of height increase after pause (faster)

    function updateDisplay() {
        // Calculate value based on height
        var percentage = (height / maxHeight) * 100; // Convert height to percentage
        var value = Math.min(Math.round((percentage / 100) * stopValue), stopValue);
        valueDisplay.textContent = value + '%'; // Update displayed value with % sign
    }

    function increaseHeight() {
        if (height < maxHeight) {
            height += 1;
            mercury.style.height = height + 'px'; // Set height in pixels
            updateDisplay(); // Update the value display
            setTimeout(increaseHeight, increaseSpeed); // Adjust speed before pause
        } else {
            // Pause at stopValue height
            valueDisplay.textContent = stopValue + '%'; // Set value to stopValue while paused
            setTimeout(() => {
                // Continue increasing height and value after the pause
                intermediateMessage.classList.add('show'); // Show intermediate message after pause
                setTimeout(() => {
                    intermediateMessage.classList.remove('show'); // Hide intermediate message after its duration
                    function continueHeight() {
                        if (height < totalHeight) {
                            height += 1;
                            var additionalHeight = height - maxHeight;
                            var additionalPercentage = (additionalHeight / heightBeyondMax) * 100; // Scale to 1000
                            var value = stopValue + Math.round((additionalPercentage / 100) * (maxValue - stopValue));
                            valueDisplay.textContent = value + '%'; // Update displayed value with % sign
                            mercury.style.height = height + 'px'; // Set height in pixels
                            setTimeout(continueHeight, resumeSpeed); // Adjust speed after pause
                        } else {
                            // Show the message when the animation is complete
                            message.classList.add('show');
                        }
                    }
                    continueHeight();
                }, intermediateMessageDuration); // Duration to show intermediate message
            }, pauseDuration); // Pause for the defined duration
        }
    }

    increaseHeight();
});
