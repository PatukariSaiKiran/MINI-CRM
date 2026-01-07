import { Component, OnInit } from '@angular/core';
import { LeadsService } from 'src/app/core/services/leads.service';
import { Lead, LeadStatus } from 'src/app/models/leads.models';
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  //UI State
leads : Lead[] = [];
loading = false;
errorMsg = '';
pageSizes = [10, 20, 30, 40, 50];


deletingId: string | null = null;
deleteMsg = '';
// Add Lead Form (simple version)
newLead = {
  name: '',
  email: '',
  phone: '',
  company: ''
};

creating = false;
createMsg = '';

// filters/ pagination
q = '';
status: LeadStatus | '' = '';
  page = 1;
  limit = 10;
  total = 0;
  constructor(private leadsService : LeadsService) { }

  ngOnInit(): void {
    this.fetchLeads();
  }

  fetchLeads(): void {
    this.loading = true;
    this.errorMsg = '';
    this.leadsService.getLeads(this.page, this.limit, this.q, this.status || undefined).subscribe({
      next: (res) => {
        this.leads =  res.data;
        this.total = res.pagination.total;
        this.initEditStatus();
        this.applySort(); // apply current sorting
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching leads:', err);
        this.errorMsg = 'Failed to load leads. Please try again.';
        this.loading = false;
      }
    });
  }
onSearch(): void {
  this.page = 1; // reset to first page on new search
  this.fetchLeads();
}
onStatusChange(): void {
  this.page = 1; // reset to first page on status filter change
  this.fetchLeads(); // refetch leads with new status filter
}
nextPage(): void {
  const maxPage = Math.ceil(this.total / this.limit);
  if (this.page < maxPage) {
    this.page++;
    this.fetchLeads();
  }
}
prevPage(): void {
  if (this.page > 1) {
    this.page--;
    this.fetchLeads();
  }
}





createLead(): void {
  this.creating = true;
  this.createMsg = '';

  this.leadsService.createLead({
    name: this.newLead.name,
    email: this.newLead.email,
    phone: this.newLead.phone,
    company: this.newLead.company || undefined
  }).subscribe({
    next: (created) => {
      this.createMsg = 'Lead created successfully ✅';
      this.creating = false;

      // clear form
      this.newLead = { name: '', email: '', phone: '', company: '' };

      // refresh list (page 1)
      this.page = 1;
      this.fetchLeads();
    },
    error: (err) => {
      console.error('Create lead error:', err);
      this.createMsg = 'Failed to create lead ❌';
      this.creating = false;
    }
  });
}


deleteLead(id: string): void {
  const ok = confirm('Are you sure you want to delete this lead?');
  if (!ok) return;

  this.deletingId = id;
  this.deleteMsg = '';

  this.leadsService.deleteLead(id).subscribe({
    next: (res) => {
      this.deleteMsg = res?.message || 'Lead deleted ✅';
      this.deletingId = null;

      // refresh list
      this.fetchLeads();
    },
    error: (err) => {
      console.error('Delete lead error:', err);
      this.deleteMsg = 'Failed to delete lead ❌';
      this.deletingId = null;
    }
  });
}
editStatus: Record<string, LeadStatus> = {} as Record<string, LeadStatus>;
updatingId: string | null = null;
updateMsg = '';

private initEditStatus(): void {
  this.editStatus = {};
  this.leads.forEach((l) => {
    this.editStatus[l.id] = l.status;
  });
}
updateLeadStatus(id: string): void {
  this.updatingId = id;
  this.updateMsg = '';

  const status = this.editStatus[id];

  this.leadsService.updateLead(id, { status }).subscribe({
    next: () => {
      this.updateMsg = 'Status updated ✅';
      this.updatingId = null;

      // refresh list (optional but safest)
      this.fetchLeads();
    },
    error: (err) => {
      console.error('Update status error:', err);
      this.updateMsg = 'Failed to update status ❌';
      this.updatingId = null;
    }
  });
}
onPageChanged(p: number): void {
  this.page = p;
  this.fetchLeads();
}



// ---------- Sorting ----------
sortBy: 'name' | 'createdAt' = 'createdAt';
sortDir: 'asc' | 'desc' = 'desc';

setSort(field: 'name' | 'createdAt'): void {
  // if same field clicked, toggle direction
  if (this.sortBy === field) {
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortBy = field;
    this.sortDir = 'asc';
  }
  this.applySort();
}

private applySort(): void {
  const dir = this.sortDir === 'asc' ? 1 : -1;

  this.leads = [...this.leads].sort((a, b) => {
    if (this.sortBy === 'name') {
      return a.name.localeCompare(b.name) * dir;
    }

    // createdAt (date-time)
    const at = new Date(a.createdAt).getTime();
    const bt = new Date(b.createdAt).getTime();
    return (at - bt) * dir;
  });
}

}
