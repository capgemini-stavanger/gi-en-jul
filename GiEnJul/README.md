# Gi en jul Api

[Main README](/README.md)

## Contents

 1. [Introduction](#introduction)
 2. [Setup](#setup)
 3. [Config](#config)
 4. [Auth](#auth)

## Introduction

The API application for the Gi en jul system is written in .NET. It was originally written in .NET Core 3 and has since been upgraded to .NET 8.
Data is stored in Tables in an Azure Storage Account, using the repository pattern.
The system sends out automated emails using SendGrid.

## Setup

Clone the repo

```git
git clone https://github.com/capgemini-stavanger/gi-en-jul.git
```

Either run the backend in Visual Studio or download the SDK https://dotnet.microsoft.com/download and run it in terminal

* Visual Studio:
  1. Load the project from the project file: GiEnJul.sln 
  2. Make sure the launch setting gi_en_jul is selected
  3. Run the GiEnJul project
* SDK
  1. Have the SDK for dotnet 8.0.x or later
  2. Run - dotnet restore "\gienjul\GiEnJul\GiEnJul.csproj"'
  3. Run - dotnet run "\gienjul\GiEnJul\GiEnJul.csproj"
 The api should now be running on localhost:5001

We used *azurite* for emulating a Azure Table Storage locally.

* Run - `npm install -g azurite`
* Run - `cd [auzritefolder]` or - `mkdir azurite` - `cd azurite`
* Then run this command in the designated folder - `azurite -s`
Note: Where you are running the *azurite*, there will be added folders for storing the data

To browse the data in azurite you can use Azure Storage Explorer.

For testing emails we use [PaperCut SMTP](https://github.com/ChangemakerStudios/Papercut-SMTP)
To install it, go to the <https://github.com/ChangemakerStudios/Papercut-SMTP> repo and follow the README for instructions
This has to run while running the app

## Config

## Auth

The system uses Auth0 for authentication.
Protected endpoints require a valid jwt token to be included in the auth header, and for the user to have certain permissions. These permissions are set up using policies. Policies can be found in the `Auth/Authconfig.cs` file

Management of users and roles can be done through the [auth0 management dashboard](https://manage.auth0.com/dashboard)
There are 3 roles:

* Admin
* Institution
* SuperAdmin

Each of them have specific permissions that are mapped to policies in the backend code.

There are also endpoints accessible for SuperAdmin users that utilize the Auth0Management API to add or delete new users to the system and assign the correct role.

## Emails

The system sends out automated emails at several times during the process of an event. Currently SendGrid is being used in the Production and dev environment to send these emails. For local development we use [MailKit](https://github.com/jstedfast/MailKit) and [PaperCut SMTP](https://github.com/ChangemakerStudios/Papercut-SMTP)

The system is constructing email content from html templates ('Utilities/EmailTemplates/Files') and injecting data into fields marked by `{className.property}`

## Automatic jobs

### Cleanup / notify

### Anonymize data

## Deployment
