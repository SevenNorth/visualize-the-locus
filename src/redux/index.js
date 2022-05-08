import {
    combineReducers
} from 'redux';
import ViewFeature from '../features/BaseView/ViewFeature';
import LayersFeature from '../features/Layers/LayersFeature';

const view = new ViewFeature();
const layers = new LayersFeature();
export default combineReducers({
    [view.featureKey]: view.genReducer(),
    [layers.featureKey]: layers.genReducer(),
})

export {
    view,
    layers,
}