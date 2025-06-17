import { AfterViewInit, Component } from '@angular/core';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    $(".hero-slider-wrapper").slick({
      autoplay: true,
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: "linear"
    });
  }
}
