# Gi en jul Api

[Main README](/README.md)

## Contents

 1. [Introduction](#introduction)
 2. [Setup](#setup)
 3. [Config](#config)
 4. [Auth](#auth)
 5. [Emails](#emails)
 6. [Automatic Jobs](#automatic-jobs)
    1. [cleanup / notify](#cleanup--notify)
    2. [anonymize data](#anonymize-data)
 7. [Deployment](#deployment)

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

The config file 'appsettings.json' is divided into sections, with some settings still at the top level.

1. `Auth0`
    This section is for options related to auth0, some of these values are sensitive.
2. `MailSettings`
    This section contains mail settings for MailKit, this was previously also used in dev and prod, before we switched to SendGrid.
3. `Jobs`
    This section is for configuring cron-statements for the automated jobs
4. `CleanupJob`
    This section is for specific settings used in the cleanup / notify job.

The top level options are:

* `TableConnectionString` -> connectionString for the table in the Azure StorageAccount, defaults to local dev Azurite.
* `LogTableName` -> Name of storage Table used for logs.
* `LogLevel` -> the lowest level to save to the logs.
* `recaptchaSecret` -> Used to validate Google Recapcha when submitted giver form.
* `SendGridApiKey` -> API key for sendgrid.
* `ReactAppUri` -> Front end uris that are allowed to call the api endpoints, separated by `;`

Use UserSecrets for sensitive values.

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

The API application contains some automatic jobs that run at scheduled intervals to do automated tasks, such as notify givers who have not yet accepted or declined their assigned families. The jobs are setup using the [Quartz library](https://www.quartz-scheduler.net/), and are configured using `AddScheduledJob<T>()` method from `ServiceCollectionQuartzConfiguratorExtensions`. This reads a cron-statement from the "Jobs" section in the config, like the following:

```json
"Jobs": {
  "CleanupConnectionsJob": "0 0 12 1/1 * ? *",
  "AnonymizeUserDataJob": "0 0 12 1/1 * ? *"
}
```

They must have the exact same name as the Job class.
Both of these examples run at 12.00 pm every day. You can use a tool like [CronMaker.com](http://www.cronmaker.com/) to configure and generate cron-statements.

The Job classes live in the 'Utilities/Scheduledjobs' folder. They implement the IJob interface, where the execute method is being invoked on the scheduled times from the cron-statements.

**In local development the jobs are configured to run on start instead of on a schedule.**

### Cleanup / notify

This job will look for givers who have yet to accept or decline their assigned families for a certain number of days. If enough time has passed they will be notified via email, and if even more time passes, they will be automatically disconnected and put on the bottom of the giver-list.
There will also be a comment in the notes section, saying that they have been notified/disconnected and at what time this occurred.

### Anonymize data

This job will check for events that have been complete for over 30 days and anonymize all the data. There is a hash created from the emails and names and phonenumbers are removed. The data is then put into the Anonimized-tables and removed from the normal tables.

```txt
AnonymizedConnection
AnonymizedGiver
AnonymizedRecipient
AnonymizedPerson
```

## Deployment

The API is built using Github actions and deployed to an azure webapp using the publish profile stored in the secret called `AZUREAPPSERVICE_PUBLISH_TEST`.
The action workflows for API deployments are called DEV_CD_backend.yml and PROD_CD_backend.yml
