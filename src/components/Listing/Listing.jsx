import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import getErrorMessageForToastify from '../../helpers/getErrorMessageForToastify';
import shareIcon from '../../assets/icons/shareIcon.svg';

import { getSingleDocFromFirestore } from '../../services/getSingleDocFromFirestore';
import Spinner from '../Spinner/Spinner';

const Listing = () => {
  const auth = getAuth();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [isShareLinkCopied, setIsShareLinkCopied] = useState(false);

  useEffect(() => {
    const parameters = {
      setLoading: setLoading,
      listingName: 'listings',
      listingId: params.listingId,
      successCallback: (response) => setListingData(response),
      errorCallback: (error) =>
        toast.error(getErrorMessageForToastify(error?.code)),
    };

    getSingleDocFromFirestore(parameters);
  }, [params.listingId]);

  const onShareIconClick = () => {
    setIsShareLinkCopied(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setIsShareLinkCopied(false);
    }, 1000);
  };

  const {
    name,
    offer,
    discountedPrice,
    regularPrice,
    location,
    geolocation,
    type,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    imgUrls,
    userRef,
  } = listingData || {};

  const paramsObj = { listingName: name };
  const searchParams = new URLSearchParams(paramsObj);

  if (loading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>

      <main>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          style={{ height: '300px' }}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {imgUrls?.length > 0 &&
            imgUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='swiperSlideDiv'
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>

        <div className='shareIconDiv'>
          <img src={shareIcon} alt='share-icon' onClick={onShareIconClick} />
        </div>
        {isShareLinkCopied && <p className='linkCopied '>Link copied</p>}

        <div className='listingDetails'>
          <p className='listingName'>
            {name} - $ 
            {offer ? discountedPrice : regularPrice}
          </p>
          <p className='listingLocation'>{location}</p>
          <p className='listingType'>For {type}</p>
          {offer && (
            <p className='discountPrice'>
              $ {regularPrice - discountedPrice} discount
            </p>
          )}
          <ul className='listingDetailsList'>
            <li>{bedrooms > 1 ? `${bedrooms} Bedrooms` : '1 Bedroom'}</li>
            <li>{bathrooms > 1 ? `${bedrooms} Bathrooms` : '1 Bathroom'}</li>
            <li>{parking && 'Parking Spot'}</li>
            <li>{furnished && 'Furnished'}</li>
          </ul>
          <p className='listingLocationTitle'>Location</p>

          {geolocation?.lat && geolocation?.lng && (
            <div className='leafletContainer'>
              <MapContainer
                center={[geolocation.lat, geolocation.lng]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[geolocation.lat, geolocation.lng]}>
                  <Popup>{location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
          {auth.currentUser?.uid !== userRef && (
            <Link
              to={`/contact/${userRef}?${searchParams}`}
              className='primaryButton'
            >
              Contact Landloard
            </Link>
          )}
        </div>
      </main>
    </>
  );
};

export default Listing;
