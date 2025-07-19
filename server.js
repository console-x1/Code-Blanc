const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const colors = require('colors');
const dependance_affichage = require('dependance-affichage');
const dependance = new dependance_affichage();

dependance.upToDate().then(result => {
  console.log('\n--------------------------------\n'.grey);
  console.log(result);
  console.log('--------------------------------\n'.grey);
}).catch(err => {
  console.error('Erreur lors du check upToDate:', err);
});

const app = express();
const PORT = 2031;

const PUBLIC_DIR = path.join(__dirname, 'public');

app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR));
app.use(express.json());

app.get('/home', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});
app.get('/index', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.post('/log', (req, res) => {
  const { output: old_Page } = req.body;

  let rawIp = req.ip || req.connection.remoteAddress || '';
  let ipv4 = rawIp.includes('::ffff:') ? rawIp.replace('::ffff:', '') : '';
  let ipv6 = rawIp.includes('::ffff:') ? '' : rawIp;

  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ipList = forwarded.split(',').map(ip => ip.trim());
    ipv4 = ipList[0];
  }

  const ua = req.headers['user-agent'] || 'Inconnu';

  const date = new Date();
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  const sec = date.getSeconds().toString().padStart(2, '0');

  const logEntry = `IPV4 : ${ipv4 || 'Aucune'} - IPV6 : ${ipv6 || 'Aucune'}
User-Agent : ${ua}
Date : ${date.toLocaleString()} - ${h} h ${min} min ${sec} sec
Page : ${old_Page}

------------------------------------------------------------------------------------------------\n
`;

  const logPath = path.join(__dirname, 'logs/connections.log');

  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error('Erreur écriture log :', err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});


app.listen(PORT, () => {
  console.log(`Serveur Node.js - Site Code Blanc lancé sur le port n°${PORT}`.blue);
}); 