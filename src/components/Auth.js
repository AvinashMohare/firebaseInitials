import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useState } from "react";

import classes from "../styles/Auth.module.scss";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={classes.auth}>
            <input
                className={classes.email}
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className={classes.password}
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className={classes.signIn} onClick={signIn}>
                Sign In
            </button>

            <button className={classes.signInGoogle} onClick={signInWithGoogle}>
                SignIn with Google
            </button>

            <button className={classes.signout} onClick={logOut}>
                Sign Out
            </button>
        </div>
    );
};
