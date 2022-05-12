const cookieController = {};

cookieController.setCookies = (req, res, next) => {
    console.log(req.user.displayName, req.user.photos[0].value)
    res.cookie('name', `${req.user.displayName}`)
    res.cookie('img', `${req.user.photos[0].value}`)
    return next()
}

module.exports = cookieController;