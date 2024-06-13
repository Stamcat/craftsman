const Path = require('path');
const AppSourceDir = Path.join(__dirname, '..', 'src');

module.exports = ({ config }) => {
// annoying. but we have to remove the svg test from existing rules
const rules = config?.module?.rules;
if (rules) {
    // removes svg from existing rules
    const fileLoaderRule = rules.find((rule) =>
        rule.test?.test?.('.svg'),
    )
    // remove svg from all existing rules
    rules.forEach((rule) => {
        if (rule.test) {
            const val = rule.test.toString();
            if (val.includes('svg')) {
                const newVal = val.replace('|svg', '');
                rule.test = new RegExp(newVal);
            }
        }
    });
    rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            resourceQuery: { not: /url/ }, // exclude if *.svg?url
            use: ['@svgr/webpack'],
        },
        // fonts
        {
            test: [/\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/],
            use: [
                {
                    loader: require.resolve("file-loader"),
                    options: {
                        exportOnlyLocals: true,
                        // exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        name: "static/media/[name].[hash:8].[ext]",
                    },
                },
            ],
        },
        // url loader
        {
            loader: require.resolve("url-loader"),
            options: {
                limit: 10000,
                esModule: false,
                name: "static/media/[name].[hash:8].[ext]"
            },
            test: /\.(bmp|gif|ico|jpg|jpeg|png)$/i
            //test: [/\.bmp$/, /\.gif$/, /\.ico$/, /\.jpe?g$/, /\.png$/]
        },
    )
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i
    // for some reason svg and url rules need to be at the top
    rules.unshift({
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
    });

}
    return config;
};
