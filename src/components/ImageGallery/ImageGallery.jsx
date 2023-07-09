import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";


export function ImageGallery({imgData} ) {
    return (
      <ul className="ImageGallery">
        <ImageGalleryItem imgData={imgData} />
      </ul>
    );
}