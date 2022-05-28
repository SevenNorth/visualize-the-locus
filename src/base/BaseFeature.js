import _ from 'lodash';
import produce, { setAutoFreeze } from 'immer';

setAutoFreeze(false);

class BaseFeature{

    static Keys = {
        READY: 'ready',
        ACTIVATE: 'activate',
        DEACTIVATE: 'deactivate',
        UPDATE: 'update',
        DEEP_UPDATE: 'deepUpdate',
    };

    key
    stateKey;
    store;
    context;
    _actionKeys
    _components;
    _subFeatures;

    static defaultProps = {};
    constructor(props) {
        const { defaultProps } = this.constructor;
        this.props = _.defaultsDeep({}, props, defaultProps);
        this.key = props.key;
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
        _.each(this.subFeatures, fea => {
            fea.init(store);
        });
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

    genInitialState(){
        const initialState = {
            isReady: false,
            isActive: false,
            ...this.props.initialState,
        };
        _.each(this.subFeatures, (fea, k) => {
            initialState[k] = fea.genInitialState();
        });
        return initialState;
    }

    genReducer(){
        const { actionKeys } = this;
        const subReducers = {};
        _.each(this.subFeatures, (fea, k) => {
            subReducers[k] = fea.genReducer();
        });
        return (state, action) =>
            produce(state, (newState = this.genInitialState()) => {
                _.each(subReducers, (reducer, key) => {
                    const feaState = reducer(newState[key], action);
                    newState[key] = feaState;
                });
                const { type } = action;
                switch (type) {
                case actionKeys.UPDATE:
                    _.assign(newState, action.newState);
                    break;
                case actionKeys.DEEP_UPDATE:
                    _.each(action.newStateMap, (value, key) => {
                        _.set(newState, key, value);
                    });
                    break;
                case actionKeys.READY:
                    newState.isReady = true;
                    break;
                case actionKeys.ACTIVATE:
                    newState.isActive = true;
                    break;
                case actionKeys.DEACTIVATE:
                    newState.isActive = false;
                    break;
                default:
                    break;
                }
                return newState;
            });
    }

    update(newState){
        const { dispatch } = this.context;
        dispatch({
            type: this.actionKeys.UPDATE,
            newState,
        });
    }

    deepUpdate(newStateMap){
        const { dispatch } = this.context;
        dispatch({
            type: this.actionKeys.DEEP_UPDATE,
            newStateMap,
        });
    }

    ready(){
        const { dispatch } = this.context;
        dispatch({
            type: this.actionKeys.READY,
        });
    }

    activate(){
        const { dispatch } = this.context;
        dispatch({
            type: this.actionKeys.ACTIVATE,
        });
    }

    deactivate() {
        const { dispatch } = this.context;
        dispatch({
            type: this.actionKeys.DEACTIVATE,
        });
    }
}

export default BaseFeature;