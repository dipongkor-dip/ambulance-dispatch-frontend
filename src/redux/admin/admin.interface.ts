export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

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

export interface CreateAmbulance {
  ambulance_number: string;
  ambulance_type: string;
  model?: string | null;
  capacity?: number;
  driver_id?: number | null;
}

export interface ApiMessage {
  message: string;
}
