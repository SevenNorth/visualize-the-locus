import styled from 'styled-components';
import _ from 'lodash';
import { connect, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useWidgets } from '../../../utils'
import { useSceneView, useGround, useViewpoint } from '../hooks';
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
    useViewpoint(props, props.sceneView)
    const { Container } = widgets;
    return <Container ref = {mapRef} />;
}

export default connect(
    state => {
        const viewState = _.get(state, view.featureKey);
        const { ground, basemap, viewpoint } = viewState;
        const map = view.map;
        const id = `${view.featureKey}_SceneView`;
        return {
            map,
            ground,
            basemap,
            viewpoint,
            id,
            sceneView: view.viewCache.sceneView,
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