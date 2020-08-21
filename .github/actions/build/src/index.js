const simpleGit = require('simple-git');
const core = require('@actions/core');

async function process() {
   const actionConfig = getActionConfig();

   core.info(`repo: ${actionConfig.repo}`);
   core.info(`dirs: src=${actionConfig.dirs.src}, out=${actionConfig.dirs.out}`);
   core.info(`proj: ${actionConfig.proj}`);

   core.info(`latest tag: "${ await previouslyReleasedTag() }"`);
}

function getActionConfig() {
   const repo = getInput('GITHUB_REPOSITORY');
   const dirs = {
      src: getInput('SRC_DIR') || './',
      out: getInput('OUT_DIR') || './',
   };
   const proj = getInput('TS_PROJECT');

   return {
      repo, dirs, proj
   };
}

function getInput(name, required = false) {
   return core.getInput(name, {required}) || process.env[name];
}

async function previouslyReleasedTag(root = dirs.src) {
   const {success, result} = await simpleGit(root).raw('describe', '--abbrev=0');
   return success && String(result).trim() || null;
}

// const artifact = require('@actions/artifact');
// const artifactClient = artifact.create()
// const artifactName = 'my-artifact';
// const files = [
//    '/home/user/files/plz-upload/file1.txt',
//    '/home/user/files/plz-upload/file2.txt',
//    '/home/user/files/plz-upload/dir/file3.txt'
// ]
// const rootDirectory = '/home/user/files/plz-upload'
// const options = {
//    continueOnError: true
// }
//
// const uploadResult = await artifactClient.uploadArtifact(artifactName, files, rootDirectory, options)
//
// async function run () {
//
// }
//
