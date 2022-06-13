const getErrorMessageForToastify = (errorCode) => {
  switch (errorCode) {
    case 'auth/requires-recent-login': {
      return 'Please login recently';
    }
    case 'auth/user-not-found': {
      return 'User not found';
    }
    case 'auth/wrong-password': {
      return 'You entered wrong password';
    }
    case 'auth/email-already-in-use': {
      return 'Email is already in use';
    }
    case 'auth/weak-password': {
      return 'Your password is weak';
    }
    default:
      return 'An error occured';
  }
};

export default getErrorMessageForToastify;
