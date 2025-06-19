import { managementApi } from '../../../api/managementApi';
import type { MessageError } from '../../common/interface/message-error.interface';
import { isAxiosError } from 'axios';
import type { Client } from '../interfaces/client.interface';
import { useCookies } from 'vue3-cookies';
import type { AccessLevel } from '../interfaces/access-level.enum';

export const loginAction = async (
  email: string,
  password: string,
): Promise< MessageError | Client > => {

  const TOKEN_COOKIE_KEY = 'token'


  try {
    const response  = await managementApi.post<Client>('/client/login', {
      email,
      password,
    });

    const { cookies } = useCookies()
    const bearer: string = response.headers['authorization'];
    const token = bearer.split(" ")[1];
    cookies.set(TOKEN_COOKIE_KEY, token, '1d');
    
    return {
      id: response.data.id,
      username: response.data.username,
      access_level: response.data.access_level as AccessLevel,
      teams: response.data.teams,
      process: response.data.process,
      clients: response.data.clients
    };
  } catch (error) {

    return {
      message: `${isAxiosError(error) && error.response?.data}`,
      error: `${isAxiosError(error) && error.response?.statusText}`,
      statusCode: isAxiosError(error) && error.response?.status || 500
    }
  }
};
