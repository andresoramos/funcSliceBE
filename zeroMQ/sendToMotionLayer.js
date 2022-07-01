const zmq = require('zeromq')
const publisher = zmq.socket('req')

publisher.bind('tcp://*:9000', function(err) {
    if(err)
        console.log(err)
    else
        console.log("Listening on 9000...")
});

// publisher.on("message", (message)=>{
//     console.log("Response was received: ", message.toString())
// });

const messageMotionLayer = async ()=>{
    console.log('sent');
    const payloadInfo = "change";
    await publisher.send(JSON.stringify(payloadInfo));

}


process.on('SIGINT', function() {
    publisher.close()
    console.log('\nClosed')
})

module.exports = {messageMotionLayer, publisher}