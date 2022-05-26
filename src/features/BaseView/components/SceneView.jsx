import styled from 'styled-components';
import { connect } from 'react-redux';
import React, { useRef } from 'react';
import { useWidgets } from '../../../utils'
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

const connectSceneView = (viewFeature, LayersFeature, GraphicsFeature) => {
    return connect(
        state => {
            const viewState = viewFeature.getOwnState();
            const layersState = LayersFeature.getOwnState();
            const graphicsState = GraphicsFeature.getOwnState();
            const { ground, basemap, viewpoint, spatialReference } = viewState;
            const { layers: reduxLayers } = layersState;
            const { graphics: reduxGraphics } = graphicsState;
            const map = viewFeature.map;
            const id = `${viewFeature.key}_SceneView`;
            const drawGrapgicsLayer = GraphicsFeature.drawGrapgicsLayer;
    
            return {
                map,
                ground,
                basemap,
                viewpoint,
                spatialReference,
                id,
                sceneView: viewFeature.viewCache.sceneView,
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
                handleReady: (sceneView)=>{
                    viewFeature.setSceneViewReady(sceneView);
                },
                destroy: ()=>{
                    viewFeature.destroySceneView()
                }
            }
        }
    )(SceneView)
}

export {
    connectSceneView
}

export default React.memo(SceneView);