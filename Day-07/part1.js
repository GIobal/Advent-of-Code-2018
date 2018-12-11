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

    data.toString().split('\r\n').forEach(line => {
        let [a, b] = line.match(/( . )/g).map(v => v.trim())

        if (!decisionTree.hasOwnProperty(b)) decisionTree[b] = []
        if (!decisionTree[b].includes(a)) decisionTree[b].push(a)

        // Add these steps to list of all steps.
        if (!allSteps.includes(a)) allSteps.push(a)
        if (!allSteps.includes(b)) allSteps.push(b)
    })

    // See what step comes first in the order.
    let possibleSteps = []
    let stepsInOrder = []
    let sortedSteps = Array.from(allSteps.sort())

    Object.values(sortedSteps).map(step => {
        if (!Object.keys(decisionTree).includes(step) || decisionTree[step].length === 0) {
            possibleSteps.push(step)
        }
    })

    while (stepsInOrder.length !== allSteps.length) {
        let nextStep = possibleSteps[0]
        deleteStepFromDecisionTree(nextStep)

        stepsInOrder.push(nextStep)
        sortedSteps.splice(sortedSteps.indexOf(nextStep), 1)

        possibleSteps = []
        Object.values(sortedSteps).map(step => {
            if (!Object.keys(decisionTree).includes(step) || decisionTree[step].length === 0) {
                possibleSteps.push(step)
            }
        })
    }

    console.log(stepsInOrder.join('')) // BHRTWCYSELPUVZAOIJKGMFQDXN
})
