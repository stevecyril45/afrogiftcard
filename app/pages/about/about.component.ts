import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    const slider = document.getElementById('clientSlider');
    if (slider) {
      let scrollAmount = 0;
      setInterval(() => {
        if (slider.scrollWidth - slider.scrollLeft <= slider.clientWidth) {
          scrollAmount = 0;
        } else {
          scrollAmount += 150;
        }
        slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }, 2000);
    }
  }
}
