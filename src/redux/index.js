import FeatureManager from '../base/FeatureManager';
import baseCfg from '../config/baseCfg';

import ViewFeature from '../features/BaseView/ViewFeature';
import genViewComponents from '../features/BaseView/components/genComponents';
import LayersFeature from '../features/Layers/LayersFeature';
import GraphicsFeature from '../features/Graphics/GraphicsFeature';
import PanelFeature from '../features/Panel/PanelFeature';
import genPanelComponents from '../features/Panel/components/genComponents';
const view = new ViewFeature({
    key: 'VIEW',
    initialState: {
        basemap: baseCfg.basemaps[1],
        ground: baseCfg.ground,
        spatialReference: baseCfg.spatialReference,
        viewpoint:baseCfg.viewpoint,
    }
});
const layers = new LayersFeature({
    key: 'LAYERS',
    initialState: {

    }
});
const graphics = new GraphicsFeature({
    key: 'GRAPHICS',
    view,
    initialState: {

    },
});
const panel = new PanelFeature({
    key: 'PANEL',
    apiProps: {
        mock: true,
        baseUrl: '/tracks',
        routes: {
            getTracksList: 'getTracksList',
        },
    }
})

genViewComponents(view, layers, graphics)
genPanelComponents(panel, graphics)
const fm = new FeatureManager()

fm.refreshFeatures({
    [view.key]: view,
    [layers.key]: layers,
    [graphics.key]: graphics,
    [panel.key]: panel,
})

export default fm;