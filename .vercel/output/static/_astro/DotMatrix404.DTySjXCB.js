import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as f}from"./index.DwQS_Y10.js";const m=[[0,0,0,0,0,1,0],[0,0,0,0,1,1,0],[0,0,0,1,0,1,0],[0,0,1,0,0,1,0],[0,1,0,0,0,1,0],[1,0,0,0,0,1,0],[1,1,1,1,1,1,1],[0,0,0,0,0,1,0],[0,0,0,0,0,1,0],[0,0,0,0,0,1,0],[0,0,0,0,0,1,0]],w=[[0,1,1,1,1,1,0],[1,1,0,0,0,1,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,1,0,1],[1,0,0,1,0,0,1],[1,0,1,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,1,0,0,0,1,1],[0,1,1,1,1,1,0]];function u(){const a=[];for(let t=0;t<11;t++)a.push([...m[t],0,0,...w[t],0,0,...m[t]]);return a}const R=u(),g=25,h=11,s=50,d=22;function T(){const c=f.useMemo(()=>{const a=Math.floor((d-h)/2),t=Math.floor((s-g)/2),p=[];for(let o=0;o<d;o++)for(let i=0;i<s;i++){const e=o-a,n=i-t;let l=!1;e>=0&&e<h&&n>=0&&n<g&&(l=R[e][n]===1);const x=o*.04+i*.02;p.push(r.jsx("div",{className:l?"dot dot-main":"dot dot-bg",style:{animationDelay:`${x}s`}},`${o}-${i}`))}return p},[]);return r.jsxs("div",{className:"dot-matrix-container",children:[r.jsx("div",{className:"dot-grid",children:c}),r.jsx("style",{children:`
        .dot-matrix-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }
        
        .dot-grid {
          display: grid;
          grid-template-columns: repeat(${s}, 1fr);
          grid-template-rows: repeat(${d}, 1fr);
          gap: 4px;
          width: 100%;
          height: 100%;
          padding: 8px;
        }
        
        @media (min-width: 640px) {
          .dot-grid {
            gap: 6px;
            padding: 16px;
          }
        }
        
        @media (min-width: 768px) {
          .dot-grid {
            gap: 8px;
          }
        }
        
        .dot {
          border-radius: 50%;
          margin: auto;
          will-change: transform, opacity;
        }
        
        .dot-main {
          width: 10px;
          height: 10px;
          background-color: #171717;
          animation: pulse404 2.5s ease-in-out infinite;
        }
        
        .dot-bg {
          width: 6px;
          height: 6px;
          background-color: rgba(23, 23, 23, 0.35);
          animation: waveBg 4s ease-in-out infinite;
        }
        
        @media (min-width: 640px) {
          .dot-main {
            width: 12px;
            height: 12px;
          }
          .dot-bg {
            width: 8px;
            height: 8px;
          }
        }
        
        @media (min-width: 768px) {
          .dot-main {
            width: 16px;
            height: 16px;
          }
          .dot-bg {
            width: 10px;
            height: 10px;
          }
        }
        
        /* Dark mode colors */
        :root.dark .dot-main {
          background-color: #ffffff;
        }
        
        :root.dark .dot-bg {
          background-color: rgba(255, 255, 255, 0.15);
        }
        
        @keyframes pulse404 {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.6; 
            transform: scale(0.8);
          }
        }
        
        @keyframes waveBg {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.5);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1);
          }
        }
      `})]})}export{T as default};
