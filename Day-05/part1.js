const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    let contents = data.toString()
    let length = contents.length

    restartLoop:
    while (true) {
        for (let i = 0; i < length; i++) {
            let nextUnit = i + 1

            if (i === contents.length - 1) break

            // A is the current unit, b is the next unit.
            let a = contents[i]
            let b = contents[nextUnit]

            let sameUnit = a.toLowerCase() === b.toLowerCase()
            let oppositePolarity = (a === a.toUpperCase() && b === b.toLowerCase()
                || b === b.toUpperCase() && a === a.toLowerCase())

            if (sameUnit && oppositePolarity) {
                contents = contents.slice(0, i) + contents.slice(i + 2)
                length = contents.length

                continue restartLoop
            }
        }
        break
    }

    console.log(contents.length)
})