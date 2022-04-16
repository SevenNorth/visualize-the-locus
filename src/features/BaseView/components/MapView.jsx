import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { useRef } from 'react';
import { useWidgets } from '../../../utils'
import { useMapView, useViewpoint } from '../hooks';
import { view } from '../../../redux'

const defaultWidgets = {
    Container: styled.div`
    `
}

const className = 'map_MapView';
const MapView = (props) => {

    const widgets = useWidgets(className, defaultWidgets)
    const mapRef = useRef()
    
    useMapView(props, mapRef);
    useViewpoint(props, props.mapView)
    const { Container } = widgets;
    return <Container ref = {mapRef} />;
}

export default connect(
    state => {
        const viewState = _.get(state, view.featureKey);
        const { basemap, viewpoint } = viewState;
        const map = view.map;
        const id = `${view.featureKey}_MapView`;
        return {
            map,
            basemap,
            viewpoint,
            id,
            mapView: view.viewCache.mapView,
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