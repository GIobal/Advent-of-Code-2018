const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) throw error

    let contents = data.toString().split(' ').map(number => parseInt(number))

    let cursor = 0
    const next = () => {
        let node = { children: [], metadata: [] }

        let childCount = contents[cursor++]
        let metaCount = contents[cursor++]
        for (let i = 0; i < childCount; ++i) node.children.push(next())
        for (let i = 0; i < metaCount; ++i) node.metadata.push(contents[cursor++])
        return node
    }

    const calculateRootNode = node => {
        if (!node) return 0
        const sum = array => array.reduce((sum, value) => sum + value, 0)
        if (node.children.length === 0) return sum(node.metadata)
        return sum(node.metadata.map(meta => calculateRootNode(node.children[meta - 1])))
    }

    console.log(calculateRootNode(next())) // 35189
})