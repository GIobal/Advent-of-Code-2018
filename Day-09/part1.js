const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    let [ playerCount, target ] = data.toString().match(/(\d+)/g).map(number => parseInt(number))

    // Prepare players.
    let players = {}
    for (let i = 0; i < playerCount; i++) {
        players[i + 1] = 0
    }

    let currentMarble = 0
    let circle = [ currentMarble ]
    let lastPosition = circle.indexOf(currentMarble)

    let i = 1
    while (currentMarble < target) {
        currentMarble++

        if (i > playerCount) i = 1
        if (currentMarble % 23 !== 0) {
            circle.splice(lastPosition + 2 > circle.length ? 1 : lastPosition + 2, 0, currentMarble)
            lastPosition = circle.indexOf(currentMarble)
        } else {
            players[i] += currentMarble

            if (lastPosition <= 7) {
                lastPosition = circle.length - (7 - lastPosition)
            } else {
                lastPosition = lastPosition - 7
            }

            players[i] += parseInt(circle.splice(lastPosition, 1))
        }

        i++
    }

    console.log(Object.values(players).sort((a, b) => b - a)[0]) // 428690
})
