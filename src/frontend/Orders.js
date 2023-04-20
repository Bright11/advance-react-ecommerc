import { onSnapshot } from 'firebase/firestore';
import React from 'react'
import { useState, useEffect } from "react";
import { collection } from 'firebase/firestore';
import { db } from '../firebase';

function Orders() {
    const [allorder, setAlloder] = useState([])
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "checout"), (snapshot) => {
            let order = [];
            snapshot.docs.forEach((doc) => {
                order.push({ id: doc.id, ...doc.data() });
            })
        setAlloder(order);

        },(error) => {
            console.log(error)
        });
        return () => {
            unsub();
        }
    },[])
    return (
      <div className="orders">
        {/* {allorder?.map((o) => (
          <>
            <h1>{o.username}</h1>
            <h1>{o}</h1>
          </>
        ))} */}
            {Object.keys(allorder).map((key) => (
                <h1>{key}:{allorder[key] }</h1>
            ))}
      </div>
    );
}

export default Orders