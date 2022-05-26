import produce from 'immer';
import _ from 'lodash';

import { getLayer } from '../../utils'
import BaseFeature from '../../base/BaseFeature'

/**
    graphics示例：
    {
        attributes: {
            id: 'xxxxx' // 必须
        },
        geometry: {
            type: "polyline",  // autocasts as new Polyline()
            paths: [
                [-111.30, 52.68],
                [-98, 49.5],
                [-93.94, 29.89]
            ]
        },
        symbol: {
            type: "simple-line",  // autocasts as SimpleLineSymbol()
            color: [226, 119, 40],
            width: 4
        }
    }
 */
class GraphicsFeature extends BaseFeature {
    key = 'GRAPHICS';
    
    static Keys = {
        ADD: `ADD`,
        REMOVE: `REMOVE`,
        REMOVE_ALL: `REMOVE_ALL`,
    }

    static defaultProps = {};

    constructor(props){
        super(props)
        const { view } = props;
        const drawGrapgicsLayer = getLayer({
            id: 'draw-graphics',
            title: '绘制用图层',
            layerType: 'GraphicsLayer',
            elevationInfo: {
                mode: 'on-the-ground'
            }
        });
        view.map.add(drawGrapgicsLayer);
        this.drawGrapgicsLayer = drawGrapgicsLayer;
    }

    genInitialState(){
        return {
            graphics:[],
            ...super.genInitialState(),
        }
    }

    genReducer(){
        const addGraphics = (newState, graphics) =>{
            const lyrMap = _.keyBy(graphics, 'attributes.id');
            const existGraphics = _.filter(newState.graphics, g =>
                _.has(lyrMap, g.attributes.id),
            );
            removeGraphics(newState, existGraphics);
            newState.graphics = [...newState.graphics, ...graphics]
        }

        const removeGraphics = (newState, rmGraphics) => {
            const rmGraphicsIds = _.map(rmGraphics, g =>
                _.isString(g) ? g : g.attributes.id,
            );
            newState.graphics = _.filter(
                newState.graphics,
                g => !_.includes(rmGraphicsIds, g.attributes.id),
            );
        };

        const removeAllGraphics = (newState: StateType) => {
            newState.graphics = [];
        };

        const { actionKeys } = this;
        const baseReducer = super.genReducer();

        return (state, action) => 
            produce(state, newState => {
                newState = baseReducer(newState, action);
                const { type } = action;
                switch (type) {
                case actionKeys.ADD:
                    addGraphics(newState, action.graphics);
                    break;
                case actionKeys.REMOVE:
                    removeGraphics(newState, action.graphics);
                    break;
                case actionKeys.REMOVE_ALL:
                    removeAllGraphics(newState);
                    break;
                    default:
                        break;
                }
                return newState;
            })
    }

    add(graphics){
        const { dispatch } = this.context
        return dispatch({
            type: this.actionKeys.ADD,
            graphics,
        })
    }

    remove(graphics){
        const { dispatch } = this.context
        return dispatch({
            type: this.actionKeys.REMOVE,
            graphics,
        })
    }

    removeAll(){
        const { dispatch } = this.context
        return dispatch({
            type: this.actionKeys.REMOVE_ALL
        })
    }
}

export default GraphicsFeature;