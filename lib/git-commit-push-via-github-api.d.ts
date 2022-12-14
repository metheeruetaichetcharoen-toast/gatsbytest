/// <reference types="node" />
export interface GitCommitPushOptions {
    owner: string;
    repo: string;
    files: {
        path: string;
        content: string | Buffer;
    }[];
    fullyQualifiedRef: string;
    forceUpdate?: boolean;
    commitMessage?: string;
    token?: string;
}
export declare const gitCommitPush: (options: GitCommitPushOptions) => "" | Promise<void>;
