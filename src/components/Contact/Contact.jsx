import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getErrorMessageForToastify from '../../helpers/getErrorMessageForToastify';
import { getSingleDocFromFirestore } from '../../services/getSingleDocFromFirestore';
import Spinner from '../Spinner/Spinner';
import './Contact.css';

const Contact = () => {
  const [landlord, setLandlord] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const { register, watch } = useForm({
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    const parameters = {
      setLoading: setLoading,
      listingName: 'users',
      listingId: params.landlordId,
      successCallback: (response) => setLandlord(response),
      errorCallback: (error) =>
        toast.error(getErrorMessageForToastify(error?.code)),
    };
    getSingleDocFromFirestore(parameters);
  }, [params.landlordId]);

  const { email } = landlord || {};

  if (loading) {
    <Spinner />;
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact Landlord</p>
      </header>
      {landlord && (
        <main>
          {landlord?.name && (
            <div className='contactLandlord'>
              <p className='landlordName'>name</p>
            </div>
          )}
          <form className='messageForm'>
            <div className='messageDiv'>
              <label className='messageLabel'>Message</label>
              <textarea
                className='textarea'
                {...register('message')}
              ></textarea>
            </div>
            <a
              href={`mailto:${email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${watch('message')}`}
            >
              <button type='button' className='primaryButton'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
};

export default Contact;
