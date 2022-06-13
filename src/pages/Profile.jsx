import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import Moment from 'react-moment';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import homeIcon from '../assets/icons/homeIcon.svg';
import rightArrowIcon from '../assets/icons/keyboardArrowRightIcon.svg';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import { db } from '../firebase.config';
import getErrorMessageForToastify from '../helpers/getErrorMessageForToastify';
import { deleteDataFromFirestore } from '../services/deleteDataFromFirestore';
import { getMultipleDocsFromFirestore } from '../services/getMultipleDocsFromFirestore';
import { getSingleDocFromFirestore } from '../services/getSingleDocFromFirestore';

const Profile = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [isEditDisabled, setisEditDisabled] = useState(true);
  const [updateTime, setUpdateTime] = useState();
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
    },
  });

  // an object with the user-modified fields
  const { dirtyFields } = useFormState({
    control,
  });

  useEffect(() => {
    const parameters = {
      setLoading: setLoading,
      listingName: 'users',
      listingId: auth.currentUser.uid,
      successCallback: (response) =>
        setUpdateTime(response.timestamp?.toDate()),
      errorCallback: (error) =>
        toast.error(getErrorMessageForToastify(error?.code)),
    };
    getSingleDocFromFirestore(parameters);
  }, [auth.currentUser.uid]);

  useEffect(() => {
    const parameters = {
      setLoading: setLoading,
      listingName: 'listings',
      filter: 'userRef',
      value: auth.currentUser.uid,
      successCallback: (response) => setListings(response),
      errorCallback: (error) =>
        toast.error(getErrorMessageForToastify(error?.code)),
    };
    getMultipleDocsFromFirestore(parameters);
  }, [auth.currentUser.uid]);

  const onLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      toast.error(getErrorMessageForToastify(error?.code));
    }
  };

  const onPersonalDetailsChange = () => {
    setisEditDisabled((prev) => !prev);
  };

  const onDelete = async (id) => {
    const parameters = {
      setLoading: setLoading,
      listingName: 'listings',
      listingId: id,
      successCallback: () => {
        const updatedListings = listings.filter((listing) => listing.id !== id);
        setListings(updatedListings);
        toast.success('Successfully deleted');
      },
      errorCallback: (error) =>
        toast.error(getErrorMessageForToastify(error?.code)),
    };

    if (window.confirm('Are you sure you want to delete?')) {
      deleteDataFromFirestore(parameters);
    }
  };

  const onSubmit = ({ name, email }) => {
    const nameUpdateSuccessCallback = () => {
      toast.success('Username updated!');
      const updatedUserRef = doc(db, 'users', auth.currentUser.uid);
      updateDoc(updatedUserRef, {
        name,
        timestamp: serverTimestamp(),
      });
    };

    const emailUpdateSuccessCallback = () => {
      toast.success('Email updated!');
      const updatedUserRef = doc(db, 'users', auth.currentUser.uid);
      updateDoc(updatedUserRef, {
        email,
        timestamp: serverTimestamp(),
      });
    };

    if (dirtyFields.name) {
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(nameUpdateSuccessCallback())
        .catch((error) => toast.error(getErrorMessageForToastify(error?.code)));
    }

    if (dirtyFields.email) {
      updateEmail(auth.currentUser, email)
        .then(emailUpdateSuccessCallback())
        .catch((error) => toast.error(getErrorMessageForToastify(error?.code)));
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' onClick={onLogout} className='logOut'>
          Log Out
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal details</p>
          <p
            className='changePersonalDetails'
            onClick={onPersonalDetailsChange}
          >
            change
          </p>
        </div>
        <div className='profileCard'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className={isEditDisabled ? 'profileName' : 'profileNameActive'}
              disabled={isEditDisabled}
              {...register('name')}
            />
            <input
              className={isEditDisabled ? 'profileEmail' : 'profileEmailActive'}
              disabled={isEditDisabled}
              {...register('email')}
            />
            {!isEditDisabled && <button type='submit'>submit!</button>}
            {updateTime && (
              <div>
                Last change : <Moment fromNow>{updateTime}</Moment>
              </div>
            )}
          </form>
        </div>
        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home-icon' />
          <p>Sell or rent your home</p>
          <img src={rightArrowIcon} alt='right-arrow-icon' />
        </Link>

        {listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='lisitingsList'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
