import axios from 'axios'
var api = 'http://api.zhuishushenqi.com'
function apiSearch (_this, query) {
  axios.get(`/api/book/fuzzy-search`, {
    params: {
      'query': query,
      'start': '0',
      'limit': '4'
    }
  })
  .then(function (response) {
    _this.books = response
  })
}
function apiAutocomplate (_this, query) {
  axios.get(`/api/book/auto-complete`, {
    params: {
      'query': query
    }
  })
  .then(function (response) {
    console.log(response.data)
    _this.keywords = response.data.keywords
  })
}
export { api, apiSearch, apiAutocomplate }
