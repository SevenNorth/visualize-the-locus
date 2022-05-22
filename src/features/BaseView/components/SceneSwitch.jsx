import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'antd';
import './index.less';
import { useWidgets } from '../../../utils'
import fm from '../../../redux';

const view = fm.getFeature('VIEW');

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
const connectedSceneSwitch = connect(
    state => {
        const viewState = view.getOwnState();
        const { isScene } = viewState;
        return {
            isScene,
        };
    },
    dispatch => {
        return {
            handleChange: (isScene) => {
                dispatch(view.setIsScene(isScene));
            },
        };
    },
)(SceneSwitch);
export default React.memo(connectedSceneSwitch);
