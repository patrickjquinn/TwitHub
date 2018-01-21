const genify = require('thunkify-wrap').genify
const Twit = require('twit')

const twitter_keys = require('../config').keys.twitter
const Tweet = require('./tweet')

const twitter = new Twit({
    consumer_key: twitter_keys.api_key,
    consumer_secret: twitter_keys.api_secret,
    access_token: twitter_keys.access_token,
    access_token_secret: twitter_keys.access_token_secret,
    timeout_ms: 60 * 1000
})

twitter.get = genify(twitter.get)

function format_tweets(tweets) {
    return tweets.map(tweet => {
        const t = new Tweet(tweet).build()
        return t
    })
}

function * getMentionsForProjects(projects) {
    const mentions = []
    try {
        for (let index = 0; index < projects.length; index++) {
            const full_name = projects[index].full_name
            try {
                const tweets = yield twitter.get('search/tweets', {q: full_name, count: 10})
                if (tweets && tweets[0].statuses && tweets[0].statuses.length > 0) {
                    mentions.push({project: full_name, tweets: format_tweets(tweets[0].statuses)})
                }
            } catch (err) {
                console.log(err)
                continue
            }
        }
    } catch (err) {
        console.log(err)
        throw err
    }

    return mentions
}

module.exports = {
    get: getMentionsForProjects
}
