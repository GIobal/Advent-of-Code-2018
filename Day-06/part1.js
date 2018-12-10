const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    // Prepare grid.
    let grid = []
    for (let i = 0; i < 359; i++) { // 359
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
    let amountOfArea = {}
    for (let i = 0, l = grid.length; i < l; i++) {
        for (let j = 0, k = grid[i].length; j < k; j++) {
            if (!grid[i][j]) {
                let lowestDistances = {}
                Object.values(initialCoordinates).map((value, index) => {
                    lowestDistances[index + 1] = Math.abs(i - value[0]) + Math.abs(j - value[1])
                })

                let sortedDistances = Object.keys(lowestDistances).sort((a, b) => lowestDistances[a] - lowestDistances[b])
                if (lowestDistances[sortedDistances[0]] !== lowestDistances[sortedDistances[1]]) {
                    grid[i][j] = parseInt(sortedDistances[0])

                    // Keep track of area surface.
                    if (!amountOfArea.hasOwnProperty(sortedDistances[0])) {
                        amountOfArea[sortedDistances[0]] = 1
                    }
                    amountOfArea[sortedDistances[0]]++
                }
            }
        }
    }

    // Check which areas are infinite using the grid border.
    let infiniteAreas = []
    for (let i = 0, l = grid.length; i < l; i++) {
        if (i === 0 || i === grid.length - 1) {
            for (let j = 0, k = grid[i].length; j < k; j++) {
                if (!infiniteAreas.includes(grid[i][j])) infiniteAreas.push(grid[i][j])
            }
        } else {
            if (!infiniteAreas.includes(grid[i][0])) infiniteAreas.push(grid[i][0])
            if (!infiniteAreas.includes(grid[i][grid[i].length - 1])) infiniteAreas.push(grid[i][grid[i].length - 1])
        }
    }

    infiniteAreas.map(area => {
        if (area) delete initialCoordinates[area]
    })

    let leastArea = Object.keys(initialCoordinates).sort((a, b) => amountOfArea[b] - amountOfArea[a])[0]
    console.log(amountOfArea[leastArea]) // 4060
})