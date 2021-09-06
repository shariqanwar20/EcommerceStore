import { getStrapiMedia } from "../utils/medias"
import NextImage from "next/image"

const Image = ({ src, ...props }) => {
  return <img src={src} {...props} />
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