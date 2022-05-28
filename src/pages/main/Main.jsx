import styled from 'styled-components';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

import { useWidgets } from '../../utils'
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
  const panel = fm.getFeature('PANEL');

  const { Container } = widgets;
  return (
    <ConfigProvider locale={locale}>
      <Container>
        <view.components.BaseView />
        <panel.components.LeftPanel />
        <FooterInfo />
      </Container>
  </ConfigProvider>
  );
}

export default Main;
