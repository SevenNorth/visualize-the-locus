const CracoLessPlugin = require('craco-less');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const _ = require('lodash')
// const path = require('path')

// const extraConfigFiles = ['baseCfg.js']

module.exports = {
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {
                        '@primary-color': '#fff',
                        '@text-color': '#fff',
                        '@calendar-bg': "rgba(0,0,0,0.8)",
                        "@input-border-color": '#fff',
                        "@component-background":'rgba(0,0,0,0.8)',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    }, ],
    // webpack: {
    //     configure: (webpackConfig) => {
    //         const { publicPath } = webpackConfig.output;
    //         const htmlWebpackPlugin = _.find(webpackConfig.plugins, plugin =>  plugin instanceof HtmlWebpackPlugin);
    //         _.each(extraConfigFiles, fileName => {
    //             if(htmlWebpackPlugin.userOptions.scripts){
    //                 htmlWebpackPlugin.userOptions.scripts.push({
    //                     path: publicPath + 'config/',
    //                     file: `${fileName}?version=1.0.0`,
    //                 });
    //             }else{
    //                 htmlWebpackPlugin.userOptions.scripts = [{
    //                     path: publicPath + 'config/',
    //                     file: `${fileName}?version=1.0.0`,
    //                 }];
    //             };
    //             webpackConfig.plugins.push(
    //                 new CopyPlugin({
    //                     patterns: [
    //                         {
    //                             from: path.resolve(__dirname, 'src/config', fileName),
    //                             to: path.resolve(publicPath, 'build/config', fileName),
    //                         },
    //                     ],
    //                 }),
    //             );
    //         });
    //         return webpackConfig;
    //     }
    // }
};