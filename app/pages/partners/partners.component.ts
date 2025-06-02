import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var bootstrap: any;


@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent {
    partnerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.partnerForm = this.fb.group({
      businessName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cac: ['', Validators.required],
      registrationType: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms1: [false, Validators.requiredTrue],
      terms2: [false, Validators.requiredTrue]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.partnerForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    if (this.partnerForm.valid) {
      console.log(this.partnerForm.value);
      
      // Close current modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('partnerModal'));
      modal.hide();

      // Show success modal
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();

      this.partnerForm.reset();
    } else {
      this.partnerForm.markAllAsTouched();
    }
  }
}
