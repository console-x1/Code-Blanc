async function home() {
    const homeText = document.getElementById("main");
    let texte = await (await fetch("../textes/home.txt")).text();
    homeText.innerHTML = texte;
};

async function constitution() {
    const constitutionText = document.getElementById("main");
    let texte = "<section class=\"article-content\"><h2>Texte de la Constitution</h2><p id=\"constitution-text\">"
    texte = texte + await (await fetch("../textes/constitution.txt")).text();
    texte = texte + "</p></section>";

    texte = texte.replace('PRÉAMBULE', '\n<h2>PRÉAMBULE</h2>');

    texte = texte.replace('Titre premier - DE LA SOUVERAINETÉ', '\n\n<h2>Titre premier - DE LA SOUVERAINETÉ</h2>');
    texte = texte.replace(/(Titre [IVXLC]+\s*-\s*[^\n]+)/g, "\n\n<h2>$1</h2>");

    texte = texte.replace('ARTICLE PREMIER', '<strong>ARTICLE PREMIER</strong>');
    texte = texte.replace(/(ARTICLE [1-9][0-9]*(-[1-9][0-9]*)?)/g, "<br><strong>$1</strong>");

    texte = texte.replace(/(Mis à jour le : [0-9]+ [a-zéû]+ [0-9]+)/, '<br><em>$1</em>');

    texte = texte.replace(/(\n)/g, "<br>");
    constitutionText.innerHTML = texte;
};

async function code_de_l_education() {
    const codeText = document.getElementById("main");
    let texte = "<section class=\"article-content\"><h2>Texte du Code de l'Éducation</h2><p id=\"code-text\">"
    texte = texte + await (await fetch("../textes/code-de-l-education.txt")).text();
    texte = texte + "</p></section>";

    texte = texte.replace('PRÉAMBULE', '\n<h2>PRÉAMBULE</h2>');

    texte = texte.replace('Titre premier - PRINCIPES GÉNÉRAUX', '\n\n<h2>Titre premier - PRINCIPES GÉNÉRAUX</h2>');
    texte = texte.replace(/(Titre [IVXLC]+\s*-\s*[^\n]+)/g, "\n\n<h2>$1</h2>");

    texte = texte.replace('ARTICLE PREMIER', '<strong>ARTICLE PREMIER</strong>');
    texte = texte.replace(/(ARTICLE [1-9][0-9]*(-[1-9][0-9]*)?)/g, "<br><strong>$1</strong>");

    texte = texte.replace(/(Mis à jour le : [0-9]+ [a-zéû]+ [0-9]+)/, '<br><em>$1</em>');

    texte = texte.replace(/(\n)/g, "<br>");
    codeText.innerHTML = texte;
};

async function declineTerms() {
    window.history.back();
}
async function acceptTerms() {
    localStorage.setItem("termsAccepted", "true");
    window.location.reload();
}