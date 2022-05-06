import {
    combineReducers
} from 'redux';
import ViewFeature from '../features/BaseView/ViewFeature';
import LayersFeature from '../features/Layers/LayersFeature';

const view = new ViewFeature();
const layer = new LayersFeature();
export default combineReducers({
    [view.featureKey]: view.genReducer(),
    [layer.featureKey]: layer.genReducer(),
})

export {
    view,
    layer,
}