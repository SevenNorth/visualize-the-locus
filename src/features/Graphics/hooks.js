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
        console.log("🚀-fjf : graphics", graphics);
        const willRmGraphics = _.differenceBy(preGraphics, graphics, 'attributes.id');
        // const rmGraphics = [], addGraphics = [];
        drawGrapgicsLayer.removeMany(willRmGraphics);
        drawGrapgicsLayer.addMany(willAddGraphics);
        setPreGraphics(graphics);
    }, [drawGrapgicsLayer, graphics, preGraphics, view])
}