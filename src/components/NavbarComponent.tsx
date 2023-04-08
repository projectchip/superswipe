import React from "react";
import styles from '../styles/navbar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';

const NavbarComponent = () => {
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
			<h4>
				Guest
			</h4>
        </div>
    )
}

export default NavbarComponent;