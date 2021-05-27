window.addEventListener("load", () => {
        setTimeout(function() {
            const latausvaihe = document.querySelector(".latausvaihe");
            latausvaihe.classList.add("lataus-valmis");
            document.body.classList.remove("rajoitettu-korkeus");
            document.querySelector("header").classList.remove("header-nakyy");
            kirjoitus();
        }, 80);
    })
    // lataus valmis     
let vasen = 0;
let nopeus = 90;

function kirjoitus() {
    if (screen.width <= 1000) {

        let kirjoitettava_teksti = "Olen Noa Julkunen ja tämä on minun portfolioni.";
        if (vasen < kirjoitettava_teksti.length) {
            document.querySelector(".otsikko").innerHTML += kirjoitettava_teksti.charAt(vasen);
            vasen++;
            setTimeout(kirjoitus, nopeus);
        }
    } else {

        let kirjoitettava_teksti = "Olen Noa Julkunen, web-ohjelmoinnin opiskelija ja tämä on minun portfolioni.";
        if (vasen < kirjoitettava_teksti.length) {
            document.querySelector(".otsikko").innerHTML += kirjoitettava_teksti.charAt(vasen);
            vasen++;
            setTimeout(kirjoitus, nopeus);
        }
    }
}
// Otsikon kirjoitus
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

let kortit = document.querySelectorAll(".kortti-otsikko");
for (let kortti of kortit) {
    kortti.addEventListener("click", () => {
        kortti.nextElementSibling.classList.toggle("kortti-teksti-nakyy");
    })
}
// kortit
function ilmoitus(teksti, vari) {
    document.getElementById("ilmoitus").classList.add("ilmoitus-nakyy");
    document.getElementById("ilmoitus").style.backgroundColor = vari;
    document.querySelector("#ilmoitus div p").innerHTML = teksti;
}

function ilmoitusPois() {
    document.getElementById("ilmoitus").classList.remove("ilmoitus-nakyy");
}
// ilmoitus

function liiku(kohde) {
    let maaranpaa = document.querySelector(`.${kohde}`);
    maaranpaa.scrollIntoView();
}

function ylos() {
    let maaranpaa = document.querySelector(".aloitus");
    maaranpaa.scrollIntoView();
}
// liikkuminen

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

//hampurilainen

window.addEventListener("scroll", () => {
    if (window.pageYOffset <= 400) {
        document.querySelector("header").classList.remove("header-nakyy");
    } else {
        document.querySelector("header").classList.add("header-nakyy");
    }
})

//scroll