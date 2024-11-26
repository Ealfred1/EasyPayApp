const { getDefaultConfig } = require("expo/metro-config");
const { mergeConfig } = require("metro-config");

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);

  // Modify asset extensions for SVG
  defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
    (ext) => ext !== "svg"
  );
  defaultConfig.resolver.sourceExts.push("svg");

  // Add custom transformer for SVG
  defaultConfig.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer"
  );

  // Additional configuration for hashing assets
  const customConfig = {
    transformer: {
      assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    },
  };

  // Merge default and custom configurations
  return mergeConfig(defaultConfig, customConfig);
})();
