const path = require('path');
const os = require('os');
const fs = require('fs');
const toolbox = require('tinytoolbox');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const matrix = [
    ['electron-builder',[
        ['16', [
            'buster-slim'
        ]]
    ]],
    ['node-eslint', [
        ['16', [
            'buster-slim'
        ]]
    ]],
    ['sixgrid-publisher', [
    	['16', [
    		'buster-slim'
    	]]
    ]]
];

let matrixObjectRegExp = /^[0-9a-fA-F]{1,}(\-[0-9a-fA-F]{1,}){0,}$/i;

module.exports = (grunt) => {
    grunt.registerTask('build', 'Build containers!', function (...args) {
        var done = this.async();
        if (args == undefined) args = [];

        let targetLocations = [];

        let allTargetLocations = toolbox.arrayTreeToPath(matrix, '/');

        if (args.length > 0) {
            for (let x = 0; x < args.length; x++) {
                if (args[x].match(matrixObjectRegExp) != null) {
                    let targetMatrix = [];

                    let spltd = args[x].split('-');
                    let indices = spltd.map(s => Number(s));

                    let prevObject = null;
                    for (let y = 0; y < indices.length; y++) {
                        if (prevObject == null) prevObject = matrix;
                        let isvalid = prevObject.length > indices[y] && typeof prevObject[indices[y]] == 'object';
                        if (isvalid) {
                            targetMatrix.push(prevObject[indices[y]][0]);
                            prevObject = prevObject[indices[y]][1];
                        } else {
                            targetMatrix.push(prevObject[indices[y]]);
                        }
                    }

                    let targetLocation = targetMatrix.join('/');
                    targetLocations.push(targetLocation);

                    grunt.log.writeln(`[build] -> Found matrix '${args[x]}' at '${targetLocation}'`);
                }
            }
        } else {
            targetLocations = targetLocations.concat(allTargetLocations);
            grunt.log.writeln(`[build] -> Building all matrixes`);
        }

        console.log(targetLocations)

        let donecount = 0;
        for (let i = 0; i < targetLocations.length; i++) {
            let location = targetLocations[i];
            grunt.log.writeln(`[build] -> ${location}`);
            let locnew = location.split('/')[0] + ':';
            let locnew___ = [].concat(location.split('/'));
            locnew___.shift()
            locnew = locnew + locnew___.join('-');
            let args = ['docker', 'build', path.resolve('./' + location), '-t', `ktwrd/${locnew}`];
            console.log(args)
            grunt.util.spawn({
                cmd: 'sudo',
                args,
                cwd: location
            }, (error, result) => {
                if (result.stderr) {
                    console.error(result.stderr);
                }
                console.log(result.stdout)
                donecount++;
            });
        }
        while (donecount == targetLocations.length) {
            done();
            break;
        }
    });

    return grunt;
}
