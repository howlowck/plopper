'use strict'

const chalk = require('chalk')
const nodePlop = require('node-plop')

const defaultChoosingMessage = chalk.blue('[PLOP]') + ' Please choose a generator.'

module.exports = (function () {
  function chooseOptionFromList (plopList, message = defaultChoosingMessage) {
    const plop = nodePlop()
    const generator = plop.setGenerator('choose', {
      prompts: [{
        type: 'list',
        name: 'generator',
        message,
        choices: plopList.map(function (p) {
          return {
            name: p.name + chalk.gray(p.description ? ' - ' + p.description : ''),
            value: p.name
          }
        })
      }]
    })
    return generator.runPrompts().then(results => results.generator)
  }

  function displayHelpScreen () {
    console.log([
      '',
      chalk.bold('Usage:'),
      '  $ plopper                 ' + chalk.dim('Select from a list of available generators'),
      '',
      chalk.bold('Options:'),
      '  -h, --help             ' + chalk.dim('Show this help display'),
      '',
      chalk.bold('Examples:'),
      '  $ ' + chalk.blue('plopper'),
      ''
    ].join('\n'))
  }

  return {
    chooseOptionFromList: chooseOptionFromList,
    displayHelpScreen: displayHelpScreen
  }
})()
