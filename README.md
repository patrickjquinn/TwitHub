# TwitHub - Twitter & GitHub Mashup


# Dependencies

- Node Latest https://nodejs.org/en/

# Setup

## Install

Clone repo, cd into its directory & enter `npm install`

Add your own twitter API key details to `twithub-api/config/index.js` (https://apps.twitter.com/)

Now enter `npm start`

This will open the sample server (starts clustered on all threads of the host CPU)

Open your browser and enter http://localhost:1024/api/twithub/search/

### API Example

```javascript
    const projectMentions = new ProjectMentions()
    const tweets = yield projectMentions.get()
	
	console.log(JSON.stringify(tweets))
```


### Web API

`/api/twithub/status`

Returns 'OK' and status 200 if the server is running

`/api/twithub/search`

Returns project names and all associated tweets for each project