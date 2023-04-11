import React, {useState, useEffect} from "react";
import styles from '../styles/navbar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import { useRouter } from "next/router";

const NavbarComponent = () => {
	const router = useRouter();
	const [userName, setUserName] = useState('Guest');
	const [showLogout, setShowLogOut] = useState(false);
	useEffect(()=>{
		const token: any = localStorage.getItem('token');
		if (token) {
			setUserName(JSON.parse(token).name);
			JSON.parse(token).role == 'admin' ? setShowLogOut(true) : setShowLogOut(false);
		};
		const guest: any = localStorage.getItem('guest');
		if (guest){
			setUserName(JSON.parse(guest.name));
			setShowLogOut(false);
		};
	}, []);
	
    return (
        <div className={styles.navbar}>
            <Navbar bg="white" expand="lg" style={{fontFamily: 'Kumbh_Sans'}}>
				<Container fluid style={{justifyContent: 'space-around'}}>
					<span style={{
					display: 'flex', flexDirection: 'row', alignItems: 'center',
					}}>
					<Navbar.Brand href="/">
						<Image src={'/SuperSwipeLogo.png'}
						alt='LOGO' width={200} height={40}/>
					</Navbar.Brand>
					<Nav.Link href="/">Home</Nav.Link>
					</span>
					<Navbar.Toggle aria-controls="navbarScroll" />
				</Container>
			</Navbar>
			<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
				<h4 style={{margin: 0, padding: 0, marginRight: '10px'}}>
					{userName}
				</h4>
				{
					showLogout ? 
						<button className="btn btn-outline-dark" color="warning"
							onClick={() => {
								localStorage.removeItem('token');
								window.location.reload();
								router.push('/');
							}}
						>Logout</button>
					: null
				}
			</div>
        </div>
    )
}

export default NavbarComponent;