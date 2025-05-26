import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  isChange = false;


  hasError = true;

  isActive = true;
  shouldHighlight = true;
  isDarkMode = false;


  toggleClass(){
    this.isChange = !this.isChange;
  }
}
