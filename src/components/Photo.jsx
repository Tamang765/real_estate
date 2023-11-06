import { Image } from 'antd'

export const Photo = ({src, height}) => {
  return (
        <Image src={`http://192.168.16.101:5001/${src}`} width={300} height={400} loading='lazy' style={{objectFit:"cover"}}/>
  )
}

export const PhotoUrl="http://192.168.16.101:5001"