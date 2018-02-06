#! /usr/bin/env node
'use strict'

const crossNpm = require('../index')

try {
    const status = crossNpm.spawnSync(process.argv.slice(2), { stdio: 'inherit' }).status
    process.exit(status)
} catch (err) {
    console.log(err)
    process.exit(1)
}
