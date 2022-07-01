const zmq = require('zeromq');

let robotState = '';
const subscriber = zmq.socket('sub');

subscriber.on("message", function(reply) {
    robotState = JSON.parse(reply.toString());
})

subscriber.connect("tcp://localhost:8688")
subscriber.subscribe("")

process.on('SIGINT', function() {
    subscriber.close()
    console.log('\nClosed')
});
const getState = ()=>{
    return robotState
}

module.exports = {getState};