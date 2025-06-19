import type { NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces/auth-status.enum';


const isAuthenticatedGuard = async (
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();

  authStore.authStatus === AuthStatus.Unauthenticated ? next({ name: 'NotFount' }) : next();
};

export default isAuthenticatedGuard;
