import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

export const getSingleDocFromFirestore = async ({
  setLoading,
  listingName,
  listingId,
  successCallback,
  errorCallback,
}) => {
  setLoading(true);
  const docRef = doc(db, listingName, listingId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    successCallback(docSnap.data());
    setLoading(false);
  } else {
    setLoading(false);
    errorCallback();
  }
};
