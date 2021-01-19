// By Ann Xu, Jan 2021
// Random exercise generator for a 10 minute arms, legs, or abs workout

// Some features did not make it to the smart mirror (simplicity with voice control)
// View full functionality by opening this in a browser

const FULL_DASH_ARRAY = 283;

let TIME_LIMIT = 0;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let go = 1;

let limit_Full = 0;
let timePassed_Full = 0;
let timeLeft_Full = limit_Full;
let timerInterval_Full = null;
let go_full = 1;

var exerciseList = []; // list of exercise objects (exercise name and time in seconds)
var exerciseTime = 0; // total time passed in the current workout
var previous = ''; // previous exercise on screen
var now = ''; // current exercise on screen
var next = ''; // next exercise on screen
var group = ''; // either abs, legs, or arms

var text ='{"abs": [' +
'{ "exercise":"Bicycle crunches", "time":30 },' +
'{ "exercise":"Cross sit-ups", "time":30 },' +
'{ "exercise":"Russian twists", "time":30 },' +
'{ "exercise":"Jack knife", "time":30 },' +
'{ "exercise":"Reverse crunch", "time":30 },' +
'{ "exercise":"Starfish crunch", "time":30 },' +
'{ "exercise":"Plank", "time":30 },' +
'{ "exercise":"Plank", "time":60 },' +
'{ "exercise":"Plank", "time":90 },' +
'{ "exercise":"Plank", "time":120 },' +
'{ "exercise":"V-ups", "time":30 },' +
'{ "exercise":"Spider plank", "time":30 },' +
'{ "exercise":"Roll ins", "time":30 },' +
'{ "exercise":"Flutter kicks", "time":30 },' +
'{ "exercise":"Scissor kicks", "time":30 },' +
'{ "exercise":"Hold", "time":30 },' +
'{ "exercise":"Rainbows", "time":30 },' +
'{ "exercise":"Side plank hold", "time":60 },' +
'{ "exercise":"Mountain climbers", "time":30 },' +
'{ "exercise":"Mountain climbers", "time":60 },' +
'{ "exercise":"Side plank raises", "time":60 },' +
'{ "exercise":"Side ballerinas", "time":60 },' +
'{ "exercise":"Lemon squeezers", "time":30 },' +
'{ "exercise":"Rocking plank", "time":30 },' +
'{ "exercise":"Heel touches", "time":30 },' +
'{ "exercise":"Alt cross reach", "time":30 },' +
'{ "exercise":"Toe touches", "time":30 },' +
'{ "exercise":"Alt crunch claps", "time":30 },' +
'{ "exercise":"Plank twist", "time":30 },' +
'{ "exercise":"Plank twist", "time":60 },' +
'{ "exercise":"Diagonal plank", "time":60 },' +
'{ "exercise":"Alt leg drops", "time":30 },' +
'{ "exercise":"Crunch russian twists", "time":30 },' +
'{ "exercise":"Plank jacks", "time":30 },' +
'{ "exercise":"Tuck claps", "time":30 },' +
'{ "exercise":"Ab rollouts", "time":30 },' +
'{ "exercise":"Side plank crunch", "time":60 },' +
'{ "exercise":"Side v-ups", "time":60 },' +
'{ "exercise":"Cross toe touches", "time":30 },' +
'{ "exercise":"Tabletop pulses", "time":30 },' +
'{ "exercise":"Bear crawl", "time":30 },' +
'{ "exercise":"Deadbug", "time":30 },' +
'{ "exercise":"Sit ups", "time":30 },' +
'{ "exercise":"V-hold", "time":30 },' +
'{ "exercise":"Rest", "time":30 },' +
'{ "exercise":"leg lifts", "time":30 } ],' +
'"legs": [' +
'{ "exercise":"Fire hydrants", "time":60 },' +
'{ "exercise":"Fire hydrants", "time":120 },' +
'{ "exercise":"Squats", "time":30 },' +
'{ "exercise":"Squats", "time":60 },' +
'{ "exercise":"Squat pulses", "time":30 },' +
'{ "exercise":"Squat pulses", "time":60 },' +
'{ "exercise":"Lunges", "time":60 },' +
'{ "exercise":"Wide squats", "time":30 },' +
'{ "exercise":"Wide squats", "time":60 },' +
'{ "exercise":"Wide squat pulses", "time":30 },' +
'{ "exercise":"Wide squat pulses", "time":60 },' +
'{ "exercise":"Reverse lunges", "time":60 },' +
'{ "exercise":"Jump squats", "time":30 },' +
'{ "exercise":"Jump squats", "time":60 },' +
'{ "exercise":"Squat hold", "time":30 },' +
'{ "exercise":"Squat hold", "time":60 },' +
'{ "exercise":"Wide squat hold", "time":30 },' +
'{ "exercise":"Wide squat hold", "time":60 },' +
'{ "exercise":"Pistol squats", "time":30 },' +
'{ "exercise":"Side steps", "time":30 },' +
'{ "exercise":"Frog raises", "time":30 },' +
'{ "exercise":"Frog raises", "time":60 },' +
'{ "exercise":"Hamstring raises", "time":60 },' +
'{ "exercise":"Squat abductors", "time":30 },' +
'{ "exercise":"Squat abductors", "time":60 },' +
'{ "exercise":"Frog hold", "time":30 },' +
'{ "exercise":"Frog hold", "time":60 },' +
'{ "exercise":"Donkey kicks", "time":60 },' +
'{ "exercise":"Donkey kicks", "time":120 },' +
'{ "exercise":"Standing leg raises", "time":60 },' +
'{ "exercise":"Standing leg raises", "time":120 },' +
'{ "exercise":"Standing leg hold", "time":60 },' +
'{ "exercise":"Standing leg hold", "time":120 },' +
'{ "exercise":"Glute bridge", "time":30 },' +
'{ "exercise":"Glute bridge", "time":60 },' +
'{ "exercise":"Glute bridge hold", "time":30 },' +
'{ "exercise":"Glute bridge hold", "time":60 },' +
'{ "exercise":"Glute bridge abductors", "time":30 },' +
'{ "exercise":"Sitting abductors", "time":30 },' +
'{ "exercise":"High knees", "time":30 },' +
'{ "exercise":"Single leg deadlift", "time":60 },' +
'{ "exercise":"Frog abductors", "time":30 },' +
'{ "exercise":"Frog abductors", "time":60 },' +
'{ "exercise":"Fire hydrant pulses", "time":60 },' +
'{ "exercise":"Rest", "time":30 },' +
'{ "exercise":"Rainbows", "time":30 } ],' +
'"arms": [' +
'{ "exercise":"Curls", "time":30 },' +
'{ "exercise":"Tricep dips", "time":30 },' +
'{ "exercise":"Flappy bird", "time":30 },' +
'{ "exercise":"Flappy bird", "time":60 },' +
'{ "exercise":"Pushups", "time":30 },' +
'{ "exercise":"Pushups", "time":60 },' +
'{ "exercise":"Tricep pushups", "time":30 },' +
'{ "exercise":"Plank", "time":60 },' +
'{ "exercise":"Plank", "time":120 },' +
'{ "exercise":"Pushup clap", "time":30 },' +
'{ "exercise":"Arm circles", "time":60 },' +
'{ "exercise":"Arm circles", "time":90 },' +
'{ "exercise":"T-hold", "time":30 },' +
'{ "exercise":"T-hold", "time":60 },' +
'{ "exercise":"Chest press", "time":30 },' +
'{ "exercise":"Up downs", "time":30 },' +
'{ "exercise":"Up downs", "time":60 },' +
'{ "exercise":"Tricep extensions", "time":30 },' +
'{ "exercise":"Lateral raises", "time":30 },' +
'{ "exercise":"Bent over rows", "time":30 },' +
'{ "exercise":"Front raises", "time":30 },' +
'{ "exercise":"Overhead press", "time":30 },' +
'{ "exercise":"Dolphin hold", "time":30 },' +
'{ "exercise":"Diamond pushups", "time":30 },' +
'{ "exercise":"Upright rows", "time":30 },' +
'{ "exercise":"Chest fly", "time":30 },' +
'{ "exercise":"Chest fly", "time":60 },' +
'{ "exercise":"Hammer curls", "time":30 },' +
'{ "exercise":"Bent over raises", "time":30 },' +
'{ "exercise":"Mountain climbers", "time":30 },' +
'{ "exercise":"Mountain climbers", "time":60 },' +
'{ "exercise":"Burpies", "time":30 },' +
'{ "exercise":"Burpies", "time":60 },' +
'{ "exercise":"Burpies", "time":90 },' +
'{ "exercise":"Skull crushers", "time":30 },' +
'{ "exercise":"Plank shoulder taps", "time":30 },' +
'{ "exercise":"Pushup row", "time":30 },' +
'{ "exercise":"Alt curls", "time":60 },' +
'{ "exercise":"Chest press pulse", "time":90 },' +
'{ "exercise":"Chest press pulse", "time":60 },' +
'{ "exercise":"Dolphin pushups", "time":30 },' +
'{ "exercise":"Drive the bus", "time":30 },' +
'{ "exercise":"Wring the towel", "time":30 },' +
'{ "exercise":"Cross body curl", "time":30 },' +
'{ "exercise":"Rest", "time":30 },' +
'{ "exercise":"Rest", "time":30 },' +
'{ "exercise":"arm circles", "time":30 } ]}';

var obj = JSON.parse(text);

const exerciseOptions = ["abs","legs","arms"];

document.getElementById("app").innerHTML = `
<div class="flex">
<div class="base-timer">
  <div id="exercises">${formatExercises()}</div>
  <div id="full-timer-label">${formatTime(timeLeft_Full)}</div>
</div>
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining white"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
  <span> <button type="button" onclick="startTimer_Full()">Start</button>
  <button type="button" onclick="pauseTimer()">Pause</button>
  <button type="button" onclick="resumeTimer()">Resume</button>
  <button type="button" onclick="setTimer('abs', 5)">5 min abs</button>
  <button type="button" onclick="setTimer('legs', 0.5)">30 sec legs</button>
  <button type="button" onclick="setTimer('arms', 8)">8 min arms</button>
  <button type="button" onclick="setTimer()">Reset</button>
  </span>
</div>
</div>
`;

function pauseTimer() {
  go = 0;
}

function resumeTimer() {
  go = 1;
}

// small timer for indivdual exercise (on the right of the UI)
function onTimesUp() {
  clearInterval(timerInterval);
  go = 1;
  document.getElementById("exercises").innerHTML = formatExercises();
  startTimer(now.time);
}

// full timer for the workout (on the left of the UI)
function onTimesUp_Full() {
  clearInterval(timerInterval_Full);
  clearInterval(timerInterval);
  document.getElementById("exercises").innerHTML = exerciseOverview();
  document.getElementById("full-timer-label").innerHTML = "GOOD WORK!";
  document.getElementById("base-timer-label").innerHTML = "DONE";
  go = 1;
}

// Sets the workout to abs, arms, or legs and the total time
// Keeps previous exercise group (if none then random)
// Keeps previous amount of time (if none, defaults to 10 mins on start)
function setTimer(exerciseGroup, totalTime) { // total time is in minutes
  if (!exerciseGroup) { // reset
    if (group=='') {
      group = exerciseOptions[Math.floor(Math.random() * 3)];
    }
  }
  else {
    group = exerciseGroup;
  }

  if (totalTime) {
    limit_Full = totalTime *60;
  }

  exerciseList =[];
  exerciseTime = 0;
  document.getElementById("exercises").innerHTML = formatExercises();

  timePassed = 0;
  TIME_LIMIT = 0;
  timeLeft = TIME_LIMIT;
  clearInterval(timerInterval);
  document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
  );
  setCircleDasharray();

  timePassed_Full = 0;
  timeLeft_Full = limit_Full;
  clearInterval(timerInterval_Full);
  document.getElementById("full-timer-label").innerHTML = formatTime(
    timeLeft_Full
  );

  go = 1;

}

// start small timer
function startTimer(input) {
  timePassed = 0;
  TIME_LIMIT = input; // seconds
  timeLeft = TIME_LIMIT;
  clearInterval(timerInterval);
  document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
  );
  setCircleDasharray();
  go = 1;
  timerInterval = setInterval(() => {
    if (go==1){
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );

      setCircleDasharray();

      if (timeLeft <= 0) {
        onTimesUp();
      }
    }
  }, 1000);
}

// start full workout
// should set a workout first using setTimer()
// -> or else random group is chosen and 10 mins default length
function startTimer_Full() {
  if (!limit_Full) {
    limit_Full = 600; // 10 minutes default
  }
  if (group=='') {
    group = exerciseOptions[Math.floor(Math.random() * 3)];
  }
  timePassed_Full = 0;
  timeLeft_Full = limit_Full;
  clearInterval(timerInterval_Full);
  document.getElementById("full-timer-label").innerHTML = formatTime(
    timeLeft_Full
  );
  go = 1;
  if (exerciseList.length!=1) {
    exerciseList =[];
    exerciseTime = 0;
    document.getElementById("exercises").innerHTML = formatExercises();
  }
  startTimer(5);
  timerInterval_Full = setInterval(() => {
    if (go==1 && now!="LET\'S BEGIN") {
      document.getElementById("full-timer-label").innerHTML = formatTime(
        timeLeft_Full
      );
      if (timeLeft_Full <= 0) {
        onTimesUp_Full();
      }
      timePassed_Full = timePassed_Full += 1;
      timeLeft_Full = limit_Full - timePassed_Full;

    }
  }, 1000);
}

// formatTime(), calculateTimeFraction(), and setCircleDasharray() are from Mateusz Rybczonec
// https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/#top-of-site
// used to create animation of small timer

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}


function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

// formats the html of the exercise list display on the left of the UI
function formatExercises() {
  // exerciseList is a backwards list of exercise objects (attributes exercise and time)
  // index 0 being next, 1 being present, and 2 being previous exercise
  if (group=='') { // initial start screen
    return "<div class='top-exercise'>GETTING STARTED" +
    "</div><div style='margin-top:10px;margin-bottom:10px'>" +
    "<div>Say \'Magic Mirror... </div>set an " +
    "<span style='color:grey'>[ab,leg,arm] </span>" +
    "workout for " + "<span style='color:grey'>[10] </span>" +
    "mins'</div>";
  }
  else {
    var random = obj[group][Math.floor(Math.random() * obj[group].length)];

    if (exerciseList.length == 0) { //exercise chosen, let's begin screen
      exerciseList[0] = obj[group][Math.floor(Math.random() * obj[group].length)];
      exerciseTime = exerciseTime + exerciseList[0].time;
      now = "LET\'S BEGIN";
      next = exerciseList[0];
      return "<div class='top-exercise', style='height:50px'>" +
      "</div><div style='font-size:150%;margin-top:10px;margin-bottom:10px'>" +
      now + "</div><div style='color:grey'>" + next.exercise + "</div>";
    }
    else if (exerciseList.length == 1) { // workout begun, first exercise screen
      exerciseList.unshift(random);
      exerciseTime = exerciseTime + random.time;
      previous = now;
      now = next;
      next = exerciseList[0];
      return "<div class='top-exercise'>" + previous +
      "</div><div style='font-size:150%;margin-top:10px;margin-bottom:10px'>" +
      now.exercise + "</div><div style='color:grey'>" + next.exercise + "</div>";
    }
    else if (exerciseTime == limit_Full) { // last exercise screen
      previous = now;
      now = next;
      next = ' ';
      return "<div class='top-exercise'><s>" + previous.exercise +
      "</s></div><div style='font-size:150%;margin-top:10px;margin-bottom:10px'>" +
      now.exercise + "</div><div style='color:grey'>" + next + "</div>";
    }
    else { // load the next random exercise and cross out the previous
      while (exerciseTime + random.time > limit_Full) {
        random = obj[group][Math.floor(Math.random() * obj[group].length)];
      }
      exerciseList.unshift(random);
      exerciseTime = exerciseTime + random.time;
      previous = now;
      now = next;
      next = random;
      return "<div class='top-exercise'><s>" + previous.exercise +
      "</s></div><div style='font-size:150%;margin-top:10px;margin-bottom:10px'>" +
      now.exercise + "</div><div style='color:grey'>" + next.exercise + "</div>";
    }
  }
}

// formats summary list of exercises after the workout
function exerciseOverview() {
  console.log(exerciseList);
  var html = "<div style='font-size:50px;margin:20px 0px;color:grey'>" +
  Math.round(limit_Full/60).toString()+ " MINUTE " +group.toUpperCase()+ "</div>";
  if (exerciseList.length <=13) {
    for (var n=0; n<exerciseList.length; n++) {
      html = html + "<div style='font-size:15px;margin:3px'>" +
      exerciseList[n].exercise + "</div>";
    }
    return html;
  }
  else {
    html = html + "<div class='flex'><div style='width:220px'>";
    for (var n=0; n<=13; n++) {
      html = html + "<div style='font-size:15px;margin:3px'>" +
      exerciseList[n].exercise + "</div>";
    }
    html = html+ "</div><div style='width:220px'>";
    for (var x=14; x<exerciseList.length; x++) {
      html = html + "<div style='font-size:15px;margin:3px'>" +
      exerciseList[x].exercise + "</div>";
    }
    html = html+"</div></div>";
    return html;
  }
}
