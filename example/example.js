require("dotenv").config()
const fs = require("fs")
const { gitCommitPush } = require("../lib/git-commit-push-via-github-api")
process.on("unhandledRejection", console.dir)
if (!process.env.GITHUB_API_TOKEN) {
  throw new Error("GITHUB_API_TOKEN=xxx node example.js")
}

gitCommitPush({
  owner: "toasttab",
  repo: "mktg-craft-cms",
  files: [],
  fullyQualifiedRef: "heads/playground/gatsby-test",
  forceUpdate: false, //optional default = false
  commitMessage:
    "Deployment from Craft CMS  - " + new Date().getTime().toString(),
})
