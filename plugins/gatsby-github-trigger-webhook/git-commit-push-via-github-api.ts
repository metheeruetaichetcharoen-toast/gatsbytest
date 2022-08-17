import { Octokit } from "@octokit/rest"

const main = async (github: Octokit, options: GitCommitPushOptions) => {
  const baseBranchRef = await github.git.getRef({
    owner: options.owner,
    repo: options.repo,
    ref: options.fullyQualifiedRef,
  })

  const currentCommit = await github.git.getCommit({
    owner: options.owner,
    repo: options.repo,
    commit_sha: baseBranchRef.data.object.sha,
  })

  const newCommit = await github.git.createCommit({
    owner: options.owner,
    repo: options.repo,
    message: options.commitMessage || "commit",
    tree: currentCommit.data.tree.sha,
    parents: [currentCommit.data.sha],
  })

  await github.git.updateRef({
    owner: options.owner,
    repo: options.repo,
    ref: options.fullyQualifiedRef,
    sha: newCommit.data.sha,
  })
}

export interface GitCommitPushOptions {
  owner: string
  repo: string
  fullyQualifiedRef: string
  forceUpdate?: boolean
  commitMessage?: string
  token?: string
}

export const gitCommitPush = (options: GitCommitPushOptions) => {
  if (!options.owner || !options.repo) {
    return ""
  }
  const token = options.token
  if (!token) {
    throw new Error(`token is not defined`)
  }
  const gitHub = new Octokit({ auth: token })

  const filledOptions = {
    owner: options.owner,
    repo: options.repo,
    fullyQualifiedRef: options.fullyQualifiedRef || "heads/dev",
    forceUpdate: options.forceUpdate || false,
    commitMessage:
      options.commitMessage || "Commit - " + new Date().getTime().toString(),
  }

  return main(gitHub, filledOptions)
}
