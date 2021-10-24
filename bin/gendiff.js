#!/usr/bin/env node
//import commander from 'commander';

const { Command } = require('commander');
const program = new Command();
program.description('Compares two configuration files and shows a difference')
program.version('0.0.1', '-V, --version', 'output the version number');

program.parse(process.argv);

const options = program.opts();

