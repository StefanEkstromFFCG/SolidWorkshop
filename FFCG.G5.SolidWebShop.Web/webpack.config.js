/*
 * Webpack (JavaScriptServices) with a few changes & updates
 * - This is to keep us inline with JSServices, and help those using that template to add things from this one
 *
 * Things updated or changed:
 * module -> rules []
 *    .ts$ test : Added 'angular2-router-loader' for lazy-loading in development
 *    added ...sharedModuleRules (for scss & font-awesome loaders)
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { sharedModuleRules } = require('./webpack.additions');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        context: __dirname,
        resolve: { extensions: [ '.js', '.ts' ] },
        output: {
            filename: '[name].js',
            publicPath: 'dist/'
        },
        module: {
            rules: [
                { test: /\.ts$/, use: isDevBuild ? ['awesome-typescript-loader?silent=true', 'angular2-template-loader', 'angular2-router-loader'] : '@ngtools/webpack' },
                { test: /\.html$/, use: 'html-loader?minimize=false' },
                { test: /\.css$/, use: [ 'to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize' ] },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
                ...sharedModuleRules
            ]
        },
        plugins: [new CheckerPlugin()]
    };

    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig, {
        entry: { 'main-client': './ClientApp/boot.browser.ts' },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]')
            })
        ] : [
            new webpack.optimize.UglifyJsPlugin(),
            new AotPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: path.join(__dirname, 'ClientApp/app/app.module.browser#AppModule'),
                exclude: ['./**/*.server.ts']
            })
        ])
    });

    const serverBundleConfig = merge(sharedConfig, {
        entry: { 'main-server': './ClientApp/boot.server.ts' },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./ClientApp/dist/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin({
              compress: false,
              mangle: false
            }),
            new AotPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: path.join(__dirname, 'ClientApp/app/app.module.server#AppModule'),
                exclude: ['./**/*.browser.ts']
            })
        ]),
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: isDevBuild ? 'inline-source-map': false
    });

    return [clientBundleConfig, serverBundleConfig];
};
