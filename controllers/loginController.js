exports.login = (req, res) => {
    res.render('login', { title: 'Login' });
}

exports.authenticate = (req, res) => {
    const { user, pass } = req.body;

    const ADMIN_USER = 'admin';
    const ADMIN_PASS = '12345';
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        req.session.isAdmin = true;
        return res.redirect('/admin');
      } else {
        return res.status(401).send('Usuario o contraseña incorrectos.');
      }
}