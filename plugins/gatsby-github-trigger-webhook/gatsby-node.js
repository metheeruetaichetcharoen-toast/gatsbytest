const axios = require("axios")
const bodyParser = require("body-parser")
const { gitCommitPush } = require("./lib/git-commit-push-via-github-api")

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

exports.onCreateDevServer = ({ app, reporter }, pluginOptions) => {
  const {
    githubAPIToken,
    repo,
    owner,
    fullyQualifiedRef,
    secretKey,
    addressCallback,
  } = pluginOptions

  if (!secretKey) {
    reporter.error(
      "You must have a secret key. Please look at the plugin documentation."
    )
    return
  }

  const notifyEventListener = data => {
    if (!addressCallback) {
      return
    }
    axios.post(addressCallback, data).then(
      response => {
        reporter.success("The event has been arrived to the listener")
      },
      error => {
        reporter.error(error)
      }
    )
  }

  reporter.success("The trigger deploy plugin is ready.")

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.post("/deploy", function (req, res) {
    const payloadSecretKey = req.headers["secret_key"] || req.body["secret_key"]

    if (payloadSecretKey !== secretKey) {
      const message =
        "The secret which passed in the header is missing or does not matching the desired secret key"

      reporter.error(message)
      res.status(401).send({ message })
    }

    res.status(200).send({ message: "Deployment process has started" })

    gitCommitPush({
      token: githubAPIToken,
      owner: owner,
      repo: repo,
      fullyQualifiedRef: fullyQualifiedRef,
      forceUpdate: false, //optional default = false
      commitMessage:
        "Deployment from Craft CMS  - " + new Date().getTime().toString(),
    })
  })
}
