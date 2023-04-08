import styles from "../styles/header.module.css";
import mainCard from '../styles/mainData.module.css'
import detailStyles from '../styles/details.module.css';
import Chip from '@mui/material/Chip';

const ContentComponent = () => {
    return (
        <div className={mainCard.mainCard} style={{marginTop: '-30px', marginBottom: '20px', paddingTop: '70px'}}>
            <h1 style={{marginBottom: 0, fontSize: '46px', lineHeight: '1.2', letterSpacing: '-.03em'}}>
                Title Goes Here
            </h1>
            <p className={styles.heroParagraph} style={{maxWidth: 'unset', marginBottom: '20px'}}>
                {`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}
            </p>
            <div>
                <div className={detailStyles.detailsContainer}>
                    <div role="listitem">
                        <strong>Author : </strong>Lorem Ipsum
                    </div>
                    <div role="listitem" className={detailStyles.textContainer}>
                        <strong>Category : </strong>Lorem Ipsum
                    </div>
                    <div role="listitem" className={detailStyles.textContainer}>
                        <strong>Industry : </strong>Lorem Ipsum
                    </div>
                </div>
                <div className={detailStyles.detailsContainer}>
                    <div role="listitem">
                        <strong>Source : </strong>Lorem Ipsum
                    </div>
                    <div role="listitem" className={detailStyles.textContainer}>
                        <strong>URL : </strong>Lorem Ipsum
                    </div>
                </div>
                <div role="listitem">
                    <strong>Tags : </strong>
                    <Chip style={{margin: '2px'}} label={'Lorem Ipsum'} key={'Lorem Ipsum'} variant="outlined" />
                    <Chip style={{margin: '2px'}} label={'Lorem Ipsum'} key={'Lorem Ipsum'} variant="outlined" />
                    <Chip style={{margin: '2px'}} label={'Lorem Ipsum'} key={'Lorem Ipsum'} variant="outlined" />
                </div>
                
            </div>
        </div>
    );
};

export default ContentComponent;