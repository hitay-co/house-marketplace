import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import bathtubeIcon from '../../assets/icons/bathtubIcon.svg';
import bedIcon from '../../assets/icons/bedIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/deleteIcon.svg';

const ListingItem = ({ onDelete, listing }) => {
  const {
    id,
    data: {
      type,
      imgUrls,
      location,
      name,
      discountedPrice,
      regularPrice,
      bedrooms,
      bathrooms,
      offer,
    },
  } = listing;

  return (
    <li className='categoryListing'>
      <Link to={`/category/${type}/${id}`} className='categoryListingLink'>
        <img className='categoryListingImg' src={imgUrls?.[0]} alt='flat-img' />
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{location}</p>
          <p className='categoryListingName'>{name}</p>
          <p className='categoryListingPrice'>
            $ {offer ? discountedPrice : regularPrice}
            {type === 'rent' && ' / Month'}
          </p>
          <div className='categoryListingInfoDiv'>
            <img src={bedIcon} alt='bed' />
            <p className='categoryListingInfoText'>
              {bedrooms}
              {bedrooms > 1 ? ' Bedrooms' : ' Bedroom'}
            </p>
            <img src={bathtubeIcon} alt='bath' />
            <p className='categoryListingInfoText'>
              {bathrooms} {bathrooms > 1 ? ' Bathrooms' : ' Bathroom'}
            </p>
          </div>
        </div>
      </Link>

      <DeleteIcon
        className='removeIcon'
        fill='rgb(231,76,60)'
        onClick={() => onDelete(id, name)}
      />
    </li>
  );
};

export default ListingItem;

ListingItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  listing: PropTypes.object.isRequired,
};
