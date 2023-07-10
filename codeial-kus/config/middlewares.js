module.exports.setFlash = function(req, res, next){

    // console.log(req.flash('success'));

    res.locals.flash = {
        success: req.flash('success'),
        failure: req.flash('failure'),
        warning: req.flash('warning')
    } 

    next();
}