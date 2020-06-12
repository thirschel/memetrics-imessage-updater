<h1 align="center">A digitial-life viewing application</h1>

<h3 align="center">
  <a href="https://memetrics.net/">Visit MeMetrics</a>
</h3>

<h3 align="center">
  <a href="https://github.com/thirschel/memetrics-ui/blob/master/ARCHITECTURE.md">Architecture Diagram</a> |
  <a href="https://github.com/thirschel/memetrics-ui">UI</a> |
  <a href="https://github.com/thirschel/memetrics-infrastructure">Infrastructure</a> |
  <a href="https://github.com/thirschel/memetrics-api">API</a> | 
  <a href="https://github.com/thirschel/memetrics-functions">Functions</a>
</h3>

## What is this?

This project contains a small node application that runs on a MacOSX machine in order to retrieve iMessages. Apple is very closed off and provides no scantioned developer approach to programatically retrieve iMessages / SMS messages. 

It does however sync those messages that appear on your iCloud account, to the iMessage app on Mac devices. It saves these messages to a sqlite database that this app is able to read to send to the MeMetrics Api to be ingested and saved to the database.

## Technology / Methodology
- Node
- Typescript

## Setting up development environment 🛠

An `appsettings.json` will need to be creatd in the root directory that will contain the values for each property in `src/models/appsettings.ts`
| Property | Value | 
| ------------- |-------------:|
| dbPath | Relative path to the `chat.db` file |
| imagePath | The images are prefixed with `~/Library/Messages`. This prefix will be replaced with this value |
| memetricsUrl | The base url of MeMetrics |
| apiKey | The API key for the MeMetrics instance |


```sh
npm install
npm start
```
