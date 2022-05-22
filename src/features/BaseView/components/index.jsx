import React from 'react';
import './index.less'
import styled from 'styled-components';
import { useWidgets } from '../../../utils'
import { connect } from 'react-redux';
import SceneView from './SceneView';
import MapView from './MapView';
import { useBasemap } from '../hooks';
import ToolBar from './ToolBar';
import fm from '../../../redux';

const view = fm.getFeature('VIEW');

const defaultWidgets = {
  Container: styled.div`
  `,
}

const BaseView = (props) => {
  const { isScene } = props;
  const widgets = useWidgets('BaseView', defaultWidgets)

  const { Container } = widgets;

  useBasemap(props);

  return <Container>
    { isScene ? <SceneView /> : <MapView /> }
    <ToolBar />
  </Container>;
}

const connectedBaseView = connect(
  state => {
    const viewState = view.getOwnState();
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