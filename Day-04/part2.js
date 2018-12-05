const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    // Sort lines in chronological order.
    let unordered = {}
    data.toString().split('\r\n').forEach(line => {
        let date = line.match(/\[.*?]/g)[0]
        date = date.substring(1, date.length - 1)

        unordered[date] = line.split('] ')[1]
    })

    let ordered = {}
    Object.keys(unordered).sort().forEach(key => {
        ordered[key] = unordered[key]
    })

    let sleepSchedule = {}
    let regExp = /((?<=#)[^ ]+)/g
    let currentGuard = Object.values(ordered)[0].match(regExp)

    let fellAsleepAt

    Object.keys(ordered).forEach(date => {
        let action = ordered[date]

        switch (action) {
            case 'falls asleep':
                fellAsleepAt = new Date(date)
                break
            case 'wakes up':
                let minutesSlept = new Date(date).getMinutes() - fellAsleepAt.getMinutes()
                for (let i = fellAsleepAt.getMinutes(); i < fellAsleepAt.getMinutes() + minutesSlept; i++) {
                    sleepSchedule[currentGuard].push(i)
                }
                break
            default:
                currentGuard = (action.match(regExp) || currentGuard)
                if (!sleepSchedule.hasOwnProperty(currentGuard)) {
                    sleepSchedule[currentGuard] = []
                }
                break
        }
    })

    // Find most occurring number in a list of numbers.
    const findMode = numbers => {
        let counted = numbers.reduce((acc, current) => {
            if (current in acc) {
                acc[current]++
            } else {
                acc[current] = 1
            }

            return acc
        }, {})

        let mode = Object.keys(counted).reduce((a, b) => counted[a] > counted[b] ? a : b)

        return mode
    }

    let atSameMinute = {}
    Object.keys(sleepSchedule).map(guard => {
        if (sleepSchedule[guard].length > 0) {
            let mostAsleepAt = parseInt(findMode(sleepSchedule[guard]))

            let amountOfTimes = sleepSchedule[guard].filter(minute => {
                return mostAsleepAt === minute
            }).length

            atSameMinute[guard] = {at: mostAsleepAt, times: amountOfTimes}
        }
    })

    let mostFrequentGuard = Object.keys(atSameMinute).sort((a, b) => {
        return atSameMinute[b].times - atSameMinute[a].times
    })[0]

    console.log(mostFrequentGuard * atSameMinute[mostFrequentGuard].at) // 102095
})
