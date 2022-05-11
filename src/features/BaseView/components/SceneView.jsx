import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { useRef } from 'react';
import { useWidgets } from '../../../utils'
import { view, layers, graphics } from '../../../redux'
import { useSceneView, useGround, useViewpoint } from '../hooks';
import { useLayers } from '../../Layers/hooks';
import { useGraphics } from '../../Graphics/hooks';

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
    useViewpoint(props, props.sceneView);
    useLayers(props, props.sceneView);
    useGraphics(props, props.sceneView);
    const { Container } = widgets;
    return <Container ref = {mapRef} />;
}

export default connect(
    state => {
        const viewState = _.get(state, view.featureKey);
        const layersState = _.get(state, layers.featureKey);
        const graphicsState = _.get(state, layers.featureKey);
        const { ground, basemap, viewpoint } = viewState;
        const { layers: reduxLayers } = layersState;
        const { graphics: reduxGraphics } = graphicsState;
        const map = view.map;
        const id = `${view.featureKey}_SceneView`;
        const drawGrapgicsLayer = graphics.drawGrapgicsLayer;

        return {
            map,
            ground,
            basemap,
            viewpoint,
            id,
            sceneView: view.viewCache.sceneView,
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
            handleReady: (sceneView)=>{
                dispatch(view.setSceneViewReady(sceneView));
            },
            destroy: ()=>{
                dispatch(view.destroySceneView())
            }
        }
    }
)(SceneView)