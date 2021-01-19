import speech_recognition as sr
import sys, os, pyaudio
from pocketsphinx.pocketsphinx import *
from sphinxbase.sphinxbase import *

modeldir = "/usr/local/share/pocketsphinx/model"
config = Decoder.default_config()
config.set_string('-hmm', os.path.join(modeldir, 'en-us/en-us'))
config.set_string('-dict', os.path.join(modeldir, 'en-us/cmudict-en-us.dict'))
config.set_string('-keyphrase', 'magic mirror')
config.set_float('-kws_threshold', 1e-40)

decoder = Decoder(config)
decoder.start_utt()

p = pyaudio.PyAudio()
stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, input_device_index=2, frames_per_buffer=1024)
stream.start_stream()

while True:
    buf = stream.read(1024)
    decoder.process_raw(buf, False, False)
    if decoder.hyp() != None:
        print("Detected keyword, restarting search")
        stream.close()
        r = sr.Recognizer()
        speech = sr.Microphone(device_index=2)
        with speech as source:
                print("say something!…")
                audio = r.adjust_for_ambient_noise(source)
                audio = r.listen(source)
        try:
                recog = r.recognize_google(audio, language = 'en-US')
                print("You said: " + recog)
                if recog == "quit":
                       break
                elif recog == "home":
                       os.system("pm2 start mm")
                       os.system("pm2 start MagicMirror")
                elif recog == "stop":
                       os.system("pm2 stop mm")
                       os.system("pm2 stop MagicMirror")
                elif recog == "end workout":
                       os.system("pm2 stop arms")
                       os.system("pm2 stop abs")
                       os.system("pm2 stop legs")
                elif recog == "shut down":
                       os.system("sudo shutdown --p now")
                elif recog == "arm workout":
                       os.system("pm2 start /home/pi/arms.sh") 
                elif recog == "ab workout":
                       os.system("pm2 start /home/pi/abs.sh") 
                elif recog == "leg workout":
                       os.system("pm2 start /home/pi/legs.sh") 


        except sr.UnknownValueError:
                print("Google Speech Recognition could not understand audio")
        except sr.RequestError as e:
                print("Could not request results from Google Speech Recognition service; {0}".format(e))

        decoder.end_utt()
        decoder.start_utt()
        stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, input_device_index=2, frames_per_buffer=1024)
        stream.start_stream()





