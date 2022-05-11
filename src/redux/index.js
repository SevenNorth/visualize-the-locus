import {
    combineReducers
} from 'redux';
import ViewFeature from '../features/BaseView/ViewFeature';
import LayersFeature from '../features/Layers/LayersFeature';
import GraphicsFeature from '../features/Graphics/GraphicsFeature';

const view = new ViewFeature();
const layers = new LayersFeature();
const graphics = new GraphicsFeature({view});
export default combineReducers({
    [view.featureKey]: view.genReducer(),
    [layers.featureKey]: layers.genReducer(),
    [graphics.featureKey]: graphics.genReducer(),
})

export {
    view,
    layers,
    graphics,
}