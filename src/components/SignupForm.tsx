import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import styles from '../styles/admin.module.css';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../util/inputValidation';
import SnackBar from './SnackBar';
import { useRouter } from 'next/router';

const SignupForm = ({handleClose, setAuthToken}: {handleClose: Function, setAuthToken: Function}) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [consent, setConsent] = useState(false);

  useEffect(()=>{
    const signInBtn = document.getElementById('signup-signin-btn');
    signInBtn?.addEventListener('click', handleSignUp);

    return () => {
      signInBtn?.removeEventListener('click', handleSignUp);
    };
  }, [name, email, password]);

  const handleSignUp = () => {
    if (!validateName(name)) {
      if (name.length > 0) {
        setErrorMessage('Please enter a valid name (Alphabets Only)');
      } else {
        setErrorMessage('Please enter your name');
      };
      setOpenSnackbar(true);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setOpenSnackbar(true);
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage(`Your password should be more than 6 characters and 
        should contain a special character.`);
      setOpenSnackbar(true);
      return;
    }
    setOpenSnackbar(false);
    attemptSignUp();
  };

  const attemptSignUp = async () => {
    const data = {
      name,
      email,
      password
    };
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const outcome = await response.json();
    if (response.status == 201 && outcome.message === 'Successful') {
      localStorage.setItem('token', JSON.stringify(outcome.token));
      setAuthToken(outcome.token);
      handleClose();
      router.push("/");
    } else {
      setErrorMessage(outcome.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <h5 style={{
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'blueviolet',
        fontFamily: 'Kumbh_Sans',
      }}>
        Sign up to join our community</h5>
      <TextField
        className={styles.inputFields}
        required
        id="outlined-required"
        label="Full Name"
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        defaultValue={name}
      />
      <TextField
        className={styles.inputFields}
        required
        type='email'
        id="outlined-required"
        label="Email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        defaultValue={email}
      />
      <TextField
        className={styles.inputFields}
        required
        type='password'
        id="outlined-required"
        label="Password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <SnackBar openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar} message={errorMessage}/>
    </>
  );
};

export default SignupForm;
