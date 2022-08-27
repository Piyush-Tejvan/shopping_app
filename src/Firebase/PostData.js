import React, {useState} from 'react';
import { TextField, Button,} from '@mui/material';
import "../index.css";
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { Storage } from './firebase';

const PostData = () => {

    const [data, setData] = useState({
        id: "",
        name: "",
        price: "",
        img: "",
        rating: "",

    });

    const [progress, setProgress] = useState(0);

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        console.log(file);
        uploadFiles(file);
    };

    const uploadFiles = (file) => {
        //
        if (!file) return;
        const sotrageRef = ref(Storage, `${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

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
                setData({...data, img: downloadURL });
            });
        }
        );
    };

    const deleteFile = (e) => {
        var fileUrl = data.img;
        const fileRef = ref(Storage, fileUrl);
        deleteObject(fileRef).then(() => {
            console.log("file deleted");
          }).catch((error) => {
            console.log("file not deleted");
        });
        setProgress(0);
        alert("Cancelled Uploaded File")
    }

    
    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;

        setData({...data, [name]: value});
    }


    console.log(data);
    

    const postData = async (e) => {
        e.preventDefault();

        const {id, name, price, img, rating } = data;




        if(data.id === "" || data.name === "" || data.price === "" || data.img === "" || data.rating === ""){
            alert("Data not send as some of the textfields are empty!");
        }
        else{
            await fetch(
                "https://userdata-7798d-default-rtdb.firebaseio.com/userdata.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({
                        id,
                        name,
                        price,
                        img,
                        rating,
                    }),

                }
            );

            alert("Data Added Successfully!");
            setData({
                id: "",
                name: "",
                price: "",
                img: "",
                rating: "",
            });
            setProgress(0);
        }

    }
     


  return (
    <div>
        <form >
            <div className='post'>
                <div><h1>Enter Data</h1></div>
                <div className='postdata'>
                    <TextField  sx={{width: "40%"}} variant='outlined' label="ID" type="text" name='id' required value={data.id} onChange={handleChange}/>
                </div>
                <div className='postdata'>
                    <TextField sx={{width: "40%"}} variant='outlined' label="Name" type="text" name='name' required  value={data.name} onChange={handleChange}/>
                </div>
                <div className='postdata'>
                    <TextField sx={{width: "40%"}} variant='outlined' label="Price" type="number" name='price' required value={data.price} onChange={handleChange}/>
                </div>
                
                <div className='postdata'>
                    <TextField sx={{width: "40%"}}  variant='outlined' label="Rating" type="number" name='rating' required value={data.rating} onChange={handleChange}/>
                </div>
                
            </div>
        </form>
        <form onSubmit={formHandler} className='postdata'>
            <div className='postdata'>
                <div>
                    <div className='progress'>Uploading done {progress}%</div>
                    <input type="file" name='img' required/>
                    
                </div>
                <button className='upload-btn' type="submit" >Upload</button>
                <button className='cancel-btn' type="button" onClick={deleteFile} >Cancel</button>
            </div>
        </form>
        <div className='postdata'>
            <Button type='submit' variant='contained' color='success' onClick={postData}>Submit</Button>
        </div>
    </div>
  )
}

export default PostData;