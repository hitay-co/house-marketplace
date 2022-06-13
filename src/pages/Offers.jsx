import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import getErrorMessageForToastify from '../helpers/getErrorMessageForToastify';
import { getMultipleDocsFromFirestore } from '../services/getMultipleDocsFromFirestore';

const Offers = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parameters = {
      setLoading: setLoading,
      listingName: 'listings',
      successCallback: (response) => setListings(response),
      errorCallback: (error) =>
        toast.error(getErrorMessageForToastify(error?.code)),
    };
    getMultipleDocsFromFirestore(parameters);
  }, []);

  const renderCategoryContent = () => {
    if (loading) {
      <Spinner />;
    } else {
      if (listings?.length > 0) {
        return (
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem key={listing.id} listing={listing} />
              ))}
            </ul>
          </main>
        );
      } else {
        return <p>There is no offer</p>;
      }
    }
  };

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Offers</p>
      </header>
      {renderCategoryContent()}
    </div>
  );
};

export default Offers;
