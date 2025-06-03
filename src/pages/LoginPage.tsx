import Head from '@/components/Head';
import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <>
      <Head title='Create an Account - Tasky AI To-Do List & Project Management App' />
      <section>
        <div className='container flex justify-center'>
          <SignIn signUpUrl='/register' />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
