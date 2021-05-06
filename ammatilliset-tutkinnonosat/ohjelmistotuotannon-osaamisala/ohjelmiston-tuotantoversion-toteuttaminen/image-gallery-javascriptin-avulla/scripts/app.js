function showPic(whichpic) {
    let lahde = whichpic.getAttribute("href");
    let placeholder = document.querySelector("#placeholder");
    placeholder.setAttribute("src", lahde);
    let teksti = whichpic.getAttribute("title");
    let kuvaus = document.querySelector("#kuvaus");
    kuvaus.firstChild.nodeValue = teksti;
}