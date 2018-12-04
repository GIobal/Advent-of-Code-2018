const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    let counts = []

    data.toString().split('\r\n').forEach(line => {
        let charCount = {}
        for (let i = 0, l = line.length; i < l; i++) {
            let char = line.charAt(i)

            let count = charCount[char]
            charCount[char] = count ? count + 1 : 1
        }
        counts.push(charCount)
    })

    const threeOccurrences = Object.keys(counts).filter(key => {
        return Object.values(counts[key]).includes(3)
    })

    const twoOccurrences = Object.keys(counts).filter(key => {
        return Object.values(counts[key]).includes(2)
    })

    console.log(twoOccurrences.length * threeOccurrences.length) // 7904
})
