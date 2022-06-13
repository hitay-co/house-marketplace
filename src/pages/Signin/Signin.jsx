import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightArrow } from '../../assets/icons/keyboardArrowRightIcon.svg';
import visibilityIcon from '../../assets/icons/visibilityIcon.svg';
import OAuth from '../../components/OAuth/OAuth';
import getErrorMessageForToastify from '../../helpers/getErrorMessageForToastify';

const Signin = () => {
  const auth = getAuth();
  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential) navigate('/');
    } catch (error) {
      toast.error(getErrorMessageForToastify(error?.code));
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcome Back!</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className='emailInput'
          {...register('email')}
          placeholder='Email'
        />
        <div className='passwordInputDiv'>
          <input
            className='passwordInput'
            {...register('password')}
            type={showPassword ? 'string' : 'password'}
            placeholder='Password'
          />
          <img
            src={visibilityIcon}
            className='showPassword'
            alt='show password'
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        <Link to='/forgot-password' className='forgotPasswordLink'>
          Forgot Password
        </Link>
        <div className='signInBar'>
          <p className='signInText'>Sign In</p>
          <button type='submit' className='signInButton'>
            <ArrowRightArrow fill='#ffffff' width='34px' height='34px' />
          </button>
        </div>
      </form>
      <OAuth />
      <Link to='/sign-up' className='registerLink'>
        Sign Up Instead
      </Link>
    </div>
  );
};

export default Signin;
