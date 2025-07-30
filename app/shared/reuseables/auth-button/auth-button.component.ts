import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'shared-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {
  isLoggedIn = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.openLoginModal();
  }
    openLoginModal() {
    const dialogRef = this.dialog.open(AuthComponent, {
      disableClose: true,
      panelClass: 'custom-dialog-pane',
      width: '100%',
      maxWidth: '95vw', // Limit to viewport width
      height: '100vh', // Use full viewport height
      maxHeight: '100vh', // Prevent exceeding device height
      autoFocus: false // Prevent focus issues
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.isLoggedIn = true;
      }
    });
  }

}
