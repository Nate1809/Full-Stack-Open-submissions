const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.log('triggered logger error')
  console.error(...params)
}

module.exports = { info, error }