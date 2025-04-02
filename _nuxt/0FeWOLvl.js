import{_ as u}from"./DoWOB1L4.js";import{e as m,f as p,g as k,h as f,i as a,o,w as g,j as y,k as r,V as d}from"./Bf1k83Rv.js";import{g as x,u as C}from"./bVP7hCfZ.js";import"./Ajul3ZmD.js";const E=m({__name:"[slug]",async setup(b){var s;let e,n;const c=p(),{setHeroText:i}=C(),_=x`*[_type == "page" && slug.current == '${c.params.slug}'][0]{
  ...,
  content[]{
    ...,
    link{
      ...,
      internalLink->,
    },
    internalLink->,
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          ...,
          internalLink->
        }
      }
    }
  },
}`,{data:t}=([e,n]=k(()=>f(_)),e=await e,n(),e);return i((s=t.value)==null?void 0:s.title),(h,w)=>{const l=u;return o(),a(d,{class:"content"},{default:g(()=>[r(t)?(o(),a(l,{key:0,blocks:r(t).content},null,8,["blocks"])):y("",!0)]),_:1})}}});export{E as default};
