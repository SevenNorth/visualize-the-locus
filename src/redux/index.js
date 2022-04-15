import {
    combineReducers
} from 'redux';
import ViewFeature from '../features/BaseView/ViewFeature';
import LayerFeature from '../features/Layer/LayerFeature';

const view = new ViewFeature();
const layer = new LayerFeature();
export default combineReducers({
    [view.featureKey]: view.genReducer(),
    [layer.featureKey]: layer.genReducer(),
})

export {
    view,
    layer,
}