class Tweet {
    constructor(tweet) {
        this.tweet = tweet.text || "",
        this.creation_date = tweet.created_at || "",
        this.id = tweet.id,
        this.username = '@' + tweet.user.screen_name,
        this.user = tweet.user.name
    }
    
    build() {
        return { 
            "tweet": this.tweet,
            "creation_date": this.creation_date,
            "id": this.id,
            "username": this.username,
            "user": this.user
        }
    }
}

module.exports = Tweet