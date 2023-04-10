'use-client'
import styles from "../styles/header.module.css";
import mainCard from '../styles/mainData.module.css'
import detailStyles from '../styles/details.module.css';
import Chip from '@mui/material/Chip';

const ContentComponent = ({content} : {content: Array<any>}) => {

    return (
        <div className={mainCard.mainCard} style={{marginTop: '-30px', marginBottom: '20px', paddingTop: '70px'}}>
            <h1 style={{marginBottom: 0, fontSize: '46px', lineHeight: '1.2', letterSpacing: '-.03em'}}>
                {content[0].title}
            </h1>
            <p className={styles.heroParagraph} style={{maxWidth: 'unset', marginBottom: '20px'}}>
                {content[0].description}
            </p>
            <div>
                <div className={detailStyles.detailsContainer}>
                    <div role="listitem">
                        <strong>Author : </strong>{content[0].author}
                    </div>
                    <div role="listitem" className={detailStyles.textContainer}>
                        <strong>Category : </strong>{content[0].category}
                    </div>
                    <div role="listitem" className={detailStyles.textContainer}>
                        <strong>Industry : </strong>{content[0].industry}
                    </div>
                </div>
                <div className={detailStyles.detailsContainer}>
                    <div role="listitem">
                        <strong>Source : </strong>{content[0].source}
                    </div>
                    <div role="listitem" className={detailStyles.textContainer}>
                        <strong>URL : </strong>{content[0].url}
                    </div>
                </div>
                <div role="listitem">
                    <strong>Tags : </strong>
                    {
                        content[0].tags.split('#').map((tag: string) => {
                            if (tag.length > 0) return (<Chip style={{margin: '2px'}} label={tag} key={tag} variant="outlined" />)
                        })
                    }
                </div>
                
            </div>
        </div>
    );
};

export default ContentComponent;