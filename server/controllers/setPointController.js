const {getState} = require("../../zeroMQ/stateUpdates/stateUpdates");
const {sendSocketUpdate} = require('../../webSocket/socket');

let errorCount = 0;

const setPointController = async (req, res) =>{
    let state = getState();
    if(!state){
        errorCount += 1;
        state = {noState: errorCount}
    }
    await sendSocketUpdate(JSON.stringify(state))
    res.send({stateSent: true});
}


module.exports = setPointController;