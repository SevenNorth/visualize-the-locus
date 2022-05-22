import produce from 'immer';
import Map from "@arcgis/core/Map";

import baseCfg from '../../config/baseCfg'

class ViewFeature {
    key = 'VIEW';
    initialState;
    map;
    constructor(){
        this.initialState = {
            basemap: baseCfg.basemaps[1],
            ground: baseCfg.ground,
            spatialReference: baseCfg.spatialReference,
            viewpoint:baseCfg.viewpoint,
            isScene: true,
            isSceneViewReady:false,
            isMapViewReady:false,
            isViewReady:false,
        };
        this.map = new Map({
            basemap: undefined,
            ground: undefined,
        });
        this.viewCache = {
            mapView: null,
            sceneView: null,
        };
    }

    actionKeys = {
        SET_VIEWPOINT: `${this.key}_SET_VIEWPOINT`,
        SET_IS_SCENE: `${this.key}_SET_IS_SCENE`,
        SET_GROUND: `${this.key}_SET_GROUND`,
        SET_BASEMAP: `${this.key}_SET_BASEMAP`,
        SET_SCENEVIEW_READY: `${this.key}_SET_SCENEVIEW_READY`,
        SET_MAPVIEW_READY: `${this.key}_SET_MAPVIEW_READY`,
        DESTROY_MAPVIEW: `${this.key}_DESTROY_MAPVIEW`,
        DESTROY_SCENEVIEW: `${this.key}_DESTROY_SCENEVIEW`,
    }

    genReducer(){
        return (state = this.initialState, action) => 
            produce(state, newState => {
                const { type } = action;
                switch (type) {
                    case this.actionKeys.SET_IS_SCENE:
                        newState.isScene = action.isScene;
                        break;
                    case this.actionKeys.SET_BASEMAP:
                        newState.basemap = action.basemap;
                        break;
                    case this.actionKeys.SET_VIEWPOINT:
                        newState.viewpoint = action.viewpoint;
                        break;
                    case this.actionKeys.SET_MAPVIEW_READY:
                        newState.isMapViewReady = true;
                        newState.isViewReady = true;
                        break;
                    case this.actionKeys.SET_SCENEVIEW_READY:
                        newState.isSceneViewReady = true;
                        newState.isViewReady = true;
                        break;
                    case this.actionKeys.DESTROY_MAPVIEW:
                        newState.isMapViewReady = false;
                        break;
                    case this.actionKeys.DESTROY_SCENEVIEW:
                        newState.isSceneViewReady = false;
                        break;
                    default:
                        break;
                }
                return newState;
            })
    }

    setIsScene(isScene){
        return {
            type: this.actionKeys.SET_IS_SCENE,
            isScene,
        }
    }

    setBaseMap(basemap){
        return {
            type: this.actionKeys.SET_BASEMAP,
            basemap,
        }
    }

    setViewpoint(viewpoint){
        return {
            type: this.actionKeys.SET_VIEWPOINT,
            viewpoint,
        }
    }

    setMapViewReady(mapView) {
        this.viewCache.mapView = mapView;
        return {
            type: this.actionKeys.SET_MAPVIEW_READY,
        };
    }

    setSceneViewReady(sceneView): void {
        this.viewCache.sceneView = sceneView;
        return {
            type: this.actionKeys.SET_SCENEVIEW_READY,
        };
    }

    destroyMapView() {
        this.viewCache.mapView = null;
        return {
            type: this.actionKeys.DESTROY_MAPVIEW,
        };
    }

    destroySceneView() {
        this.viewCache.sceneView = null;
        return {
            type: this.actionKeys.DESTROY_SCENEVIEW,
        };
    }
}

export default ViewFeature;