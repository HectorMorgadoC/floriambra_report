import type { NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces/auth-status.enum';


const isNotAuthenticatedGuard = async (
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  // console.log(to);
  await authStore.checkAuthStatus();

  authStore.authStatus === AuthStatus.Authenticated ? next({ name: '/' }) : next();
};

export default isNotAuthenticatedGuard;
