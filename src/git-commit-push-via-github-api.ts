import { Octokit } from "@octokit/rest"
// const { createAppAuth } = require("@octokit/auth-app")

//const debug = require("debug")("git-commit-push-via-github-api")
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN

const main = async (github: Octokit, options: GitCommitPushOptions) => {
  console.log("getRef")
  const baseBranchRef = await github.git.getRef({
    owner: options.owner,
    repo: options.repo,
    ref: options.fullyQualifiedRef,
  })
  console.log("getCommit")
  const currentCommit = await github.git.getCommit({
    owner: options.owner,
    repo: options.repo,
    commit_sha: baseBranchRef.data.object.sha,
  })
  console.log("createCommit")
  const newCommit = await github.git.createCommit({
    owner: options.owner,
    repo: options.repo,
    message: options.commitMessage || "commit",
    tree: currentCommit.data.tree.sha,
    parents: [currentCommit.data.sha],
  })
  console.log("updateRef")
  await github.git.updateRef({
    owner: options.owner,
    repo: options.repo,
    ref: options.fullyQualifiedRef,
    sha: newCommit.data.sha,
  })

  console.log("DONE")
}

export interface GitCommitPushOptions {
  owner: string
  repo: string
  files: {
    path: string
    content: string | Buffer
  }[]
  fullyQualifiedRef: string
  forceUpdate?: boolean
  commitMessage?: string
  token?: string // or process.env.GITHUB_API_TOKEN
}

export const gitCommitPush = (options: GitCommitPushOptions) => {
  console.log("Commit Push")
  if (
    !options.owner ||
    !options.repo //||
    //!options.files ||
    //!options.files.length
  ) {
    return ""
  }
  const token = options.token || GITHUB_API_TOKEN
  if (!token) {
    throw new Error(`token is not defined`)
  }
  const gitHub = new Octokit({ auth: token })
  // if (token) {
  //   gitHub.auth({
  //     authStrategy: createAppAuth,
  //     type: "token",
  //     token: token,
  //     tokenType: "oauth",
  //   })
  // }
  const filledOptions = {
    owner: options.owner,
    repo: options.repo,
    files: options.files,
    fullyQualifiedRef: options.fullyQualifiedRef || "heads/dev",
    forceUpdate: options.forceUpdate || false,
    commitMessage:
      options.commitMessage || "Commit - " + new Date().getTime().toString(),
  }

  return main(gitHub, filledOptions)
  //console.log(options)
  //debug("options %O", options)
  // return getReferenceCommit(gitHub, filledOptions).then(data =>
  //   createTree(gitHub, filledOptions, data)
  // )
  // return getReferenceCommit(gitHub, filledOptions)
  //   .then(data => createTree(gitHub, filledOptions, data))
  //   .then(data => createCommit(gitHub, filledOptions, data))
  //   .then(data => updateReference(gitHub, filledOptions, data))
}

// // function res(arg0: string, res: any) {
// //   throw new Error("Function not implemented.")
// // }
