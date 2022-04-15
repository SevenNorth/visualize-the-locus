import _ from 'lodash';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Popover } from 'antd';
import './index.less';
import { useWidgets } from '../../../utils'
import { view } from '../../../redux';
import baseCfg from '../../../config/baseCfg';

const defaultWidgets = {
    Container: styled.div`
    `,
};

const className = 'map_BasemapSwitchPopover';
const BasemapSwitchPopover = (props) => {
    const [visible, setVisible] = useState(false)
    const widgets = useWidgets(
        className,
        defaultWidgets,
    );
    const { basemaps, current, handleChange } = props;
    const { Container } = widgets;
    return (
        <Container>
            <Popover
                trigger='click'
                overlayClassName="map_ToolbarOverlay"
                placement='left'
                visible={visible}
                onVisibleChange={setVisible}
                content={
                    _.map(basemaps, basemap => {
                        const isActive = current?.id === basemap.id;
                        const { title } = basemap;
                        return (
                            <Button
                                key={basemap.id}
                                title={title}
                                className={isActive ? 'active' : ''}
                                onClick={() => {
                                    setVisible(false);
                                    handleChange(basemap);
                                }}
                                ghost
                            >
                                { basemap.title }
                            </Button>
                        );
                    })
                }
            >
                <Button ghost>{current.title}</Button>
            </Popover>
        </Container>
    );
};

const connectedBasemapSwitchPopover = connect(
    state => {
        const viewState = _.get(state, view.featureKey);
        const { basemap } = viewState;
        return {
            basemaps: baseCfg.basemaps,
            current: basemap,
        }
    },
    dispatch => {
        return {
            handleChange: (basemap) => {
                dispatch(view.setBaseMap(basemap));
            }
        }
    }
)(BasemapSwitchPopover);

export default React.memo(connectedBasemapSwitchPopover);