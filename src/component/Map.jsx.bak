import mapStyles from "../styles/Map.module.css";
import mapboxgl from 'mapbox-gl';
import React, { useState, useEffect } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWVrc3AiLCJhIjoiY2xmd2dtbDNhMGU4bjNjbWkwa2VqbzhhciJ9.LYgWVHhGLoY9T-ix_qC73g'; // GIT IGNORE !! 

export default function Map({ mapType }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (mapType === "global"){
      if (map) return;
      const mapboxMap = new mapboxgl.Map({
        container: 'mapbox-map',
        style: 'mapbox://styles/aeksp/clg9out5b000i01l0p2yiq26g',
        center: [1.746184, 41.226825], // centra el mapa en una ubicación específica
        zoom: 15 // establece el nivel de zoom del mapa
      });
      setMap(mapboxMap);
      mapboxMap.addControl(new mapboxgl.NavigationControl());

      // Obtener la ruta desde la API Directions de Mapbox
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${1.746184},${41.226825};${1.7651},${41.2583}?geometries=geojson&alternatives=true&access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const ruta = data.routes[0].geometry;

      // Agrega la capa de línea para el recorrido
      mapboxMap.on('load', () => {
        //Agregar almacen
        mapboxMap.addLayer({
          id: 'warehouse',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [1.7474957, 41.2278786]
                },
                properties: {
                  title: 'Almacén',
                  icon: 'industry'
                }
              }]
            }
          },
          layout: {
            'icon-image': '{icon}',
            'icon-size': 2,
            'text-field': '{title}',
            'text-offset': [0, 0.75],
            'text-anchor': 'top'
          }
        });

        // Agrega la línea para el recorrido
        mapboxMap.addLayer({
        id: 'ruta',
        type: 'line',
        source: {
            type: 'geojson',
            data: {
            type: 'Feature',
            properties: {},
            geometry: ruta
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#0080ff',
            'line-width': 8
        }
        });

        // Agrega la capa de símbolo para el inicio y el final del recorrido
        mapboxMap.addLayer({
            id: 'puntos-de-interes',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [1.746184, 41.226825]
                    },
                    properties: {
                      title: 'Les Roquetes del Garraf, Sant Pere de Ribes',
                      icon: 'car'
                    }
                  },
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [1.7651, 41.2583]
                    },
                    properties: {
                      title: 'Tu destino',
                      icon: 'marker'
                    }
                  }
                ]
              }
            },
            layout: {
              'icon-image': '{icon}',
              'icon-size': 2,
              'text-field': '{title}',
              'text-offset': [0, 0.75],
              'text-anchor': 'top'
            }
          });
      });
    }else if(mapType === "local"){
      if (map) return;
      const mapboxMap = new mapboxgl.Map({
        container: 'mapbox-map',
        style: 'mapbox://styles/aeksp/clg9out5b000i01l0p2yiq26g',
        center: [1.7439067, 41.2274815], // centra el mapa en una ubicación específica
        zoom: 15 // establece el nivel de zoom del mapa
      });
      setMap(mapboxMap);
      mapboxMap.addControl(new mapboxgl.NavigationControl());

      // Obtener la ruta desde la API Directions de Mapbox
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${1.7439067},${41.2274815};${1.7651},${41.2583}?geometries=geojson&alternatives=true&access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const ruta = data.routes[0].geometry;

      // Agrega la capa de línea para el recorrido
      mapboxMap.on('load', () => {
        //Agregar almacen
        mapboxMap.addLayer({
          id: 'warehouse',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [1.7474957, 41.2278786]
                },
                properties: {
                  title: 'Almacén',
                  icon: 'industry'
                }
              }]
            }
          },
          layout: {
            'icon-image': '{icon}',
            'icon-size': 2,
            'text-field': '{title}',
            'text-offset': [0, 0.75],
            'text-anchor': 'top'
          }
        });

        // Agrega la línea para el recorrido
        mapboxMap.addLayer({
        id: 'ruta',
        type: 'line',
        source: {
            type: 'geojson',
            data: {
            type: 'Feature',
            properties: {},
            geometry: ruta
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#0080ff',
            'line-width': 8
        }
        });

        // Agrega la capa de símbolo para el inicio y el final del recorrido
        mapboxMap.addLayer({
            id: 'puntos-de-interes',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [1.7439067, 41.2274815]
                    },
                    properties: {
                      title: 'Les Roquetes del Garraf, Sant Pere de Ribes',
                      icon: 'a',
                    }
                  },
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [1.7651, 41.2583]
                    },
                    properties: {
                      title: 'Tu destino',
                      icon: 'marker'
                    }
                  }
                ]
              }
            },
            layout: {
              'icon-image': '{icon}',
              'icon-size': [
                'case',
                ['==', ['get', 'icon'], 'a'], // si el icono es 'a'
                ['/', 1, 15], // tamaño original dividido por 15
                ['==', ['get', 'icon'], 'marker'], // si el icono es 'marker'
                2, // tamaño original multiplicado por 2
                1 // tamaño default
              ],
              'text-field': '{title}',
              'text-offset': [0, 0.75],
              'text-anchor': 'top'
            }
          });
      });
    }

    }

    fetchData();
  }, [mapType, map]);
  //TODO: hacer el diseño más responsivo!!
  return (
    <div className={mapStyles.mapContainer}>
      Mapa {mapType}
      <div id="mapbox-map" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
}
