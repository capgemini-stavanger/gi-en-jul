# Gi en jul

## Deployment Status
|dev|prod|
|---|---|
[![DEV - Build and Deploy Application to Azure](https://github.com/capgemini-stavanger/gi-en-jul/actions/workflows/DEV_CD_backend.yml/badge.svg)](https://github.com/capgemini-stavanger/gi-en-jul/actions/workflows/DEV_CD_backend.yml) [![DEV Build and Deploy Frontend to Azure](https://github.com/capgemini-stavanger/gi-en-jul/actions/workflows/DEV_CD_frontend.yml/badge.svg)](https://github.com/capgemini-stavanger/gi-en-jul/actions/workflows/DEV_CD_frontend.yml) | [![PROD - Build and Deploy Application to Azure](https://github.com/capgemini-stavanger/gi-en-jul/actions/workflows/PROD_CD_backend.yml/badge.svg)](https://github.com/capgemini-stavanger/gi-en-jul/actions/workflows/PROD_CD_backend.yml) [![PROD Build and Deploy Frontend to Azure](https://github.com/capgemini-stavanger/gi-en-jul/actions/workflows/PROD_CD_frontend.yml/badge.svg)](https://github.com/capgemini-stavanger/gi-en-jul/actions/workflows/PROD_CD_frontend.yml)


## Setup

### Clone
Clone the repo to your computer
For example by writing this in the Command Line
- git clone https://github.com/capgemini-stavanger/gi-en-jul.git

### BackEnd
Either run the backend in Visual Studio or download the SDK https://dotnet.microsoft.com/download and run it in terminal
* Visual Studio: 
  1. Load the project from the project file: GiEnJul.sln 
  2. Make sure the launch setting gi_en_jul is selected
  3. Run the GiEnJul project
* SDK
  1. Have the SDK for dotnet 6.0.x or later
  2. Run - dotnet restore "\gienjul\GiEnJul\GiEnJul.csproj"'
  3. Run - dotnet run "\gienjul\GiEnJul\GiEnJul.csproj"
 The api should now be running on localhost:5001

### FrontEnd
To run the frontend npm of version 7.20.2 or later is recommended, especially since older versions of node will generate a package-log.json of an older version than what we used.
Link for dowloading node https://nodejs.org/en/download/
Run to show current npm version:  -npm -v

* Run npm i
* Run npm start
The website should now be accessible on localhost:3000

### DataBase
We used *azurite* 3.13.1 for emulating a Azure Table Storage locally.
* Run - npm install -g azurite@3.13.1
* Run - cd [auzritefolder] or - mkdir azurite - cd azurite
* Then run this command in the designated folder - azurite 
Note: Where you are running the *azurite*, there will be added folders for storing the data

### Papercut
We used *papercut* to emulate a SMTP server locally for the mails
To install it, go to the https://github.com/ChangemakerStudios/Papercut-SMTP repo and follow the README for instructions
This has to run while running the app

## Recommended tools
* Visual Studio Code(FrontEnd)
    * Prettier
    * React Extension Pack
    * ++ more extensions
* Visual Studio 2022 (BackEnd)
* Microsoft Azure Storage Explorer (Table Storage)
* Python 3.x.x (Scripts)
* Postman (Api requests)
