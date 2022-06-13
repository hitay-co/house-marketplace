import PropTypes from 'prop-types';

const Spinner = ({ isFileUploading = false }) => {
  return (
    <div className='loadingSpinnerContainer'>
      {isFileUploading && <p>uploading...</p>}
      <div className='loadingSpinner'></div>
    </div>
  );
};

export default Spinner;

Spinner.propTypes = {
  isFileUploading: PropTypes.bool,
};
