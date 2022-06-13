import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightArrow } from '../../assets/icons/keyboardArrowRightIcon.svg';
import visibilityIcon from '../../assets/icons/visibilityIcon.svg';
import OAuth from '../../components/OAuth/OAuth';
import { db } from '../../firebase.config';
import getErrorMessageForToastify from '../../helpers/getErrorMessageForToastify';
import './Signup.css';

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async ({ name, email, password }) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // Add the User Form Data to Cloud Firestore
      setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        timestamp: serverTimestamp(),
      });

      toast.success('You signed up in successfully');
      navigate('/');
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
        <input className='nameInput' {...register('name')} placeholder='Name' />
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
        <Link to='forgot-password' className='forgotPasswordLink'>
          Forgot Password
        </Link>
        <div className='signUpBar'>
          <p className='signUpText'>Sign Up</p>
          <button type='submit' className='signUpButton'>
            <ArrowRightArrow fill='#ffffff' width='34px' height='34px' />
          </button>
        </div>
      </form>
      <OAuth />
    </div>
  );
};

export default Signup;
