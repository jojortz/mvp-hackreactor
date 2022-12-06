<div id="top"/>

# Waave
>A app that helps surfers plan their sessions.

This app helps surfers pick the best spot to surf for a given time. Instead of constantly checking and manually comparing different surf spots across different websites, this does all the aggregation and filtering for you. It will sort through different spots within your selected location and time, and rank the best spots for your session based on your preferences.

It started as a 2-day sprint project for Hack Reactor.

## Table of Contents
1. [Tech Stack](#tech-stack)
1. [Product Features](#product-features)
    - [User Preferences](#user-preferences)
    - [Sessions](#sessions)
    - [Spots](#spots)
1. [Getting Started](#getting-started)
    - [Installation](#installation)

## Tech Stack
### Front End
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Styled-Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Back End
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/-Express-DCDCDC?logo=express&logoColor=black&style=for-the-badge)
![Node](https://img.shields.io/badge/-Node-9ACD32?logo=node.js&logoColor=white&style=for-the-badge)
![Axios](https://img.shields.io/badge/-Axios-671ddf?logo=axios&logoColor=black&style=for-the-badge)

### API
![Google Maps](https://img.shields.io/badge/Google%20Maps%20API-9cf?style=for-the-badge&logo=googlemaps)
![Surfline API](https://img.shields.io/badge/Surfline%20API-blue?style=for-the-badge)

## Product Features
### User Preferences
Users can set their name, email, location, and wave preferences.
- Surf Location: This is currently limited to the US. The app will search surf spots within the state (e.g. California).
- Wave Preference: The spots will be filtered based on the forecast wave height.
### Sessions
Users can plan a session up to 17 days in the future. They can select the morning vs. afternoon.
### Spots
For each session, the app produces a list of spots ranked by condition and matching the criteria. Each time a user checks that session, the list is populated with the most up-to-date information.

## Getting Started
### Installation
From the root directory, run the following commands in your terminal:

#### 1. Install all dependencies

```
  npm install
```
or
```
  yarn install
```

#### 2. Start the development server.

```
  npm run server-dev
```
or
```
  yarn server-dev
```

In the browser, open http://localhost:3000 or use another port as specified by your PORT environment variable.

#### 3. Build for production

```
  npm run react-dev
```
or
```
  yarn react-dev
```

<p align="right"><a href="#top">Back to top &#8593;</a></p>
