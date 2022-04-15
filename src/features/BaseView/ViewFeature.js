import produce from 'immer';
import Map from "@arcgis/core/Map";

import baseCfg from '../../config/baseCfg'

class ViewFeature {
    featureKey = 'VIEW';
    initialState;
    map;
    constructor(){
        this.initialState = {
            basemap: baseCfg.basemaps[0],
            ground: baseCfg.ground,
            spatialReference: baseCfg.spatialReference,
            center: baseCfg.center,
            isScene: true,
        };
        this.map = new Map({
            basemap: undefined,
            ground: undefined,
        });
    }

    actionKeys = {
        SET_VIEWPOINT: `${this.featureKey}_SET_VIEWPOINT`,
        SET_IS_SCENE: `${this.featureKey}_SET_IS_SCENE`,
        SET_GROUND: `${this.featureKey}_SET_GROUND`,
        SET_BASEMAP: `${this.featureKey}_SET_BASEMAP`,
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
}

export default ViewFeature;