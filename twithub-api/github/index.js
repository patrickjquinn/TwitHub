const request = require('co-request')

const GITUB_BASE_SEARCH_FOOTBALL = 'https://api.github.com/search/repositories'
const BASE_SEARCH_TERM = 'Football'
const BASE_SEARCH_ORDER = 'stars'

function * getGithubProjects() {
    const query_params = {q: BASE_SEARCH_TERM, sort: BASE_SEARCH_ORDER}
    try {
        const raw_response = yield request({url: GITUB_BASE_SEARCH_FOOTBALL, qs: query_params, headers: {'user-agent': 'TwitHub'}})
        return JSON.parse(raw_response.body).items
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = {
    get: getGithubProjects
}
