export interface AmbulanceRequest {
  id: number;
  passenger_id: number;
  ambulance_id: number | null;
  pickup_location: string;
  destination: string;
  status: string;
  request_time: string;
}

export interface CreateRequestPayload {
  pickup_location: string;
  destination: string;
}
