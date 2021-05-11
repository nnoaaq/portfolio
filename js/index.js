let vasen = 0;
let oikea = 0;
let kirjoitettava_teksti_vasen = "Portfolio";
let kirjoitettava_teksti_oikea = "Noa Julkunen";
let nopeus_vasen = 100;
let nopeus_oikea = 150;
let ammatilliset = document.querySelector(".ammatilliset-tutkinnon-osat");
let yhteiset = document.querySelector(".yhteiset-tutkinnon-osat");
let vapaasti = document.querySelector(".vapaasti-valittavat-tutkinnon-osat");
let tehtava_alue = document.getElementById("tehtavat");
let muutettava_i;
let muutettava_div;
let muutettava_button;
window.addEventListener("load", () => {
        setTimeout(function() {
            const latausvaihe = document.querySelector(".latausvaihe");
            latausvaihe.classList.add("lataus-valmis");
            document.body.classList.remove("rajoitettu-korkeus");
            let header = document.querySelector("header");
            let ylos = document.querySelector(".ylos");
            ylos.style.display = "block";
            header.classList.add("header");
            header.classList.remove("piilotettu");
            kirjoitusVasen();
            kirjoitusOikea();
            var js_tiedosto = document.createElement("script");
            js_tiedosto.src = "js/tehtavat.js";
            document.getElementsByTagName("head")[0].appendChild(js_tiedosto);
        }, 800);
    })
    // .latausvaihe piiloon kun lataus valmis

function ylos() {
    window.scrollTo({
        top: 0,
        left: 100,
        behavior: 'smooth'
    });
}
// scrollaa sivun yläosaan
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
// kirjoitus animaatiot
function kuvat() {

    let kuvat = document.querySelectorAll(".figure img");
    for (let kuva of kuvat) {
        kuva.classList.toggle("kuvat-piilossa");
    }
}


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

    document.querySelector("#tehtava").classList.add("nolla");
    document.querySelector(".saa").classList.add("nolla");
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
//TEHTÄVÄT TOIMINNALLISUUS

const osiot = document.querySelectorAll("#sisalto section");
const bubble = document.querySelector(".kupla");
let tietoja_linkki = document.querySelector(".tietoja-linkki");
let lomake_linkki = document.querySelector(".lomake-linkki");
let tehtava_linkki = document.querySelector(".tehtava-linkki");
let nimetty = document.querySelector(".nimetty");

let asetukset = {
    threshold: 0.4
}



let observer = new IntersectionObserver(observerFunktio, asetukset);

function observerFunktio(entries) {
    entries.forEach(entry => {
        const luokka_nimi = entry.target.classList[0];
        const aktiivinen = document.querySelector(`[data-page=${luokka_nimi}]`);
        const taustaindex = entry.target.getAttribute("data-index");
        const taustavarit = [
            "#283e82",
            "rgb(255, 165, 0)",
            "#ff2257",
            "rgb(243, 243, 169"
        ];
        const sijainti = aktiivinen.getBoundingClientRect();
        const suunta = {
            height: sijainti.height,
            width: sijainti.width,
            top: sijainti.top,
            left: sijainti.left
        }

        if (entry.isIntersecting) {
            if (entry.target.id === "aloitus") {
                bubble.style.display = "none";
            } else if (window.innerWidth < 1200) {
                bubble.style.display = "none";

            } else {
                bubble.style.display = "block";
                bubble.style.setProperty("left", `${suunta.left}px`);
                bubble.style.setProperty("top", `${suunta.top}px`);
                bubble.style.setProperty("width", `${suunta.width}px`);
                bubble.style.setProperty("height", `${suunta.height}px`);
                bubble.style.background = taustavarit[taustaindex];
            }

        }



    });
}
osiot.forEach(osio => {
    observer.observe(osio);
});


// VIHREÄ "TILANNEBOXI"


function hampurilainen() {
    let pikalinkit = document.querySelector(".ylapalkki-pikalinkit");
    pikalinkit.classList.toggle("linkit-nakyy");
    let viiva1 = document.querySelector(".viiva1");
    let viiva2 = document.querySelector(".viiva2");
    let viiva3 = document.querySelector(".viiva3");
    viiva1.classList.toggle("vinossa_2");
    viiva2.classList.toggle("vinossa_1");
    viiva3.classList.toggle("vinossa_3");
}

function liiku(id) {
    let maaranpaa = document.getElementById(id);
    maaranpaa.scrollIntoView();
}
