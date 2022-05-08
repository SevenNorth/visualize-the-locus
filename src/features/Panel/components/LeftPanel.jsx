import React from 'react'
import styled from 'styled-components';
import { Button, Popover } from 'antd';
import { connect } from 'react-redux';

import './index.less';
import { useWidgets } from '../../../utils'
import BasePanel from '../../../components/BasePanel';
import { layers } from '../../../redux';

const defaultWidgets = {
    Container: styled.div`
    `,
};

const className = 'LeftPanel';

const LeftPanel = (props) => {

    const { addLayers, removeLayers } = props;

    const widgets = useWidgets(
        className,
        defaultWidgets,
    );
    const { Container } = widgets;

    return (
        <Container>
            <BasePanel >
            <Button 
                onClick={()=>{
                    addLayers([{
                        id: 'test-lyr',
                        layerType: 'FeatureLayer',
                        title: 'Cities',
                        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0'
                    }])
                }}
            >添加图层</Button>
            <Button 
                onClick={()=>{
                    removeLayers(['test-lyr'])
                }}
            >移除图层</Button>
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
            addLayers: (lyrs) => {
                dispatch(layers.add(lyrs))
            },
            removeLayers: (lyrs) => {
                dispatch(layers.rmLayers(lyrs))
            },
        }
    }
    )(LeftPanel)

export default React.memo(connectedLeftPanel)