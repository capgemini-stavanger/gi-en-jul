# Gi en jul Client App

## Contents 

 1. [Introduction](#introduction)
 2. [Setup](#setup)
 3. [Important Libaries](#important-libraries)
 4. [Api Connection](#api-connection)
 5. [Landing page & Singup page](#landing-page-and-signup-page)
 6. [Register family page](#register-family-page)
 7. [Admin page](#admin-page)
    1. [General admin](#general-admin-page)
    2. [Management](#management-page)

## Introduction

The client app is a react app using the now deprecated create-react-app.
The app consists of three main parts:

 1. The main page for info and signing up.
 2. The registration page for approved institutions to register families.
 3. The admin page for running the "Gi en jul" events.

## Setup

Clone the repo

```git
git clone https://github.com/capgemini-stavanger/gi-en-jul.git
```

browse to the `/ClientApp/` folder in a commandline
run `npm i` to install packages
run `npm start` to run against a local API or `npn start:dev` to run against the API for the dev environment
regardless of which option you chose to run, the website should be available on `localhost:3000`

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

Also prettier + eslint as devDeps

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

This section covers the registration page, [www.gienjul.no/admin](https://www.gienjul.no/admin) when login in with an institution account.
The code is found in 'src/pages/institution' and 'src/components/institution'.
The main page here is a form for entering the data required to register a family. It is divded into 3 parts:

 1. identification: contact info of the person registering, and an internal ID for the registered family
 2. food preferences
 3. family members: info about each member of the family and their wishlists.

There is also a second page with an overview of all registered families from the institution that the logged in account belongs to.

## Admin page

This section covers the admin page, [www.gienjul.no/admin](https://www.gienjul.no/admin) when login in with an admin account.
There are two types of admin accounts, one type is just for administrating a municipality's events and data. The other is for administrating the entire system in addition to a specific municipality's events.

### General admin page

The code is found in 'src/pages/administrator' and 'src/components/admin'.
There are two pages or 'tabs' belonging to the general admin section.
The main page is an overview of all registered givers and families in the municipality that the logged in account belongs to.
There are two lists side by side where the objects in each list can be expanded. The admins can select an element in each list and press a button to suggest a connection, or the can select just a giver to get three suggestions for families to connect to the selected giver.
The lists are virtualized using react-virtuoso to improve performance when they grow large.

The second tab is an overview of all connected givers and families.

### Management page

The code is found in 'src/components/superadmin'.
All admins have access to the management page, but the superadmin accounts have a lot more features available.
A normal admin can update info about their own municipality, such as the info text displayed on [www.gienjul.no/kommune](https://www.gienjul.no/kommune) or the contact info and image displayed on [www.gienjul.no/#contacts](https://www.gienjul.no/#contacts). They can also set the dates for their municipality's events.
A superadmin account can create and delete users, update the FAQ and update dates for the events across all municipalities.
