#!/usr/bin/env node

const nodePlop = require('node-plop')
const path = require('path')
const chalk = require('chalk')
const out = require(path.resolve(__dirname, './out'))
const plop = nodePlop(path.resolve(__dirname, './plopfile.js'))
const generators = plop.getGeneratorList()
// const generatorNames = generators.map(v => v.name)

out.chooseOptionFromList(generators, plop.getWelcomeMessage())
  .then(generatorName => {
    doThePlop(plop.getGenerator(generatorName))
  })

function doThePlop (generator, bypassArr) {
  generator.runPrompts(bypassArr)
      .then(generator.runActions)
      .then(function (result) {
        result.changes.forEach(function (line) {
          console.log(chalk.green('[SUCCESS]'), line.type, line.path)
        })
        result.failures.forEach(function (line) {
          const logs = [chalk.red('[FAILED]')]
          if (line.type) { logs.push(line.type) }
          if (line.path) { logs.push(line.path) }

          const error = line.error || line.message
          logs.push(chalk.red(error))

          console.log.apply(console, logs)
        })
      })
      .catch(function (err) {
        console.error(chalk.red('[ERROR]'), err.message)
        process.exit(1)
      })
}
