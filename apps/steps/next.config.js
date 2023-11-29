// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require("path");
const { withPayload } = require("@payloadcms/next-payload");



module.exports = async (phase, { defaultConfig }) => {
  const nxConfig = await withNx({
    nx: {
      // Set this to true if you would like to use SVGR
      // See: https://github.com/gregberge/svgr
      svgr: false,
    },
  })(phase, { defaultConfig });

  const payloadConfig = await withPayload(
    nxConfig,
    {
      // The second argument to `withPayload`
      // allows you to specify paths to your Payload dependencies
      // and configure the admin route to your Payload CMS.

      // Point to your Payload config (Required)
      configPath: path.resolve(__dirname, "./payload/payload.config.ts"),

      // Point to custom Payload CSS (optional)
      cssPath: path.resolve(__dirname, "./css/payload.global.css"),

      // Point to your exported, initialized Payload instance (optional, default shown below`)
      payloadPath: path.resolve(process.cwd(), "./payload/payloadClient.ts"),

      // Set a custom Payload admin route (optional, default is `/admin`)
      // NOTE: Read the "Set a custom admin route" section in the payload/next-payload README.
      adminRoute: "/admin",
    }
  )
  console.log('payloadConfig: ', payloadConfig);

  console.log('nxConfig: ', nxConfig);

  return payloadConfig;
}