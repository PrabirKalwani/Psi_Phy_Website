const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("../config/firebase");
const CryptoJS = require("crypto-js");
const { getFirestore, doc, setDoc, updateDoc } = require("firebase/firestore");
const auth = getAuth();
const db = getFirestore();

const SECRET_KEY = process.env.SECRET_KEY;

class FirebaseAuthController {
  // Register user with decrypted password
  async registerUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    try {
      // Decrypt the password before using it
      const bytes = CryptoJS.AES.decrypt(password, SECRET_KEY);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        decryptedPassword // Use the decrypted password
      );
      const user = userCredential.user;

      await sendEmailVerification(auth.currentUser);

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        uid: user.uid,
        is_online: false,
        is_searching: false,
      });

      res.status(201).json({
        message: "Verification email sent! User created successfully!",
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "An error occurred while registering user";
      res.status(500).json({ error: errorMessage });
    }
  }

  // Login user with decrypted password
  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    try {
      // Decrypt the password before using it
      const bytes = CryptoJS.AES.decrypt(password, SECRET_KEY);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        decryptedPassword // Use the decrypted password
      );
      const user = userCredential.user;

      // Update the user's status to online
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { is_online: true });

      const idToken = userCredential._tokenResponse.idToken;
      if (idToken) {
        res.cookie("access_token", idToken, {
          httpOnly: true,
        });
        res
          .status(200)
          .json({ message: "User logged in successfully", userCredential });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "An error occurred while logging in";
      res.status(500).json({ error: errorMessage });
    }
  }

  // Logout user and update online status
  async logoutUser(req, res) {
    try {
      const user = auth.currentUser;
      if (!user) {
        return res
          .status(400)
          .json({ message: "No user is currently logged in" });
      }

      // Update the user's status to offline
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { is_online: false });

      await signOut(auth);
      res.clearCookie("access_token");
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Reset password
  async resetPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({
        email: "Email is required",
      });
    }

    try {
      await sendPasswordResetEmail(auth, email);
      res
        .status(200)
        .json({ message: "Password reset email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new FirebaseAuthController();
