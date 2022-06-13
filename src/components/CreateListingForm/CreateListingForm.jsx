import { useFormContext } from 'react-hook-form';
import './CreateListingForm.css';

const CreateListingForm = () => {
  const { register, setValue, watch } = useFormContext();

  return (
    <>
      <label className='formLabel'>Sell / Rent</label>
      <div className='formButtons'>
        <button
          type='button'
          className={
            watch('type') === 'sell' ? 'formButtonActive' : 'formButton'
          }
          onClick={() => setValue('type', 'sell')}
        >
          Sell
        </button>
        <button
          type='button'
          className={
            watch('type') === 'rent' ? 'formButtonActive' : 'formButton'
          }
          onClick={() => setValue('type', 'rent')}
        >
          Rent
        </button>
      </div>

      <label className='formLabel'>Name</label>
      <input
        className='formInputName'
        maxLength='32'
        minLength='10'
        required
        {...register('name')}
      />
      <div className='formRooms flex'>
        <div>
          <label className='formLabel'>Bedrooms</label>
          <input
            type='number'
            className='formInputSmall'
            min='1'
            max='50'
            required
            {...register('bedrooms')}
          />
        </div>

        <div>
          <label className='formLabel'>Bathrooms</label>
          <input
            type='number'
            className='formInputSmall'
            min='1'
            max='50'
            required
            {...register('bathrooms')}
          />
        </div>
      </div>
      <label className='formLabel'>Parking spot</label>
      <div className='formButtons'>
        <button
          type='button'
          className={watch('parking') ? 'formButtonActive' : 'formButton'}
          onClick={() => {
            setValue('parking', true);
          }}
        >
          Yes
        </button>
        <button
          type='button'
          className={
            !watch('parking') && watch('parking') !== undefined
              ? 'formButtonActive'
              : 'formButton'
          }
          onClick={() => setValue('parking', false)}
        >
          No
        </button>
      </div>

      <label className='formLabel'>Furnished</label>
      <div className='formButtons'>
        <button
          type='button'
          className={watch('furnished') ? 'formButtonActive' : 'formButton'}
          onClick={() => setValue('furnished', true)}
        >
          Yes
        </button>
        <button
          type='button'
          className={
            !watch('furnished') && watch('furnished') !== undefined
              ? 'formButtonActive'
              : 'formButton'
          }
          onClick={() => setValue('furnished', false)}
        >
          No
        </button>
      </div>
      <label className='formLabel'>Address</label>
      <textarea className='formInputAddress' {...register('location')} />

      <label className='formLabel'>Offer</label>
      <div className='formButtons'>
        <button
          type='button'
          className={watch('offer') ? 'formButtonActive' : 'formButton'}
          onClick={() => setValue('offer', true)}
        >
          Yes
        </button>
        <button
          type='button'
          className={
            !watch('offer') && watch('offer') !== undefined
              ? 'formButtonActive'
              : 'formButton'
          }
          onClick={() => setValue('offer', false)}
        >
          No
        </button>
      </div>
      <label className='formLabel'>Regular Price</label>
      <div className='formPriceDiv'>
        <input
          className='formInputSmall'
          type='number'
          min='50'
          max='750000000'
          required
          {...register('regularPrice')}
        />
        {watch('type') === 'rent' && <p className='formPriceText'>$ / Month</p>}
      </div>

      {watch('offer') && (
        <>
          <label className='formLabel'>Discounted Price</label>
          <input
            className='formInputSmall'
            type='number'
            min='50'
            max='750000000'
            {...register('discountedPrice')}
            required={watch('offer')}
          />
        </>
      )}

      <label className='formLabel'>Images</label>
      <p className='imagesInfo'>The first image will be the cover (max 6).</p>
      <input
        className='formInputFile'
        type='file'
        max='6'
        accept='.jpg,.png,.jpeg'
        multiple
        required
        {...register('images')}
      />
      <button type='submit' className='primaryButton createListingButton'>
        Create Listing
      </button>
    </>
  );
};

export default CreateListingForm;
