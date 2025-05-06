const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json()); // Necesario para parsear JSON del body

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/guardar', (req, res) => {
    const { mail, pw } = req.body;

    console.log('Datos recibidos:', req.body)
  
    const filepath = 'myjsonfile.json';
    let data = { table: [] };
  
    // Si el archivo ya existe, lo leemos y actualizamos
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, 'utf8');
      data = JSON.parse(raw);
    }
  
    data.table.push({ mail, pw });
  
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  
    res.json({ message: "Datos guardados con éxito" });
  });

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});