import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '../../../components/Button';
import { siteConfig } from '../../../config/siteConfig';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function FullscreenControl({ config }) {
  const map = useMap();

  useEffect(() => {
    const handleFullscreenChange = () => {
      // Small timeout to allow the browser to finish the layout transition
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [map]);

  const toggleFullscreen = () => {
    const container = map.getContainer();
    if (!document.fullscreenElement) {
      container
        .requestFullscreen()
        .catch((err) => console.error(`Fullscreen error: ${err.message}`));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className='leaflet-top leaflet-right'>
      <div className='leaflet-control leaflet-bar'>
        <Button
          onClick={toggleFullscreen}
          modifiers={['map-control', 'fullscreen']}
          title={config.toggleFullscreenLabel}
          aria-label={config.toggleFullscreenLabel}
          label={
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='var(--color-offwhite)'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3' />
            </svg>
          }
        />
      </div>
    </div>
  );
}

export default function LocationMap({ config }) {
  const position = [config.latitude, config.longitude];

  return (
    <div className='location-info__map-container'>
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={false}
        className='location-info__map'>
        <TileLayer attribution={config.attribution} url={config.mapUrl} />
        <FullscreenControl config={config} />
        <Marker
          position={position}
          eventHandlers={{
            add: (e) => {
              e.target.openPopup();
            },
          }}>
          <Popup>
            <div className='location-info__popup-content'>
              <div className='location-info__branded-name'>
                <strong>{siteConfig.global.brandShort}</strong>
              </div>
              <div>{config.addressLine1}</div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
