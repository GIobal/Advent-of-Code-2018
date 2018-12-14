const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    let [ playerCount, targetScore ] = data.toString().match(/(\d+)/g).map(number => parseInt(number))
    targetScore = targetScore * 100

    // Replace circle array with only necessary digits.
    let current = { value: 0 }
    current.prev = current
    current.next = current

    // Prepare players.
    let players = []
    for (let i = 0; i < playerCount; i++) {
        players[i] = 0
    }
    let currentPlayer = playerCount - 1

    for(let i = 1; i <= targetScore; i++) {
        currentPlayer = (currentPlayer + 1) % playerCount;
        if(i % 23 !== 0) {
            let target = current.next
            let newMarble = { value: i, prev: target, next: target.next }
            target.next.prev = newMarble
            target.next = newMarble
            current = newMarble
        } else {
            players[currentPlayer] += i

            let target = current
            for(let j = 0; j < 7; j++) {
                target = target.prev
            }

            players[currentPlayer] += target.value
            target.next.prev = target.prev
            target.prev.next = target.next
            current = target.next
        }
    }

    console.log(Math.max.apply(null, players)) // 3628143500
})
