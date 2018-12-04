const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    console.log(eval(data.toString())) // 599
})
