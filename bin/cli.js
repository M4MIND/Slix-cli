#!/usr/bin/env node
var program = require('commander');
var mkdir = require('mkdirp');
var fs = require('fs');
var path = require('path');

var templatesPath = path.join(__dirname, '..', 'templates');

var MODE_0755 = parseInt('0755', 8);

var folders = [
    path.join(__dirname, '..', 'views'),
    path.join(__dirname, '..', 'controllers'),
    path.join(__dirname, '..', 'static')
];

var copyFiles = [
     'index.js',
     'controllers/IndexController.js',
     'controllers/PageNotFound.js',
     'controllers/PageNotFound.js',
     'static/css/style.css',
     'views/layout/layout.twig',
     'views/index.twig',
     'views/error/404.twig'
];

var pkg = {
    version: "0.0.0",
    private: true,
    scripts: {
        start: "nodemon --exec babel-node ./index.js"
    },
    dependencies: {
        "natives": "^1.1.6",
        "twig": "^1.13.2",
        "slix": "git+https://github.com/M4MIND/Slix.git"
    },
    devDependencies: {
        "@babel/cli": "^7.2.3",
        "@babel/core": "^7.4.0",
        "@babel/node": "^7.2.2",
        "@babel/plugin-proposal-class-properties": "^7.4.0",
        "@babel/plugin-proposal-decorators": "^7.3.0",
        "@babel/plugin-transform-flow-comments": "^7.4.0",
        "@babel/plugin-transform-modules-commonjs": "^7.4.0",
        "@babel/polyfill": "^7.4.3",
        "@babel/preset-env": "^7.4.2",
        "babel-plugin-add-jsdoc-properties": "^0.1.4",
        "babel-plugin-add-module-exports": "^1.0.0",
        "browser-sync": "^2.26.3",
        "gulp": "^4.0.0",
        "gulp-babel": "^8.0.0",
        "gulp-cached": "^1.1.1",
        "gulp-clean": "^0.4.0",
        "gulp-concat": "^2.6.1",
        "nodemon": "^1.18.10"
    }
};

/**
 * Module dependencies.
 */

program
    .name('Slix-cli')
    .version('0.0.1')
    .option('-n, --name [Name project]', 'Name project', 'Slix project')
    .parse(process.argv);

pkg.dependencies['name'] = program.name;


for (let dir of folders) {
    mkdir.sync(dir, MODE_0755);
}

for (let file of copyFiles) {
    mkdir.sync(path.dirname(file));
    fs.copyFileSync(path.join(templatesPath, file), file);
}

fs.writeFileSync('package.json', JSON.stringify(pkg, null, '\t'));

console.log('Done! Run the "npm install" command');
