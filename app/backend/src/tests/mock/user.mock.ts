const requestValidLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const requestInvalidLogin = [
  { email: '', password: 'secret_admin' },
  { email: 'admin@admin.com', password: '' },
]

const userFromDB = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
};

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2OTY3OTQyMDN9.XZt-RU8UhJaYZjglCEXXssW_B9diz1jxpCW1c-IHbDM';

const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZD1pbkBhZG1pbi5jb20iLCJpYXQiOjE2OTY3OTQyMDN9.XZt-RU8UhJaYZjglCEXXssW_B9diz1jxpCW1c-IHbDM';

export { requestValidLogin, requestInvalidLogin, userFromDB, validToken, invalidToken };