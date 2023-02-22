export interface User {
  first_name: string;
  last_name: string;
  email: string;
  scope: string;
  hospital_name?: string;
}

export interface Shift {
  id: number;
  name: string;
  location: string;
  start_time: string;
  pay_per_hour: number;
  duration_in_hour: number;
  created_at: string;
  updated_at: string;
  hospital: number;
  nurse: any;
  requested_shifts: any[];
}
