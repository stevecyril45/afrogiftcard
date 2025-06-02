import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { TestComponent } from './test/test.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CheckComponent } from './pages/shop/check/check.component';
import { BuyComponent } from './pages/shop/buy/buy.component';
import { PaymentSuccessComponent } from './pages/shop/check/payment-success/payment-success.component';
import { CardDetailsComponent } from './pages/shop/buy/card-details/card-details.component';
import { DasboardComponent } from './pages/contact/dasboard/dasboard.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'partner', component: PartnersComponent},
  // {path: 'test', component: TestComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'buy-giftcard', component: CheckComponent},
  {path: 'success', component: PaymentSuccessComponent},
  {path: 'check-giftcard', component: BuyComponent},
  {path: 'card-details', component: CardDetailsComponent},
  {path: 'secret-safe', component: DasboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
