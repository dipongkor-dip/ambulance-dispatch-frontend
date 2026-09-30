export type AmbulanceStatus = "available" | "busy" | "maintenance";

export interface Ambulance {
  id: number;
  ambulance_number: string;
  ambulance_type: string;
  model: string | null;
  capacity: number;
  status: AmbulanceStatus;
  driver_id: number | null;
  created_at: string;
}

export interface AmbulanceQueryParams {
  page: number;
  page_size: number;
  status?: AmbulanceStatus;
  search?: string;
}

export interface PaginatedAmbulances {
  items: Ambulance[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}
