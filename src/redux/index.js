import FeatureManager from '../base/FeatureManager';

import ViewFeature from '../features/BaseView/ViewFeature';
import LayersFeature from '../features/Layers/LayersFeature';
import GraphicsFeature from '../features/Graphics/GraphicsFeature';

const view = new ViewFeature({
    key: 'VIEW'
});
const layers = new LayersFeature({
    key: 'LAYERS'
});
const graphics = new GraphicsFeature({
    key: 'GRAPHICS',
    view
});

const fm = new FeatureManager()

fm.refreshFeatures({
    [view.key]: view,
    [layers.key]: view,
    [graphics.key]: graphics,
})

export default fm;