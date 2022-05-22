import _ from 'lodash';
import { useMemo } from 'react';
import mixinWidgets from './mixinWidgets';
export default function useWidgets (
    className,
    defaultWidgets,
    propWidgets,
) {
    const widgets = useMemo(() => {
        const newWidgets = _.defaults({}, defaultWidgets, propWidgets);
        mixinWidgets(className, newWidgets);
        return newWidgets;
    }, [className, defaultWidgets, propWidgets]);
    return widgets;
}
