(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[702],{3007:function(e,r,t){Promise.resolve().then(t.bind(t,8769))},8769:function(e,r,t){"use strict";t.d(r,{default:function(){return u}});var n=t(7437),s=t(2265),a=t(7440);let i=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("div",{ref:r,className:(0,a.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",t),...s})});i.displayName="Card";let o=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("div",{ref:r,className:(0,a.cn)("flex flex-col space-y-1.5 p-6",t),...s})});o.displayName="CardHeader",s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("h3",{ref:r,className:(0,a.cn)("text-2xl font-semibold leading-none tracking-tight",t),...s})}).displayName="CardTitle",s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("p",{ref:r,className:(0,a.cn)("text-sm text-muted-foreground",t),...s})}).displayName="CardDescription";let d=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("div",{ref:r,className:(0,a.cn)("p-6 pt-0",t),...s})});d.displayName="CardContent";let c=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("div",{ref:r,className:(0,a.cn)("flex items-center p-6 pt-0",t),...s})});c.displayName="CardFooter";var l=t(495);function u(e){let{players:r=[],show:t=3}=e,[a,u]=(0,s.useState)(!1),f=(0,s.useMemo)(()=>a?r:r.slice(0,t),[r,a,t]);return(0,n.jsxs)(i,{className:"min-w-[300px]",children:[(0,n.jsx)(o,{children:(0,n.jsx)("h2",{className:"border-hidden",children:"שחקנים מובילים"})}),(0,n.jsx)(d,{children:(0,n.jsx)("ul",{className:"grid gap-3",children:f.map(e=>(0,n.jsxs)("li",{className:"flex items-center justify-between",children:[(0,n.jsx)("span",{children:e.name}),(0,n.jsx)("span",{style:{direction:"ltr"},children:e.score>0?"₪".concat(e.score):"-₪".concat(-e.score)})]},e.name))})}),(0,n.jsx)(c,{className:"flex justify-center",children:(0,n.jsx)(l.z,{variant:"outline",onClick:()=>u(!a),children:a?"הצג פחות":"הצג את כל השחקנים"})})]})}},495:function(e,r,t){"use strict";t.d(r,{z:function(){return c}});var n=t(7437),s=t(2265),a=t(2974),i=t(2218),o=t(7440);let d=(0,i.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=s.forwardRef((e,r)=>{let{className:t,variant:s,size:i,asChild:c=!1,...l}=e,u=c?a.g7:"button";return(0,n.jsx)(u,{className:(0,o.cn)(d({variant:s,size:i,className:t})),ref:r,...l})});c.displayName="Button"},7440:function(e,r,t){"use strict";t.d(r,{cn:function(){return a}});var n=t(4839),s=t(6164);function a(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return(0,s.m6)((0,n.W)(r))}}},function(e){e.O(0,[637,971,23,744],function(){return e(e.s=3007)}),_N_E=e.O()}]);