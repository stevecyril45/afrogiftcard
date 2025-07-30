import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'app/core/service/user.service';
import { AuthComponent } from 'app/shared/reuseables/auth/auth.component';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {
 deliveryFee = 5000;
 isLoggedIn = false;

  form = this.fb.group({
    fullName: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(10000), Validators.max(1000000)]],
    email: ['', [Validators.required, Validators.email]],
    cardType: ['virtual', Validators.required],
    address: [''],
  });

  constructor(private fb: FormBuilder, private router: Router,
    private dialog: MatDialog, private userServce:UserService) {
    this.form.get('cardType')?.valueChanges.subscribe(type => {
      if (type === 'physical') {
        this.form.get('address')?.setValidators(Validators.required);
      } else {
        this.form.get('address')?.clearValidators();
      }
      this.form.get('address')?.updateValueAndValidity();
    });
  }

  get totalAmount(): number {
    const amount = this.form.value.amount || 0;
    return this.form.value.cardType === 'physical' ? amount + this.deliveryFee : amount;
  }

  submit() {
    if (this.form.valid) {
      const handler = (window as any).PaystackPop.setup({
        key: 'pk_test_9307d3ea61c406bccbb12d20a81e53e1994e5776', // 🔁 Replace with your real test/public key
        email: this.form.value.email, // 🧠 You can collect email via a field if you like
        amount: this.totalAmount * 100, // Amount in kobo (₦1000 = 100000)
        currency: 'NGN',
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
          custom_fields: [
            {
              display_name: this.form.value.fullName,
              variable_name: 'address',
              value: this.form.value.address || 'N/A',
            },
          ],
        },
        callback: (response: any) => {
          // ✅ Payment was successful
          console.log('Payment success: ', response);
          this.router.navigate(['/success']).finally(()=>{
            window.location.reload();
          });
        },
        onClose: () => {
          alert('Payment window closed.');
        },
      });

      handler.openIframe();
    }
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
