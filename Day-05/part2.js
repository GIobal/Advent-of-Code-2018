const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    let contents = data.toString()
    let withoutCertainUnits = {}
    for (let i = 0; i < 26; i++) {
        let letter = (i + 10).toString(36)

        let withoutCertainUnit = contents.split('').filter(unit => unit.toLowerCase() !== letter).join('')
        let length = withoutCertainUnit.length

        restartLoop:
            while (true) {
                for (let i = 0; i < length; i++) {
                    let nextUnit = i + 1

                    if (i === withoutCertainUnit.length - 1) break

                    // A is the current unit, b is the next unit.
                    let a = withoutCertainUnit[i]
                    let b = withoutCertainUnit[nextUnit]

                    let sameUnit = a.toLowerCase() === b.toLowerCase()
                    let oppositePolarity = (a === a.toUpperCase() && b === b.toLowerCase()
                        || b === b.toUpperCase() && a === a.toLowerCase())

                    if (sameUnit && oppositePolarity) {
                        withoutCertainUnit = withoutCertainUnit.slice(0, i) + withoutCertainUnit.slice(i + 2)
                        length = withoutCertainUnit.length

                        continue restartLoop
                    }
                }
                break
            }
        withoutCertainUnits[letter] = withoutCertainUnit.length
    }

    console.log(withoutCertainUnits)
})