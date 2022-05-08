import React from 'react'
import styled from 'styled-components';
import { useWidgets } from '../utils'

const defaultWidgets = {
    Container: styled.div`
        background-color: rgba(0, 0, 0, 0.5);
        padding: 0.5rem;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
    `,
};

const className = 'BasePanel';

const BasePanel = (props) => {

    const widgets = useWidgets(
        className,
        defaultWidgets,
    );
    const { Container } = widgets;
    return (
        <Container>
            {
                props.children
            }
        </Container>
    )
}

export default BasePanel