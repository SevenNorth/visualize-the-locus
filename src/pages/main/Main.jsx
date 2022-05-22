import styled from 'styled-components';
import { useWidgets } from '../../utils'
import LeftPanel from '../../features/Panel/components/LeftPanel';
import FooterInfo from '../../components/FooterInfo';

import fm from '../../redux';

const defaultWidgets = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
  `
}
const className = 'MainPage'
const Main = () => {
  const widgets = useWidgets(className, defaultWidgets);
  const view = fm.getFeature('VIEW');

  const { Container } = widgets;
  return <Container>
    <view.components.BaseView />
    <LeftPanel />
    <FooterInfo />
  </Container>;
}

export default Main;
