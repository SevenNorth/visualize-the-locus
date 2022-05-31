import React, { useState, useEffect } from 'react'
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DatePicker, Divider, Spin, Tree, Empty } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';

import './index.less';
import { useWidgets, getTree } from '../../../utils'
import BasePanel from '../../../components/BasePanel';

const defaultWidgets = {
    Container: styled.div`
    `,
    SpinWrapper: styled.div`
    `,
    DatePickerWrapper: styled.div`
    `
};


const className = 'LeftPanel';
const trackDetailNodeFlag = 'track-detail-node';

const LeftPanel = (props) => {

    const widgets = useWidgets(
        className,
        defaultWidgets,
    );
    const { Container, SpinWrapper, DatePickerWrapper } = widgets;
    const { getTracksList, flatTrackList, isFetching, clearTracksList, addGraphics } = props;

    const [checkedKeys, setCheckedKeys] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [treeData, setTreeData] = useState(null);

    useEffect(() => {
        if (startDate || endDate) {
            const startDateStr = startDate?.format('YYYY-MM-DD');
            const endDateStr = endDate?.format('YYYY-MM-DD');
            getTracksList({
                startDate: startDateStr,
                endDate: endDateStr,
            })
        }
        if (!startDate && !endDate) {
            clearTracksList()
        }

        return () => {
            clearTracksList()
        }
    }, [startDate, endDate, getTracksList, clearTracksList])

    useEffect(() => {
        if(flatTrackList){
            const newTreeData = getTree('-1', flatTrackList);
            setTreeData(newTreeData);
        }
    }, [flatTrackList])

    useEffect(() => {
        const trackDetailNodeKeys = _.filter(checkedKeys, checkedKey => _.endsWith(checkedKey, trackDetailNodeFlag))
        const trackDetailNodes = _.filter(flatTrackList,track => _.includes(trackDetailNodeKeys, track.key))
        console.log("🚀-fjf : trackDetailNodes", trackDetailNodes)
        const graphicsList = []
        _.each(trackDetailNodes, trackDetailNode => {
            const {track} = trackDetailNode;
            if(track.type === 'point'){
                const pointGraphics = {
                    attributes: {
                        id: trackDetailNode.key,
                        address: trackDetailNode.title,
                    },
                    geometry: {
                        type: 'point',
                        x: track.x,
                        y: track.y,
                    },
                }
                graphicsList.push(pointGraphics);
            }else if(track.type === 'polyline'){
                const polylineGraphics = {
                    attributes: {
                        id: trackDetailNode.key,
                        address: trackDetailNode.title,
                    },
                    geometry: {
                        type: 'polyline',
                        paths: [
                            [track.path[0].x, track.path[0].y],
                            [track.path[1].x, track.path[1].y]
                        ]
                    }
                }
                graphicsList.push(polylineGraphics)
            } 
        })
        addGraphics(graphicsList)
    }, [addGraphics, checkedKeys, flatTrackList])

    const onStartDateChange = (date) => {
        setStartDate(date);
    }

    const onEndDateChange = (date) => {
        setEndDate(date);
    }

    const startDisabledDate = (current) => {
        return endDate && current && current.isAfter(endDate);
    };

    const endDisabledDate = (current) => {
        return startDate && current && current.isBefore(startDate);
    };

    const renderDateRangePicker = () => {
        return (
            <DatePickerWrapper>
                <DatePicker
                    value={startDate}
                    suffixIcon={null}
                    onChange={onStartDateChange}
                    disabledDate={startDisabledDate}
                />
                <SwapRightOutlined />
                <DatePicker
                    value={endDate}
                    suffixIcon={null}
                    onChange={onEndDateChange}
                    disabledDate={endDisabledDate}
                />
            </DatePickerWrapper>
        )
    }

    const renderEmpty = () => {
        if (treeData) {
            return null;
        }
        return (
            <Empty />
        )
    }

    // tree相关方法
    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };

    const onSelectHandler = (keys, { selectedNodes }) => {
        const existExpanded = _.includes(expandedKeys, keys[0]);
        const newExpandedKeys = existExpanded ? _.filter(expandedKeys, key => key !== keys[0]) : [...expandedKeys, keys[0]];
        setExpandedKeys(newExpandedKeys);
        if(selectedNodes[0].track){
            const existCkecked = _.includes(checkedKeys, keys[0]);
            const newCheckedKeys = existCkecked ? _.filter(checkedKeys, key => key !== keys[0]) : [...checkedKeys, keys[0]];
            setCheckedKeys(newCheckedKeys);
        }
    };

    const onExpandHandler = (keys, info) => {
        const { expanded, node: { key: nodeKey } } = info;
        const newExpandedKeys = expanded ? [...expandedKeys, nodeKey] : _.filter(expandedKeys, key => key !== nodeKey);
        setExpandedKeys(newExpandedKeys)
    };

    // 滚动条
    const renderThumb = () => {
        const thumbStyle = { // 设置滚动条样式
            backgroundColor: '#aaa',
            borderRadius: '4px'
        }
        return <div style={{ ...thumbStyle }} />
    }

    const renderTree = () => {
        return !isFetching ? (
            <Scrollbars
                className='Scrollbars-for-Tree'
                renderThumbVertical={renderThumb}
                autoHide
                autoHideTimeout={500}
            >
                <Tree
                    rootClassName="LeftPanel-CheckableTree"
                    checkable
                    blockNode
                    selectable
                    checkedKeys={checkedKeys}
                    selectedKeys={[]}
                    expandedKeys={expandedKeys}
                    treeData={treeData}
                    onCheck={onCheck}
                    onSelect={onSelectHandler}
                    onExpand={onExpandHandler}
                />
            </Scrollbars>
        ) : <SpinWrapper>
            <Spin />
        </SpinWrapper>
    }

    return (
        <Container>
            <BasePanel title='病例列表' >
                {renderDateRangePicker()}
                <Divider />
                {renderEmpty()}
                {renderTree()}
            </BasePanel>
        </Container>
    )
}

const connectLeftPanel = (panelFeature, graphicsFeature) => {
    return connect(
        () => {
            const panelState = panelFeature.getOwnState();
            const { getTracksListRequest: { status: { isFetching }, data: flatTrackList } } = panelState;
            return {
                isFetching,
                flatTrackList
            }
        },
        () => {
            return {
                getTracksList: _.debounce((pramas) => {
                    panelFeature.getTracksListRequest.execute(pramas);
                }, 500),
                clearTracksList: () => {
                    panelFeature.getTracksListRequest.clear();
                },
                addGraphics: (graphics) => {
                    graphicsFeature.add(graphics);
                }
            }
        }
    )(LeftPanel);
}

export { connectLeftPanel }

export default React.memo(LeftPanel)