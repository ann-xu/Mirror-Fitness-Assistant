# Mirror-Fitness-Assistant

By Ann Xu, Jan 2021

A fitness assistant app built for a smart mirror (Magic Mirror project).

This project adds voice control to the basic Magic Mirror software and a fitness assistant (abs, legs, or arms), which curates a workout by randomly picking from a list of 45 exercises. Each of these workouts are 10 minutes and they are split into separate files (abs, legs, arms) for simplicity with voice control. In this repository is the voice control file (speech.py) as well as the files for the abs, legs, and arms random workout generators. I also included the .sh files for anyone curious at how I connected everything back to the voice commands. 

The repository also includes workout.html and workout.js, which is the browser version of the fitness application. This was my original design and it has full functionality with set, reset, etc using buttons. Unfortunally, most of these features did not make it to the Electron app on the smart mirror (voice commands are more limited than buttons), but I recommend opening workout.html in a browser to try it out! 
