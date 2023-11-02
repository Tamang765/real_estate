import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import React from "react"
const containerStyle = {
  width: "100%",
  height: "300px",
}

const center = {
  lat: 27.700769,
  lng: 85.30014,
}

function GoogleMapComponent({ onLocationSelect, latitude, longitude }) {

  const [coordinates, setCoordinates] = useState(center)

  useEffect(()=>{
    setCoordinates({lat:parseFloat(latitude), lng:parseFloat(longitude)});
  }, [latitude, longitude])

  console.log(coordinates)

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDmIpJE87bFcXkgGTLCilZIoBL9VWtl3jE",
  })

  const [map, setMap] = useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  const handleMapClick = (event) => {
    const location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }
    onLocationSelect(location)
  }


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      <Marker position={coordinates} />
    </GoogleMap>
  ) : (
    <></>
  )
}

export default GoogleMapComponent