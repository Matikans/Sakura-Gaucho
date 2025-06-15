const fs = require('fs');
const path = require('path');

exports.adminDashboard = (req, res) => {
    if (!req.session.isAdmin) {
    return res.status(403).send('Acceso denegado. Debes iniciar sesión como administrador.');
  }
  let reservas = [];

  try {
    const Datos = fs.readFileSync(path.join(__dirname, '../reservas.json'), 'utf8');
    reservas = JSON.parse(Datos);
  } catch (err) {
    console.log('Error al leer el archivo de reservas:', err);
  }

  res.render('admin', { reservas });
}