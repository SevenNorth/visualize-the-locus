import produce from 'immer';
import _ from 'lodash';

import BaseFeature from '../../base/BaseFeature'

class LayersFeature extends BaseFeature {
    key = 'LAYERS';

    static Keys = {
        ADD: `ADD`,
        REMOVE: `REMOVE`,
        REMOVE_ALL: `REMOVE_ALL`,
        UPDATE_LAYER: `UPDATE_LAYER`, // 暂未使用
    }

    static defaultProps = {};

    constructor(props){
        super(props)
        console.log("🚀-fjf : props", props);
    }

    genInitialState(){
        return {
            layers:[],
            ...super.genInitialState(),
        }
    }

    genReducer(){
        const addLayers = (newState, layers) =>{
            const lyrMap = _.keyBy(layers, 'id');
            const existLayers = _.filter(newState.layers, lyr =>
                _.has(lyrMap, lyr.id),
            );
            removeLayers(newState, existLayers);
            newState.layers = [...newState.layers, ...layers]
        }

        const removeLayers = (newState,layers) => {
            const lyrIds = _.map(layers, lyr =>
                _.isString(lyr) ? lyr : lyr.id,
            );
            newState.layers = _.filter(
                newState.layers,
                lyr => !_.includes(lyrIds, lyr.id),
            );
        };

        const removeAllLayers = (newState: StateType) => {
            newState.layers = [];
        };

        const { actionKeys } = this;
        const baseReducer = super.genReducer();

        return (state = this.initialState, action) => 
            produce(state, newState => {
                newState = baseReducer(newState, action);
                const { type } = action;
                switch (type) {
                case actionKeys.ADD:
                    addLayers(newState, action.layers);
                    break;
                case actionKeys.REMOVE:
                    removeLayers(newState, action.layers);
                    break;
                case actionKeys.REMOVE_ALL:
                    removeAllLayers(newState);
                    break;
                    default:
                        break;
                }
                return newState;
            })
    }

    add(layers){
        return {
            type: this.actionKeys.ADD,
            layers,
        }
    }

    rmLayers(layers){
        return {
            type: this.actionKeys.REMOVE,
            layers,
        }
    }

    rmAll(){
        return {
            type: this.actionKeys.REMOVE_ALL
        }
    }
}

export default LayersFeature;