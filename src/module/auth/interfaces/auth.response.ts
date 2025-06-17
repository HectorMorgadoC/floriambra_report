import type { Client } from './client.interface';

export interface AuthResponse {
  client: Client;
  token: string;
}
