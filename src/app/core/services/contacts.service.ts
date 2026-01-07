import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApiService } from './api.service';
import{ Contact, PaginatedContactsResponse, CreateContactRequest, UpdateContactRequest } from 'src/app/models/contacts.models';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private api: ApiService) { }

// ----GET: list contacts ------
getContacts(page: number = 1, limit: number = 10, q: string=''): Observable<PaginatedContactsResponse> {
  return this.api.get<PaginatedContactsResponse>('/contacts', { page, limit, q});
}

// ---GET: Contact by ID -----
getContactById(contactId: string): Observable<Contact> {
  return this.api.get<Contact>(`/contacts/${contactId}`);
}
// ----POST: Create Contact -----
createContact(payload: CreateContactRequest): Observable<Contact> {
  return this.api.post<Contact>('/contacts', payload);
}
// ----PUT: Update Contact -----
updateContact(contactId: string, payload: UpdateContactRequest): Observable<Contact> {
  return this.api.put<Contact>(`/contacts/${contactId}`, payload);
}
deleteContact(contactId: string): Observable<{message: string}> {
    return this.api.delete<{message: string}>(`/contacts/${contactId}`);
}
}
