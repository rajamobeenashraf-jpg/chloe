"""Builds proposal.html from the concept screenshots. Run: python3 build_proposal.py <screenshot_dir> <out_html>"""
import base64,sys
S=sys.argv[1].rstrip('/')+'/'; OUT=sys.argv[2]
def img(n): return 'data:image/jpeg;base64,'+base64.b64encode(open(S+'p-'+n+'.jpg','rb').read()).decode()
findings=[
("The menu shows no prices","The page title promises “Karak Chaii, Street Food, Desserts & Prices”; the page itself contains none. Price is the single most-searched restaurant query."),
("Unfinished pages went live","Careers reads “live jobs are loading shortly… we’re wiring this page up”. The contact form shows “loading form…”. The merchandise link returns an empty page. Coming Soon has a headline and no list."),
("Store data bugs","The Edinburgh store’s address renders as the word “undefined”. Several stores show no opening hours at all."),
("The numbers disagree","115, 120 and “140+” stores depending on the page. Three countries on the homepage, five on the franchise page. “1,000,000+ cups” on Our Story, 100 million everywhere else."),
("Two loyalty stories","The site sells stamps and a wallet pass. The April blog still sells a points app. Trustpilot complaints are about that app."),
("Heavy pages on a mobile audience","Menu 1.5 MB of HTML, allergens 1.7 MB, store locator 770 KB, ~1.2 MB of homepage JavaScript. Most café traffic is on a phone on 4G."),
("Store pages answer almost nothing","Only “dine-in” under What’s Here. No photos, parking, prayer room, drive-thru or accessibility, and no store-specific menu despite items marked “select stores”."),
("The franchise page is a headline and a form","One FAQ, no testimonials, no formats, no unit economics, no territory map, no prospectus. This is the funnel that has to deliver a 500-store target."),
("The blog is a migration dump","All ten posts are dated 22–23 April 2026. Nothing since launch."),
("No press or investor layer","£89m sales, 35% growth, a US launch: none of it appears anywhere a journalist or prospective franchisee would look."),
]
rows="".join(f'<tr><td class="n">{i+1:02d}</td><td class="t">{t}</td><td>{d}</td></tr>' for i,(t,d) in enumerate(findings))
html=f'''<!doctype html><html><head><meta charset="utf-8"><title>Chaiiwala — a proposal</title>
<style>
@page{{size:A4;margin:0}}
*{{box-sizing:border-box}}
body{{margin:0;font-family:"Manrope Variable","Manrope",system-ui,sans-serif;color:#2a1710;background:#fff6ea;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.page{{width:210mm;height:297mm;padding:18mm 16mm;page-break-after:always;position:relative;overflow:hidden}}
.dark{{background:#2a1710;color:#fff6ea}}
.serif{{font-family:"Fraunces Variable","Fraunces",Georgia,serif;font-weight:900;letter-spacing:-.02em;line-height:.95}}
.eyebrow{{font-size:9pt;letter-spacing:.22em;text-transform:uppercase;font-weight:800;color:#f0521b}}
h1{{font-size:54pt;margin:12pt 0 0}} h2{{font-size:30pt;margin:8pt 0 14pt}} h3{{font-size:14pt;margin:0 0 4pt;font-family:"Fraunces Variable",Georgia,serif;font-weight:800}}
p{{font-size:10.5pt;line-height:1.55;margin:0 0 9pt}}
.lede{{font-size:13pt;line-height:1.45;max-width:150mm}}
.grid2{{display:grid;grid-template-columns:1fr 1fr;gap:9mm}}
.grid3{{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6mm}}
.card{{background:#fff;border-radius:14pt;padding:11pt 12pt;border:1px solid rgba(42,23,16,.07)}}
.dark .card{{background:rgba(255,246,234,.07);border-color:rgba(255,246,234,.12)}}
table{{width:100%;border-collapse:collapse;font-size:9.4pt}} td{{padding:6.5pt 6pt;border-top:1px solid rgba(42,23,16,.1);vertical-align:top;line-height:1.4}}
td.n{{font-family:"Fraunces Variable",Georgia,serif;color:#f0521b;font-weight:900;font-size:13pt;width:24pt}} td.t{{font-weight:800;width:44mm}}
.shot{{border-radius:10pt;overflow:hidden;border:1px solid rgba(42,23,16,.1);background:#000}} .shot img{{width:100%;display:block}}
.foot{{position:absolute;bottom:10mm;left:16mm;right:16mm;font-size:8pt;color:rgba(42,23,16,.5);display:flex;justify-content:space-between}} .dark .foot{{color:rgba(255,246,234,.5)}}
.stat{{font-family:"Fraunces Variable",Georgia,serif;font-weight:900;font-size:30pt;color:#f0521b;line-height:1}} .stat small{{display:block;font-family:"Manrope Variable",sans-serif;font-size:8pt;letter-spacing:.15em;text-transform:uppercase;color:rgba(42,23,16,.55);margin-top:4pt;font-weight:700}}
.dark .stat small{{color:rgba(255,246,234,.6)}}
ul{{padding-left:14pt;margin:0}} li{{font-size:10pt;line-height:1.5;margin-bottom:4pt}}
.pill{{display:inline-block;border:1px solid rgba(255,246,234,.3);border-radius:99pt;padding:3pt 9pt;font-size:8.5pt;margin:0 4pt 4pt 0}}
.accent{{color:#f0521b;font-style:italic}}
</style></head><body>

<section class="page dark">
  <div class="eyebrow" style="color:#ff8a5b">A proposal for Chaiiwala · September 2026</div>
  <h1 class="serif">the v2 your<br>launch <span class="accent">deserved.</span></h1>
  <p class="lede" style="margin-top:14pt;color:rgba(255,246,234,.8)">Your new website shipped this summer and it is a real step up. It also shipped with gaps that cost you trust with the two audiences that matter most: customers deciding where to eat, and operators deciding where to invest. This is a working prototype of what fixing them looks like, built on your own menu and all 120 of your stores.</p>
  <div class="shot" style="margin-top:12mm"><img src="{img('hero')}"></div>
  <div class="grid3" style="margin-top:10mm">
    <div class="stat">120<small>real stores in the prototype</small></div>
    <div class="stat">128<small>real menu items with calories</small></div>
    <div class="stat">4<small>redesigned pages, live and interactive</small></div>
  </div>
  <div class="foot"><span>Prepared by Mobeen Ashraf · independent web designer &amp; developer</span><span>Concept only. Not affiliated with Rowda Group Ltd.</span></div>
</section>

<section class="page">
  <div class="eyebrow">What I found</div>
  <h2 class="serif">ten things on chaiiwala.co.uk today.</h2>
  <p>Read on 2 September 2026 from the live site’s own page source. Every point below is verifiable in a browser in under a minute.</p>
  <table>{rows}</table>
  <div class="foot"><span>Chaiiwala · a proposal</span><span>02</span></div>
</section>

<section class="page">
  <div class="eyebrow">The concept</div>
  <h2 class="serif">one homepage that sells the cup, the story and the opportunity.</h2>
  <div class="grid2">
    <div class="shot"><img src="{img('home')}"></div>
    <div>
      <div class="card"><h3>A signature moment</h3><p>A photoreal karak chaii cup in 3D that visitors can drag, with rising steam and the seven spices drifting around it. Loaded after the page paints, so it costs nothing on a slow connection.</p></div>
      <div class="card" style="margin-top:5mm"><h3>The story, told with motion</h3><p>Your 2015-to-2026 timeline draws itself as the reader scrolls. Counters roll up to 100 million cups and 120 stores. One source of truth for every number, so no page disagrees with another again.</p></div>
      <div class="card" style="margin-top:5mm"><h3>Rewards explained in ten seconds</h3><p>The stamp ladder animates in: five, ten, fifteen. Wallet pass front and centre. The points-app copy retired everywhere.</p></div>
      <div class="card" style="margin-top:5mm"><h3>Find a store without leaving the page</h3><p>Type a city or postcode and the real stores appear with live open-now status derived from their hours.</p></div>
    </div>
  </div>
  <div class="foot"><span>Chaiiwala · a proposal</span><span>03</span></div>
</section>

<section class="page">
  <div class="eyebrow">The concept</div>
  <h2 class="serif">a menu with prices, and store pages that answer questions.</h2>
  <div class="grid2">
    <div><div class="shot"><img src="{img('menu')}"></div><div class="shot" style="margin-top:4mm"><img src="{img('modal')}"></div></div>
    <div><div class="shot"><img src="{img('store')}"></div></div>
  </div>
  <div class="grid2" style="margin-top:6mm">
    <div class="card"><h3>Menu</h3><p>Every item with its price, calories, veg and vegan badges and a “select stores” flag. Category tabs, search, dietary filters, an item detail view and a basket, all animated. Built to be fed from your ordering platform so prices and availability are per store, never a static page.</p></div>
    <div class="card"><h3>Store pages</h3><p>Facilities, formats (high street, express, drive-thru, airport, services), weekly hours with today highlighted, popular items, directions, collection and delivery handoffs, nearby stores, and structured data so each page ranks for “chaii near me”. No more “undefined” addresses: the data is validated before it ships.</p></div>
  </div>
  <div class="foot"><span>Chaiiwala · a proposal</span><span>04</span></div>
</section>

<section class="page">
  <div class="eyebrow">The concept</div>
  <h2 class="serif">a franchise funnel built for a 500-store target.</h2>
  <div class="grid2">
    <div class="shot"><img src="{img('franchise')}"></div>
    <div>
      <div class="card"><h3>What changes</h3><ul>
        <li>The four formats you actually operate, each explained, so an operator self-selects before they call.</li>
        <li>The five-step process draws itself on scroll, with realistic timings attached.</li>
        <li>A franchisee voice and the numbers investors look for: typical set-up, indicative payback, the multi-site path.</li>
        <li>Territories available versus already open, from your live store estate.</li>
        <li>An FAQ that goes past one question.</li>
        <li>A three-step application that qualifies investment capacity before it reaches your team, wired to your CRM rather than a shared inbox.</li>
        <li>Room for a press and investor layer: £89m sales, 35% growth, the US launch.</li>
      </ul></div>
      <div class="card" style="margin-top:5mm"><h3>Why it matters</h3><p>Chai Green’s franchise page already tells operators about bank funding, payback and multi-site ownership. At many times their size, your page tells them less. This is the page that pays for the project.</p></div>
    </div>
  </div>
  <div class="foot"><span>Chaiiwala · a proposal</span><span>05</span></div>
</section>

<section class="page dark">
  <div class="eyebrow" style="color:#ff8a5b">How it’s built</div>
  <h2 class="serif">your stack, kept. your pages, faster.</h2>
  <div class="grid2">
    <div>
      <div class="card"><h3>Same foundation</h3><p style="color:rgba(255,246,234,.8)">Next.js on Vercel, the platform you chose this summer. Nothing to migrate, nothing new for your team to learn. Content lives in a headless CMS so marketing edits menus, stores and stories without a developer.</p></div>
      <div class="card" style="margin-top:5mm"><h3>Motion that costs nothing</h3><p style="color:rgba(255,246,234,.8)">Every animation runs on the GPU, loads after first paint, and switches off for visitors who ask for reduced motion. Target: largest contentful paint under 2.5 seconds on a mid-range phone, measured and reported.</p></div>
      <div class="card" style="margin-top:5mm"><h3>Lighter than today</h3><p style="color:rgba(255,246,234,.8)">Menu and allergen pages paginated and virtualised so nothing ships 1.5 MB of HTML. Images served at the size the screen needs.</p></div>
    </div>
    <div>
      <div class="shot"><img src="{img('mobile')}" style="max-height:150mm;object-fit:cover;object-position:top"></div>
    </div>
  </div>
  <div style="margin-top:8mm"><span class="pill">Next.js 16</span><span class="pill">Tailwind</span><span class="pill">Framer Motion</span><span class="pill">GSAP + Lenis</span><span class="pill">React Three Fiber</span><span class="pill">Headless CMS</span><span class="pill">Vercel</span><span class="pill">Schema.org</span></div>
  <div class="foot"><span>Chaiiwala · a proposal</span><span>06</span></div>
</section>

<section class="page">
  <div class="eyebrow">The plan</div>
  <h2 class="serif">three phases. stop after any of them.</h2>
  <div class="grid3">
    <div class="card"><div class="stat">01<small>Discovery &amp; design</small></div><p style="margin-top:8pt">Interviews with marketing and franchise teams. Audit of the store-data pipeline. Design system and the key page designs, signed off as a clickable prototype you own outright.</p></div>
    <div class="card"><div class="stat">02<small>The site</small></div><p style="margin-top:8pt">Every page template, the CMS, all 120 UK store pages loaded from validated data, the menu with prices and allergens, the franchise funnel wired to your CRM, careers and contact finished, migration, launch, training.</p></div>
    <div class="card"><div class="stat">03<small>Growth</small></div><p style="margin-top:8pt">One brand domain routing to UK, Canada, UAE and US. Store subdomains retired with redirects that keep rankings. Territory map. Ordering integrated on-site once the platform grants access.</p></div>
  </div>
  <div class="card" style="margin-top:8mm;background:#2a1710;color:#fff6ea"><h3>About me</h3><p style="color:rgba(255,246,234,.85)">I’m Mobeen Ashraf, an independent designer and developer. I build motion-led, data-driven sites for food and hospitality brands, and I built this prototype from your public menu and store data before we ever spoke, because the best way to show what a site could be is to make one.</p></div>
  <div style="margin-top:10mm"><div class="eyebrow">Next step</div><h2 class="serif" style="font-size:26pt">a thirty-minute call.</h2><p class="lede">Walk through the live prototype together, tell me which of the ten findings hurt most, and I’ll come back with a scoped plan and a fixed price for the phase you want to start with.</p><p style="font-weight:800">rajamobeenashraf@gmail.com</p></div>
  <div class="foot"><span>Chaiiwala · a proposal</span><span>07</span></div>
</section>
</body></html>'''
open(OUT,'w').write(html); print('html ok', len(html)//1024,'KB')
