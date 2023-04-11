import mainStyle from '../styles/mainData.module.css'
import gellaryStyles from '../styles/gallery.module.css'
import "node_modules/react-image-gallery/styles/css/image-gallery.css";
import "../styles/gallery.module.css"
import ImageGallery from 'node_modules/react-image-gallery';

const GalleryComponent = ({photos}) => {
    const images = []

    photos.forEach((photo) => {
        images.push({
            original: photo.image,
            thumbnail: photo.image
        })
    })
    return (
        <div className={mainStyle.mainCard} style={{width: '100%'}}>
            <ImageGallery
                items={images}
                lazyLoad
                additionalClass={gellaryStyles.imageGallery}
                defaultImage={'.placeholder.png'}
                showPlayButton={false}
                thumbnailPosition={'right'}
                thumbnailClass={gellaryStyles.imageGalleryThumbnails}
            />
        </div>
    );
};

export default GalleryComponent;