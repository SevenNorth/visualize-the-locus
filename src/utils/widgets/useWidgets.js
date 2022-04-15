import _ from 'lodash';
import { useMemo } from 'react';
import mixinWidgets from './mixinWidgets';
export default function useWidgets (
    className,
    defaultWidgets,
) {
    const widgets = useMemo(() => {
        const newWidgets = _.defaults({}, defaultWidgets);
        mixinWidgets(className, newWidgets);
        return newWidgets;
    }, [className, defaultWidgets]);
    return widgets;
}
