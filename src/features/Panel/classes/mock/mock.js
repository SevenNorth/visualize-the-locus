import Mock from "mockjs";
import data20220513 from './2022-5-13.json';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    Mock.mock(/\/mock-template-feature-sample\/getTracksList([^/]*)/, 'get',
        (opt) => {
            return {
                data: [
                    {
                        date: '2022-05-13',
                        data: data20220513,
                    }
                ],
                code: 200,
                message: '',
            };
        });
};