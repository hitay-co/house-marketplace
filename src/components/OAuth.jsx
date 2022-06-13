import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import googleIcon from '../assets/icons/googleIcon.svg';
import { db } from '../firebase.config';
import getErrorMessageForToastify from '../helpers/getErrorMessageForToastify';

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const doesUserAlreadyExists = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
  };

  const onGoogleAuthClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userExists = await doesUserAlreadyExists(user.uid);

      if (!userExists) {
        setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/');
    } catch (error) {
      toast.error(getErrorMessageForToastify(error?.code));
    }
  };
  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
      <button className='socialIconDiv' onClick={onGoogleAuthClick}>
        <img className='socialIconImg' src={googleIcon} alt='google-icon' />
      </button>
    </div>
  );
};

export default OAuth;
