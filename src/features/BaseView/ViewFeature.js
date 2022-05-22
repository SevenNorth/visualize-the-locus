import produce from 'immer';
import Map from "@arcgis/core/Map";

import BaseFeature from '../../base/BaseFeature';
import Request from '../../base/request';
class ViewFeature extends BaseFeature {
    key = 'VIEW';
    initialState;
    map;

    static Keys = {
        SET_VIEWPOINT: `SET_VIEWPOINT`,
        SET_IS_SCENE: `SET_IS_SCENE`,
        SET_GROUND: `SET_GROUND`,
        SET_BASEMAP: `SET_BASEMAP`,
        SET_SCENEVIEW_READY: `SET_SCENEVIEW_READY`,
        SET_MAPVIEW_READY: `SET_MAPVIEW_READY`,
        DESTROY_MAPVIEW: `DESTROY_MAPVIEW`,
        DESTROY_SCENEVIEW: `DESTROY_SCENEVIEW`,
    }

    static defaultProps = {};

    getListRequest;

    constructor(props){
        super(props)
        this.map = new Map({
            basemap: undefined,
            ground: undefined,
        });
        this.viewCache = {
            mapView: null,
            sceneView: null,
        };
        this.registerSubFeatures({
            getListRequest: {
                FeatureClass: Request,
                props: {
                    requsetFn: this.test.bind(this)
                }
            },
        })
    }

    test(e){
    console.log("🚀-fjf : e", e);

    }

    genInitialState(){
        return {
            isScene: true,
            isSceneViewReady:false,
            isMapViewReady:false,
            isViewReady:false,
            ...super.genInitialState(),
        }
    }

    genReducer(){
        const { actionKeys } = this;
        const baseReducer = super.genReducer();
        return (state, action) => 
            produce(state, newState => {
                newState = baseReducer(newState, action);
                const { type } = action;
                switch (type) {
                    case actionKeys.SET_IS_SCENE:
                        newState.isScene = action.isScene;
                        break;
                    case actionKeys.SET_BASEMAP:
                        newState.basemap = action.basemap;
                        break;
                    case actionKeys.SET_VIEWPOINT:
                        newState.viewpoint = action.viewpoint;
                        break;
                    case actionKeys.SET_MAPVIEW_READY:
                        newState.isMapViewReady = true;
                        newState.isViewReady = true;
                        break;
                    case actionKeys.SET_SCENEVIEW_READY:
                        newState.isSceneViewReady = true;
                        newState.isViewReady = true;
                        break;
                    case actionKeys.DESTROY_MAPVIEW:
                        newState.isMapViewReady = false;
                        break;
                    case actionKeys.DESTROY_SCENEVIEW:
                        newState.isSceneViewReady = false;
                        break;
                    default:
                        break;
                }
                return newState;
            })
    }

    setIsScene(isScene){
        const { dispatch } = this.context;
        return dispatch( {
            type: this.actionKeys.SET_IS_SCENE,
            isScene,
        })
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