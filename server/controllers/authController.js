const authController = async (req, res) =>{
    console.log("These things happened")
    res.send({struck: true})
}

module.exports = authController;