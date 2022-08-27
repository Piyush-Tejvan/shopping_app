import React, {useState, useEffect} from 'react';
import {ref, onValue,} from 'firebase/database';
import { db } from '../Firebase/firebase';



const GetData = () => {

    const [dataGet, setDataGet] = useState({
       tableData : []
    });

    const dataRef = ref(db, 'userdata');

    useEffect(() => {
        onValue(dataRef, (snapshot)=> {
            let records = [];
            snapshot.forEach(childSnapshot => {

                let data = childSnapshot.val();
                records.push({
                    "data": data,
                });
            });
            setDataGet({tableData: records});
        });
    }, [])


  return (
    <div>
        {dataGet.tableData.map((row, index) => {
            return (
                <div key={index}>
                    <p>Id: {row.data.id}</p>
                    <p>name: {row.data.name}</p>
                    <img src={row.data.img} alt="oil" />
                    <p>price: {row.data.price}</p>
                    <p>rating: {row.data.rating}</p>
                </div>
            )
        })}
    </div>
  )
}

export default GetData;