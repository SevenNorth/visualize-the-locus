import React from 'react';
import './index.less'
import styled from 'styled-components';
import { useWidgets } from '../../../utils'
import { connect } from 'react-redux';
import { useBasemap } from '../hooks';

const defaultWidgets = {
  Container: styled.div`
  `,
}

const BaseView = (props) => {
  const { isScene } = props;
  const widgets = useWidgets('BaseView', defaultWidgets, props.widgets)

  const { Container, MapView, SceneView, ToolBar } = widgets;

  useBasemap(props);

  return <Container>
    { isScene ? <SceneView /> : <MapView /> }
    <ToolBar />
  </Container>;
}

const connectBaseView = (viewFeature) => {
  return connect(
    state => {
      const widgets = {
        SceneView: viewFeature.components.SceneView,
        MapView: viewFeature.components.MapView,
        ToolBar: viewFeature.components.ToolBar
      }
      const viewState = viewFeature.getOwnState();
      const { isScene, basemap } = viewState;
      const map = viewFeature.map;
      return {
        widgets,
        isScene,
        map,
        basemap,
      }
    },
    )(BaseView)
}

export { connectBaseView }

export default React.memo(BaseView);