import React from 'react';
import styled from 'styled-components';
import './index.less';
import { useWidgets } from '../../../utils';
import SceneSwitch from './SceneSwitch';
import BasemapSwitchPopover from './BasemapSwitchPopover';

const defaultWidgets = {
    Container: styled.div`
    `,
};

const className = 'map_ToolBar';
const ToolBar = (props) => {
    const widgets = useWidgets(
        className,
        defaultWidgets,
    );
    const { Container } = widgets;
    return (
        <Container>
            <SceneSwitch />
            <BasemapSwitchPopover />
        </Container>
    );
};


export default React.memo(ToolBar);