import FeatureManager from '../base/FeatureManager';

import ViewFeature from '../features/BaseView/ViewFeature';
import genViewComponents from '../features/BaseView/components/genComponents';
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

genViewComponents(view, layers, graphics)

const fm = new FeatureManager()

fm.refreshFeatures({
    [view.key]: view,
    [layers.key]: layers,
    [graphics.key]: graphics,
})

export default fm;