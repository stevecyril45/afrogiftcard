import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormDetails } from 'app/core/models/contactForm';
import { ContactService } from 'app/core/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
 contactForm: FormGroup;
  showSuccessModal: boolean = false;
  id!: string;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {

      // Here you would typically send the form data to your backend service
      const contactFormDetails = new ContactFormDetails(
        this.id,
        this.contactForm.value.name,
        this.contactForm.value.email,
        this.contactForm.value.message,
        new Date().toISOString()
      );


      console.log('Contact Form Details:', contactFormDetails);

       this.contactService
        .sendContactForm(contactFormDetails)
        .subscribe((response) => {
          console.log(
            'Form has been submitted with response name: ',
            response.name
          );
          this.id = response.name.toString();
      this.showSuccessModal = true;
          this.contactForm.reset();
          setTimeout(() => {
            this.showSuccessModal = false;
          }, 3000);
        });

      // this.contactForm.reset(); // reset after submission
    } else {
      this.contactForm.markAllAsTouched(); // trigger validation
    }
  }

  closeModal() {
    this.showSuccessModal = false;
  }
}
