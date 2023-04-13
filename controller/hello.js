exports.hello = (req, res, next) => {
    res.json({message: "Hello World!, with controller"})
}