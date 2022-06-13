import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';

export const deleteDataFromFirestore = async ({
  setLoading,
  listingId,
  successCallback,
  errorCallback,
}) => {
  setLoading(true);
  try {
    await deleteDoc(doc(db, 'listings', listingId));
    successCallback();
  } catch (error) {
    errorCallback(error);
  }
  setLoading(false);
};
