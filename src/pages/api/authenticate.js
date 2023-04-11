import bcrypt from 'bcryptjs';
// import cookie from 'cookie';

const authenticateUser = (token, callback) => {
  next;
  return false;
};

const hashPassword = (passwrod) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(passwrod, salt);
  return hash;
};

const confirmPassword = async (passwordHash, password) => {
  return await bcrypt.compare(password, passwordHash);
};

// const setupUserCookie = (user, res) => {
//   const token = {
//     email: user.email,
//     role: user.role,
//     name: user.name,
//     since: user.timestamp,
//   };
// 
//   res.setHeader('Set-Cookie', cookie.serialize('token', JSON.stringify(token), {
//     httpOnly: true,
//     maxAge: 60 * 60 * 24 * 7,
//     sameSite: 'strict',
//     path: '/',
//   }));

//   return token;
// };

export {
  authenticateUser,
  hashPassword,
  confirmPassword,
  // setupUserCookie,
};
