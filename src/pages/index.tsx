import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');

  setTimeout(() => {
    setLoading(false)
  }, 500)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const token = localStorage.getItem('token');
    if (token && JSON.parse(token).role == 'admin') {
      router.push('/home')
      return;
    }

    if (accessToken) {
      const {expiry} = JSON.parse(accessToken);
      const currentDateTime = new Date();

      if (expiry<currentDateTime.toISOString()) {
        localStorage.clear();
        router.push('/')
      } else {
        router.push('/home')
      }
    }
  })

  const handleSiteAccess = async () => {
    const response = await fetch('/api/siteAccess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password})
    })
    const data = await response.json();
    
    if (response.status == 200) {
      const {accessToken} = data;
      localStorage.setItem('accessToken', JSON.stringify(data));
      router.push('/home')
    } else {
      setErrorMessage(data.message);
    }
  }

  return (
    <>
      <main className="flex flex-col p-24"
        style={{padding: 0}}
      >
        <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Header />
        {
          loading ? 
          <div style={{
            width: '100%',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <CircularProgress size={100} />
          </div>
          :
          <form style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '350px',
            width: '40vw',
            alignSelf: 'center',
          }}>
            <p style={{
              color: 'red',
              alignSelf: 'center'
            }}>
              {errorMessage}
            </p>
            <TextField
              id='formTitle'
              style={{
                marginBottom: '15px'
              }}
              sx={{borderRadius: '20px', backgroundColor: 'white'}}
              inputProps={{
                min: 0,
                style: { textAlign: 'center', fontSize: 'xx-large', backgroundColor: 'white'}
              }}
              label="Password"
              type='password'
              value={password}
              required
              error={false}
              onChange={(e) => {
                setPassword(e.target.value)
                setErrorMessage('')
              }}
            />
            <Button variant="primary" onClick={handleSiteAccess}>
              REQUEST ACCESS
            </Button>
          </form>
        }
        <Footer />
        </div>
      </main>
    </>
  )
}
