import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactFormDetails } from '../models/contactForm';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
private apiUrl = 'https://afrogiftcard-default-rtdb.firebaseio.com/contactDetails.json'; // Replace with your actual endpoint

  constructor(private http: HttpClient) {}

  sendContactForm(data: ContactFormDetails): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getFormData(): Observable<ContactFormDetails[]> {
    const headers = new HttpHeaders({ header: 'ContactForm' });
    return this.http
      .get<{ [key: string]: ContactFormDetails }>(
        `${this.apiUrl}`,
        { headers: headers }
      )
      .pipe(
        map((response) => {
          let forms: ContactFormDetails[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              forms.push({...response[key], id: key});
            }
          }

          return forms;
        })
      );
  }

  deleteAllFormData(): Observable<any>{
    return this.http.delete(this.apiUrl);
  }
}
