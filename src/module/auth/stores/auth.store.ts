import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { loginAction } from '../action/login.action';

import { checkAuthAction } from '../action/check-auth.action';
import { useCookies } from 'vue3-cookies';
import { useClientStorage } from '../composable/useClientStorage';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const { cookies } = useCookies();
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const token = ref<string>(cookies.get('token') || '');
  const message = ref<string>("");
  const router  = useRouter()
  
  let {
    client,
    saveClient,
    clearClient,
    loadClient
  } = useClientStorage()

  loadClient()

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);
      if ('error' in loginResponse) {
        logout();
        if( loginResponse.statusCode === 400 ){
            message.value = "El nombre del cliente debe tener entre 5 y 30 caracteres. La contraseña debe incluir al menos una mayúscula, una minúscula y un número, y tener entre 6 y 20 caracteres"
        }
        if( loginResponse.statusCode === 401 ){
            message.value = "Nombre del cliente o contraseña invalidos"
        }
        if( loginResponse.statusCode === 500 ){
          router.push('/error-500')
        }
        return false;
      }

      saveClient(loginResponse)
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      return logout();
    }
  };


  const logout = () => {
    cookies.remove('token');
    clearClient()

    authStatus.value = AuthStatus.Unauthenticated;
    token.value = '';
    return false;
  };



  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        logout();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      token.value = statusResp.token;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  return {
    client,
    token,
    authStatus,
    message,
    checkAuthStatus,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    // Actions
    login,
    logout
  };
});

/*
 cookies.set('token', loginResponse.token, '1d'); // Expira en 1 día, ajusta según necesites
 // Eliminamos la cookie en lugar de eliminar de localStorage
    cookies.remove('token');

    Estas cookies están expuestas al entorno de JavaScript y pueden ser robadas si tu aplicación sufre un ataque XSS. Si debes usarlas por razones prácticas, sigue estas recomendaciones:
a. Marca la cookie como Secure (solo enviada por HTTPS):

cookies.set('token', token, '1d', '/', '', true); // el último parámetro activa `Secure`

    '1d': duración
    '/': path (accesible desde toda la app)
    '': dominio (por defecto)
    true: Secure
 */