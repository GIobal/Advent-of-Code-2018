const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    // Prepare grid.
    let grid = []
    for (let i = 0; i < 359; i++) {
        grid[i] = []
        for (let j = 0; j < 359; j++) {
            grid[i][j] = 0
        }
    }

    let initialCoordinates = {}
    data.toString().split('\r\n').forEach((line, index) => {
        let [x, y] = line.split(', ').map(v => parseInt(v))
        grid[y][x] = index + 1
        initialCoordinates[index + 1] = [y, x]
    })

    // Calculate Manhattan distances.
    for (let i = 0, l = grid.length; i < l; i++) {
        for (let j = 0, k = grid[i].length; j < k; j++) {
            let distances = {}
            Object.values(initialCoordinates).map((value, index) => {
                distances[index + 1] = Math.abs(i - value[0]) + Math.abs(j - value[1])
            })

            let totalDistance = 0
            Object.values(distances).map(distance => totalDistance += distance)
            if (totalDistance < 10000) {
                grid[i][j] = '#'
            }
        }
    }

    // Count size of region containing all spaces in desired region.
    let totalSize = 0
    for (let i = 0, l = grid.length; i < l; i++) {
        for (let j = 0, k = grid[i].length; j < k; j++) {
            if (grid[i][j] === '#') totalSize++
        }
    }

    console.log(totalSize) // 36136
})