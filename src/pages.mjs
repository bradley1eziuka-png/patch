import { site, services, locations, gallery, galleryFilters, hero, featureVideos, useFeatureVideos, slotVideo, familyVideo, preview, integrations, smsConsent } from './data.mjs';
import {
  esc, svc, loc, svcUrl, locUrl, icon, media, head, header, footer, breadcrumb, pageHero, ctaBand,
  serviceCard, faqBlock, businessSchema, breadcrumbSchema, faqSchema, jsonLd, abs, locationPhoto,
} from './lib.mjs';

const page = (meta, body) => head(meta) + header(meta.path) + `\n<main id="main">\n${body}\n</main>\n` + footer();

const PH = site.phone;
const estimateBtn = (cls = '') => `<a class="btn ${cls}" href="/contact/">Get a Free Estimate</a>`;
const callBtn = (cls = 'btn--ghost') => `<a class="btn ${cls}" href="${site.phoneHref}">Call ${PH}</a>`;
const eyebrow = (t, cls = '') => `<p class="eyebrow ${cls}">${esc(t)}</p>`;
const homeCrumb = { name: 'Home', href: '/' };


const vidFigure = (v, ratio = '4/5', { pause = true, cls = '' } = {}) => `<figure class="media media--video ${cls}" style="--ratio:${ratio}">
        <video class="lazyvid" muted loop playsinline preload="none" width="640" height="800" poster="${v.poster}" data-src="${v.src}" aria-hidden="true" tabindex="-1"></video>${pause ? `
        <button type="button" class="vid-pause" aria-label="Pause video" aria-pressed="false"><span class="vp-on">${icon('pause')}</span><span class="vp-off">${icon('play')}</span></button>` : ''}
      </figure>`;
// Any media slot: a looping video if one is mapped in src/data.mjs (slotVideo), otherwise the still / placeholder.
const slotMedia = (slot, o = {}) => (slotVideo[slot] ? vidFigure(slotVideo[slot], o.ratio || '4/5', { pause: o.pause !== false, cls: o.cls || '' }) : media(slot, o));

// Hero: all footage is portrait. 'full' crops a wide band for desktop and uses the portrait clip on phones.
// 'framed' is the earlier portrait-panel design (set hero.layout in src/data.mjs).
function heroSection() {
  const copy = `    <div class="hero__copy">
      <p class="hero__eyebrow">Commercial Drywall &amp; Plaster &bull; Serving Metro Detroit</p>
      <h1>Drywall Repair, Installation &amp; Finishing.</h1>
      <p class="hero__proof">25 Years in the Trade.</p>
      <p class="hero__body">Commercial drywall installation, plaster repair and professional finishing, plus residential repairs and finishing for basements, garages and homes, across Metro Detroit.</p>
      <div class="btn-row">${estimateBtn()}${callBtn()}</div>
      <ul class="hero__checks"><li>${icon('check')}Fully insured</li><li>${icon('check')}Free estimates</li><li>${icon('check')}Dearborn Heights</li></ul>
    </div>`;
  const pause = `<button type="button" class="hero__pause" aria-label="Pause background video" aria-pressed="false"><span class="hero__pause-on">${icon('pause')}</span><span class="hero__pause-off">${icon('play')}</span></button>`;
  if (hero.layout === 'framed') {
    return `<section class="hero hero--video">
  <div class="wrap hero__inner">
${copy}
    <div class="hero__video">
      <video class="hero__vid" muted loop playsinline preload="none" width="720" height="1280" poster="${hero.poster}" data-src="${hero.video}" aria-hidden="true" tabindex="-1"></video>
      ${pause}
    </div>
  </div>
</section>`;
  }
  return `<section class="hero hero--full">
  <!-- HERO VIDEO: full-width background. Wide clip (hero-wide.mp4) from 900px up, portrait clip (hero.mp4) on phones.
       Posters are CSS backgrounds (see .hero--full in style.css). Swap clips or revert to the panel layout in src/data.mjs. -->
  <div class="hero__bg" aria-hidden="true">
    <video class="hero__vid" muted loop playsinline preload="none" width="1280" height="720" data-src-wide="${hero.wideVideo}" data-src-tall="${hero.video}" tabindex="-1"></video>
  </div>
  <div class="wrap hero__inner">
${copy}
  </div>
  ${pause}
</section>`;
}

// ===========================================================================
// HOME
// ===========================================================================
export function home() {
  const strip = [
    { icon: 'patch', t: 'Drywall Repair', p: 'Holes, cracks and damaged walls repaired and finished to blend with the surrounding surface.', href: svcUrl('drywall-repair'), a: 'Repair details' },
    { icon: 'layers', t: 'Drywall Installation & Finishing', p: 'Commercial and residential drywall hanging, taping and finishing for remodels, additions and new construction.', href: svcUrl('drywall-installation'), a: 'Installation details' },
    { icon: 'house', t: 'Basements, Garages & Houses', p: 'Drywall installation and finishing for larger projects, from unfinished basements to entire homes.', href: svcUrl('basement-garage-house-finishing'), a: 'Full-space finishing' },
  ];
  const six = ['drywall-repair', 'drywall-installation', 'plaster-repair', 'level-5-finishing', 'dustless-sanding', 'basement-garage-house-finishing'].map(svc);
  const homeTiles = {
    'drywall-repair': 'Holes, cracks and damaged walls repaired and finished to blend with the surrounding surface.',
    'drywall-installation': 'Commercial and residential drywall hanging, taping and finishing for remodels, additions and new construction.',
    'plaster-repair': 'Repair cracked or damaged plaster without replacing more of the wall than necessary.',
    'level-5-finishing': 'A smooth, uniform finish for walls and ceilings where surface imperfections are more noticeable.',
    'dustless-sanding': 'Specialized sanding equipment helps keep airborne dust and cleanup to a minimum.',
    'basement-garage-house-finishing': 'Drywall installation and finishing for larger projects, from unfinished basements to entire homes.',
  };
  const facts = [
    { icon: 'badge', big: '25 Years', small: 'In the trade' },
    { icon: 'users', big: 'Commercial', small: 'And residential work' },
    { icon: 'shield', big: 'Fully Insured', small: 'For your peace of mind' },
    { icon: 'clipboard', big: 'Free Estimates', small: 'Know the scope before committing' },
  ];
  const features = [
    { slot: 'feature-finishing', note: 'Basement, garage or whole-house drywall in progress or finished. Wide framing/ceiling shots work well.', eyebrow: 'Basements, Garages & Houses', h: 'Finishing a Basement, Garage or Entire Home?', p: ["The Original Patch Master handles drywall installation and finishing for projects beyond a simple repair. Whether you're finishing a basement, working on a garage or getting an entire house ready for paint, we can help with the drywall work from start to finish."], href: svcUrl('basement-garage-house-finishing'), a: 'Explore Larger Projects', alt: 'Basement drywall finished by The Original Patch Master' },
    { slot: 'feature-repair', note: 'Before/after or in-progress drywall or plaster repair. A close shot of a patch being finished is ideal.', eyebrow: 'Repairs', h: 'Holes, Cracks and Damaged Plaster.', p: ['A doorknob through the wall. Cracks around a doorway. Damage left behind after plumbing or electrical work.', "Whatever caused it, we'll take a look, explain the repair and give you a free estimate."], href: svcUrl('drywall-repair'), a: 'Explore Repair Services', alt: 'Drywall repair by The Original Patch Master' },
    { slot: 'feature-sanding', note: 'Dustless sanding equipment in use, or a smooth finished wall in raking light. Shows the finish quality.', eyebrow: 'Finishing', h: 'The Finish Makes the Difference.', p: ["Even well-installed drywall can look rough if the finishing isn't handled properly. The Original Patch Master offers Level 5 finishing for smooth surfaces and specialized sanding equipment to help control dust during the job."], href: svcUrl('level-5-finishing'), a: 'Explore Finishing Services', alt: 'Dustless sanding by The Original Patch Master' },
  ];

  const body = `
${heroSection()}

<section class="section strip" aria-label="Main services">
  <div class="wrap strip__grid">
    ${strip.map((s) => `<article class="strip__item"><span class="strip__icon">${icon(s.icon)}</span><h2><a href="${s.href}">${esc(s.t)}</a></h2><p>${esc(s.p)}</p><a class="more" href="${s.href}">${esc(s.a)}${icon('arrow')}</a></article>`).join('')}
  </div>
</section>

<section class="section section--alt about">
  <div class="wrap about__grid">
    <div class="about__media">
      <!-- Completed-work photos (no people). Slots map to stills in src/data.mjs (slotStill). Portrait 3:4. -->
      ${slotMedia('about-family', { ratio: '3/4', note: 'Completed finished walls. Portrait, 3:4.' })}
      ${slotMedia('about-jobsite', { ratio: '3/4', note: 'Commercial or finished project interior. Portrait, 3:4.' })}
    </div>
    <div class="about__copy">
      ${eyebrow('About The Original Patch Master')}
      <h2>Craftsmanship That Speaks for Itself.</h2>
      <p>The Original Patch Master delivers professional drywall, plaster repair, and finishing services throughout Metro Detroit. Our team of highly qualified craftsmen brings experience, attention to detail, and pride in workmanship to every project.</p>
      <p>From commercial drywall installations to detailed repairs and smooth finishing work, we focus on delivering dependable service and results our customers can trust.</p>
      <a class="btn btn--navy" href="/our-work/">Explore Our Work</a>
    </div>
  </div>
</section>

<section class="section services-sec" aria-labelledby="svc-h">
  <div class="wrap">
    <div class="sec-head">
      ${eyebrow('Our Services')}
      <h2 id="svc-h">From Small Repairs to Full Drywall Jobs.</h2>
    </div>
    <div class="grid grid--3">${six.map((s) => serviceCard(s, homeTiles[s.slug])).join('')}</div>
    <p class="also">Also: <a href="${svcUrl('insulation')}">Insulation</a> and <a href="${svcUrl('window-glazing-caulking')}">Window Glazing &amp; Caulking</a>. <a href="/services/">See all services</a>.</p>
  </div>
</section>

<section class="band" aria-labelledby="band-h">
  <div class="wrap band__grid">
    <div>
      <h2 id="band-h">Skilled Craftsmen. Quality Finishes.</h2>
      <p class="band__text">Our team of highly qualified craftsmen takes pride in professional drywall, plaster repair and finishing work, from commercial projects to detailed repairs.</p>
    </div>
    <ul class="band__tiles">
      ${facts.map((f) => `<li>${icon(f.icon)}<strong>${f.big}</strong><span>${f.small}</span></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section section--alt features">
  <div class="wrap">
    ${features.map((f, i) => `<div class="feature${i % 2 ? ' feature--flip' : ''}">
      <div class="feature__media">${useFeatureVideos && featureVideos[f.slot] ? vidFigure(featureVideos[f.slot]) : media(f.slot, { ratio: '4/5', note: f.note, alt: f.alt, sizes: '(min-width: 860px) 534px, 100vw' })}</div>
      <div class="feature__copy">
        ${eyebrow(f.eyebrow)}
        <h2>${esc(f.h)}</h2>
        ${f.p.map((t) => `<p>${esc(t)}</p>`).join('')}
        <a class="btn" href="${f.href}">${esc(f.a)}</a>
      </div>
    </div>`).join('')}
  </div>
</section>

<section class="section work" aria-labelledby="work-h">
  <div class="wrap">
    <div class="sec-head">
      ${eyebrow('Our Work')}
      <h2 id="work-h">Take a Look at Our Work.</h2>
      <p>Drywall repairs, installations, plaster work and larger finishing projects.</p>
    </div>
    <div class="work__grid">
      ${[1, 2, 3, 4].map((n) => slotMedia(`work-teaser-${n}`, { ratio: '1/1', pause: false, sizes: '(min-width: 1140px) 270px, 50vw' })).join('')}
    </div>
    <div class="center btn-row btn-row--center"><a class="btn" href="/our-work/">View Our Work</a></div>
  </div>
</section>

${integrations.googleReviewUrl ? `<section class="review-sec" aria-labelledby="rev-h">
  <div class="wrap wrap--narrow">
    <h2 id="rev-h">Worked With Patch Master? Share Your Experience.</h2>
    <p>Tell us how your project went.</p>
    <div class="btn-row btn-row--center"><a class="btn" href="/feedback/">Leave a Review</a></div>
  </div>
</section>` : ''}

<section class="section section--alt areas" aria-labelledby="areas-h">
  <div class="wrap areas__grid">
    <div>
      ${eyebrow('Service Area')}
      <h2 id="areas-h">Drywall Services Across Metro Detroit.</h2>
      <p>Based in Dearborn Heights, The Original Patch Master serves homeowners throughout Metro Detroit, Downriver and surrounding communities.</p>
    </div>
    <ul class="areas__list">
      ${locations.map((l) => `<li><a href="${locUrl(l.slug)}">${esc(l.name)}${icon('arrow')}</a></li>`).join('')}
    </ul>
  </div>
</section>

${ctaBand({ h: 'Have a Drywall Project in Mind?', p: "Tell us what needs to be repaired, installed or finished. We'll discuss the job and provide a free estimate." })}
`;

  return page(
    {
      title: 'The Original Patch Master | Commercial Drywall & Plaster',
      desc: 'Commercial drywall installation, plaster repair and finishing across Metro Detroit, plus residential work. 25 years in the trade. Fully insured. Free estimates.',
      path: '/',
      schema: [businessSchema()],
      extraHead: hero.layout === 'framed' ? `<link rel="preload" as="image" href="${hero.poster}" fetchpriority="high">` : `<link rel="preload" as="image" href="${hero.poster}" media="(max-width: 899px)" fetchpriority="high">
<link rel="preload" as="image" href="${hero.widePoster}" media="(min-width: 900px)" fetchpriority="high">`,
    },
    body,
  );
}

// ===========================================================================
// SERVICES INDEX
// ===========================================================================
export function servicesIndex() {
  const crumbs = [homeCrumb, { name: 'Services', href: '/services/' }];
  const finish = svc('basement-garage-house-finishing');
  const others = services.filter((s) => s !== finish);
  const body = `
${pageHero({ crumbs, h1: 'Drywall, Plaster and Finishing Services', lead: 'Commercial drywall installation, repair and finishing, plus residential repairs and basement, garage and whole-house work. Pick a service to see what is involved.' })}
<section class="section features">
  <div class="wrap">
    <div class="feature">
      <div class="feature__media">${slotMedia('services-finishing', { ratio: '4/5' })}</div>
      <div class="feature__copy">
        ${eyebrow('Priority Work')}
        <h2>Basements, Garages and Whole Houses</h2>
        <p>Finishing entire spaces is a priority for The Original Patch Master. We hang, tape, finish and sand, with insulation available while the walls are open. Every job starts with a free estimate.</p>
        <a class="btn" href="${svcUrl(finish.slug)}">Basement, Garage &amp; House Finishing</a>
      </div>
    </div>
  </div>
</section>
<section class="section section--alt" aria-labelledby="all-h">
  <div class="wrap">
    <div class="sec-head">${eyebrow('All Services')}<h2 id="all-h">Everything We Do</h2></div>
    <div class="grid grid--3">${others.map((x) => serviceCard(x)).join('')}</div>
  </div>
</section>
${ctaBand({ h: 'Not Sure What the Job Needs?', p: 'Describe it and we will tell you what it takes. Estimates are free.' })}`;
  return page(
    {
      title: 'Drywall & Plaster Services | The Original Patch Master',
      desc: 'Commercial drywall installation, repair and finishing, plaster repair, Level 5 finishing, dustless sanding, insulation and window glazing from The Original Patch Master.',
      path: '/services/',
      schema: [breadcrumbSchema(crumbs.map((c, i) => ({ ...c })))],
    },
    body,
  );
}

// ===========================================================================
// SERVICE PAGE TEMPLATE
// ===========================================================================
export function servicePage(s) {
  const p = svcUrl(s.slug);
  const crumbs = [homeCrumb, { name: 'Services', href: '/services/' }, { name: s.name, href: p }];
  const rel = s.related.map(svc);
  const flip = ['plaster-repair', 'dustless-sanding', 'insulation', 'level-5-finishing'].includes(s.slug);
  const areaLinks = ['dearborn-heights', 'dearborn', 'monroe', 'carleton', 'downriver'].map((l) => `<a href="${locUrl(l)}">${esc(loc(l).name)}</a>`);
  const areaSentence = `${areaLinks.slice(0, -1).join(', ')} and ${areaLinks.at(-1)}`;
  const mopt = { ratio: '4/5', optional: true, sizes: '(min-width: 860px) 534px, 100vw' };
  const svcMedia = (n) => {
    const slot = `service-${s.slug}-${n}`;
    return slotVideo[slot] ? vidFigure(slotVideo[slot]) : media(slot, { ...mopt, alt: `${s.name} by The Original Patch Master` });
  };
  const m1 = svcMedia(1);
  const m2 = svcMedia(2);
  const gal = [3, 4, 5].map((n) => media(`service-${s.slug}-${n}`, { ratio: '4/3', optional: true })).filter(Boolean);

  const body = `
${pageHero({ crumbs, h1: s.h1, lead: s.lead, slot: `service-${s.slug}-hero`, note: `Wide photo related to ${s.name.toLowerCase()}. 16:9 or wider. Optional.` })}

<section class="section">
  <div class="wrap split${flip ? ' split--flip' : ''}${m1 ? '' : ' split--solo'}">
    <div class="split__copy">
      ${eyebrow(s.name)}
      <h2>${esc(s.h1 === s.name ? `About ${s.name}` : s.name)}</h2>
      ${s.intro.map((t) => `<p>${esc(t)}</p>`).join('')}
    </div>
    ${m1 ? `<div class="split__media">${m1}</div>` : ''}
  </div>
</section>

${s.sections ? `<section class="section section--alt"><div class="wrap">
  <div class="sec-head"><h2>Three Kinds of Projects</h2></div>
  <div class="grid grid--3">${s.sections.map((x) => `<article class="plain-card"><h3>${esc(x.h)}</h3><p>${esc(x.p)}</p></article>`).join('')}</div>
</div></section>` : ''}

<section class="section${s.sections ? '' : ' section--alt'}" aria-labelledby="inv-h">
  <div class="wrap two-col">
    <div>
      ${eyebrow('What It Involves')}
      <h2 id="inv-h">What the Work Includes</h2>
      <ul class="checks">${s.involves.map((i) => `<li>${icon('check')}<span>${esc(i)}</span></li>`).join('')}</ul>
    </div>
    <div>
      ${eyebrow('Common Situations')}
      <h2>${esc(s.situationsTitle)}</h2>
      <ul class="sit">${s.situations.map((x) => `<li><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section${s.sections ? ' section--alt' : ''}">
  <div class="wrap split${flip ? '' : ' split--flip'}${m2 ? '' : ' split--solo'}">
    <div class="split__copy">
      ${eyebrow('Our Approach')}
      <h2>${esc(s.approachTitle)}</h2>
      ${s.approach.map((t) => `<p>${esc(t)}</p>`).join('')}
      <div class="btn-row">${estimateBtn()}${callBtn('btn--outline')}</div>
    </div>
    ${m2 ? `<div class="split__media">${m2}</div>` : ''}
  </div>
</section>

${gal.length ? `<section class="section section--alt" aria-labelledby="proj-h">
  <div class="wrap">
    <div class="sec-head">${eyebrow('Project Photos')}<h2 id="proj-h">${esc(s.name)} Photos</h2></div>
    <div class="work__grid work__grid--${gal.length}">${gal.join('')}</div>
  </div>
</section>` : ''}

${gal.length ? faqBlock(s.faq, `${s.name}: Common Questions`).replace('section section--alt', 'section') : faqBlock(s.faq, `${s.name}: Common Questions`)}

<section class="section${gal.length ? ' section--alt' : ''}" aria-labelledby="rel-h">
  <div class="wrap">
    <div class="sec-head"><h2 id="rel-h">Related Services</h2></div>
    <div class="grid grid--3">${rel.map((x) => serviceCard(x)).join('')}</div>
    <p class="also">The Original Patch Master serves ${areaSentence}.</p>
  </div>
</section>

${ctaBand({ h: `Need ${s.name === 'Basements, Garages & Houses' ? 'a Space Finished' : s.name}?`, p: 'Tell us about the job and we will give you a free estimate.' })}`;

  const schema = [
    breadcrumbSchema(crumbs),
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.name,
      description: s.desc,
      provider: { '@type': 'HomeAndConstructionBusiness', '@id': abs('/#business'), name: site.name, telephone: '+1-734-489-2284' },
      areaServed: ['Dearborn Heights', 'Dearborn', 'Monroe', 'Carleton', 'Downriver'].map((n) => ({ '@type': 'Place', name: n + ', MI' })),
    }),
    faqSchema(s.faq),
  ];
  return page({ title: s.title, desc: s.desc, path: p, schema }, body);
}

// ===========================================================================
// LOCATIONS
// ===========================================================================
export function areasIndex() {
  const crumbs = [homeCrumb, { name: 'Service Areas', href: '/service-areas/' }];
  const body = `
${pageHero({ crumbs, h1: 'Service Areas', lead: 'The Original Patch Master is based in Dearborn Heights and takes jobs across the surrounding area.' })}
<section class="section">
  <div class="wrap">
    <div class="sec-head">${eyebrow('Where We Work')}<h2>Pick Your Area</h2></div>
    <div class="grid grid--3">
      ${locations.map((l) => `<article class="card-link"><span class="card-link__icon">${icon('pin')}</span><h3><a href="${locUrl(l.slug)}">${esc(l.name)}</a></h3><p>${esc(l.short)}</p><a class="more" href="${locUrl(l.slug)}" aria-label="${esc(l.name)} service area">See details ${icon('arrow')}</a></article>`).join('')}
    </div>
    <p class="also">Not sure we reach your town? Call <a href="${site.phoneHref}">${PH}</a> and ask.</p>
  </div>
</section>
${ctaBand()}`;
  return page(
    {
      title: 'Service Areas | The Original Patch Master',
      desc: 'The Original Patch Master serves Dearborn Heights, Dearborn, Monroe, Carleton, Downriver and the wider Metro Detroit area. Free estimates.',
      path: '/service-areas/',
      schema: [breadcrumbSchema(crumbs)],
    },
    body,
  );
}

export function locationPage(l) {
  const p = locUrl(l.slug);
  const crumbs = [homeCrumb, { name: 'Service Areas', href: '/service-areas/' }, { name: l.name, href: p }];
  const sections = l.sections
    .map((s, i) => {
      const cards = s.services ? `<ul class="chips">${s.services.map((x) => `<li><a href="${svcUrl(x)}">${esc(svc(x).name)}</a></li>`).join('')}</ul>` : '';
      const list = s.list ? `<ul class="checks">${s.list.map((x) => `<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}</ul>` : '';
      const all = s.allAreas ? `<ul class="chips">${locations.filter((x) => x.slug !== l.slug).map((x) => `<li><a href="${locUrl(x.slug)}">${esc(x.name)}</a></li>`).join('')}</ul>` : '';
      return `<div class="loc-block"><h2>${esc(s.h)}</h2>${(s.p || []).map((t) => `<p>${esc(t)}</p>`).join('')}${list}${cards}${all}</div>`;
    })
    .join('\n');
  const near = l.near.map(loc);
  const heroPhoto = locationPhoto(l.slug);
  const lgal = [1, 2, 3].map((n) => slotMedia(`area-${l.slug}-${n}`, { ratio: '4/5', pause: false, optional: true })).filter(Boolean);
  const body = `
${pageHero({ crumbs, h1: l.h1, lead: l.lead, photo: heroPhoto })}
<section class="section">
  <div class="wrap loc">
    <div class="loc__main">${sections}</div>
    <aside class="loc__aside" aria-label="Contact The Original Patch Master">
      <div class="aside-card">
        <h2>Free Estimate</h2>
        <p>Tell us about the job in ${esc(l.name)}.</p>
        <a class="btn btn--block" href="/contact/">Get a Free Estimate</a>
        <a class="btn btn--outline btn--block" href="${site.phoneHref}">Call ${PH}</a>
        <p class="aside-card__hours">${site.hours.days}<br>7:00 AM to 5:00 PM</p>
      </div>
      <div class="aside-card aside-card--plain">
        <h2>Nearby Areas</h2>
        <ul>${near.map((n) => `<li><a href="${locUrl(n.slug)}">${esc(n.name)}</a></li>`).join('')}</ul>
      </div>
    </aside>
  </div>
</section>
${lgal.length ? `<section class="section section--alt">
  <div class="wrap">
    <div class="sec-head">${eyebrow('Our Work')}<h2>A Look at the Work</h2></div>
    <div class="work__grid work__grid--3">${lgal.join('')}</div>
    <p class="also"><a href="/our-work/">See more of our work</a></p>
  </div>
</section>` : ''}
${lgal.length ? faqBlock(l.faq, 'Common Questions').replace('section section--alt', 'section') : faqBlock(l.faq, 'Common Questions')}
${ctaBand()}`;
  const schema = [
    breadcrumbSchema(crumbs),
    jsonLd({ '@context': 'https://schema.org', '@type': 'WebPage', name: l.title, description: l.desc, about: { '@id': abs('/#business') } }),
    faqSchema(l.faq),
  ];
  return page({ title: l.title, desc: l.desc, path: p, schema, extraHead: heroPhoto ? heroPhoto.preload : '' }, body);
}

// ===========================================================================
// ABOUT
// ===========================================================================
export function about() {
  const crumbs = [homeCrumb, { name: 'About', href: '/about/' }];
  const values = [
    { icon: 'chat', t: 'Honest answers', p: 'If a patch will do, we say so. If a section needs replacing, we say that too.' },
    { icon: 'clipboard', t: 'Fair prices', p: 'Estimates are free and priced for the work involved. Small jobs and large jobs get the same care.' },
    { icon: 'users', t: 'Plain talk', p: 'We explain what needs to be done and answer your questions before the job starts.' },
  ];
  const facts = [
    ['Experience', '25 years in the trade'],
    ['Work', 'Commercial and residential'],
    ['Ownership', 'Family owned and operated'],
    ['Insurance', 'Fully insured'],
    ['Estimates', 'Free'],
    ['Equipment', 'Specialized equipment for dustless sanding'],
    ['Job size', 'Small repairs to larger projects'],
    ['Based in', 'Dearborn Heights, Michigan'],
  ];
  const body = `
${pageHero({ crumbs, h1: 'Commercial Drywall & Plaster Specialists', lead: 'Skilled craftsmen delivering professional drywall, plaster repair and finishing across Metro Detroit.', ctas: false })}
<section class="section">
  <div class="wrap split">
    <div class="split__media">
      <div class="about__media">
        ${media('about-page-family', { ratio: '3/4', sizes: '(min-width: 860px) 260px, 45vw' })}
        ${media('about-page-jonas', { ratio: '3/4', sizes: '(min-width: 860px) 260px, 45vw' })}
      </div>
    </div>
    <div class="split__copy">
      ${eyebrow('Who We Are')}
      <h2>Skilled Craftsmen. Quality Finishes.</h2>
      <p>At The Original Patch Master, our team of highly qualified craftsmen takes pride in delivering professional drywall, plaster repair, and finishing work. From commercial projects to detailed repairs, we focus on quality workmanship, reliability, and results that speak for themselves.</p>
      <p>With 25 years in the trade, we handle commercial drywall installation, plaster repair and finishing, as well as residential repairs and larger projects like basements and garages.</p>
      <p>The Original Patch Master is a family-owned company based in Dearborn Heights. Every job starts with a free estimate and a straight explanation of what the work involves.</p>
    </div>
  </div>
</section>
<section class="section section--alt">
  <div class="wrap split">
    <div class="split__copy">
      ${eyebrow('Commercial Work')}
      <h2>Commercial Drywall &amp; Plaster</h2>
      <p>Commercial drywall installation, repair and finishing is a priority for The Original Patch Master. We hang, tape, finish and sand, and we repair plaster, in commercial properties across Metro Detroit.</p>
      <p>Tell us about the property and the work involved, and we will provide a free estimate.</p>
      <div class="btn-row">${estimateBtn()}${callBtn('btn--outline')}</div>
    </div>
    <div class="split__media">${vidFigure(slotVideo['service-drywall-installation-1'])}</div>
  </div>
</section>
<section class="section" aria-labelledby="val-h">
  <div class="wrap">
    <div class="sec-head">${eyebrow('How We Work')}<h2 id="val-h">What Customers Can Expect</h2></div>
    <ul class="how__grid how__grid--3">${values.map((v) => `<li>${icon(v.icon)}<h3>${esc(v.t)}</h3><p>${esc(v.p)}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="section section--alt">
  <div class="wrap split split--flip">
    <div class="split__copy">
      ${eyebrow('Small and Large Jobs')}
      <h2>From a Patch to a Whole House</h2>
      <p>We repair drywall and plaster, hang and finish new drywall in commercial and residential spaces, sand with dustless equipment and handle insulation, window glazing and caulking. Finishing basements, garages and entire houses is a priority.</p>
      <a class="btn" href="/services/">See Our Services</a>
    </div>
    <div class="split__media split__media--portrait">
      ${slotMedia('about-page-jobsite', { ratio: '4/5', sizes: '(min-width: 860px) 440px, 100vw' })}
    </div>
  </div>
</section>
<section class="section" aria-labelledby="facts-h">
  <div class="wrap">
    <div class="sec-head">${eyebrow('The Details')}<h2 id="facts-h">At a Glance</h2></div>
    <div class="facts-wrap">
      <div class="facts-wrap__truck">${media('about-page-truck', { ratio: '4/5', sizes: '(min-width: 860px) 300px, 70vw' })}</div>
      <dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div>
  </div>
</section>
${ctaBand({ h: 'Have a Job in Mind?', p: 'Call or send us the details. Estimates are free.' })}`;
  return page(
    {
      title: 'About The Original Patch Master | Commercial Drywall & Plaster',
      desc: 'The Original Patch Master is a commercial drywall and plaster company in Dearborn Heights. Skilled craftsmen, 25 years in the trade, serving Metro Detroit.',
      path: '/about/',
      schema: [breadcrumbSchema(crumbs)],
    },
    body,
  );
}

// ===========================================================================
// OUR WORK
// ===========================================================================
export function ourWork() {
  const crumbs = [homeCrumb, { name: 'Our Work', href: '/our-work/' }];
  const body = `
${pageHero({ crumbs, h1: 'Our Work', lead: 'Real footage from Patch Master jobs: taping and finishing, sanding, ceiling and high-wall work. Tap any clip to watch.', ctas: false })}
<section class="section">
  <div class="wrap">
    <div class="filters" role="group" aria-label="Filter projects">
      ${galleryFilters.map(([k, label], i) => `<button type="button" class="filter" data-filter="${k}" aria-pressed="${i === 0}">${label}</button>`).join('')}
    </div>
    <!-- GALLERY: real clips. Each tile shows a still and loads its MP4 only when opened.
         Add clips in src/data.mjs (gallery array) after encoding them (see MEDIA.md). -->
    <ul class="gallery" id="gallery">
      ${gallery.map((g) => `<li data-cat="${g.category}">
        ${vidFigure(preview(g.preview), '4/5', { pause: false, cls: 'media--tile' })}
        <button type="button" class="tile-btn" data-video="${g.video}" data-title="${esc(g.label)}" aria-label="Play video: ${esc(g.label)}"><span class="tile-btn__play" aria-hidden="true">${icon('play')}</span><span class="tile-btn__label">${esc(g.label)}</span></button>
      </li>`).join('\n      ')}
    </ul>
    <dialog class="vdlg" id="video-dialog" aria-labelledby="vdlg-title">
      <div class="vdlg__bar"><p id="vdlg-title"></p><button type="button" class="vdlg__close" aria-label="Close video">${icon('close')}</button></div>
      <video class="vdlg__video" controls playsinline preload="none"></video>
    </dialog>
    <p class="gallery__empty" id="gallery-empty" hidden>No photos in this category yet.</p>
    <div class="social-box">
      <h2>More Photos on Social</h2>
      <p>New jobs show up on our Facebook and Instagram pages.</p>
      <div class="btn-row">
        <a class="btn btn--navy" href="${site.social.facebook}" target="_blank" rel="noopener">${icon('facebook')}Facebook</a>
        <a class="btn btn--navy" href="${site.social.instagram}" target="_blank" rel="noopener">${icon('instagram')}Instagram</a>
      </div>
    </div>
  </div>
</section>
${ctaBand({ h: 'Want This on Your Walls?', p: 'Tell us about your project and get a free estimate.' })}`;
  return page(
    {
      title: 'Our Work | The Original Patch Master',
      desc: 'Browse The Original Patch Master drywall, plaster, basement, garage and finishing projects from Dearborn Heights and Metro Detroit.',
      path: '/our-work/',
      schema: [breadcrumbSchema(crumbs)],
    },
    body,
  );
}

// ===========================================================================
// CONTACT
// ===========================================================================
export function contact() {
  const crumbs = [homeCrumb, { name: 'Contact', href: '/contact/' }];
  const a = site.address;
  const body = `
${pageHero({ crumbs, h1: 'Get a Free Estimate', lead: 'Call, email or send the details below. Tell us what you are working on, commercial or residential, and we will take a look.', ctas: false })}
<section class="section">
  <div class="wrap contact">
    <div class="contact__info">
      <h2>Contact The Original Patch Master</h2>
      <a class="contact__phone" href="${site.phoneHref}">${icon('phone')}${PH}</a>
      <ul class="contact__list">
        <li>${icon('mail')}<span><strong>Email</strong><a href="mailto:${site.email}">${site.email}</a></span></li>
        <li>${icon('clock')}<span><strong>Hours</strong>${site.hours.days}<br>7:00 AM to 5:00 PM</span></li>
        <li>${icon('pin')}<span><strong>Business Address</strong>${a.street}<br>${a.city}, ${a.region}</span></li>
        <li>${icon('check')}<span><strong>Estimates</strong>Free</span></li>
      </ul>
      <ul class="social social--dark">
        <li><a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="The Original Patch Master on Facebook">${icon('facebook')}</a></li>
        <li><a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="The Original Patch Master on Instagram">${icon('instagram')}</a></li>
      </ul>
    </div>
    <div class="contact__form">
      <h2>Tell Us About the Job</h2>
      <!-- FORM ENDPOINT: set \`formEndpoint\` in src/data.mjs (Formspree, Basin, Netlify, etc.) and rebuild.
           While it is empty the form does not submit; it tells the visitor to call or email instead. -->
      <form id="estimate-form" method="post" action="${site.formEndpoint || ''}" data-endpoint="${site.formEndpoint || ''}" data-ok="Thank you! Your request has been sent. The Patch Master team will be in touch soon." data-required="name,phone,message" data-source data-ghl-proxy="${integrations.ghlLeadProxy}" data-book-url="${integrations.bookAfterEstimate && integrations.ghlCalendarEmbedUrl ? '/book-estimate/' : ''}" novalidate>
        <input type="hidden" name="_subject" value="New estimate request: The Original Patch Master">
        <input type="hidden" name="source_page" value="Contact (/contact/)">
        <input type="hidden" name="submitted_at" value="">
        <input type="hidden" name="lead_id" value="">
        <input type="hidden" name="sms_consent_version" value="${integrations.smsConsentVersion}">
        <input type="hidden" name="sms_service_consent" value="No">
        <input type="hidden" name="sms_consent_service" value="false">
        <input type="hidden" name="sms_service_consent_text" value="">
        ${integrations.smsMarketingEnabled ? '<input type="hidden" name="sms_marketing_consent" value="No"><input type="hidden" name="sms_consent_marketing" value="false"><input type="hidden" name="sms_marketing_consent_text" value="">' : ''}
        <input type="hidden" name="sms_consent_recorded_at" value="">
        <div class="field-row">
          <div class="field"><label for="f-name">Name <span class="req">(required)</span></label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
          <div class="field"><label for="f-phone">Phone <span class="req">(required)</span></label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
          <div class="field"><label for="f-city">City</label><input id="f-city" name="city" type="text" autocomplete="address-level2"></div>
        </div>
        <div class="field"><label for="f-service">Service needed</label>
          <select id="f-service" name="service">
            <option value="">Choose one</option>
            ${services.map((s) => `<option>${esc(s.name)}</option>`).join('')}
            <option>Not sure yet</option>
          </select>
        </div>
        <div class="field"><label for="f-msg">Tell us about the job <span class="req">(required)</span></label><textarea id="f-msg" name="message" rows="5" required></textarea></div>
        <fieldset class="field field--radios">
          <legend>Preferred contact method</legend>
          <label><input type="radio" name="contact_method" value="Phone" checked> Phone</label>
          <label><input type="radio" name="contact_method" value="Email"> Email</label>
        </fieldset>
        <div class="consent" role="group" aria-label="Text message preferences (optional)">
          <div class="consent__block">
            <input type="checkbox" id="sms-service" data-consent="service">
            <label for="sms-service" data-consent-text="service">${esc(smsConsent.service)}</label>
          </div>
          ${integrations.smsMarketingEnabled ? `<div class="consent__block">
            <input type="checkbox" id="sms-marketing" data-consent="marketing">
            <label for="sms-marketing" data-consent-text="marketing">${esc(smsConsent.marketing)}</label>
          </div>` : ''}
          <p class="consent__fine">${esc(smsConsent.note)} Messages are sent by The Original Patch Master, 25244 Annapolis St, Dearborn Heights, MI. See our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms-and-conditions/">Terms &amp; Conditions</a>.</p>
        </div>
        <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
        <button class="btn btn--block-sm" type="submit">Send Estimate Request</button>
        <p class="form-note" id="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>`;
  return page(
    {
      title: 'Free Drywall Estimate | Contact The Original Patch Master',
      desc: 'Call 734-489-2284 or send the details for a free commercial or residential drywall, plaster or finishing estimate from The Original Patch Master.',
      path: '/contact/',
      schema: [businessSchema(), breadcrumbSchema(crumbs)],
    },
    body,
  );
}


// ===========================================================================
// CAREERS
// ===========================================================================
export function careers() {
  const crumbs = [homeCrumb, { name: 'Careers', href: '/careers/' }];
  const values = [
    ['Reliability', 'Show up when you say you will and do what you said you would do.'],
    ['Hard work', 'Drywall and plaster are physical trades. We expect steady effort from everyone on the job.'],
    ['Attention to detail', 'Seams, corners and sanding all show in the finished wall.'],
    ['Respect for customers', 'People let us into their homes. We expect everyone to treat those homes with care.'],
  ];
  const experience = ['Drywall installation', 'Taping and finishing', 'Plaster repair', 'Sanding', 'Insulation', 'Window glazing and caulking'];
  const body = `
${pageHero({ crumbs, h1: 'Come Work With Patch Master.', lead: 'The Original Patch Master is a family-owned drywall and plaster business serving Metro Detroit. If you know the trade and want to work for a family business, we would like to hear from you.', ctas: false, cls: 'page-hero--wide-h1', extra: '<div class="btn-row"><a class="btn" href="#apply">Apply Now</a></div>' })}
<section class="section">
  <div class="wrap split">
    <div class="split__copy">
      ${eyebrow('Careers')}
      <h2>Who We Look For</h2>
      <p>We value people who are reliable, work hard, pay attention to the details and treat customers with respect.</p>
      <ul class="checks">${values.map(([t, d]) => `<li>${icon('check')}<span><strong>${esc(t)}.</strong> ${esc(d)}</span></li>`).join('')}</ul>
    </div>
    <div class="split__media">${slotMedia('careers-crew', { ratio: '4/5' })}</div>
  </div>
</section>
<section class="section section--alt" aria-labelledby="exp-h">
  <div class="wrap wrap--narrow">
    <div class="sec-head">${eyebrow('Experience')}<h2 id="exp-h">Work We Do</h2></div>
    <p class="center">We are interested in people with experience in:</p>
    <ul class="chips chips--center">${experience.map((x) => `<li><span class="chip">${esc(x)}</span></li>`).join('')}</ul>
    <p class="center">Experience in related trades is welcome too. We do not have specific openings posted. If you want to be considered, send us your information below.</p>
  </div>
</section>
<section class="section" id="apply" aria-labelledby="apply-h">
  <div class="wrap wrap--narrow">
    <div class="sec-head">${eyebrow('Apply')}<h2 id="apply-h">Apply Now</h2></div>
    <div class="contact__form">
      <!-- APPLICATION ENDPOINT: set \`careersEndpoint\` in src/data.mjs (a form service that emails or stores these separately from
           customer estimate requests) and rebuild. While it is empty the form does not submit; it tells the applicant to call or email. -->
      <form id="careers-form" method="post" action="${site.careersEndpoint || ''}" data-endpoint="${site.careersEndpoint || ''}" data-required="name,phone,email"
            data-missing="Please fill in your name, phone number and email address."
            data-noendpoint="Online applications are not switched on yet, so nothing was sent. Please call ${PH} or email ${site.email}."
            data-ok="Thank you. Your application was sent. If we think you could be a fit, we will contact you." novalidate>
        <input type="hidden" name="form_type" value="Job application">
        <input type="hidden" name="_subject" value="Job application: The Original Patch Master">
        <div class="field-row">
          <div class="field"><label for="a-name">Full name <span class="req">(required)</span></label><input id="a-name" name="name" type="text" autocomplete="name" required></div>
          <div class="field"><label for="a-phone">Phone number <span class="req">(required)</span></label><input id="a-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="a-email">Email address <span class="req">(required)</span></label><input id="a-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="a-city">City / location</label><input id="a-city" name="city" type="text" autocomplete="address-level2"></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="a-years">Years of experience</label>
            <select id="a-years" name="years"><option value="">Choose one</option><option>Less than 1 year</option><option>1 to 2 years</option><option>3 to 5 years</option><option>6 to 10 years</option><option>More than 10 years</option></select>
          </div>
          <div class="field"><label for="a-start">Availability / earliest start date</label><input id="a-start" name="start_date" type="text" placeholder="For example: immediately, or November 1"></div>
        </div>
        <fieldset class="field field--radios">
          <legend>Type of work you have experience in</legend>
          ${['Drywall installation', 'Taping and finishing', 'Plaster repair', 'Sanding', 'Insulation', 'Window glazing and caulking', 'Other'].map((w) => `<label><input type="checkbox" name="work" value="${w}"> ${w}</label>`).join('')}
        </fieldset>
        <div class="field"><label for="a-exp">Brief description of your experience</label><textarea id="a-exp" name="experience" rows="5"></textarea></div>
        <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
        <button class="btn btn--block-sm" type="submit">Submit Application</button>
        <p class="form-note" id="form-status" role="status" aria-live="polite"></p>
        <p class="form-fine">Sending an application does not guarantee a job. Prefer to talk? Call <a href="${site.phoneHref}">${PH}</a>, ${site.hours.days}, 7 AM to 5 PM.</p>
      </form>
    </div>
  </div>
</section>`;
  return page(
    {
      title: 'Careers | The Original Patch Master',
      desc: 'Apply to work with The Original Patch Master, a family-owned drywall and plaster business serving Metro Detroit. Experience in drywall, finishing or plaster welcome.',
      path: '/careers/',
      schema: [breadcrumbSchema(crumbs)],
    },
    body,
  );
}

// ===========================================================================
// LEGAL
// ===========================================================================
const LEGAL_UPDATED = 'October 21, 2026';
const legalPage = ({ path: p, title, desc, h1, lead, body }) => {
  const crumbs = [homeCrumb, { name: h1, href: p }];
  return page(
    { title, desc, path: p, schema: [breadcrumbSchema(crumbs)] },
    `${pageHero({ crumbs, h1, lead, ctas: false })}
<section class="section"><div class="wrap"><div class="prose">
  <p class="updated">Last updated: ${LEGAL_UPDATED}</p>
${body}
</div></div></section>`,
  );
};
const BIZ = 'The Original Patch Master';
const ADDR = `${site.address.street}, ${site.address.city}, ${site.address.region}`;
const contactLine = `<a href="${site.phoneHref}">${PH}</a> or <a href="mailto:${site.email}">${site.email}</a>`;

export function privacyPolicy() {
  return legalPage({
    path: '/privacy-policy/',
    title: 'Privacy Policy | The Original Patch Master',
    desc: 'How The Original Patch Master collects and uses information from website forms, including text message (SMS) communications.',
    h1: 'Privacy Policy',
    lead: `How ${BIZ} handles information you send through this website.`,
    // OWNER REVIEW before relying on this page for A2P / legal purposes:
    //  - Confirm the list of service providers (Formspree, GoHighLevel) matches what is actually switched on.
    //  - Confirm the data-retention approach and who handles privacy requests.
    //  - Have the owner (or counsel) read it. It is plain-language, not legal advice.
    body: `
<h2>Who we are</h2>
<p>${BIZ} is a drywall and plaster company based at ${ADDR}. This policy covers this website, originalpatchmaster.com.</p>

<h2>Information we collect</h2>
<p>We collect only what you choose to send us through our forms:</p>
<ul>
  <li><strong>Estimate and contact requests:</strong> your name, phone number, email address, city, the service you need, your message, and your preferred contact method.</li>
  <li><strong>Job applications:</strong> your name, phone, email, location, work experience, availability and any description you write.</li>
  <li><strong>Feedback:</strong> a star rating and any comments, name or contact details you choose to add.</li>
  <li><strong>Text message sign-up:</strong> if you use our <a href="/sms-opt-in/">SMS opt-in page</a>, your name, mobile number, optional email address and your text message choices.</li>
  <li><strong>Text message choices:</strong> whether you agreed to receive text messages, the wording you saw, when you agreed, and which page you used.</li>
  <li><strong>Form details:</strong> the page a form was sent from and the time it was sent.</li>
</ul>
<p>This website does not currently add analytics or advertising cookies.</p>

<h2>How we use it</h2>
<ul>
  <li>To reply to you, prepare estimates and schedule appointments.</li>
  <li>To send service-related communication about your inquiry, estimate, appointment or job.</li>
  <li>To consider job applications.</li>
  <li>To keep a record of your requests and your text message choices.</li>
</ul>
<p>We do not sell your personal information.</p>

<h2>Text messages (SMS)</h2>
<p>We send text messages only if you agree by checking the optional text message box on a form, or by otherwise agreeing to receive them. Agreeing is voluntary and is not a condition of purchase or of requesting an estimate or any service. You can also sign up on our <a href="/sms-opt-in/">SMS opt-in page</a>.</p>
<ul>
  <li>Service-related messages cover your inquiries, estimates, appointments and service updates. If you separately opt in to marketing texts, you may also receive occasional promotional messages, such as seasonal offers and review requests. Message frequency varies.</li>
  <li>Message and data rates may apply.</li>
  <li>Reply <strong>STOP</strong> at any time to opt out. Reply <strong>HELP</strong> for assistance, or contact us at ${contactLine}.</li>
  <li>${BIZ} does not sell or share text message consent or mobile phone numbers with third parties for their own marketing or promotional purposes.</li>
</ul>
<p>See our <a href="/terms-and-conditions/">Terms &amp; Conditions</a> for the full text message terms.</p>

<h2>Who handles your information</h2>
<p>We use service providers to run our business operations: Formspree receives and delivers the forms you submit on this website, and GoHighLevel manages customer records, appointments and messaging. These providers process your information for us. We may also share information when the law requires it.</p>

<h2>How long we keep it, and security</h2>
<p>We keep information for as long as we need it to respond to you, provide estimates and services, keep business records, or meet legal requirements. We rely on our service providers' security measures. No method of sending or storing information is completely secure, so we cannot guarantee absolute security.</p>

<h2>Your choices</h2>
<p>You can opt out of text messages at any time by replying STOP. To ask about, correct or delete the information you sent us, contact us at ${contactLine}.</p>

<h2>Changes to this policy</h2>
<p>We may update this policy. The date at the top shows when it last changed.</p>

<h2>Contact us</h2>
<p>${BIZ}<br>${ADDR}<br>${contactLine}</p>`,
  });
}

export function terms() {
  return legalPage({
    path: '/terms-and-conditions/',
    title: 'Terms & Conditions | The Original Patch Master',
    desc: 'Website terms and text message (SMS) terms for The Original Patch Master, a commercial drywall and plaster company in Dearborn Heights, MI.',
    h1: 'Terms & Conditions',
    lead: `Terms for using this website and for text messages from ${BIZ}.`,
    // OWNER REVIEW: the governing-law line and liability wording below are standard plain-language text,
    // not legal advice. Confirm with the owner or counsel. Confirm the SMS section matches the GHL campaign registration.
    body: `
<h2>Using this website</h2>
<p>This website is operated by ${BIZ}, ${ADDR}. By using it you agree to these terms. If you do not agree, please do not use the site.</p>

<h2>Information and estimates</h2>
<p>The website describes our services in general terms. Estimates are free. A request for an estimate is not a contract, and any work is agreed separately with us. We try to keep the information here accurate but it may change without notice.</p>

<h2>Acceptable use</h2>
<p>Please send us accurate information and do not misuse the site or its forms, including sending spam or attempting to disrupt it.</p>

<h2>Liability</h2>
<p>The website is provided as is. To the extent the law allows, ${BIZ} is not liable for losses from using the website or relying on its general information. This does not limit rights you have under the law.</p>

<h2>Governing law</h2>
<p>These terms are governed by the laws of the State of Michigan.</p>

<h2 id="sms">Text messaging terms</h2>
<ul>
  <li><strong>Who sends the messages:</strong> ${BIZ}, ${ADDR}.</li>
  <li><strong>What you may receive:</strong> messages about your inquiries, estimates, appointments and service updates. If you separately opt in to marketing texts, you may also receive occasional promotional messages, such as seasonal offers and review requests.</li>
  <li><strong>How you agree:</strong> by checking the optional text message box on a form, by signing up on our <a href="/sms-opt-in/">SMS opt-in page</a>, or by otherwise agreeing to receive texts. Agreeing is voluntary and is not a condition of purchase or of requesting an estimate or any service.</li>
  <li><strong>Message frequency:</strong> varies.</li>
  <li><strong>Costs:</strong> message and data rates may apply.</li>
  <li><strong>Opt out:</strong> reply <strong>STOP</strong> at any time. You may get one message confirming you have opted out.</li>
  <li><strong>Help:</strong> reply <strong>HELP</strong>, or contact us at ${contactLine}.</li>
  <li><strong>Carriers:</strong> mobile carriers are not liable for delayed or undelivered messages.</li>
  <li><strong>Your information:</strong> see our <a href="/privacy-policy/">Privacy Policy</a>. We do not sell or share text message consent or mobile numbers with third parties for their own marketing.</li>
</ul>

<h2>Changes</h2>
<p>We may update these terms. The date at the top shows when they last changed.</p>

<h2>Contact us</h2>
<p>${BIZ}<br>${ADDR}<br>${contactLine}</p>`,
  });
}

// ===========================================================================
// BOOK ESTIMATE (GHL calendar embed)
// ===========================================================================
export function bookEstimate() {
  const crumbs = [homeCrumb, { name: 'Schedule Your Free Estimate', href: '/book-estimate/' }];
  const embed = integrations.ghlCalendarEmbedUrl;
  const ready = /^https:\/\//.test(embed || '');
  const body = `
${pageHero({ crumbs, h1: 'Schedule Your Free Estimate', lead: 'Pick a time that works for you and tell us about the job.', ctas: false })}
<section class="section">
  <div class="wrap wrap--narrow">
    <div class="prose">
      <h2>What to expect</h2>
      <ul>
        <li>Choose a day and time that works for you.</li>
        <li>We look at the job and give you a free estimate.</li>
        <li>We explain what the work involves.</li>
      </ul>
    </div>
    <!-- GHL CALENDAR: set \`integrations.ghlCalendarEmbedUrl\` in src/data.mjs to the iframe src from GHL and rebuild. See INTEGRATIONS.md. -->
    <div class="cal">${ready
      ? `<iframe src="${esc(embed)}" title="Schedule your free estimate" loading="lazy" scrolling="yes"></iframe>`
      : `<div class="cal-fallback"><h3>Online scheduling is coming soon</h3><p>To set up your free estimate now, call us or send the details through our contact form.</p><div class="btn-row btn-row--center"><a class="btn" href="${site.phoneHref}">Call ${PH}</a><a class="btn btn--outline" href="/contact/">Request an Estimate</a></div></div>`}</div>
    ${ready && integrations.ghlBookingLink ? `<p class="center" style="margin-top:18px">Calendar not loading? <a href="${esc(integrations.ghlBookingLink)}" target="_blank" rel="noopener">Open the booking calendar in a new tab</a>.</p>` : ''}
    <p class="center" style="margin-top:24px">Prefer to talk? Call <a href="${site.phoneHref}">${PH}</a>, ${site.hours.days}, 7 AM to 5 PM.</p>
  </div>
</section>`;
  return page({ title: 'Schedule Your Free Estimate | The Original Patch Master', desc: 'Schedule a free drywall or plaster estimate with The Original Patch Master in Dearborn Heights and Metro Detroit.', path: '/book-estimate/', schema: [breadcrumbSchema(crumbs)], noindex: !ready }, body);
}

// ===========================================================================
// FEEDBACK (no review gating: the Google button is shown to every rating)
// ===========================================================================
export function feedback() {
  const crumbs = [homeCrumb, { name: 'Feedback', href: '/feedback/' }];
  const g = integrations.googleReviewUrl;
  const body = `
${pageHero({ crumbs, h1: 'How Was Your Experience?', lead: `Thank you for choosing ${BIZ}. Your feedback helps us.`, ctas: false })}
<section class="section">
  <div class="wrap wrap--narrow">
    <div class="contact__form">
      <!-- FEEDBACK ENDPOINT: set \`integrations.feedbackEndpoint\` in src/data.mjs and rebuild. Empty => the form says it is not switched on. -->
      <form id="feedback-form" method="post" action="${integrations.feedbackEndpoint}" data-endpoint="${integrations.feedbackEndpoint}" data-required="" data-require-any="rating,message,name,contact"
            data-missing="Choose a rating or write a comment first, or use the Google review button below."
            data-noendpoint="Private feedback is not switched on yet, so nothing was sent. You can still leave a Google review below, or call ${PH}."
            data-ok="Thank you for your feedback." novalidate>
        <input type="hidden" name="form_type" value="Customer feedback">
        <input type="hidden" name="_subject" value="Customer feedback: The Original Patch Master">
        <input type="hidden" name="submitted_at" value="">
        <fieldset class="stars">
          <legend>Your rating (optional)</legend>
          ${[5, 4, 3, 2, 1].map((n) => `<input type="radio" id="star-${n}" name="rating" value="${n}"><label for="star-${n}"><span class="sr">${n} star${n > 1 ? 's' : ''}</span>${icon('star')}</label>`).join('')}
        </fieldset>
        <h2 style="font-size:1.25rem">Private feedback (optional)</h2>
        <div class="field"><label for="fb-msg">Tell us about your experience</label><textarea id="fb-msg" name="message" rows="5"></textarea></div>
        <div class="field-row">
          <div class="field"><label for="fb-name">Name (optional)</label><input id="fb-name" name="name" type="text" autocomplete="name"></div>
          <div class="field"><label for="fb-contact">Phone or email (optional)</label><input id="fb-contact" name="contact" type="text" autocomplete="off"></div>
        </div>
        <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
        <button class="btn btn--block-sm" type="submit">Send Private Feedback</button>
        <p class="form-note" id="form-status" role="status" aria-live="polite"></p>
      </form>
      <div class="review-cta">
        <h2 style="font-size:1.25rem">Share it publicly on Google</h2>
        <p>Whatever your rating, you are welcome to leave a Google review.</p>
        ${g ? `<div class="btn-row btn-row--center"><a class="btn" href="${esc(g)}" target="_blank" rel="noopener">Leave a Google Review</a></div>` : `<p><strong>Our Google review link is not ready yet.</strong> Please check back soon.</p>`}
      </div>
    </div>
  </div>
</section>`;
  return page({ title: 'How Was Your Experience? | The Original Patch Master', desc: 'Share your feedback about your experience with The Original Patch Master.', path: '/feedback/', schema: [breadcrumbSchema(crumbs)], noindex: true }, body);
}

// ===========================================================================
// SMS OPT-IN (dedicated page; submissions go to its own GHL webhook, never to Formspree)
// ===========================================================================
export function smsOptIn() {
  const crumbs = [homeCrumb, { name: 'SMS Opt-In', href: '/sms-opt-in/' }];
  const body = `
${pageHero({ crumbs, h1: 'Stay Connected With The Original Patch Master', lead: 'Sign up to receive text messages about your inquiries, estimates, appointments, and service updates.', ctas: false })}
<section class="section">
  <div class="wrap wrap--narrow">
    <div class="contact__form">
      <!-- SMS OPT-IN ENDPOINT: currently the same Formspree endpoint as /contact (integrations.smsOptInEndpoint in src/data.mjs).
           TO SWITCH TO THE GHL INBOUND WEBHOOK LATER: set that value to '/api/sms-optin' (a server-side proxy; the real GHL webhook URL
           goes in the Vercel env var GHL_OPTIN_WEBHOOK_URL, never in this file). See INTEGRATIONS.md. -->
      <form id="optin-form" method="post" data-optin-endpoint="${esc(integrations.smsOptInEndpoint)}" data-consent-version="${esc(integrations.smsOptInVersion)}" novalidate>
        <div class="field"><label for="o-name">Full name <span class="req">(required)</span></label><input id="o-name" name="name" type="text" autocomplete="name" required></div>
        <div class="field-row">
          <div class="field"><label for="o-phone">Mobile phone number <span class="req">(required)</span></label><input id="o-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="(313) 555-0123" required></div>
          <div class="field"><label for="o-email">Email address <span class="req">(optional)</span></label><input id="o-email" name="email" type="email" autocomplete="email"></div>
        </div>
        <div class="consent" role="group" aria-label="Text message consent (optional)">
          <div class="consent__block">
            <input type="checkbox" id="o-sms-service" data-consent="service">
            <label for="o-sms-service" data-consent-text="service">${esc(smsConsent.optInService)}</label>
          </div>
          <div class="consent__block">
            <input type="checkbox" id="o-sms-marketing" data-consent="marketing">
            <label for="o-sms-marketing" data-consent-text="marketing">${esc(smsConsent.optInMarketing)}</label>
          </div>
          <p class="consent__fine">Messages are sent by The Original Patch Master, ${ADDR}. See our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms-and-conditions/">Terms &amp; Conditions</a>.</p>
        </div>
        <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
        <button class="btn btn--block-sm" type="submit">Sign Up for Text Updates</button>
        <p class="form-note" id="form-status" role="status" aria-live="polite"></p>
        <p class="form-fine">Check at least one box to sign up. Reply STOP to any message to opt out, or HELP for help. You can also contact us at <a href="${site.phoneHref}">${PH}</a> or <a href="mailto:${site.email}">${site.email}</a>.</p>
      </form>
    </div>
  </div>
</section>`;
  return page({
    title: 'SMS Opt-In | The Original Patch Master',
    desc: 'Sign up for text messages from The Original Patch Master about your inquiries, estimates, appointments and service updates.',
    path: '/sms-opt-in/', schema: [breadcrumbSchema(crumbs)],
  }, body);
}

// ===========================================================================
// 404
// ===========================================================================
export function notFound() {
  const body = `
<section class="section">
  <div class="wrap wrap--narrow center">
    <h1>Page Not Found</h1>
    <p>That page does not exist. Try the links below or call ${PH}.</p>
    <div class="btn-row btn-row--center"><a class="btn" href="/">Go Home</a><a class="btn btn--outline" href="/services/">See Services</a></div>
  </div>
</section>`;
  return page({ title: 'Page Not Found | The Original Patch Master', desc: 'This page could not be found.', path: '/404.html', noindex: true }, body);
}
