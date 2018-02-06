var crossSpawn = require('cross-spawn')

var cachedHasYarn
var cachedHasCnpm

function hasYarn() {
    if (cachedHasYarn !== undefined) return cachedHasYarn

    try {
        var cmd = crossSpawn.sync('yarn', ['--version'])
        var version = cmd.stdout && cmd.stdout.toString().trim()
        cachedHasYarn = !!version
    } catch (e) {
        cachedHasYarn = false
    }

    return cachedHasYarn
}

function hasCnpm() {
    if (cachedHasCnpm !== undefined) return cachedHasCnpm

    try {
        var cmd = crossSpawn.sync('cnpm', ['help'])
        var help = cmd.stdout && cmd.stdout.toString().trim()
        cachedHasCnpm = !!help
    } catch (e) {
        cachedHasCnpm = false
    }

    return cachedHasCnpm
}

function crossNpm() {
    return hasCnpm() ? (hasYarn() ? 'yarn' : 'cnpm') : 'npm'
}

function spawnSync() {
    var args = [].slice.call(arguments)
    args.unshift(crossNpm())
    return crossSpawn.sync.apply(crossSpawn, args)
}

crossNpm.spawnSync = spawnSync

module.exports = crossNpm
