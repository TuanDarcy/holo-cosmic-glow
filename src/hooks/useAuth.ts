import { useUserStore } from '@/stores/userStore';
import { useEffect, useState } from 'react';
import { auth } from '@/config/firebase';
import { signInAnonymously, User as FirebaseUser } from 'firebase/auth';

export function useAuth() {
  const { user, setUser, setAuthenticated, logout } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-login with anonymous account for demo
    const loginAnonymously = async () => {
      try {
        const result = await signInAnonymously(auth);
        const firebaseUser = result.user;

        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || 'guest@example.com',
            displayName: 'Guest User',
            loyaltyPoints: 0,
            loyaltyTier: 'bronze',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    loginAnonymously();
  }, [setUser]);

  return { user, loading, logout };
}
