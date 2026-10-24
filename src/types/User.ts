export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role: "Admin" | "Customer";
  avatarUrl: string | null;
}
