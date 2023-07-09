

export function ImageGalleryItem({imgData}) {
  return (
    <>
      {imgData.map(item => {
        return (
          <li className="ImageGalleryItem" key={item.id}>
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