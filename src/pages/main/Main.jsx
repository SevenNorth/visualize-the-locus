import styled from 'styled-components';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

import { useWidgets } from '../../utils'
import LeftPanel from '../../features/Panel/components/LeftPanel';
import FooterInfo from '../../components/FooterInfo';
import fm from '../../redux';

import ReactGA from 'react-ga';
import { useEffect } from 'react';

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

  useEffect(() => {
    ReactGA.initialize('');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])
  

  const { Container } = widgets;
  return (
    <ConfigProvider locale={locale}>
      <Container>
        <view.components.BaseView />
        <LeftPanel />
        <FooterInfo />
      </Container>
  </ConfigProvider>
  );
}

export default Main;
