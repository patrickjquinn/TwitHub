const cluster = require('cluster')

if ('v0.11.13'.localeCompare(process.version) >= 0) {
    cluster.schedulingPolicy = cluster.SCHED_NONE
}

if (cluster.isMaster) {
    const os = require('os')

    os.cpus().forEach(() => {
        cluster.fork()
    })

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker died (ID: ' + worker.id + ', PID: ' + worker.process.pid + ', signal: ' + signal + ')')
    })

    cluster.on('disconnect', (worker, code, signal) => {
        console.log('Worker disconnected (ID: ' + worker.id + ', PID: ' + worker.process.pid + ', signal: ' + signal + ')')
        cluster.fork()
    })
} else {
    require('./app/index.js')
}
