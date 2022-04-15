import _ from 'lodash';
function mixinWidgets (className, widgets) {
    _.each(widgets, (widget, k) => {
        const { displayName, attrs } = widget;
        if (!_.includes(displayName, 'styled') || widget.displayName === k) {
            return;
        }
        widget.displayName = k;
        const widgetClassName = k === 'Container' ? className : k;
        const attrsFn = attrs[attrs.length - 1];
        if (_.isFunction(attrsFn)) {
            const newAttrsFn = (props) => {
                const originProps = attrsFn(props);
                originProps.className = `${
                    originProps.className ? `${originProps.className} ` : ''
                }${widgetClassName}`;
                return originProps;
            };
            attrs[attrs.length - 1] = newAttrsFn;
        } else if (attrs.length === 0) {
            widget.attrs = [{ className: widgetClassName }];
        }
    });
}
export default mixinWidgets;
