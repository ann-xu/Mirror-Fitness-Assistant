# Mirror-Fitness-Assistant

By Ann Xu, Jan 2021

A fitness assistant app built for a smart mirror (MagicMirror2).

This project adds voice control and a fitness assistant to the Magic Mirror software. The fitness assistant is an Electron app that creates a workout by randomly picking from a list of 45 abs, legs, or arms exercises. Each of these workouts are 10 minutes and they are split into separate files (abs/legs/arms) for simplicity with voice control. This repository includes the voice control Python file (speech.py) as well as the JS/HTML files for the abs, legs, and arms workout generators. I also included the .sh files for anyone curious at how I connected everything back to the voice commands. 

The repository also includes workout.html and workout.js, which are the browser version of the fitness application. This was my original design and it has full functionality with set, reset, etc using buttons. Unfortunately, most of these features did not make it to the Electron app on the smart mirror (voice commands are more limited than buttons), but I recommend opening workout.html in a browser to try it out! 
