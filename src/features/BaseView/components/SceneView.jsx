import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { useRef } from 'react';
import { useWidgets } from '../../../utils'
import { useSceneView, useGround } from '../hooks';
import { view } from '../../../redux'

const defaultWidgets = {
    Container: styled.div`
    `
}

const className = 'map_SceneView';
const SceneView = (props) => {

    const widgets = useWidgets(className, defaultWidgets)
    const mapRef = useRef()
    
    useGround(props);
    useSceneView(props, mapRef);
    
    const { Container } = widgets;
    return <Container ref = {mapRef} />;
}

export default connect(
    state => {
        const viewState = _.get(state, view.featureKey);
        const { ground, basemap, center } = viewState;
        const map = view.map;
        return {
            map,
            ground,
            basemap,
            center,
        }
    }
)(SceneView)