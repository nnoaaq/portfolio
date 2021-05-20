let tehtavatLista = document.querySelector('.oppimistehtavat');
let kaikkiTehtavat = [];
const hakupalkki = document.getElementById('hakupalkki');

hakupalkki.addEventListener('keyup', (e) => {
    const hakutermi = e.target.value.toLowerCase();
    const suodatetutTehtavat = kaikkiTehtavat.filter((tehtavaHtml) => {
        return (
            tehtavaHtml.nimi.toLowerCase().includes(hakutermi) || tehtavaHtml.numero.toString().includes(hakutermi)
        );
    });
    naytaTehtavat(suodatetutTehtavat);
});
const haeTehtavat = async() => {
    try {
        const lista = await fetch('https://public.bc.fi/s1900877/portfolio/tehtavat.json');
        kaikkiTehtavat = await lista.json();
        naytaTehtavat(kaikkiTehtavat);
    } catch (err) {
        console.error(err);
    }
};


const naytaTehtavat = (tehtava) => {

    const tehtavaHtml = tehtava
        .map((tehtava) => {
            return `
            <li>
                <a class="oppitehtava" href="${tehtava.url}" target="_blank">${tehtava.numero}. ${tehtava.nimi}</a>

            </li>
        `;
        })
        .join('');
    tehtavatLista.innerHTML = tehtavaHtml;
    if (tehtavatLista.innerHTML.length === 0) {
        tehtavatLista.innerHTML = '<p class="eituloksia"> Ei tehtäviä hakutermillä.</p>';
    }
};



haeTehtavat();