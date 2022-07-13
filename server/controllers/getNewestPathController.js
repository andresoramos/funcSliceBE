const {getLatestPathModel} = require("../models/dataOperationsModel");


const getNewestPathController = async (req, res) =>{
    let {userId} = req.params
    try {
        if(!userId){
            throw new Error("User ID required")
        }
        const pathData = await getLatestPathModel(userId);
        if(!pathData.length){
            return res.send({newPathName: "Path 1"});
        }
        let highestPath = "Path 1";
        pathData.forEach((item)=>{
            let {table_name} = item;
            if(table_name.split(" ")[0] === "Path"){
                let presentNum = Number(highestPath.split(" ")[1]);
                let itemNum = Number(table_name.split(" ")[1]);
                if(itemNum > presentNum){
                    highestPath = `Path ${itemNum}`
                }
            }
        })
        return res.send({highestPath: `Path ${Number(highestPath.split(" ")[1]) + 1}`})
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = getNewestPathController;