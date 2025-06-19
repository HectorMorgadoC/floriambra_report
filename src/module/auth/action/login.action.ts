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
    const response  = await managementApi.post('/client/login', {
      email,
      password,
    });

    const { cookies } = useCookies()
    const bearer: string = response.headers['authorization'];
    const token = bearer.split(" ")[1];
    const { client } = response.data;
    cookies.set(TOKEN_COOKIE_KEY, token, '1d');
    
    return {
      id: client.id,
      username: client.username,
      access_level: client.access_level as AccessLevel,
      teams: client.teams,
      process: client.process,
      clients: client.data.clients
    };
  } catch (error) {

    return {
      message: `${isAxiosError(error) && error.response?.data}`,
      error: `${isAxiosError(error) && error.response?.statusText}`,
      statusCode: isAxiosError(error) && error.response?.status || 500
    }
  }
};
