import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ imgData, selectImg }) {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem imgData={imgData} selectImg={selectImg} />
    </ul>
  );
}
