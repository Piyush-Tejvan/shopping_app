import React, { useState } from "react";
import { Storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Upload = () => {
    const [progress, setProgress] = useState(0);
    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    };

    const uploadFiles = (file) => {
        //
        if (!file) return;
        const storageRef = ref(Storage, `${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
        "state_changed",
        (snapshot) => {
            const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
        },
        (error) => console.log(error),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            });
        }
        );
    };

    return (
        <div className="App">
        <form onSubmit={formHandler}>
            <input type="file" className="input" />
            <button type="submit">Upload</button>
        </form>
        <hr />
        <h2>Uploading done {progress}%</h2>
        </div>
    );
}
 
export default Upload;