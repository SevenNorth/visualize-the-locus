import color from '../assets/images/color.png'
import dark from '../assets/images/dark.png'
import gray from '../assets/images/gray.png'

const baseCfg = {
    spatialReference: {
        wkid: 3857, // 同102100 即WGS-84椭球，web墨卡托投影
        // wkid: 4326
    },
    basemaps: [{
            id: 'geoq-color',
            title: '彩色版',
            thumbnail: color,
            baseLayers: [{
                id: 'geoq-layer-color',
                title: 'Geoq彩色版底图',
                layerType: 'TileLayer',
                url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer',
            }, ],
        },
        {
            id: 'geoq-dark',
            title: '蓝黑版',
            thumbnail: dark,
            baseLayers: [{
                id: 'geoq-layer-dark',
                title: 'Geoq蓝黑版底图',
                layerType: 'TileLayer',
                url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
            }, ],
        },
        {
            id: 'geoq-gray',
            title: '灰色版',
            thumbnail: gray,
            baseLayers: [{
                id: 'geoq-layer-dark',
                title: 'Geoq灰色版底图',
                layerType: 'TileLayer',
                url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
            }],
        },
    ],
    ground: {
        id: 'world',
        title: '全球高程',
        layers: [{
            id: 'world-dem',
            title: '全球高程',
            layerType: 'ElevationLayer',
            url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
        }, ],
        navigationConstraint: {
            type: 'none',
        },
    },
    viewpoint: {
        rotation: 0.3804580234115633,
        scale: 98150.53776707186,
        targetGeometry: {
            spatialReference: {
                wkid: 3857
            },
            x: 11855399.53791022,
            y: 3444822.8975759917,
            z: 313.77231406606734,
            type: 'point'
        },
        camera: {
            position: {
                spatialReference: {
                    wkid: 3857
                },
                x: 11855415.005324503,
                y: 3442493.7975799907,
                z: 35248.6256658379
            },
            heading: 359.61954197658844,
            tilt: 3.320072532424338
        },
    },
}

export default baseCfg;