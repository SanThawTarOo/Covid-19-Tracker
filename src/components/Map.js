import React from 'react'
import '../css/Map.css'
import { MapContainer, TileLayer} from 'react-leaflet'

function Map({center,zoom}) {
  return (
    <div className='map'>
      <MapContainer center={center} zoom={zoom}>
        <TileLayer 
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a herf="http://osm.org/copyright">
          OpenStreetMap</a> contributors'/>
      </MapContainer>
    </div>
  )
}

export default Map
