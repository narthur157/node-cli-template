#!/usr/bin/env node

const chalk = require('chalk')
const boxen = require('boxen')
const yargs = require('yargs')
const axios = require('axios')

const options = yargs
  .usage('Usage: -n <name>')
  .option('n', { alias: 'name', describe: 'Your name', type: 'string', demandOption: true })
  .option('s', { alias: 'search', describe: 'Search term', type: 'string' })
  .argv

const greetingText = `Hello, ${options.name}!`

const greeting = chalk.white.bold(greetingText)

function chalkLog (text) {
  console.log(chalk.yellow.bold(text))
}

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'green',
  backgroundColor: '#555555'
}

const msgBox = boxen(greeting, boxenOptions)

console.log(msgBox)

if (options.search) {
  chalkLog(`Searching for jokes about ${options.search}...`)
} else {
  chalkLog("Here's a random joke for you:")
}

// The url depends on searching or not
const url = options.search ? `https://icanhazdadjoke.com/search?term=${escape(options.search)}` : 'https://icanhazdadjoke.com/'

axios.get(url, { headers: { Accept: 'application/json' } })
  .then(res => {
    if (options.search) {
      // if searching for jokes, loop over the results
      res.data.results.forEach(j => {
        chalkLog('\n' + j.joke)
      })
      if (res.data.results.length === 0) {
        chalkLog("no jokes found :'(")
      }
    } else {
      chalkLog(res.data.joke)
    }
  })
