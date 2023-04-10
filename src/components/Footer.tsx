import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from '@mui/material';

const Footer = () => {
    return (
        <div style={{
            backgroundColor: '#f7f8fd',
            width: '100%',
            height: '100px',
            paddingTop: '30px',
            paddingLeft: '5%',
            paddingRight: '5%',
            color: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection:'row',
                justifyContent: 'space-between',
            }}>
                <div>
                    <Button variant="text">Admin</Button>
                </div>
                <div>
                © Copyright  2023
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '175px'
                }}>
                    Follow us: 
                    <TwitterIcon color='primary' />
                    <InstagramIcon color='primary' />
                    <FacebookIcon color='primary' />
                </div>
            </div>
            
        </div>
    )
}


export default Footer;