# Building
If you want to modify the protocol, edit `pdl/protocol.pdl` and then run `npm run build` to update `json/protocol.json` and any other artifacts.

# Using your local copy as a dependency
After making changes to the protocol, you may want to test them in a dependent project *before* publishing them.
There are 2 ways to do this:

## npm link
[`npm link`](https://docs.npmjs.com/cli/v6/commands/npm-link) allows you to (temporarily) use a local copy of a dependency instead of the published version from npm.
First, you need to call `sudo npm link` in the root folder of this repository. This will tell `npm` that this folder contains your local copy of the `@recordreplay/protocol` package. You only need to do this once.
Then, call `npm link @recordreplay/protocol` in the root folder of your dependent project. This will create a symlink in `node_modules` to your local copy of the `@recordreplay/protocol` package. Note that this symlink will be automatically removed the next time you run `npm install` or `npm update`.

## Using a local path as a dependency
You can use a [local path](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#local-paths) as the protocol dependency in your `package.json`, e.g.
```
  "dependencies": {
    "@recordreplay/protocol": "file:../protocol"
  }
```
Don't forget to replace the local path with a version number and run `npm install` once the new protocol version is published.

# Publishing
To publish a new version of the protocol, you need to be a member of the @recordreplay:developers team on npm.
Login using `npm adduser` (this will create an access token and store it in `~/.npmrc`) and publish using `npm publish`.
