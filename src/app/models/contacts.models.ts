import { Pagination } from './api.models';

/**
 * Contact entity
 * Mirrors Swagger Contact schema
 */
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  leadId?: string;
  createdAt: string;
}

/**
 * Request body for creating a contact
 */
export interface CreateContactRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  leadId?: string;
}

/**
 * Request body for updating a contact
 */
export interface UpdateContactRequest {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  leadId?: string;
}

/**
 * Paginated response for contacts list
 */
export interface PaginatedContactsResponse {
  data: Contact[];
  pagination: Pagination;
}
