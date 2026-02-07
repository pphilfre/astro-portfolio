import 'piccolore';
import { j as decodeKey } from './chunks/astro/server_DfsTNRNX.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BzjDFi-i.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///workspaces/astro-portfolio/","cacheDir":"file:///workspaces/astro-portfolio/node_modules/.astro/","outDir":"file:///workspaces/astro-portfolio/dist/","srcDir":"file:///workspaces/astro-portfolio/src/","publicDir":"file:///workspaces/astro-portfolio/public/","buildClientDir":"file:///workspaces/astro-portfolio/dist/client/","buildServerDir":"file:///workspaces/astro-portfolio/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"},{"type":"inline","content":".logoloop{position:relative;contain:layout;view-transition-name:logoloop;--logoloop-gap: 32px;--logoloop-logoHeight: 28px;--logoloop-fadeColorAuto: #ffffff}::view-transition-old(logoloop){display:none}::view-transition-new(logoloop){animation:none}.logoloop--vertical{height:100%;display:inline-block}.logoloop--scale-hover{padding-top:calc(var(--logoloop-logoHeight) * .1);padding-bottom:calc(var(--logoloop-logoHeight) * .1)}.dark .logoloop{--logoloop-fadeColorAuto: #0b0b0b}.logoloop__track{display:flex;width:max-content;will-change:transform;user-select:none;position:relative;z-index:0}.logoloop--vertical .logoloop__track{flex-direction:column;height:max-content;width:100%}.logoloop__list{display:flex;align-items:center}.logoloop--vertical .logoloop__list{flex-direction:column}.logoloop__item{flex:0 0 auto;margin-right:var(--logoloop-gap);font-size:var(--logoloop-logoHeight);line-height:1}.logoloop--vertical .logoloop__item{margin-right:0;margin-bottom:var(--logoloop-gap)}.logoloop__item:last-child{margin-right:var(--logoloop-gap)}.logoloop--vertical .logoloop__item:last-child{margin-right:0;margin-bottom:var(--logoloop-gap)}.logoloop__node{display:inline-flex;align-items:center;color:#000;transition:color 0s}.dark .logoloop__node{color:#fff}.logoloop__item img{height:var(--logoloop-logoHeight);width:auto;display:block;object-fit:contain;image-rendering:-webkit-optimize-contrast;-webkit-user-drag:none;pointer-events:none;transition:transform .3s cubic-bezier(.4,0,.2,1);filter:grayscale(100%) brightness(0) contrast(1000%)}.dark .logoloop__item img{filter:grayscale(100%) brightness(0) invert(1) contrast(1000%)}.logoloop--scale-hover .logoloop__item{overflow:visible}.logoloop--scale-hover .logoloop__item:hover img,.logoloop--scale-hover .logoloop__item:hover .logoloop__node{transform:scale(1.2);transform-origin:center center}.logoloop--scale-hover .logoloop__node{transition:transform .3s cubic-bezier(.4,0,.2,1)}.logoloop__link{display:inline-flex;align-items:center;text-decoration:none;border-radius:4px;transition:opacity .2s ease}.logoloop__link:hover{opacity:.8}.logoloop__link:focus-visible{outline:2px solid currentColor;outline-offset:2px}.logoloop--fade:before,.logoloop--fade:after{content:\"\";position:absolute;top:0;bottom:0;width:clamp(24px,8%,120px);pointer-events:none;z-index:10}.logoloop--fade:before{left:0;background:linear-gradient(to right,var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,rgba(0,0,0,0) 100%)}.logoloop--fade:after{right:0;background:linear-gradient(to left,var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,rgba(0,0,0,0) 100%)}.logoloop--vertical.logoloop--fade:before,.logoloop--vertical.logoloop--fade:after{left:0;right:0;width:100%;height:clamp(24px,8%,120px)}.logoloop--vertical.logoloop--fade:before{top:0;bottom:auto;background:linear-gradient(to bottom,var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,rgba(0,0,0,0) 100%)}.logoloop--vertical.logoloop--fade:after{bottom:0;top:auto;background:linear-gradient(to top,var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,rgba(0,0,0,0) 100%)}@media(prefers-reduced-motion:reduce){.logoloop__track{transform:translateZ(0)!important}.logoloop__item img,.logoloop__node{transition:none!important}}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"}],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"}],"routeData":{"route":"/blog/[...slug]","isIndex":false,"type":"page","pattern":"^\\/blog(?:\\/(.*?))?\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/blog/[...slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"}],"routeData":{"route":"/certifications","isIndex":false,"type":"page","pattern":"^\\/certifications\\/?$","segments":[[{"content":"certifications","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/certifications.astro","pathname":"/certifications","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"}],"routeData":{"route":"/markdown-page","isIndex":false,"type":"page","pattern":"^\\/markdown-page\\/?$","segments":[[{"content":"markdown-page","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/markdown-page.md","pathname":"/markdown-page","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"}],"routeData":{"route":"/projects/ctf","isIndex":false,"type":"page","pattern":"^\\/projects\\/ctf\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"ctf","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/ctf.astro","pathname":"/projects/ctf","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"}],"routeData":{"route":"/projects/tools","isIndex":false,"type":"page","pattern":"^\\/projects\\/tools\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"tools","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/tools.astro","pathname":"/projects/tools","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"}],"routeData":{"route":"/projects","isIndex":true,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/index.astro","pathname":"/projects","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/markdown-page.r8J8E2xB.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/astro-portfolio/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/workspaces/astro-portfolio/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/workspaces/astro-portfolio/src/pages/blog.astro",{"propagation":"in-tree","containsHead":true}],["/workspaces/astro-portfolio/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/workspaces/astro-portfolio/src/pages/certifications.astro",{"propagation":"none","containsHead":true}],["/workspaces/astro-portfolio/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/workspaces/astro-portfolio/src/pages/markdown-page.md",{"propagation":"none","containsHead":true}],["/workspaces/astro-portfolio/src/pages/projects/ctf.astro",{"propagation":"none","containsHead":true}],["/workspaces/astro-portfolio/src/pages/projects/tools.astro",{"propagation":"none","containsHead":true}],["/workspaces/astro-portfolio/src/pages/projects/index.astro",{"propagation":"none","containsHead":true}],["/workspaces/astro-portfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/certifications@_@astro":"pages/certifications.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/markdown-page@_@md":"pages/markdown-page.astro.mjs","\u0000@astro-page:src/pages/projects/ctf@_@astro":"pages/projects/ctf.astro.mjs","\u0000@astro-page:src/pages/projects/tools@_@astro":"pages/projects/tools.astro.mjs","\u0000@astro-page:src/pages/projects/index@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Kqo5tlIZ.mjs","/workspaces/astro-portfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CWz-QO8Q.mjs","/workspaces/astro-portfolio/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/workspaces/astro-portfolio/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CuKNjM8B.mjs","/workspaces/astro-portfolio/src/components/Navbar.tsx":"_astro/Navbar.ruhkmEIl.js","/workspaces/astro-portfolio/src/components/DotMatrix404.tsx":"_astro/DotMatrix404.DTySjXCB.js","/workspaces/astro-portfolio/src/components/AboutBento.tsx":"_astro/AboutBento.BgY_6YaP.js","/workspaces/astro-portfolio/src/components/TechLogoLoop.tsx":"_astro/TechLogoLoop.D_Fx0B1W.js","/workspaces/astro-portfolio/src/components/BlogFilter.tsx":"_astro/BlogFilter.DGrEE1QE.js","/workspaces/astro-portfolio/src/components/AchievementsBento.tsx":"_astro/AchievementsBento.SeMryev8.js","/workspaces/astro-portfolio/src/components/ContactBento.tsx":"_astro/ContactBento.f9-_YSSE.js","/workspaces/astro-portfolio/src/components/ContactForm.tsx":"_astro/ContactForm.C_-n-itw.js","/workspaces/astro-portfolio/src/components/Grainient.tsx":"_astro/Grainient.B9UOSoRn.js","@astrojs/react/client.js":"_astro/client.CrFkE78Q.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/markdown-page.r8J8E2xB.css","/cv.pdf","/favicon.ico","/favicon.svg","/robots.txt","/sitemap.xml","/_astro/AboutBento.BgY_6YaP.js","/_astro/AchievementsBento.SeMryev8.js","/_astro/BlogFilter.DGrEE1QE.js","/_astro/ContactBento.f9-_YSSE.js","/_astro/ContactForm.C_-n-itw.js","/_astro/DetailSheet.BngkYr28.js","/_astro/DotMatrix404.DTySjXCB.js","/_astro/Grainient.B9UOSoRn.js","/_astro/Navbar.ruhkmEIl.js","/_astro/TechLogoLoop.D_Fx0B1W.js","/_astro/chevron-down.Y48EbqfA.js","/_astro/client.CrFkE78Q.js","/_astro/createLucideIcon.BfVnSBWr.js","/_astro/index.-sVCfVMB.js","/_astro/index.B5RBIdlu.js","/_astro/index.CrJHwP2r.js","/_astro/index.DwQS_Y10.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/sheet.Cadku6R8.js","/_astro/utils.DWyRvU8s.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"13b+KiWaW/LbeAAaWheBEY59qAZ28K9uuuGNMqq4LWY="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
