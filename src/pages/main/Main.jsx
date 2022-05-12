import styled from 'styled-components';
import { useWidgets } from '../../utils'
import BaseView from '../../features/BaseView/components/index';
import LeftPanel from '../../features/Panel/components/LeftPanel';
import FooterInfo from '../../components/FooterInfo';

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

  const { Container } = widgets;
  return <Container>
    <BaseView />
    <LeftPanel />
    <FooterInfo />
  </Container>;
}

export default Main;
