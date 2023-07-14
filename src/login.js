import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "./config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const Login = () => {
    //Data we are taking from user
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [bio, setBio] = useState("");
    const [experience, setExperience] = useState("");

    //For authentication purpose
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //ref for pushing data
    const userDataRef = collection(db, "Userdata");

    //Sign In and data upload
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await addDoc(userDataRef, {
                name: name,
                username: username,
                contactNo: contactNo,
                gender: gender,
                age: age,
                bio: bio,
                experience: experience,
                userId: auth?.currentUser?.uid,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="Contact No."
                onChange={(e) => setContactNo(e.target.value)}
            />
            <label for="gender">Gender:</label>
            <select
                id="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />

            <input placeholder="Bio" onChange={(e) => setBio(e.target.value)} />

            <input
                placeholder="Experience"
                onChange={(e) => setExperience(e.target.value)}
            />

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={signIn}>Sign UP</button>
        </div>
    );
};
