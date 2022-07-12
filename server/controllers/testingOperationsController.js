const {resetModel} = require('../models/testingOperationsModel');

const resetController = async (req, res) =>{
    const reset = await resetModel();
    if(reset.resetComplete){
       return res.send({reset: true});
    };
    return res.send({reset: false})
}


module.exports = resetController;