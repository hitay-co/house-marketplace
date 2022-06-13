import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightArrow } from '../assets/icons/keyboardArrowRightIcon.svg';
import getErrorMessageForToastify from '../helpers/getErrorMessageForToastify';

const ForgotPassword = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      const auth = getAuth();

      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error(getErrorMessageForToastify(error?.code));
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='emailInput'
            placeholder='Email'
            {...register('email')}
          />
          <Link to='/sign-in' className='forgotPasswordLink'>
            Sign In
          </Link>
          <div className='signInBar'>
            <div className='signInText'>Send Reset Link</div>
            <button className='signInButton' type='submit'>
              <ArrowRightArrow fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
