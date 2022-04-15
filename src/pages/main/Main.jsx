import styled from 'styled-components';
import { useWidgets } from '../../utils'
import BaseView from '../../features/BaseView/components/index';

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
  </Container>;
}

export default Main;
