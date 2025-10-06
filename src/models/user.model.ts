
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  photo: string;
  created_at: Date;
  updated_at: Date;
}
