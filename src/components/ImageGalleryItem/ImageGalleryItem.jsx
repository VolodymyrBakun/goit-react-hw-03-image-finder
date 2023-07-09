export function ImageGalleryItem({ imgData, selectImg }) {
  return (
    <>
      {imgData.map(item => {
        return (
          <li
            className="ImageGalleryItem"
            onClick={() => selectImg(item.id)}
            key={item.id}
          >
            <img
              className="ImageGalleryItem-image"
              src={item.webformatURL}
              alt={item.tags}
            />
          </li>
        );
      })}
    </>
  );
}
