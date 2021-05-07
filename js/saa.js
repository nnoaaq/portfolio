let saa_input = document.getElementById("kaupunki");
let saa_button = document.getElementById("button-kaupunki");
let ennustus = document.querySelector(".ennustus");
saa_button.addEventListener("click", () => {
    saa(saa_input.value);
});
let avain = "a7623f446de16b909d02e43badefd642";
let status;

async function saa(hakutermi) {
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
            console.log(tiedot_json);
            for (let paiva_objekti of paivat) {
                i++;
                let paivamaara = aika(paiva_objekti.dt)
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
            saa_input.value = "";
            ennustus.innerHTML = ennustukset.join(" ");
        } else {
            ennustus.innerHTML = "Virhe " + vastaus.status + " : kaupingilla ei löytynyt tietoja."
        }
    } else {
        if (vastaus.status == 404) {
            saa_ilmoitus(`Virhe ${vastaus.status}: hakutermillä ei löytynyt kaupunkia.`, "red")
        } else if (vastaus.status == 400) {
            saa_ilmoitus(`Virhe ${vastaus.status}: hakutermi on annettava.`, "red")
        }
    }
}



function aika(aika_muuttamaton) {
    let kuukaudet = ['Tammikuuta', 'Helmikuuta', 'Maaliskuuta', 'Huhtikuuta', 'Toukokuuta', 'Kesäkuuta', 'Heinäkuuta', 'Elokuuta', 'Syyskuuta', 'Lokakuuta', 'Marraskuuta', 'Joulukuuta'];
    let paivays = new Date(aika_muuttamaton * 1000);
    let vuosi = paivays.getFullYear();
    let kuukausi = kuukaudet[paivays.getMonth()];
    let paiva = paivays.getDate();
    let tunti = paivays.getHours();
    let minuutti = "0" + paivays.getMinutes();
    let sekuntti = "0" + paivays.getSeconds();
    let luettava_aika = paiva + "." + kuukausi;
    return luettava_aika;
}

function saa_ilmoitus(teksti, vari) {
    document.getElementById("ilmoitus").classList.add("ilmoitus-nakyy");
    document.getElementById("ilmoitus").style.backgroundColor = vari;
    document.querySelector("#ilmoitus div p").innerHTML = teksti;
    setTimeout(function() {
        document.getElementById("ilmoitus").classList.remove("ilmoitus-nakyy");
    }, 6000);
}