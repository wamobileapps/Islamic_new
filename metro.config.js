/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
//  const { getDefaultConfig } = require('metro-config');

// module.exports  = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig();

//   return {

//   transformer: {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     getTransformOptions:  () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },

//   dependencies: {
//     'react-native-video': {
//       platforms: {
//         android: {
//           sourceDir: null,
//         },
//       },
//     },
//   },

//   resolver: {
//     assetExts: assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...sourceExts, 'svg'],
//   }
// }

// })();

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

// module.exports = (async () => {
  
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== 'svg'),
//       sourceExts: [...sourceExts, 'svg'],
//     },
//   };
// })();
