import { Image as CloudinaryImage } from "cloudinary-react"

const Image = ({ src, ...props }) => {
  // console.log("image => ", src);
  // return <img src={src} {...props} />
  if (src !== undefined) {
    return (
      <div>
        {/* <img src={src.url} /> */}
        <CloudinaryImage
          publicId={src.path}
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
          fetchFormat="auto"
          quality="auto"
          secure="true"
        />
      </div>
    )
  } else {
    return <img src="/products/couch1.png" alt="demo" />
  }

  // if (!media) {
  //   return <NextImage {...media} />
  // }

  // const { url, alternativeText } = media

  // const loader = ({ src }) => {
  //   return getStrapiMedia(src)
  // }
  // console.log(media);

  // return (
  //   <div>
  //     hello world
  //   </div>
  // <NextImage
  //   // loader={loader}
  //   layout="responsive"
  //   objectFit="contain"
  //   width={media.width}
  //   height={media.height}
  //   src={getStrapiMedia(url)}
  //   alt={alternativeText || ""}
  // />
  // )
}

export default Image
