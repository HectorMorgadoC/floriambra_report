import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces/auth-status.enum';


const isAuthenticatedGuard = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();

  authStore.authStatus === AuthStatus.Unauthenticated ? next({ name: 'NotFound' }) : next();
};

export default isAuthenticatedGuard;
