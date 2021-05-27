let ylos_painike = document.querySelector(".ylos");

window.addEventListener("load", () => {
        setTimeout(function() {
            const latausvaihe = document.querySelector(".latausvaihe");
            latausvaihe.classList.add("lataus-valmis");
            document.body.classList.remove("rajoitettu-korkeus");
            let header = document.querySelector("header");
            header.classList.add("header");
            document.querySelector(".teema").style.display = "block";
            header.classList.remove("piilotettu");
            kirjoitusVasen();
            ylos_painike.style.display = "block";
            document.querySelector(".aaltoliike").style.display = "block";
            document.querySelector("header").classList.remove("hidden");
            document.querySelector("footer").classList.remove("hidden");
            let js_tiedosto = document.createElement("script");
            js_tiedosto.src = "js/tehtavat.js";
            document.getElementsByTagName("head")[0].appendChild(js_tiedosto);
        }, 80);
    })
    // lataus valmis


function hampurilainen() {
    let navigaatio = document.querySelector(".navigaatio");
    navigaatio.classList.toggle("navigaatio-nakyy");
    let viivat = document.querySelectorAll(".hampurilainen > *");
    for (let viiva of viivat) {
        viiva.classList.toggle("hampurilainen-valkoinen");
    }
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


function kirjoitusVasen() {
    if (screen.width <= 1000) {
        let kirjoitettava_teksti_vasen = "Olen Noa Julkunen ja tämä on minun portfolioni.";
        if (vasen < kirjoitettava_teksti_vasen.length) {
            document.querySelector(".yla").innerHTML += kirjoitettava_teksti_vasen.charAt(vasen);
            vasen++;
            setTimeout(kirjoitusVasen, nopeus_vasen);
        }
    } else {
        let kirjoitettava_teksti_vasen = "Olen Noa Julkunen, web-ohjelmoinnin opiskelija ja tämä on minun portfolioni.";
        if (vasen < kirjoitettava_teksti_vasen.length) {
            document.querySelector(".yla").innerHTML += kirjoitettava_teksti_vasen.charAt(vasen);
            vasen++;
            setTimeout(kirjoitusVasen, nopeus_vasen);
        }
    }

}


// kirjoitus


document.querySelector(".teema").addEventListener("click", () => {
    document.querySelector(".teema-pallo").classList.toggle("teema-pallo-valkoinen");
    document.querySelector(".teema").classList.toggle("teema-valkoinen");

    if (!localStorage.getItem("teema")) {
        localStorage.setItem("teema", "valkoinen");
        document.body.classList.add("valkoinen");
        document.querySelector(".aaltoliike").classList.add("aaltoliike-valkoinen");
        document.querySelector(".aloitus").classList.add("aloitus-valkoinen");
    } else if (localStorage.getItem("teema") === "oletus") {
        localStorage.clear();
        localStorage.setItem("teema", "valkoinen");
        document.body.classList.add("valkoinen");
        document.querySelector(".aaltoliike").classList.add("aaltoliike-valkoinen");
        document.querySelector(".aalto-alas").classList.add("aalto-alas-harmaa");
        document.querySelector(".aalto-alas-alempi").classList.add("aalto-alas-harmaa");
        document.querySelector(".aloitus").classList.add("aloitus-valkoinen");
    } else if (localStorage.getItem("teema") === "valkoinen") {
        localStorage.clear();
        localStorage.setItem("teema", "oletus");
        document.body.classList.remove("valkoinen");
        document.querySelector(".aaltoliike").classList.remove("aaltoliike-valkoinen");
        document.querySelector(".aalto-alas").classList.remove("aalto-alas-harmaa");
        document.querySelector(".aalto-alas-alempi").classList.remove("aalto-alas-harmaa");
        document.querySelector(".aloitus").classList.remove("aloitus-valkoinen");
    }
});
if (localStorage.getItem("teema") === "valkoinen") {
    document.body.classList.add("valkoinen");
    document.querySelector(".teema-pallo").classList.add("teema-pallo-valkoinen");
    document.querySelector(".teema").classList.add("teema-valkoinen");
    document.querySelector(".aaltoliike").classList.add("aaltoliike-valkoinen");
    document.querySelector(".aalto-alas").classList.add("aalto-alas-harmaa");
    document.querySelector(".aalto-alas-alempi").classList.add("aalto-alas-harmaa");
    document.querySelector(".aloitus").classList.add("aloitus-valkoinen");
} else if (localStorage.getItem("teema") === "oletus") {
    document.body.classList.remove("valkoinen");
    document.querySelector(".teema-pallo").classList.remove("teema-pallo-valkoinen");
    document.querySelector(".teema").classList.remove("teema-valkoinen");
    document.querySelector(".aaltoliike").classList.remove("aaltoliike-valkoinen");
    document.querySelector(".aalto-alas").classList.remove("aalto-alas-harmaa");
    document.querySelector(".aalto-alas-alempi").classList.remove("aalto-alas-harmaa");
    document.querySelector(".aloitus").classList.remove("aloitus-valkoinen");
}
//teema


window.addEventListener("scroll", () => {
    document.querySelector("header").style.zIndex = "5";
    document.querySelector(".teema").classList.add("alhaalla");
    document.querySelector("header").style.height = "75px";
    ylos_painike.style.display = "block";
    document.querySelector(".ylos").classList.remove("hidden");
    document.querySelector(".ohjeet").style.display = "none";
    if (window.pageYOffset <= 400) {
        document.querySelector("header").style.zIndex = "0";
        document.querySelector(".teema").classList.remove("alhaalla");
        ylos_painike.style.display = "none";
        document.querySelector("header").style.height = "0px";
    }
})

//scroll

const piirtoalusta = document.querySelector(".piirtoalusta");
const piirros = piirtoalusta.getContext("2d");
let sijainnit = {
    x: 0,
    y: 0
};

document.addEventListener("mousedown", aloita);
document.addEventListener("mouseup", lopeta);
window.addEventListener("resize", koko);


koko();

function koko() {
    piirtoalusta.width = window.innerWidth;
    piirtoalusta.height = window.innerHeight;
}

function sijoitus(event) {
    sijainnit.x = event.clientX - piirtoalusta.offsetLeft;
    sijainnit.y = event.clientY - piirtoalusta.offsetTop;
}

function aloita(event) {
    document.addEventListener("mousemove", piirra);
    sijoitus(event);
}

function lopeta() {
    document.removeEventListener("mousemove", piirra);
}

function piirra(event) {
    piirros.beginPath();
    piirros.lineWidth = 35;
    piirros.lineCap = "round";
    piirros.strokeStyle = "#741329";
    piirros.moveTo(sijainnit.x, sijainnit.y);
    sijoitus(event);
    piirros.lineTo(sijainnit.x, sijainnit.y);
    piirros.stroke();
}
//piirto

document.querySelector(".ohjeet").addEventListener("mouseover", () => {
    ilmoitus("Paina hiiren vasen painike pohjaan ja liikuta hiirtä piirtääksesi. Painamalla 'Delete' painiketta voi piirretyn viivan poistaa. ", "green");
})
document.addEventListener("keydown", (e) => {
    if (e.key === "Delete") {
        koko();
    } else if (e.key === "Backspace") {
        koko();
    }
})

function ilmoitus(teksti, vari) {
    document.getElementById("ilmoitus").classList.add("ilmoitus-nakyy");
    document.getElementById("ilmoitus").style.backgroundColor = vari;
    document.querySelector("#ilmoitus div p").innerHTML = teksti;

}
//ohje