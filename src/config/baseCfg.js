const baseCfg = {
    spatialReference: {
        wkid: 3857, // 同102100 即WGS-84
    },
    basemaps: [{
            id: 'geoq-color',
            title: '彩色',
            baseLayers: [{
                id: 'geoq-layer-color',
                title: 'Geoq彩色版底图',
                layerType: 'TileLayer',
                url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer',
            }, ],
        },
        {
            id: 'geoq-dark',
            title: '蓝黑',
            baseLayers: [{
                id: 'geoq-layer-dark',
                title: 'Geoq蓝黑版底图',
                layerType: 'TileLayer',
                url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
            }, ],
        },
        {
            id: 'geoq-gray',
            title: '灰色',
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
    center: [104.05657061584817, 30.762593372099293],
}

export default baseCfg;