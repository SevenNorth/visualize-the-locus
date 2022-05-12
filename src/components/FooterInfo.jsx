import React from 'react'
import styled from 'styled-components';
import { useWidgets } from '../utils'

const defaultWidgets = {
    Container: styled.div`
        background-color: rgba(0, 0, 0, 0.4);
        height: 1.2rem;
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
        font-size: 0.8rem;
        line-height: 1.2rem;
        text-align: center;
        a {
            color: #333;
            &:link, &:visited{
                color: #333;
            }
            &:hover, &:active{
                color: #eee;
            }
        }
    `,
};

const className = 'FooterInfo';

const FooterInfo = (props) => {

    const widgets = useWidgets(
        className,
        defaultWidgets,
    );
    const { Container } = widgets;
    return (
        <Container>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">蜀ICP备20011108号-1</a>
        </Container>
    )
}

export default FooterInfo