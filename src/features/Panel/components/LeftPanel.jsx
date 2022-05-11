import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';

import './index.less';
import { useWidgets } from '../../../utils'
import BasePanel from '../../../components/BasePanel';

import { graphics } from '../../../redux';


const defaultWidgets = {
    Container: styled.div`
    `,
};

const className = 'LeftPanel';

const LeftPanel = (props) => {

    const { addGraphics } = props;

    const widgets = useWidgets(
        className,
        defaultWidgets,
    );
    const { Container } = widgets;

    return (
        <Container>
            <BasePanel >
            <button
                onClick={()=>{
                    const g = {
                        attributes: {
                            id: 'xxxxx' // 必须
                        },
                        geometry: {
                            type: "polyline",  // autocasts as new Polyline()
                            paths: [
                                [
                                    103.91830444335938,
                                    30.668628397433356
                                ],
                                [
                                    104.12979125976562,
                                    30.38235321766959
                                ],
                                [
                                    104.48135375976562,
                                    30.38472258144958
                                ],
                                [
                                    104.63653564453125,
                                    30.68870689937537
                                ]
                            ]
                        },
                        symbol: {
                            type: "simple-line",  // autocasts as SimpleLineSymbol()
                            color: [255, 0, 0],
                            width: 4
                        }
                    }
                    addGraphics([g])
                }}
            >
                add
            </button>
            <button
                onClick={()=>{

                }}
            >
                rm
            </button>
            </BasePanel>
        </Container>
    )
}

const connectedLeftPanel = connect(
    state => {
        return {}
    },
    dispatch => {
        return {
            addGraphics: (g)=>{
                dispatch(graphics.add(g))
            }
        }
    }
    )(LeftPanel)

export default React.memo(connectedLeftPanel)