const zmq = require('zeromq')
const publisher = zmq.socket('req')


publisher.bind('tcp://*:9000', function(err) {
    if(err)
        console.log(err)
    else
        console.log("Listening on 9000...")
});

// publisher.on("message", (message)=>{
//     response = message.toString();
//     console.log("Response was received: ", message.toString())
// });

const messageMotionLayer = async (payloadInfo)=>{
    console.log('sent');
    // const payloadInfo = "change";
    await publisher.send(JSON.stringify(payloadInfo));
}

    const runMotionList = async (payload)=>{
        return new Promise(async(resolve) => {
            try {
        let messageReceived;
        let response;
        await messageMotionLayer(payload);
        publisher.on("message", (message)=>{
            messageReceived = true;
            response = message.toString();
        });
        const responseCheck = setInterval(()=>{
            if(messageReceived){
                 clearInterval(responseCheck);
                 resolve(JSON.parse(response));
                }
         }, 50)
        } catch (error) {
            resolve({pointError:true})
        }
        });
    } 


process.on('SIGINT', function() {
    publisher.close()
    console.log('\nClosed')
})

module.exports = {messageMotionLayer, publisher, runMotionList}