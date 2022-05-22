import _ from 'lodash';

class BaseFeature{
    store;
    context;
    _actionKeys
    _components;
    _subFeatures

    constructor(props) {
        this.stateKey = props?.key ?? this.key;
    }

    get components(){
        if (!this._components) {
            this._components = {};
        }
        return this._components;
    }

    get actionKeys() {
        if (!this._actionKeys) {
            this._actionKeys = {};
            const { Keys } = this.constructor;
            _.each(Keys, (v, k) => {
                this._actionKeys[k] = `${this.stateKey}.${v}`;
            });
        }
        return this._actionKeys;
    }

    get subFeatures(){
        if (!this._subFeatures) {
            this._subFeatures = {};
        }
        return this._subFeatures;
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
        return _.get(this.store.getState(), this.stateKey);
    }

    registerComponents(components) {
        _.assign(this.components, components);
    }

    registerSubFeatures(
        features,
    ): void {
        _.each(features, (v, k) => {
            const { FeatureClass, props } = v;
            const key = `${this.key}.${k}`;
            const fea = new FeatureClass({
                key,
                ...props,
            });
            this.subFeatures[k] = fea;
            this[k] = fea;
        });
    }
}

export default BaseFeature;