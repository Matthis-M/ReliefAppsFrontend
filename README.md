# ReliefAppsFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.


## Setting up the application

Installation for Debian 10.4. For other operating systems, please consult the related documentations.
If Git, NodeJS, npm and Angular CLI are already installed, you can skip to step 4. However, make sure to have recent enough versions.

1. Install Git with ```sudo apt-get install git```
2. Install NodeJS and npm latest version by doing : ```sudo curl -sL https://deb.nodesource.com/setup_15.x | sudo bash -``` then ```sudo apt-get install -y nodejs```
3. Install angular CLI in a global scope with ```sudo npm install -g @angular/cli```
4. Clone this Git repository with the [following link](https://github.com/Matthis-M/ReliefAppsFrontend.git)
5. Move inside the folder and run ```npm install```
6. Install the [following Symfony project](https://github.com/Matthis-M/ReliefAppsBackend) to expose the backend services needed to this application to work
7. Inside the folder, run ```ng serve``` to start the application in development mode. It will be accessible at the address ```http://localhost:4200/```

### Troubleshooting

If a message similar to "Error: ENOSPC: System limit for number of file watchers reached" is displayed, the cause probably is the limite of file watchers of your Linux system.

You can check this limit with : `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
See the two following solutions to increase this limit.

Temporary increase :
`
$ sudo sysctl fs.inotify.max_user_watches=524288
$ sudo sysctl -p
`

Permanent increase :
`
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
$ sudo sysctl -p
`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Class Diagram

Here is the UML class diagram of the application to offer a better overview of its structure :

![Application UML Class Diagram](https://github.com/Matthis-M/ReliefAppsFrontend/blob/main/Angular_ReliefApps_Frontend_Class_Diagram.png)
