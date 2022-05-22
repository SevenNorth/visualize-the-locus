import axios from "axios";
import queryString from 'query-string';

import BaseApi from "../../../base/BaseApi";

class Api extends BaseApi {
    static defaultProps = {
        mock: false,
        baseUrl: '/set-mock-true-or-define-inherit-api/',
        routes: {},
    }

    async getTracksList (params){
        const { baseUrl, routes } = this.props;
        const res = await axios({
            url: `${baseUrl}/${routes.getTracksList}?${queryString.stringify(params)}`,
            method: 'get',
        });
        this.handleError(res);
        return res.data.data;
    }
}

export default Api;