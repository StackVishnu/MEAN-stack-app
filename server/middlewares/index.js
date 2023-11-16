const ObjectId = require('mongoose').Types.ObjectId

const validateDbId = (req,res,next)=>{
    if(ObjectId.isValid(req.params.id)==false)
    res.status(400).json({
        error : `given id (${req.params.id})is wrong`
})
else
    next()
}
const raiseRecord404Error = (req, res)=>{
    res.status(404).json({
        error : 'No record found with given _id :' + req.params.id
//No next method, just returns an error.
        })
}
const errorHandler = (error,req,res,next)=>{
    res.status(500).json({error:error})//this error object refers to the errorhandler 
}
module.exports = {validateDbId,
raiseRecord404Error, errorHandler}