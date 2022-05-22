import _ from 'lodash';
class BaseApi {
    static defaultProps = {
        mock: false,
        baseUrl: '/set-mock-true-or-define-inherit-api/',
        routes: {},
    };

    static mockBaseUrl = '/define-mock-url/';
    static initMockFn;
    constructor(props) {
        const { defaultProps, initMockFn, mockBaseUrl } = this.constructor;
        this.props = _.defaultsDeep({}, props, defaultProps);
        if (this.props.mock && initMockFn) {
            this.props.baseUrl = mockBaseUrl;
            initMockFn({ baseUrl: mockBaseUrl });
        }
    }
    
    handleError(response: AxiosResponse): void {
        const {
            data: { code, message },
        } = response;
        const msg = `(${code})${message}`;
        if (code !== 200) {
            const error = new Error(msg);
            throw error;
        }
    }
}
export default BaseApi;
