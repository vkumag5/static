// this method starts the timer depending on the time duration supplied.
function startTimerForLockedAccount(totalTime, minSection, secSection) {
    var timer = totalTime, minutes, seconds;
    var handler = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
		seconds = (seconds < 10 ? '0' : '') + seconds;
        minSection.text(minutes);
        secSection.text(":" + seconds);
        if (--timer < 0) {
			clearInterval(handler);
			enableLoginFields();
			hideTimerSection();
        }
    }, 1000);
}

// calls the timer for locked account.
function triggerTimer(timeDuration) {
	var minSection = jQuery('#minutesSection'),
	secSection = jQuery('#secondsSection'), timeDuration = parseInt(timeDuration);
	if(timeDuration > 0) {
		startTimerForLockedAccount(timeDuration, minSection, secSection);
		disableLoginFields();	
		showTimerSection();
	} else if(timeDuration === -1) {
		// user's account is permanently locked.
		disableLoginFields();
	}
}

// hides the timer section on login page.
function hideTimerSection() {
	jQuery('#lockedAccountMsgSection').hide();
}

// shows the timer section on login page.
function showTimerSection() {
	jQuery('#lockedAccountMsgSection').show();
}

// enables the UI fields for login on login page.
function enableLoginFields() {
	document.getElementById("login:uname").disabled = false;
	document.getElementById("login:pword").disabled = false;
	document.getElementById("login:signInButton").disabled = false;
}

// enables the UI fields for login on login page.
function disableLoginFields() {
	document.getElementById("login:uname").disabled = true;
	document.getElementById("login:pword").disabled = true;
	document.getElementById("login:signInButton").disabled = true;
}