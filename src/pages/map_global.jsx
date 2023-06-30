import Head from 'next/head'
import Layout from "../component/Layout"
import * as env_config from "../utils/env_config"
import Map, {Source, Layer, Popup} from "react-map-gl"
import mapboxgl from 'mapbox-gl';
import useCookie from "../hooks/useCookie";
import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import commonGetServerSideProps from '../utils/gen_common_props';

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  // Get cookie newView value in case that the source is manager orders
  const [newViewValueCookie, setNewViewValueCookie] = useCookie('new_view_cookie')
  // Get and store all car information
  const [infoRouteCar, setinfoRouteCar] = React.useState([]);
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
  // Get and store the Store coordinates
  const [storeCoord, setStoreCoord] = React.useState({});
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
  // Get and store all car routes
  const [route, setRoute] = React.useState([]);
  const [userTokenCookie, ] = useCookie('user_token')
  async function getRoute(props, iRC){
    if(iRC.cars != undefined){
      await Promise.all(iRC.cars.map(async (car) => {
        const stringRequest = JSON.stringify({
          "session_token": userTokenCookie,
          "id_route": car.id_route.toString(),
          "transport": "car"
        });
      
        const response = await fetch(props.apiEndpoint + "/api/get_route", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: stringRequest
        });
      
        const data = await response.json();
        if(data.result != "ok") return;
        const coords = { "coordinates": data.coordinates, "type": 'LineString' };
      
        setRoute(route => [...route, coords]);
      }));
    } 
  }
  // Make route layer
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
  // Make and store route geojson
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
  // Make and store points geojson
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
  // Make points layer
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

  // Make and store Store geojson
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
  // Make store layer
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

  function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }

  const [clickPopup, setClickPopup] = useState(null);
  const handleClick = (event) => {
    if(infoRouteCar == null || infoRouteCar.cars == null) return;
    if(clickPopup){
      setClickPopup(false)
      return
    }
    const dist = 0.05
    let closestCar = null

    infoRouteCar.cars.forEach((cars) => {
      const CarDist = calculateDistance(cars.location_act.latitude, cars.location_act.longitude, event.lngLat.lat, event.lngLat.lng) * 1000
      if(CarDist < dist){
        if(closestCar == null) closestCar = cars;
        else{
          const newCarDist = calculateDistance(cars.location_act.latitude, cars.location_act.longitude, event.lngLat.lat, event.lngLat.lng) * 1000
          if(newCarDist < CarDist){
            closestCar = cars;
          }
        }
      }
    })
    setClickPopup(closestCar)
  };

  const [iVS, setIVS] = useState('')
  //Es para la ventana del gestor con paquetes asociados a coches/dron, que al darle click a ese paquete te lleve al mapa con la posición de ese coche/dron
  useEffect(() => {
    if (newViewValueCookie != null) {
      setIVS({
        'locationLongitude': newViewValueCookie.locationLongitude,
        'locationLatitude': newViewValueCookie.locationLatitude
      });
    } else {
      setIVS({
        'locationLongitude': props.locationLongitude,
        'locationLatitude': props.locationLatitude
      });
    }
    setIsLoading(false);
}, [newViewValueCookie]);


  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout props={props}>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <Map 
              initialViewState={{
                longitude: iVS.locationLongitude,
                latitude: iVS.locationLatitude,
                zoom: 15
              }}
              mapboxAccessToken={props.mapBoxToken}
              style={{width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/aeksp/clg9out5b000i01l0p2yiq26g"
              onClick={handleClick}
            >
            <Source id="my-store" type="geojson" data={storeGeojson}>
              <Layer {...store_layer}/>
            </Source>
            {routeGeojson[0] && <Source id="my-route" type="geojson" data={routeGeojson[0]}>
              <Layer {...route_layer}/>
            </Source>}
            {pointsGeojson[0] && <Source id="my-points" type="geojson" data={pointsGeojson[0]}>
              <Layer {...points_layer}/>
            </Source>}
            
            {clickPopup && (
            <Popup longitude={clickPopup.location_act.longitude} latitude={clickPopup.location_act.latitude} anchor="bottom" 
            onClose={() => setClickPopup(false)}>
            Matricula: {clickPopup.license_plate} <br/>
            Pedidos:
            <ul>
              {clickPopup.packages.map((pack, index) => (
                <li key={index}>{pack.order_identifier}</li>
              ))}
            </ul>
            Batería: {clickPopup.battery}% <br/>
            Último mantenimiento: {clickPopup.last_maintenance_date}
            </Popup>)}
            </Map>
          )}
          
        </Layout>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center fixed bottom-4 right-4 z-10 shadow-md transition-all duration-300 ease-in-out dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setNewViewValueCookie(null)}
        > Eliminar focus
          <span className="sr-only">Icon description</span>
        </button>
      </main>
    </>
  )
}