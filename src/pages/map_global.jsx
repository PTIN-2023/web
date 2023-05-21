import Head from 'next/head'
import Layout from "../component/Layout"
import * as env_config from "../utils/env_config"
import Map, {Source, Layer, Popup} from "react-map-gl"
import mapboxgl from 'mapbox-gl';
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
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWVrc3AiLCJhIjoiY2xmd2dtbDNhMGU4bjNjbWkwa2VqbzhhciJ9.LYgWVHhGLoY9T-ix_qC73g'; // GIT IGNORE !! 

  const [infoRouteCar, setinfoRouteCar] = React.useState([]); // usar estado para almacenar infoRouteCar

  async function getCarRoute(props) {
    try {
      const response = await fetch(props.apiEndpoint + "/api/cars_full_info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
  
      const data = await response.json();
      console.log("getCarRoute " + JSON.stringify(data))
      setinfoRouteCar(data);
     } catch (error) {
      console.log("error");
      console.error('API request failed:', error);
      setinfoRouteCar("-1");
    }
  }

  const [storeCoord, setStoreCoord] = React.useState({}); // usar estado para almacenar storeCoord
  async function getStoreCoordinates(props) {
    try {
      const response = await fetch(props.apiEndpoint + "/api/store_coordinates", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  })
      });
      
      const data = await response.json();
      //console.log("getStoreCoordinates " + JSON.stringify(data))
      setStoreCoord(data);
    } catch (error) {
      console.log("error");
      console.error('API request failed:', error);
      setStoreCoord("-1");
    }
  }

  // Obtener la ruta desde la API Directions de Mapbox
  const [route, setRoute] = React.useState([]); // usar estado para almacenar route
  async function fetchData(iRC) {
    if(iRC.cars != undefined){ //if undefined we have no data
      for(let i = 0; i < iRC.cars.length;++i){
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${iRC.cars[i].location_act.longitude},${iRC.cars[i].location_act.latitude};${iRC.cars[i].location_end.longitude},${iRC.cars[i].location_end.latitude}?geometries=geojson&alternatives=true&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        // Agrega la línea para el recorrido
        setRoute(route => [...route, data.routes[0].geometry]);
      }
    }
  }
  
  useEffect(() => {
    fetchData(infoRouteCar);
  }, [infoRouteCar]);

  useEffect(() => {
    getCarRoute(props);
    getStoreCoordinates(props);
  }, []);

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
    
    const routeFeatures = route.map((coordinates) => ({
      type: 'Feature',
      geometry:
        coordinates
    }));
  
    const routeCollection = {
      type: 'FeatureCollection',
      features: routeFeatures
    };
  
    setRouteGeojson([routeCollection]);
  }
  
  useEffect(() => {
    DoRouteGeojson(route);
  }, [route]);
  
  const [pointsGeojson, setPointsGeojson] = useState([])

  function DoPointsGeojson(iRC){
    if(iRC == null || iRC.cars == null) return;
    iRC = [iRC]
    console.log("iRC")
    console.log(iRC)
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

  useEffect(() => {
    getCarRoute(props);
    DoPointsGeojson(infoRouteCar);    
  }, [infoRouteCar]);

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

  const [storeGeojson, setStoreGeojson] = useState({})

  useEffect(() => {
    setStoreGeojson({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [storeCoord.st_longitude, storeCoord.st_latitude]
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
         
          {console.log("click")}
          {console.log(pointsGeojson)}
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