export interface GitCommitPushOptions {
    owner: string;
    repo: string;
    fullyQualifiedRef: string;
    forceUpdate?: boolean;
    commitMessage?: string;
    token?: string;
}
export declare const gitCommitPush: (options: GitCommitPushOptions) => Promise<void> | "";
