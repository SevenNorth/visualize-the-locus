import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { Tabs } from 'antd';

import './index.less';
import { useWidgets } from '../../../utils'
import BasePanel from '../../../components/BasePanel';


const defaultWidgets = {
    Container: styled.div`
    `,
};

const className = 'LeftPanel';

const LeftPanel = (props) => {

    const widgets = useWidgets(
        className,
        defaultWidgets,
    );
    const { Container } = widgets;

    return (
        <Container>
            <BasePanel >
            </BasePanel>
        </Container>
    )
}

const connectedLeftPanel = connect(
    state => {
        return {}
    },
    dispatch => {
        return {}
    }
    )(LeftPanel)

export default React.memo(connectedLeftPanel)