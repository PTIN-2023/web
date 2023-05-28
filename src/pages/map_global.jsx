import Head from 'next/head'
import Layout from "../component/Layout"
import * as env_config from "../utils/env_config"
import Map, {Source, Layer, Popup} from "react-map-gl"
import mapboxgl from 'mapbox-gl';
import useCookie from "../hooks/useCookie";
import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

export async function getServerSideProps() {
  const isLocal           = env_config.isLocal();
  const apiEndpoint       = String(          env_config.getApiEndpoint());
  const locationName      = String(isLocal ? env_config.getLocationName()      : "N/A");
  const locationLatitude  = String(isLocal ? env_config.getLocationLatitude()  : "N/A");
  const locationLongitude = String(isLocal ? env_config.getLocationLongitude() : "N/A");
  const mapBoxToken       = String(          env_config.getTokenMapBox());
  const googleToken       = String(          env_config.getTokenGoogleSignIn());

  return {
    props: { 
      isLocal,
      apiEndpoint,
      locationName,
      locationLatitude,
      locationLongitude,
      mapBoxToken,
      googleToken
    }
  }
}

export default function Home(props) {

  const [infoRouteCar, setinfoRouteCar] = React.useState([]); // usar estado para almacenar infoRouteCar
  async function getCarRoute(props) {
    const tokenRequest = JSON.stringify({
      "session_token": userTokenCookie
    });
    try {
      const response = await fetch(props.apiEndpoint + "/api/cars_full_info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: tokenRequest
      });
  
      const data = await response.json();
      // filter cars that are in movement (status==3)
      const fitered_cars = data.cars.filter((car) => car.location_act != undefined && car.location_act != null)
      setinfoRouteCar({
        cars : fitered_cars
      });
     } catch (error) {
      console.error('API request failed:', error);
      setinfoRouteCar("-1");
    }
  }

  const [storeCoord, setStoreCoord] = React.useState({}); // usar estado para almacenar storeCoord
  async function getStoreCoordinates(props) {
    const tokenRequest = JSON.stringify({
      "session_token": userTokenCookie
    });
    try {
      const response = await fetch(props.apiEndpoint + "/api/general_storage_pos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: tokenRequest
      });
      
      const data = await response.json();
      setStoreCoord(data);
    } catch (error) {
      console.error('API request failed:', error);
      setStoreCoord("-1");
    }
  }

  const [route, setRoute] = React.useState([]); // usar estado para almacenar route
  const [userTokenCookie, ] = useCookie('user_token')
  async function getRoute(props, iRC){
    if(iRC.cars != undefined){
      await Promise.all(iRC.cars.map(async (car) => {
        const stringRequest = JSON.stringify({
          "session_token": userTokenCookie,
          "id_route": car.id_route.toString()
        });
      
        const response = await fetch(props.apiEndpoint + "/api/get_route", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: stringRequest
        });
      
        const data = await response.json();
        const coords = { "coordinates": data.coordinates, "type": 'LineString' };
      
        setRoute(route => [...route, coords]);
      }));
    } 
  }

  const route_layer = {
    id: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#0080ff',
      'line-width': 8
    }
  }
  
  const [routeGeojson, setRouteGeojson] = useState([])
  function DoRouteGeojson(route) {
    if (route[0] === undefined) return;
   
    const routeFeatures = route.map((coordinatesR) => ({
      type: 'Feature',
      properties: {},
      geometry:
        coordinatesR
    }));
  
    const routeCollection = {
      type: 'FeatureCollection',
      features: routeFeatures
    };
  
    setRouteGeojson([routeCollection]);
    //Si se hace un IF para no añadir la ruta una vez ya se encuentra en "route", se podría quitar esto (sería más limpio)
    setRoute([]);
  }
  
  const [pointsGeojson, setPointsGeojson] = useState([])

  function DoPointsGeojson(iRC){
    if(iRC == null || iRC.cars == null) return;
    iRC = [iRC]
    setPointsGeojson([])
    const pointsFeatures = iRC[0].cars.map((cars) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [cars.location_act.longitude, cars.location_act.latitude],
      },
      properties: {
        title: 'Coche',
        icon: 'car',
      }
    }))

    const pointsENDFeatures = iRC[0].cars.map((cars) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [cars.location_end.longitude, cars.location_end.latitude],
      },
      properties: {
        title: 'Destino',
        icon: 'marker',
      }
    }))

    const combinedFeatures = [...pointsFeatures, ...pointsENDFeatures];

    const pointsCollection = {
      type: 'FeatureCollection',
      features: combinedFeatures
      
    };
   
    setPointsGeojson(pointsGeojson => [...pointsGeojson, pointsCollection])
  }

  const points_layer = {
    id: 'puntos-de-interes',
    type: 'symbol',
    layout: {
      'icon-image': '{icon}',
      'icon-size': 2,
      'text-field': '{title}',
      'text-offset': [0, 0.75],
      'text-anchor': 'top'
    }
  }

  useEffect(() => {
    getStoreCoordinates(props);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getCarRoute(props);
    }, 5000);
  
    // Limpieza del intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    DoPointsGeojson(infoRouteCar);  
    getRoute(props, infoRouteCar);
  }, [infoRouteCar])

  useEffect(() => {
    //Podría estar dentro del useEffect de arriba
    DoRouteGeojson(route);
  }, [route]);

  const [storeGeojson, setStoreGeojson] = useState({})
  useEffect(() => {
    setStoreGeojson({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [storeCoord.longitude, storeCoord.latitude]
          },
          properties: {
            title: 'Almacén',
            icon: 'industry'
          }
        }
      ]
    });
    }, [storeCoord]);

  const store_layer = {
    id: 'warehouse',
    type: 'symbol',
    layout: {
      'icon-image': '{icon}',
      'icon-size': 2,
      'text-field': '{title}',
      'text-offset': [0, 0.75],
      'text-anchor': 'top'
    }
  }

  const [clickPopup, setClickPopup] = useState(null);
  const handleClick = (event) => {
    if(infoRouteCar == null) return;
    if(infoRouteCar.cars == null) return;
    infoRouteCar.cars.forEach((cars) => {
      if(event.lngLat.lat.toFixed(4) == cars.location_act.latitude.toFixed(4)){
        if(event.lngLat.lng.toFixed(4) == cars.location_act.longitude.toFixed(4)){
          setClickPopup(cars);
        }
      }
    })
  };

  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Map 
            initialViewState={{
              longitude: props.locationLongitude,
              latitude: props.locationLatitude,
              zoom: 15
            }}
            mapboxAccessToken={props.mapBoxToken}
            style={{width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/aeksp/clg9out5b000i01l0p2yiq26g"
            onClick={handleClick}
          >
          <Source id="my-route" type="geojson" data={routeGeojson[0]}>
            <Layer {...route_layer}/>
          </Source>
          <Source id="my-points" type="geojson" data={pointsGeojson[0]}>
            <Layer {...points_layer}/>
          </Source>
          <Source id="my-store" type="geojson" data={storeGeojson}>
            <Layer {...store_layer}/>
          </Source>
         
          {clickPopup && (
          <Popup longitude={clickPopup.location_act.longitude} latitude={clickPopup.location_act.latitude} anchor="bottom" 
          onClose={() => setClickPopup(false)}>
          Matricula: {clickPopup.license_plate} <br/>
          Contiene:
          <ul>
            {clickPopup.packages.map((pack, index) => (
              <li key={index}>{pack.name}</li>
            ))}
          </ul>
          Batería: {clickPopup.battery}% <br/>
          Último mantenimiento: {clickPopup.last_maintenance_date}
          </Popup>)}
          </Map>
        </Layout>
      </main>
    </>
  )
}