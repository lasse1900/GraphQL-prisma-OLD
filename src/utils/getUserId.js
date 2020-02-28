import jwt from 'jsonwebtoken'
// get header value, parse out the token, verify ...

const getUserId = (request) => {
  const header = request.request.headers.authorization

  if(!header) {
    throw new Error('Authentication required')
  }

  const token = header.replace('Bearer ', '')
  // const token = header.split(' ')[1]
  const decoded = jwt.verify(token, 'thisisasecret')

  return decoded.userId
}

export { getUserId as default }