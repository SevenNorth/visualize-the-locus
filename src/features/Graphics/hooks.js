import { useEffect, useState } from "react";
import _ from "lodash";

export function useGraphics(props, view) {
    const [preGraphics, setPreGraphics] = useState()
    const { graphics, drawGrapgicsLayer } = props;
    
    useEffect(()=>{
        if(!view){
            return;
        }
        const willAddGraphics = _.differenceBy(graphics, preGraphics, 'attributes.id');
        const willRmGraphics = _.differenceBy(preGraphics, graphics, 'attributes.id');
        const rmGraphics = [];
        _.each(willRmGraphics, wrg => {
            const realGraphics = _.find(drawGrapgicsLayer.graphics.items, g => g.attributes.id === wrg.attributes.id)
            rmGraphics.push(realGraphics)
        })
        drawGrapgicsLayer.removeMany(rmGraphics);
        drawGrapgicsLayer.addMany(willAddGraphics);
        setPreGraphics(graphics);
    }, [drawGrapgicsLayer, graphics, preGraphics, view])
}