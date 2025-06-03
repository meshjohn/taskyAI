import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const AuthSyncPage = () => {
  const naviagate = useNavigate();
  const { isSignedIn, isLoaded, userId } = useAuth();
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      if(localStorage.getItem("clerkUserId")) {
        localStorage.removeItem("clerkUserId");
      }
      naviagate('/');
      return;
    }
    if (isSignedIn) {
      localStorage.setItem('clerkUserId', userId);
      naviagate('/app/today');
    }
  }, [userId, isSignedIn, isLoaded]);
  return <></>;
};

export default AuthSyncPage;
