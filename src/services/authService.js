import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const authService = {
  signUp: async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      await sendEmailVerification(userCredential.user);

      return {
        success: true,
        user: userCredential.user,
        message: 'Account created successfully! Please check your email to verify your account.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: getErrorMessage(error.code),
      };
    }
  },

  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      return {
        success: true,
        user: userCredential.user,
        message: 'Login successful!',
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: getErrorMessage(error.code),
      };
    }
  },

  signInWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      return {
        success: true,
        user: userCredential.user,
        message: 'Logged in with Google successfully!',
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: getErrorMessage(error.code),
      };
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      return {
        success: true,
        message: 'Logged out successfully!',
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: 'Failed to logout. Please try again.',
      };
    }
  },

  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'Password reset email sent! Please check your inbox.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: getErrorMessage(error.code),
      };
    }
  },

  updateUserProfile: async (updates) => {
    try {
      await updateProfile(auth.currentUser, updates);
      return {
        success: true,
        message: 'Profile updated successfully!',
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: 'Failed to update profile.',
      };
    }
  },

  getCurrentUser: () => {
    return auth.currentUser;
  },

  onAuthStateChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  },

  sendVerificationEmail: async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        return {
          success: true,
          message: 'Verification email sent!',
        };
      }
      return {
        success: false,
        message: 'No user is currently signed in.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: 'Failed to send verification email.',
      };
    }
  },
};

function getErrorMessage(errorCode) {
  const errorMessages = {
    'auth/email-already-in-use': 'This email is already registered. Please login instead.',
    'auth/invalid-email': 'Invalid email address format.',
    'auth/operation-not-allowed': 'Email/password authentication is not enabled.',
    'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/too-many-requests': 'Too many failed login attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
    'auth/cancelled-popup-request': 'Only one popup request is allowed at a time.',
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again.';
}

export default authService;
