module.exports.setFlash = function(req, res, next){

    locals.res.flash = {
        success: req.flash('success'),
        failure: req.flash('failure')
    } 

    next();
}