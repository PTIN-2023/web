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

  const [infoRouteDrone, setinfoRouteDrone] = React.useState([]); // usar estado para almacenar infoRouteDrone
  
  async function getDroneRoute(props) {
    try {
      const response = await fetch(props.apiEndpoint + "/api/drones_full_info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
  
      const data = await response.json();
      console.log("getDroneRoute " + JSON.stringify(data))
      // filter drones that are in movement (status==3)
      const fitered_drones = data.drones.filter((drone) => drone.status == 3)
      setinfoRouteDrone({
        drones : fitered_drones
      });
     } catch (error) {
      console.log("error");
      console.error('API request failed:', error);
      setinfoRouteDrone("-1");
    }
  }

  const [storeCoord, setStoreCoord] = React.useState([]); // usar estado para almacenar storeCoord
  async function getStoreCoordinates(props) {
    try {
      const response = await fetch(props.apiEndpoint + "/api/beehives_global", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
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
  async function fetchData(iRD) {
    if(iRD.drones != undefined){ //if undefined we have no data
      for(let i = 0; i < iRD.drones.length;++i){
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${iRD.drones[i].location_act.longitude},${iRD.drones[i].location_act.latitude};${iRD.drones[i].location_end.longitude},${iRD.drones[i].location_end.latitude}?geometries=geojson&alternatives=true&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        // Agrega la línea para el recorrido
        setRoute(route => [...route, data.routes[0].geometry]);
      }
    }
  }

  useEffect(() => {
    fetchData(infoRouteDrone);
  }, [infoRouteDrone]);

  useEffect(() => {
    getDroneRoute(props);
    getStoreCoordinates(props);
  }, []);

  const route_layer = {
    id: 'route2',
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

  function DoPointsGeojson(iRD){
    if(iRD == null) return;
    if(iRD.drones == null) return;
    iRD = [iRD]
    console.log("iRD")
    console.log(iRD)
    const pointsFeatures = iRD[0].drones.map((drones) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [drones.location_act.longitude, drones.location_act.latitude],
          },
          properties: {
            title: 'Dron',
            icon: 'a',
          }
    }))

    const pointsENDFeatures = iRD[0].drones.map((drones) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [drones.location_end.longitude, drones.location_end.latitude],
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
    DoPointsGeojson(infoRouteDrone);    
  }, [infoRouteDrone]);

  const points_layer = {
    id: 'puntos-de-interes',
    type: 'symbol',
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
  }

  const [storeGeojson, setStoreGeojson] = useState([])

  function DoStoreGeojson(sC){
    if(sC == null) return;
    if(sC.beehives == null) return;
    sC = [sC]

    const storeFeatures = sC[0].beehives.map((beehives) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [beehives.longitude, beehives.latitude],
      },
      properties: {
        title: 'Colmena',
        icon: 'ranger-station',
      }
    }))

    const storeCollection = {
      type: 'FeatureCollection',
      features: storeFeatures
      
    };
   
    setStoreGeojson(storeGeojson => [...storeGeojson, storeCollection])
  }

  useEffect(() => {
    DoStoreGeojson(storeCoord);
  }, [storeCoord])

  const store_layer = {
    id: 'colmena',
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
    if(infoRouteDrone == null) return;
    if(infoRouteDrone.drones == null) return;
    infoRouteDrone.drones.forEach((drones) => {
      if(event.lngLat.lat.toFixed(4) == drones.location_act.latitude.toFixed(4)){
        if(event.lngLat.lng.toFixed(4) == drones.location_act.longitude.toFixed(4)){
          setClickPopup(drones);
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
        {/* {props.isLocal &&  */}<Map 
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
          <Source id="my-store" type="geojson" data={storeGeojson[0]}>
            <Layer {...store_layer}/>
          </Source>

          {console.log("click")}
          {console.log(clickPopup)}
          {clickPopup && (
          <Popup longitude={clickPopup.location_act.longitude} latitude={clickPopup.location_act.latitude} anchor="bottom" 
          onClose={() => setClickPopup(false)}>
          Batería: {clickPopup.battery}% <br/>
          Último mantenimiento: {clickPopup.last_maintenance_date}
          </Popup>)}
          </Map>
        </Layout>
      </main>
    </>
  )
}