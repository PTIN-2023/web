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
  
  const [infoRouteDrone, setinfoRouteDrone] = React.useState([]); // usar estado para almacenar infoRouteDrone
  async function getDroneRoute(props) {
    const tokenRequest = JSON.stringify({
      "session_token": userTokenCookie
    });
    try {
      const response = await fetch(props.apiEndpoint + "/api/drones_full_info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: tokenRequest
      });
  
      const data = await response.json()
      // filter drones that are in movement (status==3)
      const fitered_drones = data.drones.filter((drone) => drone.location_act != undefined && drone.location_act != null)
      setinfoRouteDrone({
        drones : fitered_drones
      });
     } catch (error) {
      console.error('API request failed:', error);
      setinfoRouteDrone("-1");
    }
  }

  const [storeCoord, setStoreCoord] = React.useState([]); // usar estado para almacenar storeCoord
  async function getStoreCoordinates(props) {
    const tokenRequest = JSON.stringify({
      "session_token": userTokenCookie
    });
    try {
      const response = await fetch(props.apiEndpoint + "/api/beehives_global", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: tokenRequest
      });
      
      const data = await response.json();
      //console.log("getStoreCoordinates " + JSON.stringify(data))
      setStoreCoord(data);
    } catch (error) {
      console.error('API request failed:', error);
      setStoreCoord("-1");
    }
  }

  const [route, setRoute] = React.useState([]); // usar estado para almacenar route
  const [userTokenCookie, ] = useCookie('user_token')
  async function getRoute(props, iRD){
    if(iRD.drones != undefined){
      await Promise.all(iRD.drones.map(async (dron) => {
        const stringRequest = JSON.stringify({
          "session_token": userTokenCookie,
          "id_route": dron.id_route.toString()
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
      properties: {},
      geometry:
        coordinates
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

  function DoPointsGeojson(iRD){
    if(iRD == null || iRD.drones == null) return;
    iRD = [iRD]
    setPointsGeojson([])
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

  useEffect(() => {
    getStoreCoordinates(props);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getDroneRoute(props);
    }, 5000);
  
    // Limpieza del intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    DoPointsGeojson(infoRouteDrone);  
    getRoute(props, infoRouteDrone); 
  }, [infoRouteDrone]);

  useEffect(() => {
    DoRouteGeojson(route);
  }, [route]);

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