module.exports = {
  addToReq: function (req, res, next) {
    req.body = { title: 'Hola Mundo', subtitle: 'Soy Dylan' }
    next()
  },
}
