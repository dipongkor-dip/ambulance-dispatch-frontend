export interface Trip {
  id: number;
  request_id: number;
  passenger_id: number;
  driver_id: number;
  ambulance_id: number;
  status: string;
  start_time: string | null;
  end_time: string | null;
  fare: number;
}
