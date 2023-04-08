import React from "react";
import styles from '../styles/header.module.css'
import GalleryComponent from "./GalleryComponent";
import ContentComponent from "./ContentComponent";

const BodyComponent = () => {
    return (
        <div className={styles.header}>
            <ContentComponent />
            <GalleryComponent />
        </div>
    )
};

export default BodyComponent;