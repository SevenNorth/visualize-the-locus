import {
    useEffect, useRef
} from "react";
import _ from "lodash";
import SceneView from '@arcgis/core/views/SceneView';
import MapView from '@arcgis/core/views/MapView';
import { getBasemap, getGround, getLayer } from "../../utils/layers/layerFactory";

export function useSceneView(
    props,
    mapRef,
) {
    const { map, spatialReference } = props;
    useEffect(() => {
        if(mapRef.current){
            const view = new SceneView({
                container: mapRef.current,
                map: map,
                scale: 50000,
                center: [108.17, 31.78],
                spatialReference: spatialReference,
            });
            view.ui.empty("top-left");
        }
    }, [mapRef, map, spatialReference]);
}

export function useBasemap(props) {
    const { map, basemap } = props;
    const prevBasemap = useRef();
    useEffect(() => {
        if (prevBasemap.current === basemap) {
            return;
        }
        if (basemap) {
            const arcgisBasemap = getBasemap(basemap);
            map.basemap = arcgisBasemap;
        }
        prevBasemap.current = basemap;
    }, [map, basemap]);
}

export function useGround(props) {
    const { map, ground } = props;
    const prevGround = useRef();
    useEffect(() => {
        if (prevGround.current === ground) {
            return;
        }
        if (ground) {
            const arcgisGround = getGround(ground);
            map.ground = arcgisGround;
        }
        prevGround.current = ground;
    }, [map, ground]);
}

export function useMapView(
    props,
    mapRef,
) {
    const { map, spatialReference } = props;
    useEffect(() => {
        if(mapRef.current){
            const view = new MapView({
                container: mapRef.current,
                map: map,
                scale: 50000,
                center: [108.17, 31.78],
                spatialReference: spatialReference,
            });
            view.ui.empty("top-left");
        }
    }, [mapRef, map, spatialReference]);
}

export function useLayers(props) {
    const { layers, map } = props;
    useEffect(()=>{
        _.each(layers, lyr => {
            const layer = getLayer(lyr);
            map.add(layer);
        })
    }, [layers, map])
}