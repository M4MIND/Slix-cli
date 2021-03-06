#!/usr/bin/env node
var program = require('commander');
var mkdir = require('mkdirp');
var fs = require('fs');
var path = require('path');

var templatesPath = path.join(__dirname, '..', 'templates');

var MODE_0755 = parseInt('0755', 8);

var folders = [
    'views',
    'controllers',
    'static',
    'config'
];

var copyFiles = [
    {file: 'index.js'},
    {file: 'controllers/IndexController.js'},
    {file: 'controllers/PageNotFound.js'},
    {file: 'controllers/PageNotFound.js'},
    {file: 'static/css/style.css'},
    {file: 'config/config.json'},
    {
        file: 'static/css/style.less',
        type: 'less'
    },
    {
        file: 'static/css/style.scss',
        type: 'scss'
    },
    {
        file: 'views/layout/layout.twig',
        type: 'twig'
    },
    {
        file: 'views/index.twig',
        type: 'twig'
    },
    {
        file: 'views/error/404.twig',
        type: 'twig'
    },
    {file: '.babelrc'}
];

program
    .name('Slix-cli')
    .version('0.0.1')
    .option('-n, --name [Name project]', 'Name project', 'slix-project')
    .option('-c, --css [engine]', 'Add stylesheet [engine] support (less|scss) (defaults to less)', 'less')
    .option('-v, --view [engine]', 'Add view [engine] support (twig) (defaults to twig)', 'twig')
    .parse(process.argv);

/** @type {string} **/
var project = program.name;

var pkg = {
    name: project,
    version: "0.0.0",
    private: true,
    description: "Slix application generator",
    scripts: {
        start: "nodemon --exec babel-node ./index.js"
    },
    dependencies: {
        "natives": "^1.1.6",
        "slix-app": "^1.0.0",
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
        "babel-plugin-add-module-exports": "^1.0.0",
        "babel-plugin-inline-json-import": "^0.3.2",
        "nodemon": "^1.18.10"
    }
};


console.log('Generate project: ' + project);

console.log('Create directory:');

mkdir.sync(project);

console.log(`   -> ${project}`);

for (let dir of folders) {
    mkdir.sync(path.join(project, dir), MODE_0755);
    console.log(`   -> ${dir}`);
}

console.log();
console.log('Create files:');

for (let obj of copyFiles) {
    if (obj.type === program.css || obj.type === program.view || obj.type === undefined) {
        mkdir.sync(path.join(project, path.dirname(obj.file)));
        fs.copyFileSync(path.join(templatesPath, obj.file), path.join(project, obj.file));
        console.log(`   -> ${obj.file}`);
    }
}

console.log();
fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify(pkg, null, '\t'));
console.log('Create package.json');

console.log();

console.log('Done! Run the "npm install" command');
