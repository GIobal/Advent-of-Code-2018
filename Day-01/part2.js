const fs = require('fs')
const endOfLine = require('os').EOL

let currentFrequency = 0
let reachedFrequencies = [0]
let doubleFrequencyReached = false

fs.readFile('input.txt', (error, data) => {
    if (error) throw error
    const iterateInput = () => {
        data.toString().split(endOfLine).forEach(line => {
            // Add or subtract value of line to current frequency.
            let lineValue = parseInt(line.substr(1))
            if (line.startsWith('+')) {
                currentFrequency += lineValue
            } else {
                currentFrequency -= lineValue
            }

            // Check if frequency has already been reached.
            if (reachedFrequencies.includes(currentFrequency) && !doubleFrequencyReached) {
                console.log(currentFrequency) // 81204
                doubleFrequencyReached = true
            } else {
                reachedFrequencies.push(currentFrequency)
            }
        })
    }

    while (!doubleFrequencyReached) {
        iterateInput()
    }
})