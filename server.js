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
const PORT = 2030;

const PUBLIC_DIR = path.join(__dirname, 'public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR));

app.get('/home',  (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});
app.get('/',  (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});
app.get('/index',  (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get('/constitution',  (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'constitution.html'));
});

app.get('/code-de-l-education', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'code-de-l-education.html'));
})

app.listen(PORT, () => {
    console.log(`Serveur Node.js - Site Ensemble-pour-la-France lancé sur le port n°${PORT}`.blue);
}); 