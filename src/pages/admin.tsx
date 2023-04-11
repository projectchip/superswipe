'use-client'
import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import styles from '../styles/admin.module.css';
import {validateEmail} from '../util/inputValidation';
import SnackBar from '../components/SnackBar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Admin = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(true);
    const [authToken, setAuthToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        document.title = 'ADMIN';
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/addListing')
        } else {
			setLoading(false);
		}

        const signInBtn = document.getElementById('signup-signin-btn');
        signInBtn?.addEventListener('click', handleSignIn);
    
        return () => {
          signInBtn?.removeEventListener('click', handleSignIn);
        };
      }, [email, password]);

    const handleClose = () => setShow(false);

    const handleSignIn = () => {
        if (!validateEmail(email)) {
          setErrorMessage('Please enter a valid Email');
          setOpenSnackbar(true);
          return;
        };
        
        if (password.length == 0) {
          setErrorMessage('Please enter your password');
          setOpenSnackbar(true);
          return;
        };
        // setPassword(userPassword);
        setOpenSnackbar(false);
        attempSignIn();
      };
    
      const attempSignIn = async () => {
        const response = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        });
        const outcome = await response.json();
        if (response.status == 200 && outcome.message === 'login-successfull') {
          window.localStorage.setItem('token', outcome.token);
          router.push('/addListing')
          setAuthToken(JSON.parse(outcome.token));
          handleClose();
        } else {
          setErrorMessage(outcome.message);
          setOpenSnackbar(true);
        }
      };

    return (
        <>
		{
          	loading ? 
            <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'center'}}>
				<CircularProgress />
			</Box>
			:
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{display: 'flex', justifyContent: 'center'}}>
                <Modal.Title>
                    <Image src='/SuperSwipeLogo.png'
                    alt='Company Logo'
                    width={300} height={80} />
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className={styles.signupFormDiv}
                    >
                        <h5 style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        color: 'blueviolet',
                        fontFamily: 'Kumbh_Sans',
                    }}>
                        Welcome back! we missed you.</h5>

                    <TextField
                        className={styles.inputFields}
                        required
                        type='email'
                        id="user-email"
                        label="Email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        className={styles.inputFields}
                        required
                        type='password'
                        id="user-password"
                        label="Password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <SnackBar openSnackbar={openSnackbar}
                        setOpenSnackbar={setOpenSnackbar} message={errorMessage}/>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button id='signup-signin-btn' type='submit' variant="primary">
                        Sign In
                    </Button>
                </Modal.Footer>
            </Modal>
		}
        </>
    )
};


export default Admin;