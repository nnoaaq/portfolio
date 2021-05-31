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
let sisalto = document.querySelectorAll("main >*");

function kirjoitus() {
    if (screen.width <= 1000) {

        let kirjoitettava_teksti = "Olen Noa Julkunen ja tämä on minun portfolioni.";
        if (vasen < kirjoitettava_teksti.length) {
            document.querySelector(".otsikko").innerHTML += kirjoitettava_teksti.charAt(vasen);
            vasen++;
            setTimeout(kirjoitus, nopeus);
        }
        setTimeout(function() {
            document.querySelector(".cta").classList.add("cta-nakyy");

        }, 4000)
    } else {

        let kirjoitettava_teksti = "Olen Noa Julkunen, web-ohjelmoinnin opiskelija ja tämä on minun portfolioni.";
        if (vasen < kirjoitettava_teksti.length) {
            document.querySelector(".otsikko").innerHTML += kirjoitettava_teksti.charAt(vasen);
            vasen++;
            setTimeout(kirjoitus, nopeus);

        }
        setTimeout(function() {
            document.querySelector(".cta").classList.add("cta-nakyy");

        }, 7000)
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
        //  if (screen.width <= 1000) {
        //      window.scroll({
        //          top: muutettava_div.offsetTop - 175,
        //          left: 100,
        //          behavior: 'smooth'
        //      });
        //  }
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
    for (let sisalto_osio of sisalto) {
        sisalto_osio.classList.remove("animoitava");
    }
    if (screen.width <= 1000) {
        window.scroll({
            top: maaranpaa.offsetTop - 75,
            left: 100,
            behavior: 'smooth'
        });

    } else {
        maaranpaa.scrollIntoView();
    }

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
        document.querySelector(".ylos").classList.add("hidden");
        document.querySelector(".kupla").style.display = "none";
    } else if (window.pageYOffset <= 100) {
        document.querySelector(".esittely-teksti").style.height = "auto";
    } else {
        document.querySelector("header").classList.add("header-nakyy");
        document.querySelector(".ylos").classList.remove("hidden");
        document.querySelector(".kupla").style.display = "block";
    }
})

//scroll

document.querySelector(".teema").addEventListener("click", () => {
    if (!localStorage.getItem("teema")) {
        localStorage.setItem("teema", "valkoinen");
        valkoiseksi();
    } else if (localStorage.getItem("teema") === "oletus") {
        localStorage.clear();
        localStorage.setItem("teema", "valkoinen");
        valkoiseksi();
    } else if (localStorage.getItem("teema") === "valkoinen") {
        localStorage.clear();
        localStorage.setItem("teema", "oletus");
        oletukseksi();
    }
});
let aloitus = document.querySelector(".aloitus");
let aaltoliikeet = document.querySelectorAll(".aaltoliike");

function oletukseksi() {
    document.querySelector(".teema-pallo").classList.remove("teema-pallo-valkoinen");
    document.querySelector(".teema").classList.remove("teema-valkoinen");
    aloitus.classList.remove("aloitus-valkoinen");
    document.body.classList.remove("valkoinen");
    for (let aaltoliike of aaltoliikeet) {
        aaltoliike.classList.remove("aaltoliike-valkoinen");
    }
}

function valkoiseksi() {
    document.querySelector(".teema-pallo").classList.add("teema-pallo-valkoinen");
    document.querySelector(".teema").classList.add("teema-valkoinen");
    aloitus.classList.add("aloitus-valkoinen");
    document.body.classList.add("valkoinen");
    for (let aaltoliike of aaltoliikeet) {
        aaltoliike.classList.add("aaltoliike-valkoinen");
    }
}
if (localStorage.getItem("teema") === "oletus") {
    oletukseksi();
} else if (localStorage.getItem("teema") === "valkoinen") {
    valkoiseksi();
}

//teema
let observoitavat = document.querySelectorAll("main >*");
let observoitava_taulukko = [];
for (let tarkistettava of observoitavat) {
    if (tarkistettava.classList == "aaltoliike") {

    } else {
        observoitava_taulukko.push(tarkistettava)
    }
}
let optiot = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8
};

function callbackFunction(entries) {
    entries.forEach(entry => {
        let muutettava = document.querySelector(`[data-sijainti=${entry.target.classList[0]}]`);
        if (entry.isIntersecting) {
            if (muutettava !== null) {
                muutettava.classList.add("aktiivinen");
                entry.target.classList.add("animoitu");
            }
        } else {
            if (muutettava !== null) {
                muutettava.classList.remove("aktiivinen");
            }
        }
    })
}

let observer = new IntersectionObserver(callbackFunction, optiot);
for (let observoitava of observoitava_taulukko) {
    observer.observe(observoitava);
}

// observer


for (let sisalto_osa of sisalto) {
    sisalto_osa.classList.add("animoitava");
}


//document.querySelector(".saatiedot").addEventListener("click", (event) => {
//    console.log(event.target.parentElement.parentElement);
//    event.target.parentElement.parentElement.scrollIntoView();
//    document.querySelector(".saatiedot").style.position = "sticky";
//    document.querySelector(".saatiedot").style.top = "75px";
//    document.querySelector(".saatiedot").style.zIndex = "75";
//
//})