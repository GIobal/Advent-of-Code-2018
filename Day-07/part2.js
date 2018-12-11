const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    let allSteps = []
    let decisionTree = {}

    const deleteStepFromDecisionTree = step => {
        Object.values(decisionTree).map(steps => {
            let index = steps.indexOf(step)
            if (index > -1) steps.splice(index, 1)
        })
    }

    // Define decision tree.
    data.toString().split('\r\n').forEach(line => {
        let [a, b] = line.match(/( . )/g).map(v => v.trim())

        if (!decisionTree.hasOwnProperty(b)) decisionTree[b] = []
        if (!decisionTree[b].includes(a)) decisionTree[b].push(a)

        // Add these steps to list of all steps.
        if (!allSteps.includes(a)) allSteps.push(a)
        if (!allSteps.includes(b)) allSteps.push(b)
    })

    let workers = [
        { task: undefined, timeLeft: undefined, totalTime: 0},
        { task: undefined, timeLeft: undefined, totalTime: 0},
        { task: undefined, timeLeft: undefined, totalTime: 0},
        { task: undefined, timeLeft: undefined, totalTime: 0},
        { task: undefined, timeLeft: undefined, totalTime: 0}
    ]

    let stepsInOrder = []

    // See what step comes first in the order.
    let possibleSteps = {}
    let alphabetCheckup = Array.from(allSteps.sort())
    let sortedSteps = Array.from(allSteps.sort())

    let totalSeconds = 0
    restartLoop: while (true) {
        // Calculate possible steps.
        Object.values(sortedSteps).map(step => {
            if (!Object.keys(decisionTree).includes(step) || decisionTree[step].length === 0) {
                possibleSteps[step] = alphabetCheckup.indexOf(step) + 61
            }
        })

        let thisStep
        for (let i = 0, l = Object.keys(possibleSteps).length; i < l; i++) {
            let thisStep = Object.keys(possibleSteps).sort((a, b) => possibleSteps[a] - possibleSteps[b])[i]
            let currentTasks = Object.values(workers).map(worker => worker.task)

            if (!currentTasks.includes(thisStep)) {
                for (let j = 0, k = workers.length; j < k; j++) {
                    let [task, timeLeft] = Object.values(workers[j])
                    if (typeof task === 'undefined' && !timeLeft) {
                        workers[j] = {
                            task: thisStep,
                            timeLeft: possibleSteps[thisStep],
                            totalTime: workers[j].totalTime
                        }
                        break
                    }
                }
            }
        }

        // Get shortest duration of a task to finish.
        let shortestDuration = workers[Object.keys(workers).filter(key => {
            return typeof workers[key].timeLeft !== 'undefined'
        }).sort((a, b) => {
            return workers[a].timeLeft - workers[b].timeLeft
        })[0]].timeLeft

        for (let i = 0, l = shortestDuration; i < l; i++) {
            for (let j = 0, k = workers.length; j < k; j++) {
                workers[j].totalTime++
                if (typeof workers[j].task !== 'undefined') {
                    workers[j].timeLeft--

                    if (!workers[j].timeLeft) { // Remove task from worker.
                        stepsInOrder.push(workers[j].task)
                        thisStep = workers[j].task

                        workers[j] = { task: undefined, timeLeft: undefined, totalTime: workers[j].totalTime }

                        delete possibleSteps[thisStep]
                        deleteStepFromDecisionTree(thisStep)
                        sortedSteps.splice(sortedSteps.indexOf(thisStep), 1)
                    }
                }
            }
        }

        while(stepsInOrder.length < allSteps.length) {
            continue restartLoop
        }

        totalSeconds = workers[Object.keys(workers).sort((a, b) => workers[b].totalTime - workers[a].totalTime)[0]].totalTime
        break
    }

    console.log(totalSeconds) // 959
})