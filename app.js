const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
  });

app.post('/guardar', (req, res) => {
    const { mail, pw } = req.body;

    console.log('Datos recibidos:', req.body)
  
    const filepath = 'myjsonfile.json';
    let data = { table: [] };
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, 'utf8');
      data = JSON.parse(raw);
    } else {
      data.table.push({ mail, pw });
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
      res.json({ message: "Datos guardados con éxito" });
    }

  });

  app.post('/login', (req, res) => {
    const { mail, pw } = req.body;
    const filepath = 'myjsonfile.json';
  
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, 'utf8');
      const data = JSON.parse(raw);
  
      // Buscar si hay un usuario con ese mail y contraseña
      const user = data.table.find(user => user.mail === mail && user.pw === pw);
  
      if (user) {
        // Usuario autenticado correctamente
        res.json({ success: true });
      } else {
        // Usuario o contraseña incorrecta
        res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }
    } else {
      res.status(500).json({ message: 'No hay base de datos de usuarios' });
    }
  });

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});