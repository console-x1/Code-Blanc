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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR));
app.use(express.json());

app.get('/home',  (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});
app.get('/',  (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});
app.get('/index',  (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

function extractIPs(ipRaw) {
  const ipv6 = ipRaw;
  let ipv4 = '';

  if (ipRaw.startsWith('::ffff:')) {
    ipv4 = ipRaw.split('::ffff:')[1];
  } else if (ipRaw.includes('.')) {
    ipv4 = ipRaw;
  }

  return { ipv4, ipv6 };
}

app.get('/get-ip', (req, res) => {
  const rawIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const { ipv4, ipv6 } = extractIPs(rawIp);
  res.json({ ipv4, ipv6 });
});
app.get('/old-page', (req, res) => {
  const Old_Page_Encode = req
  res.json({ ipv4, ipv6 });
});

app.post('/log', (req, res) => {
  const { ipv4, ipv6, ua, date, h, min, sec, cookies, old_Page } = req.body;

  const logEntry = `
\n------------------------------------------------------------------------------------------------\n
IPv4 : ${ipv4}
IPv6 : ${ipv6}
UserAgent : ${ua}
Date : ${date}
Heure : ${h} h ${min} min ${sec} sec
Cookies : ${cookies}
Page : ${old_Page}`;

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
    console.log(`Serveur Node.js - Site Ensemble-pour-la-France lancé sur le port n°${PORT}`.blue);
}); 