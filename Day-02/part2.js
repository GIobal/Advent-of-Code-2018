const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    data.toString().split('\r\n').forEach(line => {
        data.toString().split('\r\n').forEach(otherLine => {
            let differences = []
            for(let i = 0, l = line.length; i < l; i++) {
                if (line.charAt(i) !== otherLine.charAt(i)) {
                    differences.push(i)
                }
            }

            if (differences.length === 1) {
                console.log(line.slice(0, differences[0]) + line.slice(differences[0] + 1)) // wugbihckpoymcpaxefotvdzns
            }
        })
    })
})