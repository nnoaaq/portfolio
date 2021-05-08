let saa_input = document.getElementById("kaupunki");
let saa_button = document.getElementById("button-kaupunki");
let ennustus = document.querySelector(".ennustus");
saa_button.addEventListener("click", () => {
    saa(saa_input.value);
});
let avain = "a7623f446de16b909d02e43badefd642";
let status;

async function saa(hakutermi) {
    document.querySelector("#tehtava").classList.add("nolla");

    let naytettavat = [];
    let vastaus = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + hakutermi + '&appid=' + avain + '&units=metric');
    if (vastaus.ok) {
        let json = await vastaus.json();
        let x_koordinaatti = json["coord"]["lat"];
        let y_koordinaatti = json["coord"]["lon"];

        let vastaus_tiedot = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + x_koordinaatti + '&lon=' + y_koordinaatti + '&exclude=hourly,&appid=' + avain + '&units=metric')
        if (vastaus_tiedot.ok) {
            let tiedot_json = await vastaus_tiedot.json();
            let i = -1;
            let paivat = tiedot_json["daily"];

            for (let paiva_objekti of paivat) {
                i++;
                let paivamaara = aika(paiva_objekti.dt, "paiva")
                let tuuli = tiedot_json["daily"][i]["wind_speed"];
                let tuuli_deg = tiedot_json["daily"][i]["wind_deg"];
                let lampotila = tiedot_json["daily"][i]["temp"]["day"];
                let kuvake = tiedot_json["daily"][i]["weather"]["0"]["icon"];
                naytettavat.push({
                    "tuuli": tuuli,
                    "tuuli_deg": tuuli_deg,
                    "paivamaara": paivamaara,
                    "lampotila": lampotila,
                    "kuvake": kuvake
                });

            }
            let ennustukset = [];
            for (let naytettava of naytettavat) {
                let ennustus_html = `<div class="ennustus-paiva"><p class="paivamaara">${naytettava.paivamaara}</p> <p class="lampotila">${naytettava.lampotila} &#x2103;</p> <p class="tuuli">${naytettava.tuuli} m/s <span class="suunta"><i style="transform: rotate(${naytettava.tuuli_deg}deg)"class="fas fa-arrow-up"></i></span></p><figure><img src="http://openweathermap.org/img/wn/${naytettava.kuvake}@2x.png" class="saa-kuva"></figure></div>`;
                ennustukset.push(ennustus_html);
            }
            document.querySelector(".kohde").textContent = "Lähipäivien sää sijainnissa: " + saa_input.value[0].toUpperCase() + saa_input.value.substring(1);
            saa_input.value = "";
            ennustus.innerHTML = ennustukset.join(" ");
            ennustus.classList.add("korkeus");

        } else {
            ennustus.innerHTML = "Virhe " + vastaus.status + " : kaupingilla ei löytynyt tietoja."
        }
    } else {
        if (vastaus.status == 404) {
            saa_ilmoitus(`Virhe ${vastaus.status}: hakutermillä ei löytynyt kaupunkia.`, "red");
        } else if (vastaus.status == 400) {
            saa_ilmoitus(`Virhe ${vastaus.status}: hakutermi on annettava.`, "red");
        }
    }
}



function aika(aika_muuttamaton, muoto) {
    let kuukaudet = ['Tammikuuta', 'Helmikuuta', 'Maaliskuuta', 'Huhtikuuta', 'Toukokuuta', 'Kesäkuuta', 'Heinäkuuta', 'Elokuuta', 'Syyskuuta', 'Lokakuuta', 'Marraskuuta', 'Joulukuuta'];
    let paivays = new Date(aika_muuttamaton * 1000);
    let vuosi = paivays.getFullYear();
    let kuukausi = kuukaudet[paivays.getMonth()];
    let paiva = paivays.getDate();
    let tunti = paivays.getHours();
    let minuutti = "0" + paivays.getMinutes();
    let sekuntti = "0" + paivays.getSeconds();
    let kuukausi_numero = kuukaudet.indexOf(kuukausi) + 1;
    if (muoto === "paiva") {
        let luettava_aika = `${paiva}.${kuukausi_numero} <i class="fas fa-calendar-alt"></i>`;
        return luettava_aika;

    } else {
        let luettava_aika = `${tunti}:${minuutti} <i class='fas fa-clock'></i> `;
        return luettava_aika;

    }
}

function saa_ilmoitus(teksti, vari) {
    document.getElementById("ilmoitus").classList.add("ilmoitus-nakyy");
    document.getElementById("ilmoitus").style.backgroundColor = vari;
    document.querySelector("#ilmoitus div p").innerHTML = teksti;
    setTimeout(function() {
        document.getElementById("ilmoitus").classList.remove("ilmoitus-nakyy");
    }, 6000);
}


function paikannus() {
    navigator.geolocation.getCurrentPosition(onnistui, virhe);
    document.getElementById("sijainti").innerHTML = "Hyväksy selaimen paikannuspyyntö";
    document.getElementById("sijainti").style.textAlign = "center";
    document.querySelector("#tehtava").classList.add("nolla");

}

function sulje() {
    document.querySelector("#sijainti").style.display = "none";
}



async function onnistui(sijainti) {
    let paiva = [];
    let tiedot = [];
    document.getElementById("sijainti").style.display = "none";
    let koordinaatit = sijainti.coords;
    let x = koordinaatit.latitude;
    let y = koordinaatit.longitude;
    let paiva_vastaus = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + x + '&lon=' + y + '&exclude=minutely&appid=' + avain + '&units=metric')
    if (paiva_vastaus.ok) {
        let paiva_json = await paiva_vastaus.json();
        let tunneittain = paiva_json["hourly"];
        for (let tunnnit of tunneittain) {
            let tunti = aika(tunnnit["dt"]);
            let lampotila = tunnnit["temp"];
            let tuuli_nopeus = tunnnit["wind_speed"];
            let tuuli_deg = tunnnit["wind_deg"];
            let kuvake = tunnnit["weather"]["0"]["icon"];
            paiva.push({
                "aika": tunti,
                "lampotila": lampotila,
                "tuuli_nopeus": tuuli_nopeus,
                "tuuli_deg": tuuli_deg,
                "kuvake": kuvake
            })
            if (paiva.length == 10) {
                for (let yksi of paiva) {
                    let yksi_html = `<div class="tunti-saa"><p class="paivamaara">${yksi.aika}</p><p class="lampotila">${yksi.lampotila} &#x2103;</p><p class="tuuli">${yksi.tuuli_nopeus} m/s <span class="suunta"><i style="transform: rotate(${yksi.tuuli_deg}deg)"class="fas fa-arrow-up"></i></span></p><figure><img src="http://openweathermap.org/img/wn/${yksi.kuvake}@2x.png" class="saa-kuva"></figure></div>`;
                    tiedot.push(yksi_html);
                }
                document.querySelector(".paikannus-saa").innerHTML = tiedot.join(" ");
                document.querySelector(".paikannus-saa").classList.add("korkeus");
                document.querySelector(".paikannus-nimi").textContent = "Sää tänään sijainnissasi:";

                break;
            }

        }

    } else {
        console.log(paiva_vastaus.status);
    }
}

function virhe(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}