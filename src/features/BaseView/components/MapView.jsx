import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { useRef } from 'react';
import { useWidgets } from '../../../utils'
import { view, layers, graphics } from '../../../redux'
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

export default connect(
    state => {
        const viewState = _.get(state, view.featureKey);
        const layersState = _.get(state, layers.featureKey);
        const graphicsState = _.get(state, graphics.featureKey);
        const { basemap, viewpoint } = viewState;
        const { layers: reduxLayers } = layersState;
        const { graphics: reduxGraphics } = graphicsState;
        const map = view.map;
        const id = `${view.featureKey}_MapView`;
        const drawGrapgicsLayer = graphics.drawGrapgicsLayer;
        
        return {
            map,
            basemap,
            viewpoint,
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