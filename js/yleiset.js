let vasen = 0;
let oikea = 0;
let kirjoitettava_teksti_vasen = "Portfolio";
let kirjoitettava_teksti_oikea = "Noa Julkunen";
let nopeus_vasen = 100;
let nopeus_oikea = 150;
window.addEventListener("load", () => {
        setTimeout(function() {
            const latausvaihe = document.querySelector(".latausvaihe");
            latausvaihe.classList.add("lataus-valmis");
            document.body.classList.remove("rajoitettu-korkeus");
            let header = document.querySelector("header");
            let ylos = document.querySelector(".ylos");
            ylos.style.display = "block";
            header.classList.add("header");
            document.querySelector(".teema").style.display = "block";
            header.classList.remove("piilotettu");
            kirjoitusVasen();
            kirjoitusOikea();
            document.querySelector(".aaltoliike").style.display = "block";
            document.querySelector("header").classList.remove("hidden");
            document.querySelector("footer").classList.remove("hidden");
            document.querySelector(".ylos").classList.remove("hidden");
            var js_tiedosto = document.createElement("script");
            js_tiedosto.src = "js/tehtavat.js";
            document.getElementsByTagName("head")[0].appendChild(js_tiedosto);
        }, 800);
    })
    // lataus valmis


function hampurilainen() {
    let navigaatio = document.querySelector(".navigaatio");
    navigaatio.classList.toggle("navigaatio-nakyy");
    let viiva1 = document.querySelector(".viiva1");
    let viiva2 = document.querySelector(".viiva2");
    let viiva3 = document.querySelector(".viiva3");
    viiva1.classList.toggle("vinossa_2");
    viiva2.classList.toggle("vinossa_1");
    viiva3.classList.toggle("vinossa_3");
}
// Hampurilainen


let kortit = document.querySelectorAll(".kortti-otsikko");
for (let kortti of kortit) {
    kortti.addEventListener("click", () => {
        kortti.nextElementSibling.classList.toggle("kortti-teksti-nakyy");
    })
}
// kortit

function tutkinnonOsat(tutkinnonOsa, e) {
    muutettava_i = e.target.lastElementChild;
    muutettava_div = document.querySelector('.' + tutkinnonOsa);
    muutettava_button = e.target;
    if (muutettava_i.classList.contains("fa-minus")) {
        muutettava_i.classList = "fas fa-plus i-vihrea";
        muutettava_div.style.animation = "korkeusPois 1s";
    } else if (muutettava_i.classList.contains("fa-plus")) {
        muutettava_i.classList = "fas fa-minus i-punainen";
        muutettava_div.style.animation = "korkeus 2s";

    }
    muutettava_div.classList.toggle("piilossa");
    muutettava_div.classList.toggle("nakyvissa");

}

function tehtavat(e) {
    muutettava_i = e.target.lastElementChild;
    muutettava_div = muutettava_i.parentElement.nextElementSibling;
    if (muutettava_div.classList.contains("nakyvissa")) {
        muutettava_div.classList.remove("nakyvissa");
        muutettava_i.classList = "fas fa-plus i-vihrea";

    } else {
        muutettava_div.classList.add("nakyvissa");
        muutettava_i.classList = "fas fa-minus i-punainen";
    }
}
// tehtävät
function ilmoitusPois() {
    document.getElementById("ilmoitus").classList.remove("ilmoitus-nakyy");
}
// ilmoitus
function liiku(kohde) {
    let maaranpaa = document.querySelector(`.${kohde}`);
    maaranpaa.scrollIntoView();
}
// liiku
function ylos() {
    let maaranpaa = document.querySelector(".aloitus");
    maaranpaa.scrollIntoView();
}
// ylos
function kuvat() {

    let kuvat = document.querySelectorAll(".figure img");
    for (let kuva of kuvat) {
        kuva.classList.toggle("kuvat-piilossa");
    }
}
// kuvat

function kirjoitusVasen() {
    if (vasen < kirjoitettava_teksti_vasen.length) {
        document.querySelector(".yla").innerHTML += kirjoitettava_teksti_vasen.charAt(vasen);
        vasen++;
        setTimeout(kirjoitusVasen, nopeus_vasen);
    }
}

function kirjoitusOikea() {
    if (oikea < kirjoitettava_teksti_oikea.length) {
        document.querySelector(".ala").innerHTML += kirjoitettava_teksti_oikea.charAt(oikea);
        oikea++;
        setTimeout(kirjoitusOikea, nopeus_oikea);
    }
}
// kirjoitukset


document.querySelector(".teema").addEventListener("click", () => {
    document.querySelector(".teema-pallo").classList.toggle("teema-pallo-valkoinen");
    document.querySelector(".teema").classList.toggle("teema-valkoinen");

    if (!localStorage.getItem("teema")) {
        localStorage.setItem("teema", "valkoinen");
        document.body.classList.add("valkoinen");
        document.querySelector(".aaltoliike").classList.add("aaltoliike-valkoinen");
    } else if (localStorage.getItem("teema") === "oletus") {
        localStorage.clear();
        localStorage.setItem("teema", "valkoinen");
        document.body.classList.add("valkoinen");
        document.querySelector(".aaltoliike").classList.add("aaltoliike-valkoinen");
    } else if (localStorage.getItem("teema") === "valkoinen") {
        localStorage.clear();
        localStorage.setItem("teema", "oletus");
        document.body.classList.remove("valkoinen");
        document.querySelector(".aaltoliike").classList.remove("aaltoliike-valkoinen");
    }
});
if (localStorage.getItem("teema") === "valkoinen") {
    document.body.classList.add("valkoinen");
    document.querySelector(".teema-pallo").classList.add("teema-pallo-valkoinen");
    document.querySelector(".teema").classList.add("teema-valkoinen");
    document.querySelector(".aaltoliike").classList.add("aaltoliike-valkoinen");
} else if (localStorage.getItem("teema") === "oletus") {
    document.body.classList.remove("valkoinen");
    document.querySelector(".teema-pallo").classList.remove("teema-pallo-valkoinen");
    document.querySelector(".teema").classList.remove("teema-valkoinen");
    document.querySelector(".aaltoliike").classList.remove("aaltoliike-valkoinen");
}
//teema