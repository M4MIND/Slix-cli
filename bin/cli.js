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
    {file: 'index.js'},
    {file: 'controllers/IndexController.js'},
    {file: 'controllers/PageNotFound.js'},
    {file: 'controllers/PageNotFound.js'},
    {
        file: 'static/css/style.css',
        type: 'css'
    },
    {
        file: 'static/css/style.less',
        type: 'less'
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
    .option('-n, --name [Name project]', 'Name project', 'Slix project')
    .option('-c, --css [engine]', 'Add stylesheet [engine] support (less) (defaults to plain css)', 'less')
    .option('-v, --view [engine]', 'Add view [engine] support (twig) (defaults to twig)', 'twig')
    .parse(process.argv);

var pkg = {
    name: program.name,
    version: "0.0.0",
    private: true,
    description: "Slix application generator",
    scripts: {
        start: "nodemon --exec babel-node ./index.js"
    },
    dependencies: {
        "natives": "^1.1.6",
        "twig": "^1.13.2",
        "slix": "git+https://github.com/M4MIND/Slix.git",
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
        "nodemon": "^1.18.10"
    }
};
console.dir(program);

console.log("Directory: " + __dirname);

console.log('Create directory:');
for (let dir of folders) {
    mkdir.sync(dir, MODE_0755);
    console.log(`   ${dir}`);
}

console.log();
console.log('Create files:');

for (let obj of copyFiles) {
    if (obj.type === program.css || obj.type === program.view) {
        mkdir.sync(path.dirname(obj.file));
        fs.copyFileSync(path.join(templatesPath, obj.file), obj.file);
        console.log(`   ${obj.file}`);
    }
}
console.log();
console.log('Create package.json');
fs.writeFileSync('package.json', JSON.stringify(pkg, null, '\t'));

console.log();

console.log('Done! Run the "npm install" command');
