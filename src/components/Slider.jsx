import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from '../components/Spinner';
import getErrorMessageForToastify from '../helpers/getErrorMessageForToastify';
import { getMultipleDocsFromFirestore } from '../services/getMultipleDocsFromFirestore';

const Slider = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const parameters = {
      setLoading: setLoading,
      listingName: 'listings',
      limit: 5,
      successCallback: (response) => setListings(response),
      errorCallback: (error) =>
        toast.error(getErrorMessageForToastify(error?.code)),
    };
    getMultipleDocsFromFirestore(parameters);
  }, []);

  if (loading) return <Spinner />;

  return (
    listings?.length > 0 && (
      <>
        <p className='exploreHeading'></p>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          style={{ height: '300px' }}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {listings.map(
            ({
              id,
              data: { name, type, imgUrls, discountedPrice, regularPrice },
            }) => (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/category/${type}/${id}`)}
              >
                <div
                  className='swiperSlideDiv'
                  style={{
                    background: `url(${imgUrls?.[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                >
                  <p className='swiperSlideText'>{name}</p>
                  <p className='swiperSlidePrice'>
                    $ {discountedPrice || regularPrice}
                    {type === 'rent' && '/month'}
                  </p>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </>
    )
  );
};

export default Slider;
