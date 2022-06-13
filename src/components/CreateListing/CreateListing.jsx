import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateListingForm from '../CreateListingForm/CreateListingForm';
import { db } from '../../firebase.config';
import getErrorMessageForToastify from '../../helpers/getErrorMessageForToastify';
import uploadImages from '../../services/uploadImages';
import Spinner from '../Spinner/Spinner';
import './CreateListing.css';

const CreateListing = () => {
  const [loading, setLoading] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  const methods = useForm({
    defaultValues: {
      type: 'rent',
      bedrooms: 1,
      bathrooms: 1,
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setValue('userRef', user.uid);
        } else {
          navigate('/sign-in');
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [auth, isMounted, navigate, setValue]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      let geolocation = {};
      let imgUrls = [];

      const paramsObj = {
        address: formData.location,
        key: process.env.REACT_APP_GEOCODE_API_KEY,
      };
      const searchParams = new URLSearchParams(paramsObj);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${searchParams}`
      );
      const data = await response.json();

      if (!data.status === 'ZERO_RESULTS') {
        formData.location = data.results[0]?.formatted_address;
      }

      const lat = data.results[0]?.geometry.location.lat ?? 0;
      const lng = data.results[0]?.geometry.location.lng ?? 0;

      geolocation.lat = lat;
      geolocation.lng = lng;

      // uploading images
      if (formData.images.length > 0) {
        setIsFileUploading(true);
        const downloadableUrls = await Promise.all(
          [...formData.images].map((file) =>
            uploadImages(
              file,
              `${formData.userRef}-${file.name}-${Math.random()}`
            )
          )
        ).catch(() => {
          toast.error("Image couldn't uploaded");
          return;
        });

        if (downloadableUrls && downloadableUrls.length > 0) {
          imgUrls = downloadableUrls;
        }
        setIsFileUploading(false);
      }

      delete formData.images;

      const docRef = await addDoc(collection(db, 'listings'), {
        ...formData,
        geolocation: geolocation,
        imgUrls: imgUrls,
        timestamp: serverTimestamp(),
      });
      toast.success('Listing created successfully!');
      navigate(`/category/${formData.type}/${docRef.id}`);
    } catch (error) {
      toast.error(getErrorMessageForToastify(error?.code));
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner isFileUploading={isFileUploading} />;
  }

  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Create a Listing</p>
      </header>
      <main>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CreateListingForm />
          </form>
        </FormProvider>
      </main>
    </div>
  );
};

export default CreateListing;
