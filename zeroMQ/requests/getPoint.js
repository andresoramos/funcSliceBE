
    
    const getPoint = async (messageMotionLayer, publisher)=>{
        return new Promise(async(resolve) => {
            try {
        let messageReceived;
        let response;
        await messageMotionLayer();
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
    
    module.exports = {getPoint}