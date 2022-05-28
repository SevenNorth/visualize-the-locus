import produce from 'immer';
import _ from 'lodash';

import BaseFeature from '../../base/BaseFeature';
import Request from '../../base/request';
import Api from './classes/Api';


class PanelFeature extends BaseFeature {
    key = 'PANEL';
    initialState;

    static Keys = {
        UPDATE_PANEL_SHOW: `UPDATE_PANEL_SHOW`,
    }

    static defaultProps = {};

    getTracksListRequest;

    constructor(props){
        super(props)
        const { apiProps } = props;
        this.api = new Api(apiProps)
        this.registerSubFeatures({
            getTracksListRequest: {
                FeatureClass: Request,
                props: {
                    requestFn: this.api.getTracksList.bind(this.api)
                }
            },
        })
    }

    genInitialState(){
        return {
            left: {
                trackListPanel: true,
            },
            ...super.genInitialState(),
        }
    }

    genReducer(){
        const updatePanelShow = (newState, payload) => {
            const {position, panel, show} = payload;
            const newPositionPanel = newState[position];
            if(show){
                _.each(newPositionPanel, panel => {
                    newPositionPanel[panel] = false;
                })
            }
            newPositionPanel[panel] = show;
            newState[position] = newPositionPanel;
        }

        const { actionKeys } = this;
        const baseReducer = super.genReducer();
        return (state, action) => 
            produce(state, newState => {
                newState = baseReducer(newState, action);
                const { type } = action;
                switch (type) {
                    case actionKeys.UPDATE_PANEL_SHOW:
                        updatePanelShow(newState, action.payload);
                        break;
                    default:
                        break;
                }
                return newState;
            })
    }

    updatePanelShow(position, panel, show){
        const { dispatch } = this.context;
        dispatch({
            type: this.actionKeys.UPDATE_PANEL_SHOW,
            payload: {
                position,
                panel,
                show,
            }
        })
    }
}

export default PanelFeature;