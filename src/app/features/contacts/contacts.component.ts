import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/core/services/contacts.service'; 
import { Contact } from 'src/app/models/contacts.models';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
//------UI State-------
contacts: Contact[] = [];
loading: boolean = false;
errorMsg: string = '';

//------Pagination------
page: number = 1;
limit: number = 10;
total: number = 0;

//------Search & Filters------
q: string = '';

  constructor(private contactService: ContactsService) { }
  

  ngOnInit(): void {
    this.fetchContacts();
  }
fetchContacts(): void {
  this.loading = true;
  this.errorMsg = '';
  this.contactService.getContacts(this.page, this.limit, this.q || undefined).subscribe({
    next: (res) => {
      this.contacts = res.data;
      this.total = res.pagination.total;
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching contacts:', err);
      this.errorMsg = 'Failed to load contacts. Please try again.';
      this.loading = false;
    }
  });
}
onSearch()  : void {
  this.page = 1; // Reset to first page on new search
  this.fetchContacts();
}
onPageChange(newPage: number) : void {
  this.page = newPage;
  this.fetchContacts();
}
deleteContact(id: string): void {
  this.contactService.deleteContact(id).subscribe({
    next: () => {
      this.fetchContacts();
    },
    error: (err) => {
      console.error('Delete failed', err);
      alert('Failed to delete contact');
    }
  });
}

}
