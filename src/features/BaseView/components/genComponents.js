import { connectBaseView } from './BaseView';
import { connectMapView } from './MapView';
import { connectSceneView } from './SceneView';
import { connectSceneSwitch } from './SceneSwitch';
import { connectBasemapSwitchPopover } from './BasemapSwitchPopover';
import { connectToolBar } from './ToolBar';

export default function genComponents (viewFeature, LayersFeature, GraphicsFeature) {
    viewFeature.registerComponents({
        BasemapSwitchPopover: connectBasemapSwitchPopover(viewFeature),
        SceneSwitch: connectSceneSwitch(viewFeature),
    });
    viewFeature.registerComponents({
        ToolBar: connectToolBar(viewFeature),
    })
    viewFeature.registerComponents({
        MapView: connectMapView(viewFeature, LayersFeature, GraphicsFeature),
        SceneView: connectSceneView(viewFeature, LayersFeature, GraphicsFeature),
    });
    viewFeature.registerComponents({
        BaseView: connectBaseView(viewFeature),
    });
}