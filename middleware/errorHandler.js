module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({status: err.status, error: err.error, message: err.message})
  } else {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}