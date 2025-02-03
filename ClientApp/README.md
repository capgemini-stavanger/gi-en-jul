# Gi en jul Client App

## Introduction

The client app is a react app using the now deprecated create-react-app.
The app consists of three main parts:

 1. The main page for info and signing up.
 2. The registration page for approved institutions to register families.
 3. The admin page for running the "Gi en jul" events.

## Important libraries

- axios
- env-cmd
- react
- react-router
- react-router-dom
- react-snowfall
- react-virtuoso
- auth0-react
- material-ui/core
- material-ui/data-grid
- material-ui/icons
- material-ui/lab
- material-ui/styles
- validator

## Api connection

The application communicates with the "Gi en jul" .net API through the service class called "ApiServiceClass" (src/common/functions).

The class must be instantiated with a token if it is calling authenticated endpoints (for the registration and admin pages).
It is using the base URL from the environment variable `REACT_APP_API_URL`, and some default headers.
The class is using the [`axios` library](https://github.com/axios/axios) internally.

## Landing page and Signup page

This section covers the landing page [www.gienjul.no](https://www.gienjul.no) with general info, and the signup page [www.gienjul.no/bli-giver](https://www.gienjul.no/bli-giver)
Most of the code for the main signup page is found in the folders 'src/pages/landing-page' and 'src/pages/register-as-giver' and the components used in these are found in 'src/components/landing-page' and 'src/components/register-as-giver'.
Data for the FAQ and Contact Info sections are fetched from unauthenticed API endpoints. Contact images are also fetched through an endpoint in the API.

## Register family page


