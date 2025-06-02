import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/reuseables/header/header.component';
import { FooterComponent } from './shared/reuseables/footer/footer.component';
import { LoginModalComponent } from './shared/reuseables/login-modal/login-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CheckComponent } from './pages/shop/check/check.component';
import { BuyComponent } from './pages/shop/buy/buy.component';
import { PaymentSuccessComponent } from './pages/shop/check/payment-success/payment-success.component';
import { CardDetailsComponent } from './pages/shop/buy/card-details/card-details.component';
import { DasboardComponent } from './pages/contact/dasboard/dasboard.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    PartnersComponent,
    TestComponent,
    ContactComponent,
    CheckComponent,
    BuyComponent,
    PaymentSuccessComponent,
    CardDetailsComponent,
    DasboardComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
