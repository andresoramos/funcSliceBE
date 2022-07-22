const zmq = require('zeromq')
const publisher = zmq.socket('req')


let response;
publisher.bind('tcp://*:9000', function(err) {
    if(err)
        console.log(err)
    else
        console.log("Listening on 9000...")
});

publisher.on("message", (message)=>{
    response = message.toString();
    console.log("Response was received: ", message.toString())
});

const messageMotionLayer = async (payloadInfo)=>{
    console.log('sent');
    // const payloadInfo = "change";
    await publisher.send(JSON.stringify(payloadInfo));
    setTimeout(()=>{
        console.log(response);
    }, 5000)

}


process.on('SIGINT', function() {
    publisher.close()
    console.log('\nClosed')
})

module.exports = {messageMotionLayer, publisher}