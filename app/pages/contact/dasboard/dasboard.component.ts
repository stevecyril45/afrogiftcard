import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ContactFormDetails } from 'app/core/models/contactForm';
import { ContactService } from 'app/core/service/contact.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent {
formDetails: ContactFormDetails[] = [];
  password: string = '';
  predefinedPassword: string = 'D#7fLp!9zW@xT2qAfro';
  authenticated: boolean = false;
  constructor(private contactService: ContactService, private http: HttpClient) {}

  ngOnInit() {
    this.contactService.getFormData().subscribe((res) => {
      this.formDetails = res;
    });

    const expiryTime = localStorage.getItem('expiryTime');
    if (expiryTime) {
      const currentTime = new Date().getTime();
      if (currentTime > Number(expiryTime)) {
        localStorage.removeItem('expiryTime');
        localStorage.removeItem('authenticated');
        this.authenticated = false;
      } else {
        this.authenticated = localStorage.getItem('authenticated') === 'true';
      }
    } else{
      this.authenticated = false;
    }


  }

  // Delete Form Data by ID
  showConfirmDialog = false;
  taskToDelete: string | undefined;

  toggleConfirmDialog(id: string | undefined) {
    this.taskToDelete = id;
    this.showConfirmDialog = !this.showConfirmDialog;
  }

  confirmDelete() {
    if (this.taskToDelete) {
      this.http.delete('https://africantropicalfish-default-rtdb.firebaseio.com/qouteForm/' + this.taskToDelete + '.json').subscribe(() => {
        this.formDetails = this.formDetails.filter((form) => form.id !== this.taskToDelete);
        console.log(`Deleted task with id: ${this.taskToDelete}`);
        this.taskToDelete = undefined;
      });
    } else {
      console.log('Task id is undefined');
    }
    this.showConfirmDialog = false;
  }

  cancelDelete() {
    this.taskToDelete = undefined;
    this.showConfirmDialog = false;
  }

  // Delete All Contact Form Data When Clicked
  DeleteContactFormClicked() {
    this.contactService.deleteAllFormData().subscribe(() => {
      console.log('All form data has been deleted');

    })
  }

  checkPassword(){
    if (this.password === this.predefinedPassword) {
      this.authenticated = true;
      const expiryTime = new Date().getTime() + 0.5 * 60 * 1000;

      localStorage.setItem('expiryTime', expiryTime.toString());
      localStorage.setItem('authenticated', 'true');
      console.log('Password is correct');
      console.log('Authenticated');
    } else {
      this.authenticated = false;
      console.log('Authentication failed');
    }
  }

}
