import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { useRef } from 'react';
import { useWidgets } from '../../../utils'
import { useMapView } from '../hooks';
import { view } from '../../../redux'

const defaultWidgets = {
    Container: styled.div`
    `
}

const className = 'map_MapView';
const SceneView = (props) => {

    const widgets = useWidgets(className, defaultWidgets)
    const mapRef = useRef()
    
    useMapView(props, mapRef);
    
    const { Container } = widgets;
    return <Container ref = {mapRef} />;
}

export default connect(
    state => {
        const viewState = _.get(state, view.featureKey);
        const { basemap, center } = viewState;
        const map = view.map;
        return {
            map,
            basemap,
            center,
        }
    }
)(SceneView)