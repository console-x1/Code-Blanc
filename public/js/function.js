async function home() {
    localStorage.setItem("oldPage", "01101000011011110110110101100101");
    const homeText = document.getElementById("main");
    let texte = await (await fetch("../textes/home.txt")).text();
    homeText.innerHTML = texte;

    document.getElementById("MenuScrollEntier").classList.add("hide");
};

async function constitution() {
    localStorage.setItem("oldPage", "011000110110111101101110011100110111010001101001011101000111010101110100011010010110111101101110");
    document.getElementById("MenuScrollEntier").classList.remove("hide");
    const constitutionText = document.getElementById("main");
    let texte = "<section class=\"article-content\"><h2>Texte de la Constitution</h2><p id=\"constitution-text\">"
    texte = texte + await (await fetch("../textes/constitution.txt")).text();
    texte = texte + "</p></section>";

    texte = texte.replace('PRÉAMBULE', '\n<h2>PRÉAMBULE</h2>');

    texte = texte.replace('Titre premier - DE LA SOUVERAINETÉ', '<section id="titreI">\n\n<h2>Titre premier - DE LA SOUVERAINETÉ</h2></section>');
    texte = texte.replace(/(Titre) ([IVXLC]+)\s*-\s*([^\n]+.)/g, '<section id="$1$2">\n\n<h2>$1 $2 - $3</h2></section>');
    for (const match of texte.matchAll(/<section id="(Titre) ([IVXLC]+)\s*-\s*([^\n]+.)"><br><strong>/g)) {
        texte = texte.replace(match[0], match[0].toLowerCase().replace('.', ''))
    }

    texte = texte.replace('ARTICLE PREMIER.', '<section id="article1"><strong>ARTICLE PREMIER.</strong></section>');
    texte = texte.replace(/(ARTICLE) ([1-9][0-9]*(-[1-9][0-9]*)?.)/g, '<section id="$1$2"><br><strong>$1 $2</strong></section>');
    for (const match of texte.matchAll(/<section id="ARTICLE([1-9][0-9]*(-[1-9][0-9]*)?)\."><br><strong>/g)) {
        texte = texte.replace(match[0], match[0].toLowerCase().replace('.', ''))
    }

    texte = texte.replace(/(Mis à jour le : [0-9]+ [a-zéû]+ [0-9]+)./, '<br><em>$1</em>');

    texte = texte.replace(/(\n)/g, '<br>');
    constitutionText.innerHTML = texte;

    genererMenuDeroulant();
};

async function code_de_l_education() {
    localStorage.setItem("oldPage", "011001010110010001110101011000110110000101110100011010010110111101101110");
    document.getElementById("MenuScrollEntier").classList.remove("hide");
    const codeText = document.getElementById("main");
    let texte = "<section class=\"article-content\"><h2>Texte du Code de l'Éducation</h2><p id=\"code-text\">"
    texte = texte + await (await fetch("../textes/code-de-l-education.txt")).text();
    texte = texte + "</p></section>";

    texte = texte.replace('PRÉAMBULE', '\n<h2>PRÉAMBULE</h2>');

    texte = texte.replace('Titre premier - PRINCIPES GÉNÉRAUX', '<section id="titreI">\n\n<h2>Titre premier - PRINCIPES GÉNÉRAUX</h2></section>');
    texte = texte.replace(/(Titre) ([IVXLC]+)\s*-\s*([^\n]+.)/g, '<section id="$1$2">\n\n<h2>$1 $2 - $3</h2></section>');
    for (const match of texte.matchAll(/<section id="(Titre) ([IVXLC]+)\s*-\s*([^\n]+.)"><br><strong>/g)) {
        texte = texte.replace(match[0], match[0].toLowerCase().replace('.', ''))
    }

    texte = texte.replace('ARTICLE PREMIER.', '<section id="article1"><strong>ARTICLE PREMIER.</strong></section>');
    texte = texte.replace(/(ARTICLE) ([1-9][0-9]*(-[1-9][0-9]*)?.)/g, '<section id="$1$2"><br><strong>$1 $2</strong></section>');
    for (const match of texte.matchAll(/<section id="ARTICLE([1-9][0-9]*(-[1-9][0-9]*)?)\."><br><strong>/g)) {
        texte = texte.replace(match[0], match[0].toLowerCase().replace('.', ''))
    }

    texte = texte.replace(/(Mis à jour le : [0-9]+ [a-zéû]+ [0-9]+)./, '<br><em>$1</em>');

    texte = texte.replace(/(\n)/g, "<br>");
    codeText.innerHTML = texte;

    genererMenuDeroulant();
};


async function toggleTheme() {
    if (localStorage.getItem('termsAccepted') === 'true') localStorage.setItem("theme", localStorage.getItem("theme") === "dark" ? "light" : "dark");

    if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        darkSwitch("add");
    } else if (localStorage.getItem("theme") === "light") {
        darkSwitch("remove");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        darkSwitch("add");
    } else {
        darkSwitch("remove");
    }
}

async function darkSwitch(action) {
   const main = await getClass("main");
   const main2 = await getClass("main2");

   main[action]("dark-theme");
   main2[action]("dark-theme");
}

async function getClass(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with id ${id} not found`);
        return null;
    }
    return element.classList;
}

async function declineTerms() {
    window.history.back();
}
async function acceptTerms() {
    localStorage.setItem("termsAccepted", "true");
    window.location.reload();
}

//////////////////////////////// encodé ////////////////////////////////

async function EncodeDecode(input) {
    const cleanInput = input.trim();

    const isBinary = /^[01\s]+$/.test(cleanInput) && cleanInput.replace(/\s/g, '').length % 8 === 0;

    if (isBinary) {
        const output = cleanInput.match(/[01]{8}/g).map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        console.log(output)
        if (output === "home") {home()} else if (output === "constitution") {constitution()} else if (output === "education") {code_de_l_education()}
        // return output
    } else {
        const output = input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        // return output
    }
}
