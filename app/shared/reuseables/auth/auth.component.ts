
import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from 'app/core/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'shared-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild('loginIframe') loginIframe!: ElementRef<HTMLIFrameElement>;
  private messageHandler: (event: MessageEvent) => void;
  src: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {
    // Sanitize the iframe src URL
    const key = environment.authApi; // Replace with dynamic key, e.g., from AuthService or route
    const url = `https://auth.searchforcleaner.com/external/${key}`;
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log('Sanitized iframe src:', url);

    this.messageHandler = this.handleMessage.bind(this);
  }

  ngOnInit() {
    window.addEventListener('message', this.messageHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.messageHandler);
  }

  private handleMessage(event: MessageEvent) {
    // console.log(event)
    if (event.origin !== 'https://auth.searchforcleaner.com') return;
    console.log('Message received:', event.data);
    this.userService.saveUserData(event.data);
    if (event.data.type === 'loginSuccess') {
      this.dialogRef.close(true);
    }
  }

}
