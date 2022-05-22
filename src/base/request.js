import _ from 'lodash/core';
import produce from 'immer';
import BaseFeature from './BaseFeature';
import { getInitialRequestState, getInitialError} from './functions'

class Request extends BaseFeature {
    static Keys = {
        EXECUTE: 'execute',
        SUCCESS: 'success',
        UPDATE_DATA: 'updateData',
        FAILED: 'failed',
        INVALID: 'invalid',
        CLEAR: 'clear',
        ERROR_REPORTED: 'errorReported',
        ...BaseFeature.Keys,
    };

    updateData (newData) {
        const { dispatch } = this.context;
        const { updateDataFn } = this.props;
        if (updateDataFn) {
            const originData = this.getOwnState().data;
            newData = updateDataFn(newData, originData);
        }
        dispatch({
            type: this.actionKeys.UPDATE_DATA,
            data: newData,
        });
        return newData;
    }

    async execute (params) {
        const { dispatch } = this.context;
        const { requestFn, keepIfNotTheLast } = this.props;
        const requestTimestamp = new Date();
        dispatch({
            type: this.actionKeys.EXECUTE,
            timestamp: requestTimestamp,
            lastParams: params,
        });
        try {
            const data = await requestFn(params);
            const lastExecute = _.get(this.getOwnState(), 'status.lastExecute');
            // 丢弃过时的请求结果 或 当前feature状态已经从redux中消失时
            if (!lastExecute || (lastExecute > requestTimestamp && !keepIfNotTheLast)) {
                return;
            }
            const newData = this.updateData(data);
            dispatch({
                type: this.actionKeys.SUCCESS,
            });
            return newData;
        } catch (err) {
            console.error(err);
            const { code, message } = err
            dispatch({
                type: this.actionKeys.FAILED,
                error: {
                    code,
                    message,
                    err,
                },
            });
        }
    }

    clear (){
        const { dispatch } = this.context;
        dispatch({
            type: this.actionKeys.CLEAR,
        });
    }

    failed (error){
        const { dispatch } = this.context;
        dispatch({
            type: this.actionKeys.FAILED,
            error,
        });
    }

    invalid (){
        const { dispatch } = this.context;
        dispatch({
            type: this.actionKeys.INVALID,
        });
    }

    errorReported (reportTime){
        const { dispatch } = this.context;
        dispatch({
            type: this.actionKeys.ERROR_REPORTED,
            reportTime: reportTime ?? new Date(),
        });
    }

    genInitialState() {
        return {
            ...getInitialRequestState(this.stateKey),
            ...super.genInitialState(),
        };
    }

    genReducer (){
        const { actionKeys } = this;
        const baseReducer = super.genReducer();
        return (state, action) =>
            produce(state, (newState) => {
                newState = baseReducer(newState, action);
                const { type } = action;
                switch (type) {
                case actionKeys.EXECUTE:
                    _.assign(newState.status, {
                        isFetching: true,
                        lastExecute: action.timestamp,
                        lastUpdated: new Date(),
                    });
                    break;
                case actionKeys.SUCCESS:
                    _.assign(newState.status, {
                        isFetching: false,
                        didInvalidate: false,
                        lastUpdated: new Date(),
                    });
                    newState.error = getInitialError(this.stateKey);
                    break;
                case actionKeys.UPDATE_DATA:
                    newState.data = action.data;
                    break;
                case actionKeys.FAILED:
                    _.assign(newState.status, {
                        isFetching: false,
                        didInvalidate: false,
                        lastUpdated: new Date(),
                    });
                    _.assign(newState.error, {
                        ...action.error,
                        notReported: true,
                        lastReported: new Date(),
                    });
                    break;
                case actionKeys.CLEAR:
                    _.assign(
                        newState,
                        getInitialRequestState(this.stateKey),
                    );
                    break;
                case actionKeys.ERROR_REPORTED:
                    _.assign(newState.error, {
                        notReported: false,
                        lastReported: action.reportTime,
                    });
                    break;
                case actionKeys.INVALID:
                    _.assign(newState.status, {
                        isFetching: false,
                        didInvalidate: true,
                        lastExecute: new Date(),
                        lastUpdated: new Date(),
                    });
                    break;
                default:
                    break;
                }

                return newState;
            });
    }
}

export default Request;