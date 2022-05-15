import color from '../assets/images/color.png'
import dark from '../assets/images/dark.png'
import gray from '../assets/images/gray.png'

const baseCfg = {
    spatialReference: {
        // wkid: 3857, // 同102100 即WGS-84投影坐标
        wkid: 4326
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
            }, ],
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
        targetGeometry: {
            spatialReference: {
                wkid: 4326
            },
            x: 104.06524658203125,
            y: 30.64854572202601,
            z: 497.4389120414853,
            type: 'point'
        },
        camera: {
            position: {
                spatialReference: {
                    wkid: 4326
                },
                x: 104.06524658203125,
                y: 30.64854572202601,
                z: 31200.609455426224
            },
            heading: 0,
            tilt: 0.4976056235226675
        },
    }
}

export default baseCfg;