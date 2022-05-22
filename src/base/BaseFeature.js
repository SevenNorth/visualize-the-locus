import _ from 'lodash';

class BaseFeature{
    store;
    context;
    _components;
    constructor(props) {
        this.featureKey = props?.key ?? this.key;
    }

    get components(){
        if (!this._components) {
            this._components = {};
        }
        return this._components;
    }

    init(store) {
        this.store = store;
        this.context = {
            dispatch: store.dispatch,
            getState: store.getState,
            feature: this,
        };
        if (this.props?.genComponents) {
            const componentsMap = this.props.genComponents(this);
            if (componentsMap) {
                this.registerComponents(componentsMap);
            }
        }
    }

    getOwnState(){
        return _.get(this.store.getState(), this.featureKey);
    }

    registerComponents(components) {
        _.assign(this.components, components);
    }
}

export default BaseFeature;