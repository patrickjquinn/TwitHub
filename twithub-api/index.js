const github = require('./github')
const twitter = require('./twitter')

class ProjectMentions {
    * get() {
	    try {
	        const github_projects = yield github.get()
	        const twitter_mentions = yield twitter.get(github_projects)
	        return twitter_mentions
	    } catch (err) {
	        console.log(err)
	        throw err
	    }
    }
}

module.exports = ProjectMentions
