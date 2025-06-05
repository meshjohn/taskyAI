import { Link, useLocation } from 'react-router';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  return (
    <header className='fixed top-0 left-0 w-full p-4'>
      <div className='container h-16 border backdrop-blur-3xl rounded-xl flex justify-between items-center'>
        <Link to='/'>
          <Logo />
        </Link>
        <div className='flex items-center gap-2'>
          {location.pathname !== '/login' && (
            <Button
              asChild
              variant='ghost'
            >
              <Link to='/login'>Sign in</Link>
            </Button>
          )}
          {location.pathname !== '/register' && (
            <Button
              asChild
              variant='default'
            >
              <Link to='/register'>Start for free</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
