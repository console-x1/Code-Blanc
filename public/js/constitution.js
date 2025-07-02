document.addEventListener("DOMContentLoaded", async function() {
    const constitutionText = document.getElementById("constitution-text");
    let texte = await (await fetch("../articles/constitution.txt")).text();

    texte = texte.replace('PRÉAMBULE', '\n<h2>PRÉAMBULE</h2>');

    texte = texte.replace('Titre premier - DE LA SOUVERAINETÉ', '\n\n<h2>Titre premier - DE LA SOUVERAINETÉ</h2>');
    texte = texte.replace(/(Titre [IVXLC]+\s*-\s*[^\n]+)/g, "\n\n<h2>$1</h2>");

    texte = texte.replace('ARTICLE PREMIER', '<strong>ARTICLE PREMIER</strong>');
    texte = texte.replace(/(ARTICLE [1-9][0-9]*(-[1-9][0-9]*)?)/g, "<br><strong>$1</strong>");

    texte = texte.replace(/(Mis à jour le : [0-9]+ [a-zéû]+ [0-9]+)/, '<br><em>$1</em>');

    texte = texte.replace(/(\n)/g, "<br>");
    constitutionText.innerHTML = texte;
});