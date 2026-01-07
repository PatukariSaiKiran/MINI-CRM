import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import{ Lead, PaginatedLeadsResponse, CreateLeadRequest, UpdateLeadRequest, LeadStatus } from 'src/app/models/leads.models';
@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(private api: ApiService) { }
  getLeads(page: number = 1, limit: number = 10,q: string='',status? : LeadStatus ): Observable<PaginatedLeadsResponse> {
  return this.api.get('/leads', { page, limit, q, status });
  }
  getLeadById(id: string): Observable<Lead> {
    return this.api.get(`/leads/${id}`);
  }
  createLead(payload: CreateLeadRequest): Observable<Lead> {
    return this.api.post('/leads', payload);
  }
  updateLead(id: string, payload: UpdateLeadRequest): Observable<Lead> {
    return this.api.put(`/leads/${id}`, payload);
  }
deleteLead(id: string): Observable<{message: string}> {
    return this.api.delete(`/leads/${id}`);
}
  } 
