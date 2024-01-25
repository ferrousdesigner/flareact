# Flareact

Flareact is a firebase & react starter kit also known as boilterplate.

## Features

- Various React UI components included (Button, Card, Jumbotron, Expander etc)
- Firebase PowerComponents (Collection Renderer, Doc Renderer)
- Infinite scroll in-built.
- Navigation implemented with React-Router.
- Basic product pages like About us, policies and terms includes.
- EmailJS, Push Notification configured.

## Installation

Just update the config files mentioned below to get started.

1. Create a firebase project by going to console.firebase.google.com and enable
   storage, firestore, authentication and hosting.
2. Copy firebase config and update the details in the files below: a.
   firebaseConfig in config.js
3. Update app name, app id as per your project in the config file.
4. In the public folder replace icons with your project icons.
5. Update manifest.json in public folder.
6. Update name field in package.json to your project name.

```bash
# Start Dev Server
    npm start
# Build
    npm run start
# Test
    npm run test
# Build and deploy everything except firebase functions
    npm run deploy
# Build and deploy everything functions
    npm run deployAll
# Build and deploy only firebase functions
    npm run deployFunctions
# Build and deploy only firebase rules
    npm run deployRules
```
