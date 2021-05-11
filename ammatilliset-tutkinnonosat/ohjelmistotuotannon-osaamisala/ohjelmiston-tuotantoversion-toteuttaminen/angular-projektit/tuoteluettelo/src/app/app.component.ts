import { Component, Input } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import puhelinData from 'src/assets/phones/phones.json';
 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tuoteluettelo';
  suodatusIkoni = faChevronDown;
  suodatus = '';
  puhelimet = puhelinData;
  suodatetut = [];
  lajitellut = [];
  haku(event) {
    const arvo = event.target.value;
    this.puhelimet = this.suodata(puhelinData, arvo);
  }
  newest() {
    this.puhelimet = this.puhelimet.slice(0).sort(function (a, b) {
      return a.age - b.age;
    });
  }

  alphabetical() {    console.log(this.puhelimet);

    this.puhelimet = this.puhelimet.slice(0).sort(function (a, b) {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
  suodatin(e) {
    if (e.target.value === "alphabetical") {
      this.alphabetical();
    } else if (e.target.value === "newest") {
      this.newest();
   }
  }
  yksilo(e) {
    console.log(e.target.textContent);
  }
  suodata(suodatettava, termi) {
    if (termi) {
      for (let puhelin of suodatettava) {
        if (puhelin.name.toUpperCase().includes(termi.toUpperCase())) {
          if (!this.suodatetut.includes(puhelin)) {
          this.suodatetut.push(puhelin)
          } else {           
            this.suodatetut.splice(0, this.suodatetut.indexOf(puhelin))
        }
        }
        
}
return this.suodatetut.sort();
    } else {
      return puhelinData;
    }
  }
}