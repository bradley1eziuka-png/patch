import { site, services, locations, gallery, galleryFilters, hero, featureVideos, useFeatureVideos, slotVideo, familyVideo } from './data.mjs';
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


const vidFigure = (v, ratio = '4/5') => `<figure class="media media--video" style="--ratio:${ratio}">
        <video class="lazyvid" muted loop playsinline preload="none" width="640" height="800" poster="${v.poster}" data-src="${v.src}" aria-hidden="true" tabindex="-1"></video>
        <button type="button" class="vid-pause" aria-label="Pause video" aria-pressed="false"><span class="vp-on">${icon('pause')}</span><span class="vp-off">${icon('play')}</span></button>
      </figure>`;

// Hero: all footage is portrait. 'full' crops a wide band for desktop and uses the portrait clip on phones.
// 'framed' is the earlier portrait-panel design (set hero.layout in src/data.mjs).
function heroSection() {
  const copy = `    <div class="hero__copy">
      <p class="hero__eyebrow">Family-Owned &bull; Serving Metro Detroit</p>
      <h1>Drywall Repair, Installation &amp; Finishing.</h1>
      <p class="hero__proof">30 Years of Union Experience.</p>
      <p class="hero__body">From repairing damaged walls to finishing entire basements, garages and homes, The Original Patch Master brings decades of hands-on experience to every project.</p>
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
    { icon: 'layers', t: 'Drywall Installation & Finishing', p: 'Drywall hanging, taping and finishing for remodels, additions and new construction.', href: svcUrl('drywall-installation'), a: 'Installation details' },
    { icon: 'house', t: 'Basements, Garages & Houses', p: 'Drywall installation and finishing for larger projects, from unfinished basements to entire homes.', href: svcUrl('basement-garage-house-finishing'), a: 'Full-space finishing' },
  ];
  const six = ['drywall-repair', 'drywall-installation', 'plaster-repair', 'level-5-finishing', 'dustless-sanding', 'basement-garage-house-finishing'].map(svc);
  const homeTiles = {
    'drywall-repair': 'Holes, cracks and damaged walls repaired and finished to blend with the surrounding surface.',
    'drywall-installation': 'Drywall hanging, taping and finishing for remodels, additions and new construction.',
    'plaster-repair': 'Repair cracked or damaged plaster without replacing more of the wall than necessary.',
    'level-5-finishing': 'A smooth, uniform finish for walls and ceilings where surface imperfections are more noticeable.',
    'dustless-sanding': 'Specialized sanding equipment helps keep airborne dust and cleanup to a minimum.',
    'basement-garage-house-finishing': 'Drywall installation and finishing for larger projects, from unfinished basements to entire homes.',
  };
  const facts = [
    { icon: 'badge', big: '30 Years', small: 'Union experience' },
    { icon: 'users', big: 'Family-Owned', small: 'Locally operated' },
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
      <!-- ABOUT MEDIA 1: Jeremy/family or crew. Portrait 3:4 or 4:5. -->
      ${media('about-family', { ratio: '3/4', note: 'Jeremy/family or crew. Portrait, 3:4 or 4:5.', alt: 'Jeremy Girard of The Original Patch Master', label: 'Family photo' })}
      <!-- ABOUT MEDIA 2: Real jobsite image. Portrait 3:4 or 4:5. -->
      ${media('about-jobsite', { ratio: '3/4', note: 'Real jobsite image: finished wall, work in progress. Portrait, 3:4 or 4:5.', alt: 'Finished drywall by The Original Patch Master', label: 'Jobsite photo' })}
    </div>
    <div class="about__copy">
      ${eyebrow('About The Original Patch Master')}
      <h2>Experience You Can See in the Finish.</h2>
      <p>The Original Patch Master is a family-owned drywall and plaster business owned and operated by Jeremy Girard. With 30 years of union experience behind the work, the business takes on everything from everyday repairs to complete drywall installations.</p>
      <p>Jeremy's son Jonas and Lillian work in the business with him. For the family, doing good work also means being straightforward with customers, respecting their homes, and standing behind the work they do.</p>
      <div class="person"><span class="person__avatar" aria-hidden="true">${icon('user')}</span><div><strong>Jeremy Girard</strong><span>Owner, The Original Patch Master</span></div></div>
      <a class="btn btn--navy" href="/about/">More About Us</a>
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
      <h2 id="band-h">Know Who You're Hiring.</h2>
      <p class="band__text">When you hire The Original Patch Master, you're working with a family-run business that puts its name behind the job.</p>
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
      ${[1, 2, 3, 4].map((n) => media(`work-teaser-${n}`, { ratio: '1/1', note: 'Real completed or in-progress job. Square crop, 1:1.', sizes: '(min-width: 1140px) 270px, 50vw' })).join('')}
    </div>
    <div class="center btn-row btn-row--center"><a class="btn" href="/our-work/">View Our Work</a></div>
  </div>
</section>

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
      title: 'The Original Patch Master | Drywall in Dearborn Heights, MI',
      desc: 'Family-owned drywall, plaster and finishing contractor in Dearborn Heights, MI. 30 years of union experience, fully insured. Free estimates across Metro Detroit.',
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
${pageHero({ crumbs, h1: 'Drywall, Plaster and Finishing Services', lead: 'The Original Patch Master handles the repair behind your door and the drywall for your whole basement. Pick a service to see what is involved.' })}
<section class="section features">
  <div class="wrap">
    <div class="feature">
      <div class="feature__media">${media('services-finishing', { ratio: '4/5', sizes: '(min-width: 860px) 534px, 100vw', note: 'Basement, garage or whole-house drywall job. 4:3.', alt: 'Basement finishing by The Original Patch Master' })}</div>
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
      desc: 'Drywall repair and installation, plaster repair, Level 5 finishing, dustless sanding, insulation and window glazing from The Original Patch Master in Dearborn Heights.',
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
  const slotMedia = (n) => {
    const slot = `service-${s.slug}-${n}`;
    return slotVideo[slot] ? vidFigure(slotVideo[slot]) : media(slot, { ...mopt, alt: `${s.name} by The Original Patch Master` });
  };
  const m1 = slotMedia(1);
  const m2 = slotMedia(2);
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
  const lgal = [1, 2, 3].map((n) => media(`area-${l.slug}-${n}`, { ratio: '4/3', optional: true })).filter(Boolean);
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
    ['Experience', '30 years of union experience'],
    ['Ownership', 'Family owned and operated'],
    ['Insurance', 'Fully insured'],
    ['Estimates', 'Free'],
    ['Equipment', 'Specialized equipment for dustless sanding'],
    ['Job size', 'Small repairs to full houses'],
    ['Based in', 'Dearborn Heights, Michigan'],
  ];
  const body = `
${pageHero({ crumbs, h1: 'A Family-Run Drywall and Plaster Business', lead: 'Jeremy Girard owns and runs The Original Patch Master in Dearborn Heights, with his son Jonas and Lillian.', ctas: false })}
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
      <h2>Meet the Family Behind The Original Patch Master.</h2>
      <p>The Original Patch Master is owned by Jeremy Girard, who brings 30 years of union experience in drywall and plaster work. His son Jonas and Lillian work alongside him, keeping the business family&#8209;run.</p>
      <p>From patching damaged walls to finishing entire basements and homes, the Girard family takes pride in the work they put their name on.</p>
      <p>When you contact The Original Patch Master, you're dealing directly with the people behind the business. They'll take a look at your project, explain what needs to be done, and provide a free estimate.</p>
    </div>
  </div>
</section>
<section class="section section--alt">
  <div class="wrap split">
    <div class="split__copy">
      ${eyebrow('The Family at Work')}
      <h2>Lillian and Jonas Pitch In</h2>
      <p>Lillian and Jonas work alongside Jeremy. Here they are clearing debris on a jobsite.</p>
    </div>
    <div class="split__media">${vidFigure(familyVideo)}</div>
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
      <p>We repair drywall and plaster, hang and finish new drywall, sand with dustless equipment and handle insulation, window glazing and caulking. Finishing basements, garages and entire houses is a priority.</p>
      <a class="btn" href="/services/">See Our Services</a>
    </div>
    <div class="split__media split__media--portrait">
      ${media('about-page-jobsite', { ratio: '4/5', sizes: '(min-width: 860px) 440px, 100vw' })}
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
      title: 'About | The Original Patch Master, Family-Owned Drywall',
      desc: 'The Original Patch Master is a family-owned drywall and plaster business owned by Jeremy Girard in Dearborn Heights, with 30 years of union experience.',
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
        ${media(g.slot, { ratio: '4/5', sizes: '(min-width: 1024px) 270px, 50vw', cls: 'media--tile' })}
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
${pageHero({ crumbs, h1: 'Get a Free Estimate', lead: 'Call, email or send the details below. Tell us what you are working on and we will take a look.', ctas: false })}
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
      <form id="estimate-form" method="post" action="${site.formEndpoint || ''}" data-endpoint="${site.formEndpoint || ''}" novalidate>
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
      desc: 'Call 734-489-2284 or send the details for a free drywall, plaster or finishing estimate from The Original Patch Master in Dearborn Heights, MI.',
      path: '/contact/',
      schema: [businessSchema(), breadcrumbSchema(crumbs)],
    },
    body,
  );
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
