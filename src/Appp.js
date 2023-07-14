import { useEffect } from "react";
import { useState } from "react";
import "./App.scss";
import { Auth } from "./components/Auth.js";
import { auth, db, storage } from "./config/firebase";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
    //State for upload files
    const [uploadFile, setUploadFile] = useState(null);

    const uploadFileHandler = async () => {
        if (!uploadFile) {
            return;
        }

        const uploadFileRef = ref(storage, `projectFiles/${uploadFile.name}`);

        try {
            await uploadBytes(uploadFileRef, uploadFile);
        } catch (err) {
            console.error(err);
        }
    };

    //State to set Movies List
    const [moviesList, setMoviesList] = useState([]);

    //New Movies States
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

    //Update Title States
    const [updateTitle, setUpdateTitle] = useState("");

    //For fetching data
    const moviesCollectionRef = collection(db, "movies");

    const getMovieList = async () => {
        try {
            const data = await getDocs(moviesCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setMoviesList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getMovieList();
    }, []);

    //Submit Movie
    const onSubmitMovie = async () => {
        try {
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                year: newReleaseDate,
                oscar: isNewMovieOscar,
                userId: auth?.currentUser?.uid,
            });
            getMovieList();
        } catch (err) {
            console.error(err);
        }
    };

    //Delete Movie
    const deleteMovie = async (id) => {
        const movieDoc = doc(db, "movies", id);
        await deleteDoc(movieDoc);
        getMovieList();
    };

    //Update Movie
    const updateMovieTitle = async (id) => {
        const movieDoc = doc(db, "movies", id);
        await updateDoc(movieDoc, { title: updateTitle });
        getMovieList();
    };

    return (
        <div className="App">
            <Auth />

            <div className="createMovies">
                <input
                    className="title"
                    placeholder="Title"
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                />
                <input
                    className="year"
                    placeholder="Release Date"
                    type="number"
                    onChange={(e) => setNewReleaseDate(Number(e.target.value))}
                />
                <div className="checkbox">
                    <input
                        type="checkbox"
                        checked={isNewMovieOscar}
                        onChange={(e) => setIsNewMovieOscar(e.target.checked)}
                    />
                    <label>Received an oscar</label>
                </div>

                <button className="submit" onClick={onSubmitMovie}>
                    Submit Movie
                </button>
            </div>

            <h1 className="heading">Movies List</h1>

            {/* <div className="displayMovies">
                {moviesList.map((movie) => (
                    <div>
                        <h1 style={{ color: movie.oscar ? "green" : "red" }}>
                            {movie.title}
                        </h1>
                        <p>Release Date : {movie.year}</p>

                        <div className="operations">
                            <input
                                placeholder="New Title..."
                                onChange={(e) => setUpdateTitle(e.target.value)}
                            />
                            <button onClick={() => updateMovieTitle(movie.id)}>
                                Update
                            </button>

                            <button onClick={() => deleteMovie(movie.id)}>
                                Delete Movie
                            </button>
                        </div>
                    </div>
                ))}
            </div> */}

            <div className="uploads">
                <input
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                />
                <button onClick={uploadFileHandler}>Upload</button>
            </div>
        </div>
    );
}

export default App;
