import Image from '../Image'

const Showcase = ({ imageSrc }) => {
  return (
    <div className="z-10">
      {/* <div className="w-136"> */}
      <Image src={imageSrc} className="w-136" alt="Showcase item" />
      {/* </div> */}
    </div>
  )
}

export default Showcase