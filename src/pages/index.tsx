import { Inter } from 'next/font/google'
import NavbarComponent from '../components/NavbarComponent'
import Header from '../components/Header'
import MainData from '../components/MainData'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
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
