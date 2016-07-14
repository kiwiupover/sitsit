/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    emberCliDeployAssetSizes: {
      KEEN_PROJECT_ID: '5702ff5ae0855707f784b1e1',
      KEEN_WRITE_KEY: '7cf8cb0f9a5d38bae16503fc490a17ea399242cbe40e2097c3613784ddb0d0811a9977cbeff5b3e8b15d5a57fe20cb5a7bd706afd45f4ac8213c5c5b7502f778f8af42943c8cfb2533994f5d638f112ff44f21308d7ade487f61f97c1d3af54a'
    }
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
