const path = require('path');
const os = require('os');
const fs = require('fs');

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
    ]]
];

let matrixObjectRegExp = /^[0-9a-fA-F]{1,}(\-[0-9a-fA-F]{1,}){0,}$/i;

module.exports = (grunt) => {
    grunt.registerTask('build', 'Build containers!', (...args) => {
        if (args == undefined) args = [];

        let targetLocations = [];

        if (args.length > 0) {
            for (let x = 0; x < args.length; x++) {
                if (args[x].match(matrixObjectRegExp) != null) {
                    let targetMatrix = [];

                    let spltd = args[x].split('-');
                    let indeceies = spltd.map(s => Number(s));

                    let prevObject = null;
                    for (let y = 0; y < spltd.length; y++) {
                        if (prevObject == null) prevObject = matrix;
                        let isvalid = prevObject.length > spltd[y] && typeof prevObject[spltd[y]] == 'object';
                        if (isvalid) {
                            targetMatrix.push(prevObject[spltd[y]][0]);
                            prevObject = prevObject[spltd[y]][1];
                        } else {
                            targetMatrix.push(prevObject[spltd[y]]);
                        }
                    }

                    let targetLocation = './' + targetMatrix.join('/');
                    targetLocation = path.resolve(targetLocation);
                    targetLocations.push(targetLocation);

                    grunt.log.writeln(`[build] -> Found matrix '${args[x]}' at '${targetLocation}'`);
                }
            }
        } else {
            throw new Error('No matrix given!!!!!! AAAAAAAAAAAAAAAAAAAAAAAA');
        }

    });

    return grunt;
}