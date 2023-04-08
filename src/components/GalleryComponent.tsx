import mainStyle from '../styles/mainData.module.css'
import gellaryStyles from '../styles/gallery.module.css'
import "node_modules/react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'node_modules/react-image-gallery';

const GalleryComponent = () => {
    const images = [
        {
            original: '/placeholder.png',
            thumbnail: '/placeholder.png'
        },
        {
            original: 'testImage.jpg',
            thumbnail: '/testImage.jpg'
        },
        {
            original: '/testImage2.png',
            thumbnail: '/testImage2.png'
        },
    ]
    return (
        <div className={mainStyle.mainCard} style={{width: '100%'}}>
            <ImageGallery
                items={images}
                lazyLoad
                defaultImage={'.placeholder.png'}
                showPlayButton={false}
                thumbnailPosition={'right'}
                thumbnailClass={gellaryStyles.imageGalleryThumbnails}
            />
        </div>
    );
};

export default GalleryComponent;