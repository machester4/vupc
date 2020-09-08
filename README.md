<img src="https://github.com//machester4/vupc/blob/master/logo.png?raw=true" title="" alt="logo" data-align="center">

# **VUPC**

> WebRTC screensharing Electron app for all desktop platforms

## Table of contents

* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)
  
## General info
  
VUPC is an open source screen sharing + remote collaboration application for Mac OS, Linux, Windows. You can share your desktop with someone else while letting them share your mouse and keyboard remotely. Right now it is not as good as commercial alternatives, mostly because this initial prototype was written in 3 days. [The big difference is that you can send PRs to make VUPC better](https://github.com/machester4/vupc)
  
## Screenshots
  ![Example screenshot](https://github.com/machester4/vupc/blob/master/screenshot.png?raw=true)

## Demo
You can **download** the demo application which may **not be up to date with the latest changes in master**. This application uses our server for signaling.
* [MacOS](https://drive.google.com/file/d/15eohUZNS0Vgd9YpBUTsd21IuKtdqriZD/view?usp=sharing)
* [Linux](https://drive.google.com/file/d/1iS4YPbWAH87yQgRc7nIkajDAG2t9LWo2/view?usp=sharing)

## Technologies
* Electron - version 9.0
* VueJS - version 2.6
* NodeJS - version 13.9
  
## Setup
You can download the binaries already compiled, or you can compile a local version yourself.
  
  ## Building the app
  
   **Requirements**
  - Common - [NodeJS](https://nodejs.org/en/) & [Yarn](https://classic.yarnpkg.com/en/docs/install) 
  - MacOS - [XCode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
  - Windows - [Microsoft visual studio build tools 2017](https://chocolatey.org/packages/visualstudio2017buildtools)
  - Linux - libxtst & libpng `sudo apt-get install libxtst-dev libpng++-dev`
  
  
  
  Clone repository :
  `git clone git@github.com:machester4/vupc.git`
  
  
  
  Install server dependencies :
  
  `cd server && yarn`
  
  
  
  Install app dependencies :
  
  `cd app && yarn`
  
  
  
  run server :
  
  `cd server && yarn run start:debug`
  
  
  
  run app :
  
  `cd app && yarn run electron:serve`
  
  
  
## Features
  
List of features ready and TODOs for future development
* Share screen
* Mouse click event in host
  To-do list:
* Keyboard events in host
* Your ideas :)
  
## Status
  
VUPC is currently **ALPHA STATUS** and is intended for developers/early adopters. Check out the Issues to get involved. VUPC is a volunteer run project, your contributions and improvements are welcome!
  
  ## Inspiration
  
  This project is inspired by [ScreenCat](https://github.com/maxogden/screencat) which was discontinued a long time ago.
  
  ## Contact
  
  Created by [@machester4 (Michael Pintos)](https://github.com/machester4) - feel free to contact me!

### MIT License


