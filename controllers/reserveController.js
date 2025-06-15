const fs = require('fs');

exports.createReservation = (req, res) => {
    const { name, date, time, num, guests } = req.body;

    if (!name || !date || !time || !num || !guests) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    const guestsNum = parseInt(guests);
    const numMesa = parseInt(num);

    if (isNaN(numMesa) || isNaN(guestsNum)) {
        return res.status(400).send('El número de mesa y de invitados deben ser números.');
    }

    if (guestsNum < 1 || guestsNum > 20) {
        return res.status(400).send('El número de invitados debe estar entre 1 y 20.');
    }

    console.log('Reserva recibida:', { name, date, time, num: numMesa, guests: guestsNum });

    let reservas = [];

    try {
        const datos = fs.readFileSync('reservas.json', 'utf8');
        reservas = JSON.parse(datos);
    } catch (err) {
        console.log('Archivo de reservas no encontrado o vacío. Se creará uno nuevo.');
    }

    reservas.push({ name, date, time, num: numMesa, guests: guestsNum });

    fs.writeFileSync('reservas.json', JSON.stringify(reservas, null, 2), 'utf8');

    res.send(`
        <h1>¡Gracias por tu reserva, ${name}!</h1>
        <p>Te esperamos el ${date} a las ${time} en Sakura & Gaucho.</p>
        <a href="/">Volver al inicio</a>
    `);
};