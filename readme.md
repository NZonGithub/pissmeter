# Pissmeter
Hey there Michael Reeves!
I'm Noud Zandbergen (I was nzgamesnl on twitch, asking why it went subzero), and your chat is stupid.

Don't use a esp32 or whatever that is\
Instead... JUST RUN EVERYTHING FROM THAT RPI.\
A raspberry pi can run express on nodejs as well as respond to
interrupts using some libraries like PiGpio.\
Screw setting up some dumb and insecure post/socket.io connection.

Anyway, don't listen to what I have to say, instead look at this project in action.

## Installation instructions
In order to make this work, you'll have to install the following on your raspberry pi:
- NodeJS (sudo apt install nodejs)
- NPM (sudo apt install npm)
- PIGPIO (sudo apt install pigpio)
- This package (npm install)

Just run it using node .