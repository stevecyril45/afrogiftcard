import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
// header.component.ts
isMobileMenuOpen = false;

toggleMobileMenu() {
  this.isMobileMenuOpen = !this.isMobileMenuOpen;
}

@ViewChild('sidebarElement') sidebar!: ElementRef;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Remove sidebar classes on navigation
        this.sidebar.nativeElement.classList.remove('active');
        document.body.classList.remove('sidebar-open');
      });
  }
 openBlog() {
    window.open(environment.blogDomain, '_blank');
  }

  openDonation() {
    window.open(environment.donationDomain, '_blank');
  }
   openEmployment() {
    window.open(environment.employmentDomain, '_blank');
  }
}
