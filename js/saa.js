let saa_input = document.getElementById("kaupunki");
let saa_button = document.getElementById("button-kaupunki");
let ennustus = document.querySelector(".ennustus");
saa_button.addEventListener("click", () => {
    saa(saa_input.value);
});
let avain = "a7623f446de16b909d02e43badefd642";
let status;

async function saa(hakutermi, x, y) {
    if (typeof hakutermi !== 'undefined' && typeof x == 'undefined' && typeof y == 'undefined') {
        document.querySelector("#tehtava").classList.add("nolla");
        saa_ilmoitus("Kerätään säätietoja", "green");
        kirjoitusOikea();
        let naytettavat = [];
        let vastaus = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + hakutermi + '&appid=' + avain + '&units=metric');
        if (vastaus.ok) {
            let json = await vastaus.json();
            let x_koordinaatti = json["coord"]["lat"];
            let y_koordinaatti = json["coord"]["lon"];
            let x_y_koordinaatit = {

                "coords": {
                    "latitude": x_koordinaatti,
                    "longitude": y_koordinaatti
                }

            };
            document.querySelector(".saa-div").classList.add("nolla");

            onnistui(x_y_koordinaatit);
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
                        "lampotila": Math.round(lampotila),
                        "kuvake": kuvake
                    });

                }
                let ennustukset = [];
                for (let naytettava of naytettavat) {
                    let ennustus_html = `<div class="ennustus-paiva"><p class="paivamaara">${naytettava.paivamaara}</p> <p class="lampotila">${naytettava.lampotila} &#x2103;</p> <p class="tuuli">${naytettava.tuuli} m/s <span class="suunta"><i style="transform: rotate(${naytettava.tuuli_deg}deg)"class="fas fa-arrow-up"></i></span></p><figure><img src="http://openweathermap.org/img/wn/${naytettava.kuvake}@2x.png" class="saa-kuva"></figure></div>`;
                    ennustukset.push(ennustus_html);
                }
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
    } else if (typeof hakutermi == 'undefined') {
        let naytettavat = [];
        let vastaus_tiedot = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + x + '&lon=' + y + '&exclude=hourly,&appid=' + avain + '&units=metric')

        if (vastaus_tiedot.ok) {
            let tiedot_json = await vastaus_tiedot.json();
            let i = -1;
            let paivat = tiedot_json["daily"];
            for (let paiva_objekti of paivat) {
                i++;
                let paivamaara = aika(paiva_objekti.dt, "paiva")
                let tuuli = tiedot_json["daily"][i]["wind_speed"];
                let tuuli_deg = tiedot_json["daily"][i]["wind_deg"];
                let lampotila_max = tiedot_json["daily"][i]["temp"]["max"];
                let lampotila_min = tiedot_json["daily"][i]["temp"]["min"];
                let kuvake = tiedot_json["daily"][i]["weather"]["0"]["icon"];
                naytettavat.push({
                    "tuuli": tuuli,
                    "tuuli_deg": tuuli_deg,
                    "paivamaara": paivamaara,
                    "lampotila_max": Math.round(lampotila_max),
                    "lampotila_min": Math.round(lampotila_min),
                    "kuvake": kuvake
                });
            }
            let ennustukset = [];
            for (let naytettava of naytettavat) {
                let ennustus_html = `<div class="ennustus-paiva"><p class="paivamaara">${naytettava.paivamaara}</p> <p class="lampotila" style="color: darkgreen;
                font-size: 20px;"></i><strong>${naytettava.lampotila_max}</strong> &#x2103;</p><p class="lampotila-min">${naytettava.lampotila_min} &#x2103;</p> <p class="tuuli">${naytettava.tuuli} m/s <span class="suunta"><i style="transform: rotate(${naytettava.tuuli_deg}deg)"class="fas fa-arrow-up"></i></span></p><figure><img src="http://openweathermap.org/img/wn/${naytettava.kuvake}@2x.png" class="saa-kuva"></figure></div>`;
                ennustukset.push(ennustus_html);
            }
            saa_input.value = "";
            ennustus.innerHTML = ennustukset.join(" ");
            ennustus.classList.add("korkeus");
        }
        let nimi_vastaus = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + x + '&lon=' + y + '&appid=' + avain + '&units=metric');
        if (nimi_vastaus.ok) {
            let nimi_json = await nimi_vastaus.json();
            let nimi = nimi_json["name"];
            document.querySelector(".kohde").textContent = "Lähipäivien sää sijainnissa " + nimi;
            document.getElementById("ilmoitus").classList.remove("ilmoitus-nakyy");
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
    let viikonpaivat = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];
    let i = 0;
    if (muoto === "paiva") {
        let luettava_aika = `${viikonpaivat[paivays.getDay()]}, ${paiva}.${kuukausi_numero} <i class="fas fa-calendar-alt"></i>`;
        i++;
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

}


function paikannus() {
    navigator.geolocation.getCurrentPosition(onnistui, virhe);
    saa_ilmoitus("Hyväksy paikannuspyyntö", "green");
    setTimeout(function() {
        if (document.querySelector(".kohde").innerHTML.length === 0) {
            saa_ilmoitus("Jos et nähnyt paikannuspyyntöä, tarkista laitteen asetukset.", "red");

        }
    }, 10000)
}

function sulje() {
    document.querySelector("#sijainti").style.display = "none";
}



async function onnistui(sijainti) {
    let koordinaatit = sijainti.coords;
    let x = koordinaatit.latitude;
    let y = koordinaatit.longitude;
    let paiva = [];
    let tiedot = [];
    saa(undefined, x, y);
    let sijainti_vastaus = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + x + '&lon=' + y + '&appid=' + avain + '&units=metric');
    if (sijainti_vastaus.ok) {
        let sijainti_json = await sijainti_vastaus.json();
        let nimi = sijainti_json["name"];
        document.querySelector(".paikannus-nimi").textContent = "Sää tänään sijainnissa " + nimi + ":";
        document.querySelector(".saa-div").classList.add("nolla");

    } else {
        saa_ilmoitus(sijainti_vastaus.status, "red");

    }

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
                "lampotila": Math.round(lampotila),
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

                break;
            }

        }

    } else {
        saa_ilmoitus(paiva_vastaus.status, "red");
    }
}

function virhe(err) {
    sulje();
    saa_ilmoitus(`Hylkäsit paikannuspyynnön`, "red")
}