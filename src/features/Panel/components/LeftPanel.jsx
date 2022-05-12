import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DatePicker, Divider } from 'antd';

import './index.less';
import { useWidgets } from '../../../utils'
import BasePanel from '../../../components/BasePanel';

import { graphics } from '../../../redux';

const { RangePicker } = DatePicker;


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
                <RangePicker />
                <Divider />

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
        }
    }
    )(LeftPanel)

export default React.memo(connectedLeftPanel)