import {
    useEffect, useRef
} from "react";
import _ from "lodash";
import SceneView from '@arcgis/core/views/SceneView';
import MapView from '@arcgis/core/views/MapView';
import { getBasemap, getGround } from "../../utils";
import Viewpoint from '@arcgis/core/Viewpoint';

export function useSceneView(
    props,
    mapRef,
) {
    const { map, spatialReference, viewpoint,handleReady, destroy, sceneView } = props;
    useEffect(() => {
        if (!mapRef.current || sceneView) {
            return;
        }
        const newSceneView = new SceneView({
            container: mapRef.current,
            map: map,
            viewpoint,
            spatialReference: spatialReference,
        });
        newSceneView.ui.empty("top-left");
        newSceneView.ui.add(['zoom','compass'], 'bottom-right');
        handleReady(newSceneView);
    }, [mapRef, map, spatialReference, viewpoint, sceneView, handleReady]);
    
    useEffect(() => {
        return () => {
            destroy();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
    const { map, spatialReference, viewpoint, destroy, handleReady, mapView } = props;
    useEffect(() => {
        if (!mapRef.current || mapView) {
            return;
        }
        const newMapView = new MapView({
            container: mapRef.current,
            map: map,
            viewpoint,
            spatialReference: spatialReference,
        });
        newMapView.ui.empty("top-left");
        newMapView.ui.add(['zoom','compass'], 'bottom-right');
        handleReady(newMapView);
    }, [mapRef, map, spatialReference, viewpoint, mapView, handleReady]);
    useEffect(() => {
        return () => {
            destroy();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

const onViewpointChange = _.debounce(
    (id,view,handleViewpointChange) => {
        if (!view) return;
        const { targetGeometry } = view.viewpoint;
        const newTargetGeometry = {
            ...targetGeometry.toJSON(),
            type: targetGeometry.type,
        };
        const newViewpoint = {
            ...view.viewpoint.toJSON(),
            publisher: id,
            targetGeometry: newTargetGeometry,
        };
        handleViewpointChange(newViewpoint);
    },
    120,
    { maxWait: 240 },
);

export function useViewpoint(
    props,
    view
) {
    const { id, handleViewpointChange, viewpoint } = props;
    const watchHandler = useRef(null);
    const prevView = useRef(null);
    useEffect(() => {
        if (view && prevView.current !== view) {
            watchHandler.current?.remove();
            watchHandler.current = view.watch('viewpoint', () => {
                onViewpointChange(id, view, handleViewpointChange);
            });
            prevView.current = view;
        } else if (!view) {
            watchHandler.current?.remove();
            watchHandler.current = null;
        }
    }, [handleViewpointChange, id, view]);
    const prevViewpoint = useRef({});
    useEffect(() => {
        if (
            !view ||
            !viewpoint ||
            viewpoint.publisher === id ||
            prevViewpoint.current === viewpoint
        ) {
            return;
        }
        view.viewpoint = Viewpoint.fromJSON(viewpoint);
        prevViewpoint.current = viewpoint;
    }, [view, prevViewpoint, viewpoint, id]);
}