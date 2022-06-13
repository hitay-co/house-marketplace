import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from '../firebase.config';

export const getMultipleDocsFromFirestore = async ({
  setLoading,
  listingName,
  filter,
  pagination,
  value,
  lastFetchedListing,
  setLastFetchedListing,
  setShowLoadMoreBtn,
  successCallback,
  errorCallback,
}) => {
  try {
    // Get reference
    const listingsRef = collection(db, listingName);

    let first;

    // Create a query
    if (filter) {
      first = query(
        listingsRef,
        where(filter, '==', value),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
    } else {
      first = query(listingsRef, orderBy('timestamp', 'desc'), limit(1));
    }

    // Execute query
    const querySnapshots = await getDocs(first);
    const lastVisible = querySnapshots.docs[querySnapshots.docs.length - 1];

    if (setLastFetchedListing) {
      setLastFetchedListing(lastVisible);
    }

    if (pagination) {
      const next = await getDocs(
        query(
          listingsRef,
          where(filter, '==', value),
          orderBy('timestamp', 'desc'),
          limit(2),
          startAfter(lastFetchedListing)
        )
      );

      if (next.docs.length <= 1) setShowLoadMoreBtn(false);

      const lastVisible = next.docs[next.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const lastFetchedList = [];

      next.forEach((doc) =>
        lastFetchedList.push({
          id: doc.id,
          data: doc.data(),
        })
      );
      successCallback(lastFetchedList);
      return;
    }

    const listings = [];

    querySnapshots.forEach((doc) =>
      listings.push({
        id: doc.id,
        data: doc.data(),
      })
    );

    successCallback(listings);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    errorCallback();
  }
};
