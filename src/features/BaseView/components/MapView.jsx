import styled from 'styled-components';
import { connect } from 'react-redux';
import { useRef } from 'react';
import { useWidgets } from '../../../utils'
import { useMapView, useViewpoint } from '../hooks';
import { useLayers } from '../../Layers/hooks';
import { useGraphics } from '../../Graphics/hooks';
import fm from '../../../redux';

const view = fm.getFeature('VIEW');
const layers = fm.getFeature('LAYERS')
const graphics = fm.getFeature('GRAPHICS')

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

export default connect(
    state => {
        const viewState = view.getOwnState();
        const layersState = layers.getOwnState();
        const graphicsState = graphics.getOwnState();
        const { basemap, viewpoint, spatialReference } = viewState;
        const { layers: reduxLayers } = layersState;
        const { graphics: reduxGraphics } = graphicsState;
        const map = view.map;
        const id = `${view.featureKey}_MapView`;
        const drawGrapgicsLayer = graphics.drawGrapgicsLayer;
        
        return {
            map,
            basemap,
            viewpoint,
            spatialReference,
            id,
            mapView: view.viewCache.mapView,
            layers: reduxLayers,
            graphics: reduxGraphics,
            drawGrapgicsLayer,
        }
    },
    dispatch => {
        return {
            handleViewpointChange: (viewpoint)=>{
                dispatch(view.setViewpoint(viewpoint));
            },
            handleReady: (mapView)=>{
                dispatch(view.setMapViewReady(mapView));
            },
            destroy: ()=>{
                dispatch(view.destroyMapView())
            }
        }
    }
)(MapView)