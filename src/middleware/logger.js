module.exports = (req, res, next)=> {
    console.log(' Path:',req.path, 'method=', req.method );
    // this is very important
    
    next();
}