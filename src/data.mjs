// ============================================================================
// PATCH MASTER: SHARED DATA
// Every business detail, nav item, service and location lives here.
// Edit this file, run `node build.mjs`, and every page updates.
// ============================================================================

export const site = {
  name: 'The Original Patch Master',
  tagline: 'Commercial drywall, plaster and finishing contractor',
  phone: '734-489-2284',
  phoneHref: 'tel:+17344892284',
  email: 'raegirlg@icloud.com',
  owner: 'Jeremy Girard',
  family: ['Lillian Girard (works in the family business; exact relationship to Jeremy not confirmed)', 'Jonas (Jeremy\'s son)'],
  hours: { days: 'Monday to Friday', time: '7:00 AM to 5:00 PM', short: 'Mon to Fri, 7 AM to 5 PM' },
  address: { street: '25244 Annapolis St', city: 'Dearborn Heights', region: 'MI', regionLong: 'Michigan' },
  social: {
    facebook: 'https://www.facebook.com/share/18a466j8Mp/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/patch_master_?stkn=end3MThldmtsZnhl&utm_source=qr',
  },

  // ---- LAUNCH SETTINGS --------------------------------------------------
  // Production domain, no trailing slash. Drives canonicals, og:url, structured data, sitemap.xml and robots.txt.
  siteUrl: 'https://originalpatchmaster.com',

  // Form endpoint (Formspree, Basin, Netlify Forms URL, etc.).
  // Leave empty and the form tells visitors to call or email instead of faking a send.
  formEndpoint: 'https://formspree.io/f/xzedqkpn',   // Formspree: PATCH MASTER > Inquiries (customer estimate requests only)

  // Separate endpoint for job applications from /careers/. Do NOT reuse the estimate endpoint:
  // applications must not land in the customer-estimate inbox. Leave empty and the form says it is not switched on.
  careersEndpoint: '',
};

// ---------------------------------------------------------------------------
// SERVICES
// ---------------------------------------------------------------------------
export const services = [
  {
    slug: 'drywall-repair',
    name: 'Drywall Repair',
    icon: 'patch',
    tile: 'Holes, cracks, water-damaged sections and failed seams.',
    title: 'Drywall Repair in Metro Detroit | The Original Patch Master',
    desc: 'Drywall repair for holes, cracks, damaged sections and failed seams. Free estimates from The Original Patch Master, a family-owned contractor in Dearborn Heights.',
    h1: 'Drywall Repair',
    lead: 'Holes, cracks, damaged sections and failed seams, repaired and finished so the wall is ready for paint.',
    intro: [
      'Drywall gets damaged in every house. A doorknob goes through a wall, a plumber cuts an opening, a seam cracks along the ceiling. The Original Patch Master repairs new and old drywall and finishes the area so you do not see where the damage was.',
      'One small hole is a normal job for us. So is a room with damage in several places.',
    ],
    involves: [
      'Patching holes and dents',
      'Fixing cracked seams and corners',
      'Cutting out and replacing damaged sections',
      'Taping, mudding and sanding the repair',
      'Blending the repair into the wall or ceiling around it',
      'Dustless sanding with specialized equipment',
    ],
    situationsTitle: 'When people call us for repairs',
    situations: [
      { t: 'Doorknob and furniture damage', d: 'Holes of any size, from a dent in a hallway to a gap where a door swung into the wall.' },
      { t: 'Openings left by other trades', d: 'Plumbers, electricians and HVAC installers cut into drywall. Someone has to close it back up.' },
      { t: 'Damage after a leak', d: 'Once the leak is fixed, wet or stained drywall can be cut out and replaced.' },
      { t: 'Cracks and popped seams', d: 'Cracks along seams and corners, and above doors and windows.' },
    ],
    approachTitle: 'How we handle a repair',
    approach: [
      'We look at the damage first. Some repairs need a patch. Others need a larger section replaced. We tell you which, and you get a free estimate before we start.',
      'The repair is hung, taped and finished in stages, then sanded smooth. Our specialized dustless sanding equipment cuts down on the dust that ends up in your rooms.',
    ],
    faq: [
      { q: 'Do you take small repair jobs?', a: 'Yes. A single hole is a normal job for us. The Original Patch Master also handles larger repairs and full drywall projects.' },
      { q: 'Is the estimate free?', a: 'Yes. Call 734-489-2284 or describe the damage on the contact form.' },
      { q: 'Will I be able to see the repair?', a: 'The goal is a repair you cannot see once the wall is painted. Tell us about the wall when you call and we will explain what to expect.' },
    ],
    related: ['plaster-repair', 'dustless-sanding', 'level-5-finishing'],
  },
  {
    slug: 'drywall-installation',
    name: 'Drywall Installation',
    icon: 'layers',
    tile: 'Hanging, taping and finishing for new walls and ceilings.',
    title: 'Commercial Drywall Installation | The Original Patch Master',
    desc: 'Commercial and residential drywall installation: hanging, taping and finishing for remodels, additions, basements and new construction in Metro Detroit. Free estimates.',
    h1: 'Drywall Installation',
    lead: 'New drywall hung, taped and finished for commercial spaces, additions, remodels, basements and whole houses.',
    intro: [
      'New drywall is more than hanging sheets. The seams have to be taped, the screws and corners covered, and every surface sanded flat before anyone paints. The Original Patch Master does all of it, so your walls go from bare studs to a finished surface under one contractor.',
      'We take commercial and residential installation work of any size, from a single room to a larger commercial space, a full house or new construction.',
    ],
    involves: [
      'Hanging drywall on walls and ceilings',
      'Taping seams and corners',
      'Mudding and finishing in coats',
      'Sanding smooth, with dustless equipment',
      'Insulation while the walls are open',
      'Level 5 finishing when the surface calls for it',
    ],
    situationsTitle: 'Jobs that call for new drywall',
    situations: [
      { t: 'Additions and new construction', d: 'Framed walls that need drywall hung and finished.' },
      { t: 'Remodels after demolition', d: 'A room opened to the studs and ready to close back in.' },
      { t: 'Basements and garages', d: 'Open framing that needs to become a finished space.' },
      { t: 'Replacing a damaged area', d: 'Large sections of old drywall that are past patching.' },
    ],
    approachTitle: 'How we handle installation',
    approach: [
      'We start with a free estimate based on the space and the finish you want. If insulation is going in before the drywall, we can handle that too.',
      'Seams are taped and finished in coats, then sanded. Tell us how the walls will be painted and lit, and we will say whether a standard finish is enough or whether Level 5 makes sense.',
    ],
    faq: [
      { q: 'Do you install drywall in new construction?', a: 'Yes. The Original Patch Master handles whole-house and new construction drywall and finishing.' },
      { q: 'Do you do insulation too?', a: 'Yes. Insulation goes in before the drywall, so ask about it when you request your estimate.' },
      { q: 'Can you finish a basement or garage?', a: 'Yes. Those projects are a priority for us. See our basement, garage and house finishing page.' },
    ],
    related: ['basement-garage-house-finishing', 'level-5-finishing', 'insulation'],
  },
  {
    slug: 'plaster-repair',
    name: 'Plaster Repair',
    icon: 'trowel',
    tile: 'Cracks and damaged plaster patched to blend with the wall.',
    title: 'Plaster Repair | The Original Patch Master, Dearborn Heights',
    desc: 'Plaster wall and ceiling repair for cracks, loose sections and damaged areas. Free estimates from family-owned The Original Patch Master in Dearborn Heights, MI.',
    h1: 'Plaster Repair',
    lead: 'Cracked, damaged and loose plaster repaired and blended into the surface around it.',
    intro: [
      'Plaster walls and ceilings do not behave like drywall. They crack differently, and a repair has to bond to what is already there. The Original Patch Master repairs plaster and finishes it smooth.',
      'The first step is checking how sound the plaster around the damage is, because that decides what the repair needs.',
    ],
    involves: [
      'Filling and repairing cracks',
      'Patching holes and damaged areas',
      'Repairing loose or crumbling sections',
      'Smoothing the repair into the surrounding surface',
      'Dustless sanding with specialized equipment',
      'Leaving the surface ready for paint',
    ],
    situationsTitle: 'When people call us for plaster',
    situations: [
      { t: 'Cracks that keep coming back', d: 'Cracks in walls and ceilings, from thin lines to wide splits.' },
      { t: 'Damage from other work', d: 'Openings left by plumbing, wiring or fixtures that were moved.' },
      { t: 'Loose or crumbling plaster', d: 'Sections that sound hollow or are coming away from the wall.' },
      { t: 'Plaster next to drywall', d: 'One wall plaster, the next drywall. We repair both.' },
    ],
    approachTitle: 'How we handle plaster',
    approach: [
      'We check the area around the damage before we quote the job. If the surrounding plaster is solid, a patch is enough. If it is loose, a bigger section may need work, and we tell you that up front.',
      'The estimate is free and we explain what we found. Repairs are finished smooth, and sanding is done with specialized dustless equipment.',
    ],
    faq: [
      { q: 'Can you repair plaster and drywall in the same room?', a: 'Yes. The Original Patch Master does both, so one estimate covers the room.' },
      { q: 'What if the plaster is cracked in several places?', a: 'We look at the whole wall or ceiling during the estimate and tell you what it needs. Several cracks do not automatically mean a bigger job.' },
      { q: 'Is plaster repair messy?', a: 'Sanding makes dust on any plaster or drywall job. We use specialized equipment to cut it down.' },
    ],
    related: ['drywall-repair', 'level-5-finishing', 'dustless-sanding'],
  },
  {
    slug: 'level-5-finishing',
    name: 'Level 5 Finishing',
    icon: 'ruler',
    tile: 'The smoothest finish, for walls that show every flaw.',
    title: 'Level 5 Drywall Finishing | The Original Patch Master',
    desc: 'Level 5 drywall finishing for the smoothest walls and ceilings. Free estimates from The Original Patch Master in Dearborn Heights and Metro Detroit.',
    h1: 'Level 5 Finishing',
    lead: 'The smoothest drywall finish, for walls and ceilings where flaws show.',
    intro: [
      'Drywall finishing is graded in levels, and Level 5 is the highest. After the seams are taped and finished, a thin skim coat of joint compound goes over the entire surface. The result is an even wall, with no visible difference between the taped joints and the rest of the board.',
      'The Original Patch Master offers Level 5 finishing as part of drywall installation and finishing jobs.',
    ],
    involves: [
      'Taping and finishing all seams and corners',
      'A skim coat across the whole surface',
      'Sanding smooth with dustless equipment',
      'A surface ready for primer and paint',
    ],
    situationsTitle: 'Where Level 5 makes sense',
    situations: [
      { t: 'Walls with strong side light', d: 'Windows, skylights and hallway lights show every ridge and seam.' },
      { t: 'Glossy or satin paint', d: 'Higher-sheen paint makes flaws easier to see.' },
      { t: 'Smooth walls with no texture', d: 'Nothing on the wall hides an imperfection.' },
      { t: 'Ceilings', d: 'Light hits ceilings at an angle, and seams show more than most people expect.' },
    ],
    approachTitle: 'How we decide',
    approach: [
      'Level 5 is not needed in every room. A closet or a garage may not call for it. We look at how light hits the wall and what paint you plan to use, then tell you whether Level 4 or Level 5 makes sense.',
      'Level 5 takes more time than a standard finish, and the estimate reflects that. The estimate is free and we explain the number.',
    ],
    faq: [
      { q: 'What is the difference between Level 4 and Level 5?', a: 'Level 4 has taped and finished seams. Level 5 adds a skim coat over the entire surface, which evens out the difference between the seams and the rest of the board.' },
      { q: 'Do I need Level 5 in every room?', a: 'No. Rooms with strong light, glossy paint or smooth ceilings benefit most. We will tell you if a standard finish is enough.' },
      { q: 'Does Level 5 make more dust?', a: 'Any sanding makes dust. We use specialized dustless sanding equipment on our work.' },
    ],
    related: ['drywall-installation', 'dustless-sanding', 'basement-garage-house-finishing'],
  },
  {
    slug: 'dustless-sanding',
    name: 'Dustless Sanding',
    icon: 'wind',
    tile: 'Sanding with specialized equipment that cuts down dust in your home.',
    title: 'Dustless Drywall Sanding | The Original Patch Master',
    desc: 'Dustless drywall and plaster sanding with specialized equipment to cut down dust in your home. Free estimates in Dearborn Heights and Metro Detroit.',
    h1: 'Dustless Sanding',
    lead: 'Drywall and plaster sanding with specialized equipment that collects dust as we work.',
    intro: [
      'Sanding joint compound is the dustiest part of a drywall job. The fine powder travels through the house, settles on furniture and ends up in rooms you were not working in. The Original Patch Master uses specialized dustless sanding equipment that collects dust at the sander instead of letting it fill the room.',
      'It applies to our drywall, plaster and finishing work.',
    ],
    involves: [
      'Sanding drywall joint compound with dust-collecting equipment',
      'Sanding plaster repairs',
      'Sanding between coats and final sanding',
      'Keeping the work area clean',
    ],
    situationsTitle: 'When it matters most',
    situations: [
      { t: 'Homes people are living in', d: 'Furniture, floors and belongings stay in the house during the work.' },
      { t: 'Finished space next to the job', d: 'A basement job under a finished living area, or one repaired room in an otherwise finished house.' },
      { t: 'Larger finishing jobs', d: 'More surface to sand means more dust, so the equipment matters more.' },
    ],
    approachTitle: 'What to expect',
    approach: [
      'We do not promise zero dust. No sanding method removes every particle, and we will tell you what to expect on your job.',
      'Ask about it when you call, and we will walk you through how we handle dust on your project.',
    ],
    faq: [
      { q: 'Is dustless sanding completely dust-free?', a: 'No. No sanding method removes every particle. Dustless equipment cuts down on the dust that reaches the room, and we plan the job with that in mind.' },
      { q: 'What equipment do you use?', a: 'Specialized dustless sanding equipment. Ask when you call and we will explain how it works on your type of job.' },
      { q: 'Which jobs does it apply to?', a: 'Our drywall, plaster and finishing work.' },
    ],
    related: ['drywall-repair', 'plaster-repair', 'level-5-finishing'],
  },
  {
    slug: 'basement-garage-house-finishing',
    name: 'Basements, Garages & Houses',
    icon: 'house',
    tile: 'Full-space drywall and finishing, from the first sheet to the final coat.',
    title: 'Basement & Garage Finishing | The Original Patch Master',
    desc: 'Basement, garage and whole-house drywall and finishing by The Original Patch Master. 25 years in the trade, fully insured, free estimates in Metro Detroit.',
    h1: 'Basement, Garage and Whole-House Finishing',
    lead: 'Drywall, insulation and finishing for entire spaces, from open framing to finished walls.',
    intro: [
      'Finishing a basement, a garage or a whole house means a lot of drywall, a lot of finishing and a schedule that has to hold together. This is a priority for The Original Patch Master, and we take projects at that scale.',
      'We hang, tape, finish and sand, with insulation available while the walls are open.',
    ],
    sections: [
      { h: 'Basements', p: 'A basement can add a lot of living space. We hang and finish the drywall so the space is ready for paint, and we can handle insulation before the walls close.' },
      { h: 'Garages', p: 'Finished walls and ceilings turn a garage into a cleaner, more usable space. We hang the drywall, finish it and handle insulation if the garage needs it.' },
      { h: 'Whole houses and new construction', p: 'Whole-house jobs mean drywall in every room. Every room gets the same process: hang, tape, finish and sand.' },
    ],
    involves: [
      'Hanging drywall on walls and ceilings',
      'Taping and finishing seams and corners',
      'Insulation before the walls close up',
      'Sanding with dustless equipment',
      'Level 5 finishing where you want it',
      'One free estimate for the whole project',
    ],
    situationsTitle: 'Projects we take on',
    situations: [
      { t: 'A basement you want to use', d: 'Open framing or bare block, ready for walls and ceilings.' },
      { t: 'A garage with unfinished walls', d: 'Anything from basic drywall to a smoother finish.' },
      { t: 'A new build or addition', d: 'Drywall for every room, start to finish.' },
      { t: 'A house after major work', d: 'Extensive demolition or a remodel where most rooms need new drywall.' },
    ],
    approachTitle: 'How a large job starts',
    approach: [
      'Big jobs start with a conversation. Tell us what the space is, how you want it to look and when you want it done. We give you a free estimate, explain the scope and answer your questions.',
      'Our part is the drywall, insulation and finishing. If your project involves other trades, mention that when you call so we can talk about how the work fits together.',
    ],
    faq: [
      { q: 'Can The Original Patch Master finish an entire house?', a: 'Yes. Whole-house drywall and finishing is one of our priority services.' },
      { q: 'Do you handle insulation on basement and garage jobs?', a: 'Yes. Insulation is one of our services. Tell us about the space during the estimate.' },
      { q: 'Is the estimate free on large projects?', a: 'Yes. Estimates are free on every job, large or small.' },
      { q: 'Do you only take big projects?', a: 'No. We also take small repairs.' },
    ],
    related: ['drywall-installation', 'insulation', 'level-5-finishing'],
  },
  {
    slug: 'insulation',
    name: 'Insulation',
    icon: 'insulation',
    tile: 'Insulation for walls that are about to be closed up.',
    title: 'Insulation | The Original Patch Master, Dearborn Heights',
    desc: 'Insulation from The Original Patch Master, a family-owned drywall contractor in Dearborn Heights. Free estimates for basements, garages and new walls.',
    h1: 'Insulation',
    lead: 'Insulation for walls that are about to be closed up, from the contractor hanging the drywall.',
    intro: [
      'Insulation goes in before the drywall, so it makes sense for the same contractor to handle both. The Original Patch Master offers insulation, and it fits naturally with our drywall work.',
      'Tell us about the space when you call, and we will go over what the job needs.',
    ],
    involves: [
      'Insulation for walls before drywall goes up',
      'Insulation in basements and garages',
      'Insulation for additions and new construction',
      'Scheduling insulation and drywall in sequence',
    ],
    situationsTitle: 'Where insulation fits',
    situations: [
      { t: 'Finishing a basement', d: 'The walls are open, so this is the time to insulate them.' },
      { t: 'Finishing a garage', d: 'Same idea: insulate first, then hang drywall.' },
      { t: 'Additions and new construction', d: 'Insulation and drywall, one after the other.' },
    ],
    approachTitle: 'How we handle it',
    approach: [
      'Insulation and drywall happen in order, so using one contractor for both means fewer handoffs. The estimate is free and covers the work you want done.',
      'What goes in the wall depends on the space. We go over that with you during the estimate.',
    ],
    faq: [
      { q: 'Can you insulate and hang drywall in the same project?', a: 'Yes. Tell us you want both when you ask for an estimate.' },
      { q: 'How do I get an estimate?', a: 'Call 734-489-2284 or use the contact form. Estimates are free.' },
    ],
    related: ['basement-garage-house-finishing', 'drywall-installation', 'window-glazing-caulking'],
  },
  {
    slug: 'window-glazing-caulking',
    name: 'Window Glazing & Caulking',
    icon: 'window',
    tile: 'Glazing and caulking for windows and the gaps around them.',
    title: 'Window Glazing & Caulking | The Original Patch Master',
    desc: 'Window glazing and caulking from The Original Patch Master in Dearborn Heights. Free estimates for window sealing and repairs in Metro Detroit homes.',
    h1: 'Window Glazing and Caulking',
    lead: 'Glazing and caulking to seal windows and close the gaps around them.',
    intro: [
      'The Original Patch Master offers window glazing and caulking alongside our drywall and plaster work. Glazing sets and seals glass in a window frame. Caulking closes the gaps around windows and trim.',
      'These jobs often come up next to repair work, since a leaking window can damage the wall around it.',
    ],
    involves: [
      'Glazing work on windows',
      'Caulking around windows and trim',
      'Sealing gaps and joints',
      'Repairing drywall or plaster near the window',
    ],
    situationsTitle: 'When people call us for this',
    situations: [
      { t: 'Dried or cracked caulk', d: 'Old caulk shrinks and pulls away from the frame.' },
      { t: 'Gaps around a window', d: 'Open gaps let in air and water.' },
      { t: 'Glazing in poor shape', d: 'Glass or sealing that has worn out.' },
      { t: 'Damage next to a window', d: 'Water that gets in can stain or damage the drywall or plaster around it. We repair that too.' },
    ],
    approachTitle: 'How we handle it',
    approach: [
      'Tell us which windows and what is wrong. We look at the job and give you a free estimate.',
      'What is right for a window depends on the window itself, so we look at it first.',
    ],
    faq: [
      { q: 'Do you replace windows?', a: 'Glazing and caulking are what we offer. If you are not sure whether your job fits, call and describe it.' },
      { q: 'Can you repair the drywall around a window?', a: 'Yes. Drywall and plaster repair is our main work.' },
    ],
    related: ['drywall-repair', 'plaster-repair', 'insulation'],
  },
];

// ---------------------------------------------------------------------------
// LOCATIONS
// ---------------------------------------------------------------------------
export const locations = [
  {
    slug: 'dearborn-heights',
    name: 'Dearborn Heights',
    short: 'Our home base. Repairs, finishing and full projects.',
    title: 'Dearborn Heights Drywall | The Original Patch Master',
    desc: 'The Original Patch Master is a family-owned drywall and plaster contractor based in Dearborn Heights, MI. Repairs, installation, finishing and free estimates.',
    h1: 'Drywall and Plaster Contractor in Dearborn Heights',
    lead: 'The Original Patch Master is based here. Call for repairs, finishing, or a full basement, garage or house.',
    sections: [
      { h: 'A Dearborn Heights business', p: ['The Original Patch Master runs out of Dearborn Heights. This is our home area. Our business address is 25244 Annapolis St.'] },
      { h: 'Jobs we take', p: ['Homeowners call us about a patched wall, a cracked ceiling, a basement that needs finishing or a garage that is still bare framing. The full list is below.'], services: ['drywall-repair', 'drywall-installation', 'plaster-repair', 'basement-garage-house-finishing', 'level-5-finishing', 'insulation'] },
      { h: 'How to book', p: ['Estimates are free. Call 734-489-2284 Monday to Friday, 7 AM to 5 PM, or use the contact form and tell us what you need.'] },
    ],
    faq: [
      { q: 'Where is The Original Patch Master located?', a: 'We are based in Dearborn Heights, Michigan. Our business address is 25244 Annapolis St. Call or use the contact form to set up an estimate.' },
      { q: 'What hours can I call?', a: 'Monday to Friday, 7:00 AM to 5:00 PM.' },
    ],
    near: ['dearborn', 'downriver', 'metro-detroit'],
  },
  {
    slug: 'dearborn',
    name: 'Dearborn',
    short: 'Next door to our home base. Repairs, plaster and finishing.',
    title: 'Dearborn Drywall & Plaster | The Original Patch Master',
    desc: 'Drywall repair, plaster work and finishing in Dearborn, Michigan from The Original Patch Master, based next door in Dearborn Heights. Free estimates.',
    h1: 'Drywall and Plaster Work in Dearborn',
    lead: 'Dearborn sits next to our home base in Dearborn Heights. We take repair, plaster and finishing jobs here.',
    sections: [
      { h: 'Repairs and finishing', p: ['A repair is a good reason to call: a hole, a crack, a patch left after plumbing or electrical work. The Original Patch Master repairs drywall and plaster and finishes the area so it is ready for paint. We also take new drywall and larger finishing projects.'], services: ['drywall-repair', 'plaster-repair', 'level-5-finishing'] },
      { h: 'Cleaner sanding', p: ['Repairs happen in rooms people live in. We use specialized dustless sanding equipment to cut down on the dust that ends up in your house.'], services: ['dustless-sanding'] },
      { h: 'Get an estimate', p: ['Tell us you are in Dearborn when you call 734-489-2284 or fill out the contact form. Estimates are free.'] },
    ],
    faq: [
      { q: 'Do you work in Dearborn?', a: 'Yes. Dearborn is one of the areas The Original Patch Master serves, along with Dearborn Heights, Monroe, Carleton and Downriver communities.' },
      { q: 'Do you take small jobs in Dearborn?', a: 'Yes. A single patch is a normal job for us.' },
    ],
    near: ['dearborn-heights', 'downriver', 'metro-detroit'],
  },
  {
    slug: 'monroe',
    name: 'Monroe',
    short: 'Larger finishing projects and repairs.',
    title: 'Drywall Contractor in Monroe, MI | The Original Patch Master',
    desc: 'The Original Patch Master takes drywall, plaster and finishing jobs in Monroe, MI, from repairs to full basements and houses. Free estimates.',
    h1: 'Drywall Services in Monroe',
    lead: 'The Original Patch Master takes drywall, plaster and finishing jobs in Monroe, from repairs to full basements and houses.',
    sections: [
      { h: 'Larger finishing projects', p: ['Monroe homeowners can call us about a basement, a garage or an entire house, as well as smaller repairs. Finishing whole spaces is a priority for The Original Patch Master, and 25 years in the trade goes into it.'], services: ['basement-garage-house-finishing', 'drywall-installation', 'insulation'] },
      { h: 'Setting up an estimate', p: ['The Original Patch Master is based in Dearborn Heights, so give us your address and a rough idea of the work when you call. We will set up a free estimate and talk through the job.'] },
      { h: 'Repairs too', p: ['You do not need a big project to call. Patched holes, cracked seams and plaster repairs are all on the list.'], services: ['drywall-repair', 'plaster-repair'] },
    ],
    faq: [
      { q: 'Does The Original Patch Master work in Monroe?', a: 'Yes. Monroe is one of the areas we serve. Call 734-489-2284 with your address and the work you need.' },
      { q: 'Are estimates free in Monroe?', a: 'Yes. Estimates are free everywhere we work.' },
    ],
    near: ['carleton', 'downriver', 'metro-detroit'],
  },
  {
    slug: 'carleton',
    name: 'Carleton',
    short: 'One patch or a whole space, we take both.',
    title: 'Carleton Drywall Finishing | The Original Patch Master',
    desc: 'From one patched wall to a finished garage, The Original Patch Master takes drywall, plaster and finishing jobs in Carleton, MI. Free estimates.',
    h1: 'Drywall and Finishing in Carleton',
    lead: 'From one patched wall to a finished garage, The Original Patch Master takes jobs of every size in Carleton.',
    sections: [
      { h: 'Start small or start big', p: ['Some jobs are a single patch. Some are a basement. The Original Patch Master does both, and the process is the same: a free estimate, a plain explanation of the work and a finished surface when we are done.'] },
      { h: 'Common starting points', list: ['A hole or crack in a wall or ceiling', 'Plaster that is cracked or loose', 'A garage that needs finished walls', 'A basement with bare framing', 'New drywall for an addition or a build'], services: ['drywall-repair', 'basement-garage-house-finishing', 'plaster-repair', 'drywall-installation'] },
      { h: 'Call from Carleton', p: ['Call 734-489-2284 or send the details through the contact form. Tell us your town and what you are working on.'] },
    ],
    faq: [
      { q: 'Do you serve Carleton?', a: 'Yes. Carleton is one of the areas The Original Patch Master serves.' },
      { q: 'What if my job is a mix of repair and new work?', a: 'We look at the whole job and give you one estimate.' },
    ],
    near: ['monroe', 'downriver', 'metro-detroit'],
  },
  {
    slug: 'downriver',
    name: 'Downriver',
    short: 'Communities south of Detroit along the river.',
    title: 'Downriver Drywall & Plaster | The Original Patch Master',
    desc: 'The Original Patch Master takes drywall, plaster and finishing jobs in Downriver Michigan communities. Call with your town for a free estimate.',
    h1: 'Drywall and Plaster Services Downriver',
    lead: 'The Original Patch Master takes jobs in Downriver communities. Call and tell us your town.',
    sections: [
      { h: 'What Downriver covers', p: ['Downriver is the name people use for the communities south of Detroit along the Detroit River. It covers many towns, so we ask where the job is when you call.'] },
      { h: 'Services available', p: ['Drywall repair and installation, plaster repair, Level 5 finishing, dustless sanding, insulation, window glazing and caulking, plus basement, garage and whole-house finishing.'], services: ['drywall-repair', 'drywall-installation', 'basement-garage-house-finishing'] },
      { h: 'Not sure we reach you?', p: ['Call 734-489-2284 with your town. We will tell you whether we can take the job and set up a free estimate.'] },
    ],
    faq: [
      { q: 'Which Downriver towns do you serve?', a: 'Call with your town and we will let you know. We are based in Dearborn Heights.' },
      { q: 'Do you charge for estimates?', a: 'No. Estimates are free.' },
    ],
    near: ['dearborn-heights', 'carleton', 'monroe', 'metro-detroit'],
  },
  {
    slug: 'metro-detroit',
    name: 'Metro Detroit',
    short: 'The wider area we work in from Dearborn Heights.',
    title: 'Metro Detroit Drywall | The Original Patch Master',
    desc: 'Commercial drywall and plaster contractor serving Metro Detroit from Dearborn Heights. 25 years in the trade, fully insured. Free estimates.',
    h1: 'Drywall and Plaster Contractor in Metro Detroit',
    lead: 'Commercial and residential drywall and plaster, with 25 years in the trade. Fully insured. Based in Dearborn Heights.',
    sections: [
      { h: 'Where we work', p: ['The Original Patch Master serves Dearborn Heights and the surrounding Metro Detroit area. Pick your area below, or call and ask.'], allAreas: true },
      { h: 'What to expect', p: ['Every job starts with a free estimate. Small repairs and full-house finishing follow the same process: we look at the work, explain what it needs and give you a price.'] },
      { h: 'Priority work', p: ['Finishing basements, garages and houses is a priority for us, and we have the experience and equipment for it. Repairs are welcome too.'], services: ['basement-garage-house-finishing', 'drywall-repair'] },
    ],
    faq: [
      { q: 'What areas does The Original Patch Master serve?', a: 'Dearborn Heights, Dearborn, Monroe, Carleton and Downriver communities, plus the wider Metro Detroit area. Call if you are unsure about your town.' },
      { q: 'Is The Original Patch Master insured?', a: 'Yes. The Original Patch Master is fully insured.' },
    ],
    near: ['dearborn-heights', 'dearborn', 'downriver', 'monroe', 'carleton'],
  },
];

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/', sub: 'services' },
  { label: 'Our Work', href: '/our-work/' },
  { label: 'About', href: '/about/' },
  { label: 'Service Areas', href: '/service-areas/', sub: 'locations' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Contact', href: '/contact/' },
];

// ---------------------------------------------------------------------------
// MEDIA SLOTS
// Drop a file named after the slot into site/assets/img/media/ and rebuild:
//   site/assets/img/media/hero.jpg     (.jpg .jpeg .png .webp are detected)
// Optional responsive variants are picked up automatically:
//   hero-480.webp  hero-800.webp  hero-1200.webp  hero-1600.webp
// Or override a slot here (src is a site path, alt describes the real photo).
// ---------------------------------------------------------------------------
export const mediaOverrides = {
  // 'hero': { src: '/assets/img/media/hero.jpg', alt: 'Jeremy hanging drywall on a basement ceiling' },
};

// ---------------------------------------------------------------------------
// REAL MEDIA
// Source files live in Videos/ (never edited). Web versions are built into
// site/assets/video and site/assets/img/media (see MEDIA.md for the commands).
// ---------------------------------------------------------------------------

// Still images (webp in site/assets/img/media/, with -480 and -800 variants).
export const stills = {
  'done-room': { alt: 'Finished room with smooth white walls, trim and a clean ceiling line', focus: '50% 45%' },
  'commercial-interior': { alt: 'Drywall finished along a tall wall inside a large commercial building', focus: '50% 40%' },
  'jeremy': { alt: 'Jeremy Girard, owner of The Original Patch Master, standing in a room of hung drywall', focus: '50% 35%' },
  'jonas': { alt: 'Jonas, Jeremy\'s son, working in a room with a laser level and a pole sander', focus: '50% 30%' },
  'truck': { alt: 'Patch Master work truck with the phone number 734-489-2284 on the door sign', focus: '50% 55%' },
  'plaster-arch': { alt: 'Worker patching a cracked plaster archway', focus: '35% 50%' },
  'finish-reach': { alt: 'Worker finishing a drywall wall with a handheld taping tool', focus: '50% 40%' },
  'finish-wide': { alt: 'Worker using a handheld taping tool along a long drywall wall', focus: '50% 55%' },
  'finish-trowel': { alt: 'Worker applying joint compound to drywall seams with a finishing knife', focus: '60% 45%' },
  'high-wall': { alt: 'Worker on a scissor lift finishing a tall drywall wall', focus: '55% 40%' },
  'ceiling-stilts': { alt: 'Two workers on stilts finishing a drywall ceiling', focus: '50% 50%' },
  'room-ceiling-line': { alt: 'Worker on stilts finishing the wall-to-ceiling line in a painted room', focus: '50% 40%' },
  'pole-sanding': { alt: 'Worker sanding a drywall wall with a pole sander', focus: '50% 45%' },
  'hand-sanding': { alt: 'Hand sanding a drywall corner with a sanding block', focus: '60% 40%' },
};

// Which still fills which media slot. Slots with no entry (and no file) render a
// placeholder, or nothing at all when the page marks the slot optional.
export const slotStill = {
  'about-family': 'done-room',
  'about-jobsite': 'commercial-interior',
  'about-page-family': 'done-room',
  'about-page-jonas': 'commercial-interior',
  'about-page-jobsite': 'finish-wide',
  'about-page-truck': 'truck',
  'feature-finishing': 'finish-trowel',
  'feature-repair': 'plaster-arch',
  'feature-sanding': 'room-ceiling-line',
  'work-teaser-1': 'finish-reach',
  'work-teaser-2': 'high-wall',
  'work-teaser-3': 'ceiling-stilts',
  'work-teaser-4': 'hand-sanding',
  'service-drywall-installation-1': 'high-wall',
  'service-drywall-installation-2': 'finish-wide',
  'service-plaster-repair-1': 'plaster-arch',
  'service-basement-garage-house-finishing-1': 'finish-trowel',
  'service-basement-garage-house-finishing-2': 'room-ceiling-line',
  'area-dearborn-heights-1': 'finish-reach',
  'area-dearborn-heights-2': 'high-wall',
  'area-dearborn-heights-3': 'room-ceiling-line',
  'area-metro-detroit-1': 'finish-reach',
  'area-metro-detroit-2': 'high-wall',
  'area-metro-detroit-3': 'room-ceiling-line',
  'services-finishing': 'finish-trowel',
  'work-2': 'finish-reach',
  'work-3': 'finish-trowel',
  'work-4': 'pole-sanding',
  'work-5': 'ceiling-stilts',
  'work-6': 'high-wall',
  'work-7': 'hand-sanding',
  'work-8': 'room-ceiling-line',
};

// HOMEPAGE HERO
// layout: 'full'   = video fills the whole hero (wide crop on desktop, portrait clip on phones)
//         'framed' = previous design: portrait video in a panel beside the copy. Set this to revert.
export const hero = {
  layout: 'full',
  // portrait clip: phones in 'full' layout, and the panel in 'framed' layout
  video: '/assets/video/hero.mp4',
  poster: '/assets/img/media/hero-poster.webp',
  // wide clip (1280x720): desktop/tablet in 'full' layout. Cropped from IMG_1470 and mirrored so the worker sits right of the copy.
  wideVideo: '/assets/video/hero-wide.mp4',
  widePoster: '/assets/img/media/hero-wide-poster.webp',
};

// HOMEPAGE FEATURE ROWS: looping muted clips (4:5). Set useFeatureVideos to false to go back to stills.
export const useFeatureVideos = true;
export const featureVideos = {
  'feature-finishing': { src: '/assets/video/feat-large-space.mp4', poster: '/assets/img/media/feat-large-space-poster.webp', label: 'Workers finishing a drywall ceiling in a large open space' },
  'feature-repair': { src: '/assets/video/feat-repair.mp4', poster: '/assets/img/media/feat-repair-poster.webp', label: 'Worker applying plaster to a wall in a room with a cracked archway' },
  'feature-sanding': { src: '/assets/video/feat-sanding.mp4', poster: '/assets/img/media/feat-sanding-poster.webp', label: 'Worker sanding a drywall wall with a pole sander' },
};

// /our-work/ gallery. Each entry is one real clip. `slot` is the poster still above.
// Each tile autoplays a small muted 4:5 preview (prev-<preview>.mp4 + poster) and opens the full clip on click.
// The plaster-repair clip (Hero.mov) is left out: it has a burned-in Instagram watermark and music credit.
// Labels only describe what is visible in the footage. Add more clips by encoding
// them (MEDIA.md), then adding a row here.
export const gallery = [
  { category: 'finishing', label: 'Taping & Finishing', video: '/assets/video/hero.mp4', preview: 'taping' },
  { category: 'finishing', label: 'Finishing Work', video: '/assets/video/work-finishing-1.mp4', preview: 'finishing-1' },
  { category: 'sanding', label: 'Wall Sanding', video: '/assets/video/work-sanding-1.mp4', preview: 'sanding-1' },
  { category: 'overhead', label: 'Ceiling Work', video: '/assets/video/work-ceiling.mp4', preview: 'ceiling' },
  { category: 'overhead', label: 'High Wall Work', video: '/assets/video/work-high-wall.mp4', preview: 'high-wall' },
  { category: 'sanding', label: 'Hand Sanding', video: '/assets/video/work-sanding-2.mp4', preview: 'sanding-2' },
  { category: 'finishing', label: 'Finishing Work', video: '/assets/video/work-finishing-2.mp4', preview: 'finishing-2' },
];

export const galleryFilters = [
  ['all', 'All'],
  ['finishing', 'Taping & Finishing'],
  ['sanding', 'Sanding'],
  ['overhead', 'Ceilings & High Walls'],
];

// SERVICE-AREA HERO PHOTOS (files built by scripts/optimize-location-images.py from Locationimages/).
// pos = focal point on tablet/desktop, posM = focal point on phones (object-position values).
export const locationHeroes = {
  'dearborn-heights': { pos: '50% 42%', posM: '56% 45%' },
  'dearborn': { pos: '50% 26%', posM: '62% 40%' },
  'monroe': { pos: '50% 55%', posM: '48% 55%' },
  'carleton': { pos: '50% 58%', posM: '72% 55%' },
  'downriver': { pos: '50% 50%', posM: '64% 50%' },
  'metro-detroit': { pos: '50% 38%', posM: '22% 42%' },
};

// SERVICE-PAGE VIDEOS: where a service page had a still, it now plays a muted looping clip (4:5).
// Remove an entry to fall back to the still in slotStill. Posters are the clip's first frame.
export const slotVideo = {
  'service-drywall-installation-1': { src: '/assets/video/svc-high-wall.mp4', poster: '/assets/img/media/svc-high-wall-poster.webp' },
  'service-drywall-installation-2': { src: '/assets/video/svc-taping.mp4', poster: '/assets/img/media/svc-taping-poster.webp' },
  'service-plaster-repair-1': { src: '/assets/video/feat-repair.mp4', poster: '/assets/img/media/feat-repair-poster.webp' },
  'service-basement-garage-house-finishing-1': { src: '/assets/video/svc-finishing-knife.mp4', poster: '/assets/img/media/svc-finishing-knife-poster.webp' },
  'service-basement-garage-house-finishing-2': { src: '/assets/video/svc-ceiling-line.mp4', poster: '/assets/img/media/svc-ceiling-line-poster.webp' },
};

// About page: Lillian and Jonas helping out on a jobsite (IMG_5798, audio removed).
export const familyVideo = { src: '/assets/video/family-cleanup.mp4', poster: '/assets/img/media/family-cleanup-poster.webp' };

// Small autoplaying previews (400x500, no audio) used for project tiles. Poster = first frame.
export const preview = (id) => ({ src: `/assets/video/prev-${id}.mp4`, poster: `/assets/img/media/prev-${id}-poster.webp` });

// More slots that now play video instead of showing a still.
Object.assign(slotVideo, {
  'work-teaser-1': preview('taping'),
  'work-teaser-2': preview('high-wall'),
  'work-teaser-3': preview('ceiling'),
  'work-teaser-4': preview('sanding-2'),
  'area-dearborn-heights-1': preview('taping'),
  'area-dearborn-heights-2': preview('high-wall'),
  'area-dearborn-heights-3': preview('finishing-2'),
  'area-metro-detroit-1': preview('taping'),
  'area-metro-detroit-2': preview('high-wall'),
  'area-metro-detroit-3': preview('finishing-2'),
  'services-finishing': { src: '/assets/video/svc-finishing-knife.mp4', poster: '/assets/img/media/svc-finishing-knife-poster.webp' },
  'about-page-jobsite': { src: '/assets/video/svc-taping.mp4', poster: '/assets/img/media/svc-taping-poster.webp' },
  'careers-crew': { src: '/assets/video/feat-large-space.mp4', poster: '/assets/img/media/feat-large-space-poster.webp' },
});

// ============================================================================
// INTEGRATIONS (GoHighLevel, booking, reviews, SMS consent)
// Everything here is empty on purpose until the real value exists. Nothing is invented.
// See INTEGRATIONS.md for exactly what to paste where and what each value does.
// None of these values are secrets: they are safe in public HTML. The GHL webhook URL is NOT here.
// It lives in a server-side environment variable (GHL_WEBHOOK_URL) read by api/ghl-lead.js.
// ============================================================================
export const integrations = {
  // Same-origin path of the serverless proxy that forwards leads to GHL. Set to '/api/ghl-lead' ONLY after
  // GHL_WEBHOOK_URL is set in Vercel. While empty, the website never calls the proxy and Formspree works as today.
  ghlLeadProxy: '',

  // GHL calendar embed URL (the iframe "src" from GHL > Calendars > Embed). Empty => /book-estimate/ shows a phone fallback, no iframe.
  ghlCalendarEmbedUrl: '',
  // GHL permanent booking link (shareable calendar URL). Optional; shown as an "open in a new tab" link.
  ghlBookingLink: '',
  // After the calendar works, set true to send customers to /book-estimate/ after a successful estimate request.
  bookAfterEstimate: false,

  // Google Business Profile "write a review" URL. Empty => the homepage review section is hidden and /feedback/ says the link is not ready.
  googleReviewUrl: '',
  // Where the private feedback form posts (a second form service endpoint, or a GHL webhook proxy). Empty => the form says it is not switched on.
  feedbackEndpoint: '',

  // Only turn this on if Patch Master will really send promotional texts and the GHL campaign registration says so.
  // Dedicated /sms-opt-in/ page. Set to '/api/sms-optin' ONLY after GHL_OPTIN_WEBHOOK_URL is set in Vercel and a test works.
  // While empty, the page is shown for review but its form is disabled and says sign-up is not active. Nothing is sent.
  smsOptInEndpoint: '',
  smsOptInVersion: 'sms-optin-v2',
  smsMarketingEnabled: true,
  // Bump this whenever the consent wording below changes. It is stored with every submission.
  smsConsentVersion: 'sms-consent-v2',
};

// Consent wording. The exact text shown to the customer is also sent with the submission as a record.
export const smsConsent = {
  service: 'I agree to receive text messages from The Original Patch Master regarding my inquiries, estimates, appointments, and service updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance.',
  marketing: 'I agree to receive occasional marketing text messages from The Original Patch Master, such as seasonal offers and review requests. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is not a condition of purchase.',
  note: 'Consent is optional and is not a condition of requesting an estimate or any service.',
};

// Homepage About section: the two images now play as looping clips (3:4). Remove an entry to go back to the still.
Object.assign(slotVideo, {
  'about-family': { src: '/assets/video/about-room.mp4', poster: '/assets/img/media/about-room-poster.webp' },
  'about-jobsite': { src: '/assets/video/svc-high-wall.mp4', poster: '/assets/img/media/svc-high-wall-poster.webp' },
});

// Exact wording on the dedicated /sms-opt-in/ page. "Privacy Policy" and "Terms & Conditions" are turned into links when rendered.
// Change smsOptInVersion in `integrations` whenever this wording changes.
smsConsent.optInService = 'I agree to receive text messages from The Original Patch Master about my inquiries, estimates, appointments, and service updates at the mobile number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase. See our Privacy Policy and Terms & Conditions.';
smsConsent.optInMarketing = 'I agree to receive occasional marketing text messages from The Original Patch Master, such as seasonal offers and review requests. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is not a condition of purchase.';
