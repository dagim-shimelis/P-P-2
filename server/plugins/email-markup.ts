export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html) => {
        // Keep Cloudflare's email rewriter from changing Vue's server-rendered DOM.
        html.bodyPrepend.unshift('<!--email_off-->');
        html.bodyAppend.push('<!--/email_off-->');
    });
});
