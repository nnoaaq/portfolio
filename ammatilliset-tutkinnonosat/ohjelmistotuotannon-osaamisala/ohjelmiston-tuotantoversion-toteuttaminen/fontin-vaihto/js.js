let nappi = document.getElementById('nappi-koko');
let nappi2 = document.getElementById('nappi-fontti');
let esine = document.getElementById('teksti');
let fonttikoko = document.querySelector(".fonttikoko");
let fonttinimi = document.querySelector(".fontti-nimi");
nappi.addEventListener("click", () => {
    esine.style.fontSize = "20px";
    fonttikoko.innerHTML = esine.style.fontSize;
    nappi.addEventListener("click", () => {
        if (esine.style.fontSize == "20px") {
            esine.style.fontSize = "24px";
            fonttikoko.innerHTML = esine.style.fontSize;

        } else if (esine.style.fontSize == "24px") {
            esine.style.fontSize = "28px";
            fonttikoko.innerHTML = esine.style.fontSize;

        } else if (esine.style.fontSize == "28px") {
            esine.style.fontSize = "32px";
            fonttikoko.innerHTML = esine.style.fontSize;

        } else {
            esine.style.fontSize = "20px";
            fonttikoko.innerHTML = esine.style.fontSize;

        }
    });
});
nappi2.addEventListener("click", () => {
    esine.style.fontFamily = "Roboto";
    fonttinimi.innerHTML = "Käytössä oleva fontti: " + esine.style.fontFamily;
    nappi2.addEventListener("click", () => {
        if (esine.style.fontFamily == "Roboto") {
            esine.style.fontFamily = "Mansalva";
            fonttinimi.innerHTML = "Käytössä oleva fontti: " + esine.style.fontFamily;

        } else if (esine.style.fontFamily == "Mansalva") {
            esine.style.fontFamily = "Grenze";
            fonttinimi.innerHTML = "Käytössä oleva fontti: " + esine.style.fontFamily;

        } else if (esine.style.fontFamily == "Grenze") {
            esine.style.fontFamily = "Turret Road";
            fonttinimi.innerHTML = "Käytössä oleva fontti: " + esine.style.fontFamily;

        } else if (esine.style.fontFamily == "Turret Road") {
            esine.style.fontFamily = "Courier New";
            fonttinimi.innerHTML = "Käytössä oleva fontti: " + esine.style.fontFamily;
        } else {
            esine.style.fontFamily = "Roboto";
            fonttinimi.innerHTML = "Käytössä oleva fontti: " + esine.style.fontFamily;

        }
    });
});