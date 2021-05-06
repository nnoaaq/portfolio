function kayttaja() {
    document.getElementById("kentta").style.display = "block";
    document.getElementById("laheta").addEventListener("click", () => {
        document.querySelector("h1").innerHTML = "Brave is even cooler " + document.getElementById("tekstikentta").value + "!";
    });


}
document.querySelector("h1").addEventListener("mouseover", () => {
    document.querySelector("h1").innerHTML = "Hello World";
});
document.querySelector("img").addEventListener("click", () => {
    document.querySelector("img").src = "kuvat/brave.png";
    document.body.style.backgroundColor = "white";
    document.querySelector("h1").innerHTML = "Is Brave even Cooler?";
    document.getElementById("versio").style.display = "block";
});