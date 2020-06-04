# MeMetrics iMessage Updater
This is meant to be a quick and easy way to read the iMessages off of a OSx machine and send them to MeMetrics.


## Running

An `appsettings.json` will need to be creatd in the root directory that will contain the values for each property in `src/models/appsettings.ts`
| Property | Value | 
| ------------- |-------------:|
| dbPath | Relative path to the `chat.db` file |
| imagePath | The images are prefixed with `~/Library/Messages`. This prefix will be replaced with this value |
| memetricsUrl | The base url of MeMetrics |
| apiKey | The API key for the MeMetrics instance |


```sh
npm install
# For the relative paths
cd src
npm start
```
