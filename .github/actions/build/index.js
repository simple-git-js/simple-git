const core = require('@actions/core');

const repo = core.getInput('GITHUB_REPOSITORY', {required: false});
const dirs = {
   src: core.getInput('SRC_DIR', {required: false}),
   out: core.getInput('OUT_DIR', {required: false}),
};
const proj = core.getInput('TS_PROJECT', {required: false});

core.info(`repo: ${repo}`);
core.info(`dirs: src=${dirs.src}, out=${dirs.out}`);
core.info(`proj: ${proj}`);

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
