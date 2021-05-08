function lahetys() {
    let lomakkeet = document.querySelectorAll(".kentta");

    let valmiit = [];
    for (let lomake of lomakkeet) {
        if (lomake.textLength === 0 || lomake.textLength === undefined) {
            lomake.classList.add("taydennettava");
            ilmoitus("Täytä punaisella olevat kohdat ja lähetä lomake", "red")
            lomake.addEventListener("change", () => {
                lomake.classList.remove("taydennettava");
            });
            lomake.addEventListener("click", () => {
                ilmoitusPois();
            });
        } else if (lomake.value.length > 1) {
            lomake.classList.remove("taydennettava");
            valmiit.push(lomake);
        }
    }
    if (valmiit.length === 3) {
        let viesti_otsikko = valmiit[0].value;
        let viesti_sisalto = valmiit[1].value;
        let viesti_email = valmiit[2].value;

        if (varmistaEmail(viesti_email) == true) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    ilmoitus(this.responseText, "green")
                }
            };
            xhttp.open("POST", "lomake.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(`otsikko=${viesti_otsikko}&sisalto=${viesti_sisalto}&email=${viesti_email}`);
            ilmoitus(this.responseText, "green");
            for (let lomake of lomakkeet) {
                lomake.value = "";
                lomake.placeholder = "Viesti lähetetty onnistuneesti.";
                valmiit = [];
            }
        } else {
            ilmoitus("Varmista sähköpostiosoite.", "red");
        }
    }

}

function varmistaEmail(varmistettava) {
    let malli = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (varmistettava.match(malli)) {
        return true;
    } else {
        return false;
    }
}

function ilmoitusPois() {
    document.getElementById("ilmoitus").classList.remove("ilmoitus-nakyy");
}

function ilmoitus(teksti, vari) {
    document.getElementById("ilmoitus").classList.add("ilmoitus-nakyy");
    document.getElementById("ilmoitus").style.backgroundColor = vari;
    document.querySelector("#ilmoitus div p").innerHTML = teksti;
    setTimeout(function() {
        document.getElementById("ilmoitus").classList.remove("ilmoitus-nakyy");
    }, 6000);
}