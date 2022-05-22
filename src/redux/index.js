import FeatureManager from '../base/FeatureManager';

import ViewFeature from '../features/BaseView/ViewFeature';
import LayersFeature from '../features/Layers/LayersFeature';
import GraphicsFeature from '../features/Graphics/GraphicsFeature';

const view = new ViewFeature();
const layers = new LayersFeature();
const graphics = new GraphicsFeature({view});

const fm = new FeatureManager()

fm.refreshFeatures({
    [view.key]: view,
    [layers.key]: view,
    [graphics.key]: graphics,
})

export default fm;