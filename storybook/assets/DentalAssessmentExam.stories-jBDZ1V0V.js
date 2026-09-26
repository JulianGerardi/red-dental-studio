import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./preload-helper-wdlQj8DP.js";import{r,t as i}from"./DentalAssessmentExam-5GGBZUe_.js";var a,o,s,c;function l(){return(l=e((()=>{r(),t(),a={title:`Components/Clinical/DentalAssessmentExam`,component:i,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:720}}}},o={},s={play:async e=>{let{userEvent:t,within:r}=await n(async()=>{let{userEvent:e,within:t}=await import(__STORYBOOK_MODULE_TEST__);return{userEvent:e,within:t}},[],import.meta.url),i=await r(e.canvasElement).findAllByRole(`button`,{pressed:!1});await t.click(i.find(e=>/table/i.test(e.textContent??e.getAttribute(`aria-label`)??``))??i[0])}},c=[`Default`,`TableViewSelected`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  play: async c => {
    const {
      userEvent,
      within
    } = await import('storybook/test');
    const botones = await within(c.canvasElement).findAllByRole('button', {
      pressed: false
    });
    await userEvent.click(botones.find(b => /table/i.test(b.textContent ?? b.getAttribute('aria-label') ?? '')) ?? botones[0]);
  }
}`,...s.parameters?.docs?.source}}}})))()}l();export{o as Default,s as TableViewSelected,c as __namedExportsOrder,a as default};