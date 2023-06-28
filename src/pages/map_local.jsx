import Head from 'next/head'
import Layout from "../component/Layout"
import * as env_config from "../utils/env_config"
import Map, {Source, Layer, Popup} from "react-map-gl"
import mapboxgl from 'mapbox-gl';
import useCookie from "../hooks/useCookie";
import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

export async function getServerSideProps() {
  const isLocal              = env_config.isLocal();
  const apiEndpoint          = String(env_config.getApiEndpoint());
  const locationName         = String(env_config.getLocationName());
  const locationLatitude     = String(env_config.getLocationLatitude());
  const locationLongitude    = String(env_config.getLocationLongitude());
  const locationLatitudeMin  = String(env_config.getLocationLatitudeMin());
  const locationLongitudeMin = String(env_config.getLocationLongitudeMin());
  const locationLatitudeMax  = String(env_config.getLocationLatitudeMax());
  const locationLongitudeMax = String(env_config.getLocationLongitudeMax());
  const mapBoxToken          = String(env_config.getTokenMapBox());
  const googleToken          = String(env_config.getTokenGoogleSignIn());

  return {
    props: { 
      isLocal,
      apiEndpoint,
      locationName,
      locationLatitude,
      locationLongitude,
      locationLatitudeMin,
      locationLongitudeMin,
      locationLatitudeMax,
      locationLongitudeMax,
      mapBoxToken,
      googleToken
    }
  }
}

export default function Home(props, newView) {
  // Get and store all drone information
  const [infoRouteDrone, setinfoRouteDrone] = React.useState([]);
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
  // Get and store the beehives coordinates
  const [storeCoord, setStoreCoord] = React.useState([]);
  async function getStoreCoordinates(props) {
    const tokenRequest = JSON.stringify({
      "session_token": userTokenCookie
    });
    try {
      const response = await fetch(props.apiEndpoint + "/api/beehives_local", {
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
  // Get and store all drone routes
  const [route, setRoute] = React.useState([]);
  const [userTokenCookie, ] = useCookie('user_token')
  async function getRoute(props, iRD){
    if(iRD.drones != undefined){
      await Promise.all(iRD.drones.map(async (dron) => {
        const stringRequest = JSON.stringify({
          "session_token": userTokenCookie,
          "id_route": dron.id_route.toString(),
          "transport": "dron"
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
  // Make route layer
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
  // Make and store route geojson
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
  // Make and store points geojson
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
  // Make points layer
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

  // Make and store Beehives geojson
  const [storeGeojson, setStoreGeojson] = useState([])
  function DoStoreGeojson(sC){
    if(sC == null || sC.beehives == null) return;
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
  // Make store layer
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

  function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }

  const [clickPopup, setClickPopup] = useState(null);
  const handleClick = (event) => {
    if(infoRouteDrone == null || infoRouteDrone.drones == null) return;
    if(clickPopup){
      setClickPopup(false)
      return
    }
    const dist = 0.05
    let closestDrone = null
    
    infoRouteDrone.drones.forEach((drones) => {
      const DroneDist = calculateDistance(drones.location_act.latitude, drones.location_act.longitude, event.lngLat.lat, event.lngLat.lng) * 1000
      if(DroneDist < dist){
        if(closestDrone == null) closestDrone = drones;
        else{
          const newDroneDist = calculateDistance(drones.location_act.latitude, drones.location_act.longitude, event.lngLat.lat, event.lngLat.lng) * 1000
          if(newDroneDist < DroneDist){
            closestDrone = drones;
          }
        }
      }
    })
    setClickPopup(closestDrone)
  };

  const [iVS, setIVS] = useState('')
  //NOTA: quizá es usado en un futuro, si al final no se hace, se borra.
  //Es para la ventana del gestor con paquetes asociados a coches/dron, que al darle click a ese paquete te lleve al mapa con la posición de ese coche/dron
  useEffect(() => {
    if(Object.keys(newView).length.toString() === 0){
      setIVS({'locationLongitude': newView.locationLongitude, 
              'locationLatitude':  newView.locationLatitude})
    }else{
      setIVS({'locationLongitude': props.locationLongitude, 
              'locationLatitude':  props.locationLatitude})
    }
  }, [newView]);

  const cornerBottomLeft = new mapboxgl.LngLat(props.locationLongitudeMin, props.locationLatitudeMin);
  const cornerTopRight = new mapboxgl.LngLat(props.locationLongitudeMax, props.locationLatitudeMax);

  const bounds = [cornerBottomLeft, cornerTopRight]

  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout props={props}>
        {/* {props.isLocal &&  */}{iVS && <Map 
            initialViewState={{
              longitude: iVS.locationLongitude,
              latitude: iVS.locationLatitude,
              zoom: 15
            }}
            mapboxAccessToken={props.mapBoxToken}
            style={{width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/aeksp/clg9out5b000i01l0p2yiq26g"
            onClick={handleClick}
            maxBounds={bounds}
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
          </Map>}
        </Layout>
      </main>
    </>
  )
}