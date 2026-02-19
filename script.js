// ======== DONNÉES ========
let categories = ["Vêtements", "Chaussures", "Accessoires", "Électronique", "Maison"];

let produits = [
    {id: 1, nom: "T-shirt rouge", categorie: "Vêtements", prix: 20},
    {id: 2, nom: "Jeans bleu", categorie: "Vêtements", prix: 35},
    {id: 3, nom: "Chaussures sport", categorie: "Chaussures", prix: 50},
    {id: 4, nom: "Chaussures habillées", categorie: "Chaussures", prix: 60},
    {id: 5, nom: "Sac à main", categorie: "Accessoires", prix: 35},
    {id: 6, nom: "Montre", categorie: "Accessoires", prix: 80},
    {id: 7, nom: "Casque audio", categorie: "Électronique", prix: 120},
    {id: 8, nom: "Enceinte Bluetooth", categorie: "Électronique", prix: 150},
    {id: 9, nom: "Lampe de bureau", categorie: "Maison", prix: 40},
    {id: 10, nom: "Coussin décoratif", categorie: "Maison", prix: 25}
];

let panier = [];

// ======== FONCTIONS ========

// Afficher les catégories
function afficherCategories() {
    const divCat = document.getElementById("categories");
    if(!divCat) return;
    divCat.innerHTML = "<h2>Catégories</h2>";

    categories.forEach(cat => {
        let btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => afficherProduits(cat);
        divCat.appendChild(btn);
    });

    // Bouton "Tout afficher"
    let btnAll = document.createElement("button");
    btnAll.textContent = "Tous";
    btnAll.onclick = () => afficherProduits();
    divCat.appendChild(btnAll);
}

// Afficher les produits (option filtre par catégorie)
function afficherProduits(categorie = null) {
    const divProd = document.getElementById("produits");
    if(!divProd) return;
    divProd.innerHTML = "<h2>Produits</h2>";

    let liste = produits.filter(p => !categorie || p.categorie === categorie);
    if(liste.length === 0) {
        divProd.innerHTML += "<p>Aucun produit dans cette catégorie.</p>";
        return;
    }

    liste.forEach(p => {
        let prodDiv = document.createElement("div");
        prodDiv.innerHTML = `${p.nom} - ${p.prix} DT <button onclick="ajouterPanier(${p.id})">Ajouter au panier</button>`;
        divProd.appendChild(prodDiv);
    });
}

// Ajouter un produit au panier
function ajouterPanier(id) {
    let produit = produits.find(p => p.id === id);
    if(produit) {
        panier.push(produit);
        afficherPanier();
    }
}

// Afficher le panier
function afficherPanier() {
    const divPanier = document.getElementById("panier");
    if(!divPanier) return;
    divPanier.innerHTML = "";
    if(panier.length === 0) {
        divPanier.innerHTML = "<p>Le panier est vide.</p>";
        return;
    }
    panier.forEach((p, index) => {
        divPanier.innerHTML += `${p.nom} - ${p.prix} DT <button onclick="supprimerDuPanier(${index})">Supprimer</button><br>`;
    });
}

// Supprimer un produit du panier
function supprimerDuPanier(index) {
    panier.splice(index, 1);
    afficherPanier();
}

// Simuler la commande
function passerCommande() {
    if(panier.length === 0) {
        alert("Votre panier est vide !");
        return;
    }
    let total = panier.reduce((sum, p) => sum + p.prix, 0);
    alert(`Commande passée ! Total : ${total} DT (paiement simulé)`);
    panier = [];
    afficherPanier();
}

// ======== LANCEMENT AU CHARGEMENT ========
window.onload = function() {
    afficherCategories();
    afficherProduits();
    afficherPanier();
};
