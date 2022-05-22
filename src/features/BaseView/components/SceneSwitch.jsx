import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'antd';
import './index.less';
import { useWidgets } from '../../../utils'

const defaultWidgets: WidgetsType = {
    Container: styled.div`
    `,
};
const className = 'map_SceneSwitch';
const SceneSwitch = (props: PropsType) => {
    const widgets = useWidgets(
        className,
        defaultWidgets,
    );
    const { isScene, handleChange } = props;
    const { Container } = widgets;
    return (
        <Container>
            <Button
                title="切换二三维"
                onClick={() => {
                    handleChange(!isScene);
                }}
            >
                {isScene ? '3D' : '2D'}
            </Button>
        </Container>
    );
};
const connectSceneSwitch = (viewFeature) => {
    return connect(
        state => {
            const viewState = viewFeature.getOwnState();
            const { isScene } = viewState;
            return {
                isScene,
            };
        },
        dispatch => {
            return {
                handleChange: (isScene) => {
                    viewFeature.setIsScene(isScene);
                },
            };
        },
    )(SceneSwitch);
}

export {
    connectSceneSwitch
}

export default React.memo(SceneSwitch);
