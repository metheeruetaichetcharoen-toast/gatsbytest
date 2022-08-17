// require("dotenv").config()
// const fs = require("fs")
// const { gitCommitPush } = require("../lib/git-commit-push-via-github-api")
// process.on("unhandledRejection", console.dir)
// if (!process.env.GITHUB_API_TOKEN) {
//   throw new Error("GITHUB_API_TOKEN=xxx node example.js")
// }

// gitCommitPush({
//   owner: "toasttab",
//   repo: "mktg-craft-cms",
//   files: [],
//   fullyQualifiedRef: "heads/playground/gatsby-test",
//   forceUpdate: false, //optional default = false
//   commitMessage:
//     "Deployment from Craft CMS  - " + new Date().getTime().toString(),
// })

var axios = require("axios")

var config = {
  method: "post",
  url: "http://localhost:8000/deploy",
  headers: {
    secret_key: "a super secret key, maybe with emojis?",
  },
}

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data))
  })
  .catch(function (error) {
    console.log(error)
  })
