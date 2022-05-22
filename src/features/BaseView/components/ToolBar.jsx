import React from 'react';
import styled from 'styled-components';
import './index.less';
import { useWidgets } from '../../../utils';
import { connect } from 'react-redux';

const defaultWidgets = {
    Container: styled.div`
    `,
};

const className = 'map_ToolBar';
const ToolBar = (props) => {
    const widgets = useWidgets(
        className,
        defaultWidgets,
        props.widgets
    );
    const { Container, SceneSwitch, BasemapSwitchPopover } = widgets;
    return (
        <Container>
            <SceneSwitch />
            <BasemapSwitchPopover />
        </Container>
    );
};

const connectToolBar = (viewFeature) => {
    return connect(
        ()=>{
            const widgets = {
                SceneSwitch: viewFeature.components.SceneSwitch,
                BasemapSwitchPopover: viewFeature.components.BasemapSwitchPopover,
            }
            return {
                widgets
            }
        },
        () => {
            return {};
        }
    )(ToolBar)
}

export { connectToolBar }

export default React.memo(ToolBar);