import produce from 'immer';
import _ from 'lodash';

class LayerFeature {
    featureKey = 'LAYER';
    initialState;

    constructor() {
        this.initialState = {
            layers: [],
        }
    }

    actionKeys = {
        ADD: `${this.featureKey}_ADD`,
    }

    genReducer() {
        return (state = this.initialState, action) => 
            produce(state, newState => {
                const { type } = action;
                switch (type) {
                    case this.actionKeys.ADD:
                        newState.layers = _.concat(newState.layers, action.layer)
                        break;
                    default:
                        break;
                }
                return newState;
            })
    }

    add(layer) {
        return {
            type: this.actionKeys.ADD,
            layer,
        }
    }
}

export default LayerFeature;