(function() {
    let luotuHeader = document.createElement("header");
    luotuHeader.setAttribute("class", "ylatunniste");
    let luotuH1 = document.createElement("h1");
    luotuH1.innerText = "Tämä on artikkelin otsikko";
    luotuHeader.appendChild(luotuH1);
    let luotuP = document.createElement("p");
    luotuP.innerText = "Ensimmäinen kappale! Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sed voluptatum, suscipit quas neque facilis corrupti recusandae sint commodi nisi sit molestias inventore natus. Fugit dolor accusamus voluptatem rem eligendi."
    luotuHeader.appendChild(luotuP);
    document.body.appendChild(luotuHeader);
    let luotuSection = document.createElement("section");
    luotuSection.setAttribute("id", "rinnakkain");
    document.body.appendChild(luotuSection);
    let luotuP2 = document.createElement("p");
    luotuP2.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sed voluptatum, suscipit quas neque facilis corrupti recusandae sint commodi nisi sit molestias inventore natus. Fugit dolor accusamus voluptatem rem eligendi.";
    luotuSection.appendChild(luotuP2);
    let luotuFigure = document.createElement("figure");
    luotuFigure.setAttribute("id", "kuvanpaikka");
    luotuSection.appendChild(luotuFigure);
    let luotuKuva = document.createElement("img");
    var luotuKuvaParent = document.getElementById("kuvanpaikka");
    luotuKuva.src = "kuva.png";
    luotuKuvaParent.appendChild(luotuKuva);
    let luotuFooter = document.createElement("footer");
    let footerP = document.createElement("p");
    footerP.innerText = "© 2020 Noa Julkunen"
    document.body.appendChild(luotuFooter);
    luotuFooter.appendChild(footerP);
})();