import styled from 'styled-components';
import { connect } from 'react-redux';
import React, { useRef } from 'react';
import { useWidgets } from '../../../utils'
import { useMapView, useViewpoint } from '../hooks';
import { useLayers } from '../../Layers/hooks';
import { useGraphics } from '../../Graphics/hooks';

const defaultWidgets = {
    Container: styled.div`
    `
}

const className = 'map_MapView';
const MapView = (props) => {

    const widgets = useWidgets(className, defaultWidgets)
    const mapRef = useRef()
    
    useMapView(props, mapRef);
    useViewpoint(props, props.mapView);
    useLayers(props, props.mapView);
    useGraphics(props, props.mapView);
    const { Container } = widgets;
    return <Container ref = {mapRef} />;
}

const connectMapView = (viewFeature, LayersFeature, GraphicsFeature) => {
    return connect(
        state => {
            const viewState = viewFeature.getOwnState();
            const layersState = LayersFeature.getOwnState();
            const graphicsState = GraphicsFeature.getOwnState();
            const { basemap, viewpoint, spatialReference } = viewState;
            const { layers: reduxLayers } = layersState;
            const { graphics: reduxGraphics } = graphicsState;
            const map = viewFeature.map;
            const id = `${viewFeature.key}_MapView`;
            const drawGrapgicsLayer = GraphicsFeature.drawGrapgicsLayer;
            
            return {
                map,
                basemap,
                viewpoint,
                spatialReference,
                id,
                mapView: viewFeature.viewCache.mapView,
                layers: reduxLayers,
                graphics: reduxGraphics,
                drawGrapgicsLayer,
            }
        },
        () => {
            return {
                handleViewpointChange: (viewpoint)=>{
                    viewFeature.setViewpoint(viewpoint);
                },
                handleReady: (mapView)=>{
                    viewFeature.setMapViewReady(mapView);
                },
                destroy: ()=>{
                    viewFeature.destroyMapView()
                }
            }
        }
    )(MapView)
}

export { connectMapView }

export default React.memo(MapView)