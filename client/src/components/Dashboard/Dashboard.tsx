import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../Navbar/Navbar';
import Timeline from '../Timeline/Timeline';
import { useAuth } from '../../contexts/AuthContext';
import { CreateStep } from './../CreateStep/CreateStep';
import { AddBaby } from './../AddBaby/AddBaby';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Dashboard.css'

export default function Dashboard() {
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  console.log('User ID from dashboard:', currentUser.uid);
  const [showCreate, setShowCreate] = useState(false);
  const [created, setCreated] = useState(false);
  const [babyName, setBabyName] = useState('');
  const [babyBirth, setBabyBirth] = useState();
  const babyRef = useRef(false);

  function handleCreate() {
    if (showCreate) {
      setShowCreate(false);
    } else {
      setShowCreate(true);
    }
  }

  useEffect(() => {
    async function getData() {
      const usersRef = query(
        collection(db, 'users'),
        where('userId', '==', userId)
      );
      const response = await getDocs<any>(usersRef);
      return response.docs.map((doc) => {
        return { ...doc.data(), id: doc.UserId };
      });
    }
    getData()
      .then((result) => {
        babyRef.current = true;
        setBabyName(result[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
    getData()
      .then((result) => setBabyBirth(result[0].date))
      .catch((err) => console.log(err));
  }, [userId, babyName]);

  return (
    <div className="main-container">
      {currentUser.uid && babyRef.current ? (
        <>
          <Navbar babyName={babyName} />
          <div className="timeline-container">
            <Timeline
              userId={userId}
              created={created}
              setCreated={setCreated}
              babyName={babyName}
              setBabyName={setBabyName}
              babyBirth={babyBirth}
              setBabyBirth={setBabyBirth}
            />
            <button className="create-button" onClick={handleCreate}>
              {showCreate ? <h3>x</h3> : <h2>+</h2>}
            </button>
            {showCreate ? (
              <CreateStep
                setCreated={setCreated}
                currentUser={currentUser}
                setShowCreate={setShowCreate}
              />
            ) : null}
          </div>
        </>
      ) : (
        <AddBaby
          babyName={babyName}
          setBabyName={setBabyName}
          setBabyBirth={setBabyBirth}
        />
      )}
    </div>
  );
}

//TIMELINE CONTAIENR DOESN?T EXIST