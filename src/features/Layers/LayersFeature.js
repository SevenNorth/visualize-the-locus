import produce from 'immer';
import _ from 'lodash';
class LayersFeature {
    featureKey = 'LAYERS';
    constructor(){
        this.initialState = {
            layers:[]
        };
    }

    actionKeys = {
        ADD: `${this.featureKey}_ADD`,
        REMOVE: `${this.featureKey}_REMOVE`,
        REMOVE_ALL: `${this.featureKey}_REMOVE_ALL`,
        UPDATE_LAYER: `${this.featureKey}_UPDATE_LAYER`, // 暂未使用
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

        return (state = this.initialState, action) => 
            produce(state, newState => {
                const { type } = action;
                switch (type) {
                case this.actionKeys.ADD:
                    addLayers(newState, action.layers);
                    break;
                case this.actionKeys.REMOVE:
                    removeLayers(newState, action.layers);
                    break;
                case this.actionKeys.REMOVE_ALL:
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