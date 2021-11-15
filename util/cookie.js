const { serialize } = require('cookie')

exports.serialize = (key, value) => {
  const MAX_AGE = 60 * 60 * 48 // 48 hours

  return serialize(key, value, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })
}
