"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitCommitPush = void 0;
var rest_1 = require("@octokit/rest");
// const { createAppAuth } = require("@octokit/auth-app")
//const debug = require("debug")("git-commit-push-via-github-api")
var GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;
var main = function (github, options) { return __awaiter(void 0, void 0, void 0, function () {
    var baseBranchRef, currentCommit, newCommit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("getRef");
                return [4 /*yield*/, github.git.getRef({
                        owner: options.owner,
                        repo: options.repo,
                        ref: options.fullyQualifiedRef,
                    })];
            case 1:
                baseBranchRef = _a.sent();
                console.log("getCommit");
                return [4 /*yield*/, github.git.getCommit({
                        owner: options.owner,
                        repo: options.repo,
                        commit_sha: baseBranchRef.data.object.sha,
                    })];
            case 2:
                currentCommit = _a.sent();
                console.log("createCommit");
                return [4 /*yield*/, github.git.createCommit({
                        owner: options.owner,
                        repo: options.repo,
                        message: options.commitMessage || "commit",
                        tree: currentCommit.data.tree.sha,
                        parents: [currentCommit.data.sha],
                    })];
            case 3:
                newCommit = _a.sent();
                console.log("updateRef");
                return [4 /*yield*/, github.git.updateRef({
                        owner: options.owner,
                        repo: options.repo,
                        ref: options.fullyQualifiedRef,
                        sha: newCommit.data.sha,
                    })];
            case 4:
                _a.sent();
                console.log("DONE");
                return [2 /*return*/];
        }
    });
}); };
var gitCommitPush = function (options) {
    console.log("Commit Push");
    if (!options.owner ||
        !options.repo //||
    //!options.files ||
    //!options.files.length
    ) {
        return "";
    }
    var token = options.token || GITHUB_API_TOKEN;
    if (!token) {
        throw new Error("token is not defined");
    }
    var gitHub = new rest_1.Octokit({ auth: token });
    // if (token) {
    //   gitHub.auth({
    //     authStrategy: createAppAuth,
    //     type: "token",
    //     token: token,
    //     tokenType: "oauth",
    //   })
    // }
    var filledOptions = {
        owner: options.owner,
        repo: options.repo,
        files: options.files,
        fullyQualifiedRef: options.fullyQualifiedRef || "heads/dev",
        forceUpdate: options.forceUpdate || false,
        commitMessage: options.commitMessage || "Commit - " + new Date().getTime().toString(),
    };
    return main(gitHub, filledOptions);
    //console.log(options)
    //debug("options %O", options)
    // return getReferenceCommit(gitHub, filledOptions).then(data =>
    //   createTree(gitHub, filledOptions, data)
    // )
    // return getReferenceCommit(gitHub, filledOptions)
    //   .then(data => createTree(gitHub, filledOptions, data))
    //   .then(data => createCommit(gitHub, filledOptions, data))
    //   .then(data => updateReference(gitHub, filledOptions, data))
};
exports.gitCommitPush = gitCommitPush;
// // function res(arg0: string, res: any) {
// //   throw new Error("Function not implemented.")
// // }
//# sourceMappingURL=git-commit-push-via-github-api.js.map