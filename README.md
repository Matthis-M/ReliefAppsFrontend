# ReliefAppsFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Prerequisites

NodeJs & npm installed

Angular installed

Angular CLI installed (optional but recommended)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
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

