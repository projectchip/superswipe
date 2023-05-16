import { Inter } from 'next/font/google'
import NavbarComponent from '../components/NavbarComponent'
import Header from '../components/Header'
import MainData from '../components/MainData'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const token = localStorage.getItem("token");

      if (!token || JSON.parse(token).role !== "admin") {
        if (accessToken) {
          const {expiry} = JSON.parse(accessToken);
          const currentDateTime = new Date();
    
          if (expiry<currentDateTime.toISOString()) {
            localStorage.clear();
            router.push('/')
          }
        } else {
          router.push('/')
        }
      }
  })
  
  return (
    <>
      <main className="flex flex-col p-24"
        style={{padding: 0}}
      >
        <NavbarComponent />
        <Header />
        <MainData />
        <Footer />
      </main>
    </>
  )
}
