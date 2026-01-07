import { Pagination } from './api.models';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: LeadStatus;
  createdAt: string;
}

export interface CreateLeadRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface UpdateLeadRequest {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: LeadStatus;
}

export interface PaginatedLeadsResponse {
  data: Lead[];
  pagination: Pagination;
}
