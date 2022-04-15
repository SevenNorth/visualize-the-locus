import _ from 'lodash';
import Basemap from '@arcgis/core/Basemap';
import Ground from '@arcgis/core/Ground';
import TileLayer from '@arcgis/core/layers/TileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import IntegratedMeshLayer from '@arcgis/core/layers/IntegratedMeshLayer';
import BuildingSceneLayer from '@arcgis/core/layers/BuildingSceneLayer';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer';
import PointCloudLayer from '@arcgis/core/layers/PointCloudLayer';
import WMTSLayer from '@arcgis/core/layers/WMTSLayer';
import WMSLayer from '@arcgis/core/layers/WMSLayer';
import WFSLayer from '@arcgis/core/layers/WFSLayer';

const typeMap = {
    TileLayer,
    WebTileLayer,
    VectorTileLayer,
    FeatureLayer,
    MapImageLayer,
    GraphicsLayer,
    ImageryLayer,
    SceneLayer,
    IntegratedMeshLayer,
    BuildingSceneLayer,
    ElevationLayer,
    PointCloudLayer,
    WMTSLayer,
    WMSLayer,
    WFSLayer,
};
function getLayer(option){
    if (!option) {
        return;
    }
    const { layerType } = option;
    const LayerClass = typeMap[layerType];
    if (LayerClass) {
        return new LayerClass(option);
    }
    return;
}
function getBasemap(option){
    if (_.isString(option)) {
        return Basemap.fromId(option);
    }
    const { id, title, baseLayers } = option;
    const realBaseLayers = [];
    _.each(baseLayers, lyr => {
        const rl = getLayer(lyr);
        if (rl) realBaseLayers.push(rl);
    });
    return new Basemap({
        id,
        title,
        baseLayers: realBaseLayers,
    });
}
function getGround(option){
    const { id, title, layers, ...rest } = option;
    const realLayers = [];
    _.each(layers, lyr => {
        const rl = getLayer(lyr);
        if (rl) realLayers.push(rl);
    });
    return new Ground({
        layers: realLayers,
        ...rest,
    });
}
export { typeMap, getLayer, getBasemap, getGround };
