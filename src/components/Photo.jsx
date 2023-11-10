import { Image } from 'antd'

export const Photo = ({src, height}) => {
  return (
        <Image src={`http://192.168.16.105:5001/${src}`} width={300} height={400} loading='lazy' style={{objectFit:"cover"}}/>
  )
}
export const PhotoUrl ="http://192.168.16.105:5001";
// export const PhotoUr.REACT_APP_API_URL