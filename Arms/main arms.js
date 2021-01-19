// By Ann Xu, Jan 2021
// Random exercise generator for a 10 minute arms workout

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
var group = 'arms';

var text = '{"arms": [' +
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

const { app, BrowserWindow } = require('electron')

var win = null;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    darkTheme: true,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: "#000000"
  })

  win.loadFile('index.html')
  win.webContents.executeJavaScript('document.getElementById("exercises").innerHTML = "'+ formatExercises() + '";' +
    'document.getElementById("full-timer-label").innerHTML = "' + formatTime(timeLeft_Full) + '";' +
    'document.getElementById("base-timer-label").innerHTML = "' + formatTime(timeLeft) + '";', true).then(console.log('JavaScript Executed Successfully'));
  setTimer(10);
  startTimer_Full();

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// small timer for indivdual exercise (on the right of the UI)
function onTimesUp() {
  clearInterval(timerInterval);
  go = 1;
  win.webContents.executeJavaScript('document.getElementById("exercises").innerHTML = "'+ formatExercises() + '";', true)
        .then(console.log('JavaScript Executed Successfully'));
  startTimer(now.time);
}

// full timer for the workout (on the left of the UI)
function onTimesUp_Full() {
  clearInterval(timerInterval_Full);
  clearInterval(timerInterval);
  win.webContents.executeJavaScript('document.getElementById("exercises").innerHTML = "'+ exerciseOverview() + '";' +
  'document.getElementById("full-timer-label").innerHTML = "GOOD WORK!";' +
  'document.getElementById("base-timer-label").innerHTML = "DONE";', true)
        .then(console.log('JavaScript Executed Successfully'));

  go = 1;
}

// Sets the workout and total time
// Keeps previous amount of time (if none, defaults to 10 mins on start)
function setTimer(totalTime) { // total time is in minutes

  if (totalTime) {
    limit_Full = totalTime *60;
  }

  exerciseList =[];
  exerciseTime = 0;
  win.webContents.executeJavaScript('document.getElementById("exercises").innerHTML = "'+ formatExercises() + '";', true)
        .then(console.log('JavaScript Executed Successfully'));

  timePassed = 0;
  TIME_LIMIT = 0;
  timeLeft = TIME_LIMIT;
  clearInterval(timerInterval);
  win.webContents.executeJavaScript('document.getElementById("base-timer-label").innerHTML = "'+ formatTime(timeLeft) + '";', true)
        .then(console.log('JavaScript Executed Successfully'));
  setCircleDasharray();

  timePassed_Full = 0;
  timeLeft_Full = limit_Full;
  clearInterval(timerInterval_Full);
  win.webContents.executeJavaScript('document.getElementById("full-timer-label").innerHTML = "'+ formatTime(timeLeft_Full) + '";', true)
        .then(console.log('JavaScript Executed Successfully'));

  go = 1;

}

// start small timer
function startTimer(input) {
  timePassed = 0;
  TIME_LIMIT = input; // seconds
  timeLeft = TIME_LIMIT;
  clearInterval(timerInterval);
  // document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
  win.webContents.executeJavaScript('document.getElementById("base-timer-label").innerHTML = "'+ formatTime(timeLeft) + '";', true)
        .then(console.log('JavaScript Executed Successfully'));
  setCircleDasharray();
  go = 1;
  timerInterval = setInterval(() => {
    if (go==1){
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      // document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
      win.webContents.executeJavaScript('document.getElementById("base-timer-label").innerHTML = "'+ formatTime(timeLeft) + '";', true)
            .then(console.log('JavaScript Executed Successfully'));

      setCircleDasharray();

      if (timeLeft <= 0) {
        onTimesUp();
      }
    }
  }, 1000);
}

// start full workout
// should set a workout first using setTimer()
function startTimer_Full() {
  if (!limit_Full) {
    limit_Full = 600; // 10 minutes default
  }
  timePassed_Full = 0;
  timeLeft_Full = limit_Full;
  clearInterval(timerInterval_Full);
  // document.getElementById("full-timer-label").innerHTML = formatTime(timeLeft_Full);
  win.webContents.executeJavaScript('document.getElementById("full-timer-label").innerHTML = "'+ formatTime(timeLeft_Full) + '";', true)
        .then(console.log('JavaScript Executed Successfully'));

  go = 1;
  if (exerciseList.length!=1) {
    exerciseList =[];
    exerciseTime = 0;
    // document.getElementById("exercises").innerHTML = formatExercises();
    win.webContents.executeJavaScript('document.getElementById("exercises").innerHTML = "'+ formatExercises() + '";', true)
          .then(console.log('JavaScript Executed Successfully'));
  }
  startTimer(15);
  timerInterval_Full = setInterval(() => {
    if (go==1 && now!="LET\'S BEGIN") {
      // document.getElementById("full-timer-label").innerHTML = formatTime(timeLeft_Full);
      win.webContents.executeJavaScript('document.getElementById("full-timer-label").innerHTML = "'+ formatTime(timeLeft_Full) + '";', true)
            .then(console.log('JavaScript Executed Successfully'));
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
  // document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);

  win.webContents.executeJavaScript('document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray","'+ circleDasharray + '");', true)
        .then(console.log('JavaScript Executed Successfully'));
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
  var html = "<div style='font-size:80px;margin:20px 0px;color:grey'>" +
  Math.round(limit_Full/60).toString()+ " MINUTE " +group.toUpperCase()+ "</div>";
  if (exerciseList.length <=13) {
    for (var n=0; n<exerciseList.length; n++) {
      html = html + "<div style='font-size:20px;margin:3px'>" +
      exerciseList[n].exercise + "</div>";
    }
    return html;
  }
  else {
    html = html + "<div class='flex'><div style='width:250px'>";
    for (var n=0; n<=13; n++) {
      html = html + "<div style='font-size:20px;margin:3px'>" +
      exerciseList[n].exercise + "</div>";
    }
    html = html+ "</div><div style='width:250px'>";
    for (var x=14; x<exerciseList.length; x++) {
      html = html + "<div style='font-size:20px;margin:3px'>" +
      exerciseList[x].exercise + "</div>";
    }
    html = html+"</div></div>";
    return html;
  }
}
