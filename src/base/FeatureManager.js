import _ from 'lodash';
import {
    createStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const defaultReduces = {
    INITSTORE: () => {
        return {
            message: 'Store初始化完成, 请调用replaceReducer方法添加Reducer',
        };
    },
};

const composeEnhancers = composeWithDevTools({});
export default class FeatureManager {
    store;
    featureMap;
    reduceMap;
    constructor() {
        this.featureMap = {};
        this.reduceMap = {};
        this.store = createStore(
            combineReducers(defaultReduces),
            composeEnhancers(applyMiddleware(thunk)),
        );
    }

    getFeature(key) {
        return this.featureMap[key];
    }

    refreshFeatures(add, remove?) {
        const addKeys = _.keys(add);
        const removeKeys = _.keys(remove);
        if (!addKeys.length && !removeKeys.length) {
            return;
        }
        const curKeys = _.union(
            _.without(_.keys(this.featureMap), ...removeKeys),
            addKeys,
        );
        const realRemoveKeys = _.without(removeKeys, ...curKeys);
        _.each(realRemoveKeys, key => {
            delete this.featureMap[key];
        });
        const newReduceMap = {};
        _.each(curKeys, key => {
            if (!this.featureMap[key]) {
                const fea = add[key];
                this.featureMap[key] = fea;
                this.reduceMap[key] = fea.genReducer();
                fea.init(this.store);
            } else if (add[key] && this.featureMap[key] !== add[key]) {
                throw new Error(
                    `存在多个Feature实例使用了相同的key，务必修改在new feature时指定唯一的key以避免引发难以追踪的bug。key:${key}`,
                );
            }
            newReduceMap[key] = this.reduceMap[key];
        });
        this.store.replaceReducer(combineReducers(newReduceMap));
    }
}
