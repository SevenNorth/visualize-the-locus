import { connectLeftPanel } from "./LeftPanel";

export default function genComponents (panelFeature, GraphicsFeature) {
    panelFeature.registerComponents({
        LeftPanel: connectLeftPanel(panelFeature, GraphicsFeature),
    });
}