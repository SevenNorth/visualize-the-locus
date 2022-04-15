import React from 'react';
import _ from 'lodash';
import './index.less'
import styled from 'styled-components';
import { useWidgets } from '../../../utils'
import { connect } from 'react-redux';
import SceneView from './SceneView';
import { view } from '../../../redux';
import MapView from './MapView';
import { useLayers, useBasemap } from '../common';
import ToolBar from './ToolBar';

const defaultWidgets = {
  Container: styled.div`
  `,
}

const BaseView = (props) => {
  const { isScene } = props;
  const widgets = useWidgets('BaseView', defaultWidgets)

  const { Container } = widgets;

  useBasemap(props);
  useLayers(props);

  return <Container>
    { isScene ? <SceneView /> : <MapView /> }
    {/* <Button style={{
      position: 'absolute',
      top: 0,
      left: 0,
    }} onClick={() => add({
        id: 'testLyr',
        title: '测试图层',
        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/flash_flood_warnings_2002_2012/FeatureServer/0',
        layerType: 'FeatureLayer',
    })}>
      添加图层
    </Button> */}
    <ToolBar />
  </Container>;
}

const connectedBaseView = connect(
  state => {
    const viewState = _.get(state, view.featureKey);
    const { isScene, basemap } = viewState;
    const map = view.map;
    return {
      isScene,
      map,
      basemap,
    }
  },
  )(BaseView)

export default React.memo(connectedBaseView);