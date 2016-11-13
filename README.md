# Haskell Academy

The open-source web app that is used to run Haskell Academy.

## Usage

Copy `.env.sample`, rename it to `.env`, and delete the first
line. Go through each variable and fill it out for your
local machine. We use PostgreSQL so you will need to have
that installed and setup in order to configure the database.

Runs both the backend server and webpack dev server:
```bash
npm start
```

Go to http://local.haskellacademy.com:9189/ to see the running
app. This port will have hot reloading enabled. To run the app
without webpack-dev-server interfering (and without hot reloading)
go to http://local.haskellacademy.com:3000/ instead. Note that
you will have to manually build with `npm run build` for this
other port to work.

The API is served from http://api.local.haskellacademy.com:3000/

You may need to add the following lines to your /etc/hosts
file if this does not work right away:

```
127.0.0.1   local.haskellacademy.com
127.0.0.1   api.local.haskellacademy.com
```

Other tasks:
```bash
# Just build the frontend app into `dist/`
npm run build
# linting
npm run lint
# unit tests
npm test
# clean dist directory
npm run clean
```
