import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import getErrorMessageForToastify from '../helpers/getErrorMessageForToastify';
import { getMultipleDocsFromFirestore } from '../services/getMultipleDocsFromFirestore';
import ListingItem from './ListingItem';

const Category = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState([]);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);

  const params = useParams();

  let parameters = {
    setLoading,
    listingName: 'listings',
    filter: 'type',
    value: params.categoryName,
    setLastFetchedListing,
    errorCallback: (error) =>
      toast.error(getErrorMessageForToastify(error?.code)),
  };

  useEffect(() => {
    parameters.successCallback = (response) => setListings(response);
    getMultipleDocsFromFirestore(parameters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.categoryName]);

  const onLoadMore = () => {
    parameters = {
      ...parameters,
      pagination: true,
      lastFetchedListing,
      setShowLoadMoreBtn,
      successCallback: (lastFetchedList) =>
        setListings((prev) => [...prev, ...lastFetchedList]),
    };

    getMultipleDocsFromFirestore(parameters);
  };

  const renderCategoryContent = () => {
    if (loading) {
      <Spinner />;
    } else {
      if (listings?.length > 0) {
        return (
          <>
            <main>
              <ul className='categoryListings'>
                {listings.map((listing) => (
                  <ListingItem key={listing.id} listing={listing} />
                ))}
              </ul>
            </main>
            <br />
            <br />
            {showLoadMoreBtn && (
              <p className='loadMore' onClick={onLoadMore}>
                Load More
              </p>
            )}
          </>
        );
      } else {
        return <p>No listings for {params.categoryName}</p>;
      }
    }
  };

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Places for {params.categoryName}</p>
      </header>
      {renderCategoryContent()}
    </div>
  );
};

export default Category;
