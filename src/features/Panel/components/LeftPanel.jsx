import React, { useState, useEffect } from 'react'
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DatePicker, Divider, Empty, Tree } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import './index.less';
import { useWidgets } from '../../../utils'
import BasePanel from '../../../components/BasePanel';

// import { graphics } from '../../../redux';

const { RangePicker } = DatePicker;


const defaultWidgets = {
    Container: styled.div`
    `,
};

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        checkable: false,
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                checkable: false,
                children: [
                    { title: '0-0-0-0', key: '0-0-0-0', selectable: false },
                    { title: '0-0-0-1', key: '0-0-0-1', selectable: false },
                    { title: '0-0-0-2', key: '0-0-0-2', selectable: false },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                checkable: false,

                children: [
                    { title: '0-0-1-0', key: '0-0-1-0', selectable: false },
                    { title: '0-0-1-1', key: '0-0-1-1', selectable: false },
                    { title: '0-0-1-2', key: '0-0-1-2', selectable: false },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
                checkable: false,
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        checkable: false,

        children: [
            { title: '0-1-0-0', key: '0-1-0-0', selectable: false },
            { title: '0-1-0-1', key: '0-1-0-1', selectable: false },
            { title: '0-1-0-2', key: '0-1-0-2', selectable: false },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
        checkable: false,
    },
    {
        title: '0-3',
        key: '0-3',
        checkable: false,

        children: [
            { title: '0-3-0-0', key: '0-3-0-0', selectable: false },
            { title: '0-3-0-1', key: '0-3-0-1', selectable: false },
            { title: '0-3-0-2', key: '0-3-0-2', selectable: false },
        ],
    },
    {
        title: '0-4',
        key: '0-4',
        checkable: false,

        children: [
            { title: '0-4-0-0', key: '0-4-0-0', selectable: false },
            { title: '0-4-0-1', key: '0-4-0-1', selectable: false },
            { title: '0-4-0-2', key: '0-4-0-2', selectable: false },
        ],
    },
    {
        title: '0-5',
        key: '0-5',
        checkable: false,

        children: [
            { title: '0-5-0-0', key: '0-5-0-0', selectable: false },
            { title: '0-5-0-1', key: '0-5-0-1', selectable: false },
            { title: '0-5-0-2', key: '0-5-0-2', selectable: false },
        ],
    },
    {
        title: '0-6',
        key: '0-6',
        checkable: false,

        children: [
            { title: '0-6-0-0', key: '0-6-0-0', selectable: false },
            { title: '0-6-0-1', key: '0-6-0-1', selectable: false },
            { title: '0-6-0-2', key: '0-6-0-2', selectable: false },
        ],
    },
    {
        title: '0-7',
        key: '0-7',
        checkable: false,

        children: [
            { title: '0-7-0-0', key: '0-7-0-0', selectable: false },
            { title: '0-7-0-1', key: '0-7-0-1', selectable: false },
            { title: '0-7-0-2', key: '0-7-0-2', selectable: false },
        ],
    },
    {
        title: '0-8',
        key: '0-8',
        checkable: false,

        children: [
            { title: '0-8-0-0', key: '0-8-0-0', selectable: false },
            { title: '0-8-0-1', key: '0-8-0-1', selectable: false },
            { title: '0-8-0-2', key: '0-8-0-2', selectable: false },
        ],
    },
    {
        title: '0-9',
        key: '0-9',
        checkable: false,

        children: [
            { title: '0-9-0-0', key: '0-9-0-0', selectable: false },
            { title: '0-9-0-1', key: '0-9-0-1', selectable: false },
            { title: '0-9-0-2', key: '0-9-0-2', selectable: false },
        ],
    },
    {
        title: '0-A',
        key: '0-A',
        checkable: false,

        children: [
            { title: '0-A-0-0', key: '0-A-0-0', selectable: false },
            { title: '0-A-0-1', key: '0-A-0-1', selectable: false },
            { title: '0-A-0-2', key: '0-A-0-2', selectable: false },
        ],
    },
];

const className = 'LeftPanel';

const LeftPanel = (props) => {

    const widgets = useWidgets(
        className,
        defaultWidgets,
    );
    const { Container } = widgets;

    const [checkedKeys, setCheckedKeys] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [dateRange, setDateRange] = useState([]);

    useEffect(() => {
    console.log("🚀-fjf : dateRange", dateRange);
        
    }, [dateRange])
    

    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };

    const onSelectHandler = (keys) => {
        const exist = _.includes(expandedKeys, keys[0])
        const newExpandedKeys = exist ? _.filter(expandedKeys, key => key !== keys[0]) : [...expandedKeys, keys[0]]
        setExpandedKeys(newExpandedKeys)
    };

    const onExpandHandler = (keys, info) => {
        const { expanded, node: { key: nodeKey } } = info;
        const newExpandedKeys = expanded ? [...expandedKeys, nodeKey] : _.filter(expandedKeys, key => key !== nodeKey);
        setExpandedKeys(newExpandedKeys)
    };

    const onDateRangeChage = (date) => {
        setDateRange(date)
    }

    const renderDateRangePicker = () => {
        return (
            <RangePicker
                value = { dateRange }
                onChange = {onDateRangeChage}
            />
        )
    }

    const renderEmpty = () => {
        return (
            <Empty />
        )
    }

    // 滚动条
    const renderThumb = () => {
        const thumbStyle = { // 设置滚动条样式
            backgroundColor: '#aaa',
            borderRadius: '4px'
        }
        return <div style={{ ...thumbStyle }} />
    }

    const renderTree = () => {
        return (
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
        )
    }

    return (
        <Container>
            <BasePanel title='病例列表' >
                { renderDateRangePicker() }
                <Divider />
                { renderEmpty() }
                { renderTree() }
            </BasePanel>
        </Container>
    )
}

const connectedLeftPanel = connect(
    state => {
        return {}
    },
    dispatch => {
        return {
        }
    }
)(LeftPanel)

export default React.memo(connectedLeftPanel)