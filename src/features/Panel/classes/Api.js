import axios from "axios";
import queryString from 'query-string';
import _ from "lodash";

import BaseApi from "../../../base/BaseApi";
import initMockFn from './mock/mock';

class Api extends BaseApi {
    static defaultProps = {
        mock: false,
        baseUrl: '/set-mock-true-or-define-inherit-api/',
        routes: {},
    }

    static mockBaseUrl = '/mock-template-feature-sample';
    static initMockFn = initMockFn;
    async getTracksList (params){
        const { baseUrl, routes } = this.props;
        const res = await axios({
            url: `${baseUrl}/${routes.getTracksList}?${queryString.stringify(params)}`,
            method: 'get',
        });
        this.handleError(res);
        const flatData = this.buildFlatData(res.data.data);
        return flatData;
    }

    buildFlatData(data){
        const flatData = [];
        _.each(data, dateObj => {
            // 新闻发布日期
            const dateNode = {
                title: dateObj.date,
                key: dateObj.date + '-date-node',
                checkable: false,
                source: dateObj.data.source,
                preKey: '-1'
            };
            flatData.push(dateNode);
            _.each(dateObj.data.patientsList, patient => {
                const patientNode = {
                    title: patient.nickname,
                    preKey: dateNode.key,
                    key: dateNode.key + '-' + patient.nickname + '-patient-node',
                    sourceKey: dateNode.key,
                    province: patient.province,
                    city: patient.city,
                    type: patient.type,
                    checkable: true,
                };
                flatData.push(patientNode);
                _.each(patient.tracksList, trackDate => {
                    const trackDateNode = {
                        title: trackDate.date,
                        preKey: patientNode.key,
                        key: patientNode.key + trackDate.date + '-track-date-node',
                        sourceKey: dateNode.key,
                        checkable: true,
                    };
                    flatData.push(trackDateNode);
                    _.each(trackDate.track, track => {
                        const title = track.type === 'point' ? track.address : track.path[0].address + '→' + track.path[1].address;
                        const trackNode = {
                            title,
                            preKey: trackDateNode.key,
                            key: trackDateNode.key + track.time + title + '-track-detail-node',
                            sourceKey: dateNode.key,
                            checkable: true,
                            track: track,
                        };
                        flatData.push(trackNode)
                    })
                })
            })
        })
        return flatData;
    }
}

export default Api;