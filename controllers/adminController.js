const fs = require('fs');
const path = require('path');
const reservasPath = path.join(__dirname, '/../reservas.json');

exports.adminDashboard = (req, res) => {
    if (!req.session.isAdmin) {
    return res.status(403).send('Acceso denegado. Debes iniciar sesión como administrador.');
  }
  let reservas = [];

  try {
    const Datos = fs.readFileSync(reservasPath, 'utf8');
    reservas = JSON.parse(Datos);
  } catch (err) {
    console.log('Error al leer el archivo de reservas:', err);
  }

  res.render('admin', { reservas });
}

exports.deleteReseve = (req, res) => {
  const index = parseInt(req.body.index);

  if(isNaN(index)){
    return res.status(400).send('Índice inválido.');
  }

  let reservas = [];

  try {
    const Datos = fs.readFileSync(reservasPath, 'utf8');
    reservas = JSON.parse(Datos);
  } catch (err) {
    console.log('Error al leer el archivo de reservas:', err);
    return res.status(500).send('Error al procesar la solicitud.');
  }
  if(index >= 0 && index <= reservas.length) {
    reservas.splice(index, 1);
    fs.writeFileSync(reservasPath, JSON.stringify(reservas, null, 2), 'utf-8');
    req.session.isAdmin = true; // Aseguramos que la sesión siga siendo de administrador
    res.redirect('/admin');
  }else {
    return res.status(400).send('Índice fuera de rango.' + index);
  }
};