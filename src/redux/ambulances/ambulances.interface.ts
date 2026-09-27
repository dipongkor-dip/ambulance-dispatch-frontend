export interface Ambulance {
  id: number;
  ambulance_number: string;
  ambulance_type: string;
  model: string | null;
  capacity: number;
  status: string;
  driver_id: number | null;
  created_at: string;
}
