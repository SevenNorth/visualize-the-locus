import { useEffect, useState } from "react";
import _ from "lodash";
import { getLayer } from '../../utils'

export function useLayers(props, view) {
    const [preLayers, setPreLayers] = useState()
    const { layers, map } = props;
    
    useEffect(()=>{
        if(!view){
            return;
        }
        const willAddLayers = _.differenceBy(layers, preLayers, 'id');
        const willRmLayers = _.differenceBy(preLayers, layers, 'id');
        const rmLayers = [], addLayers = [];
        _.each(willRmLayers, lyr => {
            const realLayer =  map.findLayerById(lyr.id)
            rmLayers.push(realLayer);
        });
        map.removeMany(rmLayers);
        _.each(willAddLayers, lyr => {
            const realLayer = getLayer(lyr);
            addLayers.push(realLayer);
        });
        map.addMany(addLayers);
        setPreLayers(layers);
    }, [layers, map, preLayers, view])
}