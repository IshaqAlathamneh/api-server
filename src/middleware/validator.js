module.exports = (req, res, next)=> {
    if(req.query){
    let checked = req.query.name;
    if(checked){
        next()
    }else{
        next('something wrong in the name')
    }}else{
        next('something wrong in the name')
    }
}