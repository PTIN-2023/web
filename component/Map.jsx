import mapStyles from "../styles/Map.module.css";

export default function Map({ mapType }) {
    return (
        <div className={mapStyles.mapContainer}>
            Mapa {mapType}
        </div>
    )
}