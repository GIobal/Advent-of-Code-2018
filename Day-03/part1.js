const fs = require('fs')


fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    // Prepare claims grid.
    let claims = {}

    // Capture three groups: everything behind an hashtag is considered an id,
    // the digits surrounding a comma are considered a position, and lastly
    // the digits surrounding an `x` are considered the size.
    const regExp = /((?<=#)[^ ]+)*(\d*,\d*)*(\d*x\d*)*/g
    data.toString().split('\r\n').forEach(line => {
        const [id, position, size] = line.match(regExp).filter(item => item !== '')

        for (let i = 0, l = parseInt(size.split('x')[0]); i < l; i++) {
            for (let j = 0, k = parseInt(size.split('x')[1]); j < k; j++) {
                const key = [i + parseInt(position.split(',')[0]), j + parseInt(position.split(',')[1])].join(',')
                claims[key] = claims.hasOwnProperty(key) ? 'x' : id
            }
        }
    })

    console.log(Object.values(claims).filter(claim => claim === 'x').length) // 4
})