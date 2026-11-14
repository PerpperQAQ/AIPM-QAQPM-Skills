async (page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto('http://127.0.0.1:4175/');
 await page.setViewportSize({width:1440,height:1000});
 await page.getByRole('button',{name:'文档演进',exact:true}).click();
 await page.locator('.path-caption strong').filter({hasText:'一份专题文档'}).waitFor();
 await page.getByRole('button',{name:'上线回流',exact:true}).click();
 await page.locator('.graph-inspector h3').filter({hasText:'发布与观察'}).waitFor();
 await page.getByRole('button',{name:'完整体系',exact:true}).click();
 await page.getByRole('button',{name:'01 定义问题',exact:true}).click();
 await page.getByRole('button',{name:'自动演示',exact:true}).click();
 await page.locator('.case-controls .mono').filter({hasText:'02 / 06'}).waitFor({timeout:12000});
 await page.getByRole('button',{name:'暂停演示',exact:true}).click();
 await page.getByRole('button',{name:'查看 Skill 原文'}).click();
 await page.locator('.markdown h1').waitFor();
 const sourceLoaded=(await page.locator('.markdown').textContent()).includes('MVP');
 await page.keyboard.press('Escape');
 for(const selector of ['#home','#architecture','#guide','#start','#case','#templates','#install','.faq-section']){
  await page.locator(selector).scrollIntoViewIfNeeded();
 }
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await page.waitForFunction(()=>[...document.querySelectorAll('.hero-copy,.hero-visual')].every(e=>+getComputedStyle(e).opacity>.99));
 await page.screenshot({path:'output/playwright/desktop-home.png'});
 return {url:page.url(),sourceLoaded,autoAdvance:true,documentationAndFeedbackModes:true,errors};
}
