(function () {
  'use strict';

  /* ---------- Navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var subs = document.querySelectorAll('.has-sub');

  function closeSubs(except) {
    subs.forEach(function (li) {
      if (li === except) return;
      li.classList.remove('open');
      li.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false');
    });
  }
  function setMenu(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (!open) closeSubs();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
  }
  subs.forEach(function (li) {
    var btn = li.querySelector('.sub-toggle');
    btn.addEventListener('click', function () {
      var open = !li.classList.contains('open');
      closeSubs(li);
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openSub = document.querySelector('.has-sub.open');
    if (openSub) {
      closeSubs();
      openSub.querySelector('.sub-toggle').focus();
    } else if (nav && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) closeSubs();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1260) setMenu(false);
  });
  /* An open mobile menu closes on scroll, so its Call / Free Estimate buttons do not follow the page. */
  var menuY = 0;
  if (toggle) toggle.addEventListener('click', function () { menuY = window.scrollY; });
  window.addEventListener('scroll', function () {
    if (nav && nav.classList.contains('is-open') && Math.abs(window.scrollY - menuY) > 30) setMenu(false);
  }, { passive: true });

  /* ---------- Background videos ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conn = navigator.connection || {};
  var slow = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
  var canPlay = !reduce && !slow;
  var attempt = function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); return p; };

  /* Hero: wide clip on desktop, portrait clip on phones. Poster stays (CSS) when motion is off. */
  var heroVid = document.querySelector('.hero__vid');
  if (heroVid && canPlay) {
    var heroEl = heroVid.closest('.hero');
    var pauseBtn = heroEl.querySelector('.hero__pause');
    var wide = heroVid.getAttribute('data-src-wide');
    var tall = heroVid.getAttribute('data-src-tall') || heroVid.getAttribute('data-src');
    var mq = window.matchMedia('(min-width: 900px)');
    var userPaused = false;
    var pick = function () {
      var want = wide && mq.matches ? wide : tall;
      if (heroVid.getAttribute('src') === want) return;
      heroVid.src = want;
      if (!userPaused) attempt(heroVid);
    };
    heroVid.muted = true;
    pick();
    var start = attempt(heroVid);
    if (start && start.then) start.then(function () { heroEl.classList.add('is-ready'); });
    if (mq.addEventListener) mq.addEventListener('change', pick);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (userPaused || !heroEl.classList.contains('is-ready')) return;
        entries[0].isIntersecting ? attempt(heroVid) : heroVid.pause();
      }).observe(heroEl);
    }
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        userPaused = !userPaused;
        userPaused ? heroVid.pause() : attempt(heroVid);
        pauseBtn.setAttribute('aria-pressed', String(userPaused));
        pauseBtn.setAttribute('aria-label', userPaused ? 'Play background video' : 'Pause background video');
      });
    }
  }

  /* Section videos: fetch only when near the viewport, play while visible, pause when scrolled away. */
  var secVids = document.querySelectorAll('.lazyvid');
  if (secVids.length && canPlay && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        var fig = v.parentNode;
        if (e.intersectionRatio >= 0.25) {
          if (!v.getAttribute('src')) {
            v.src = v.getAttribute('data-src');
            v.addEventListener('playing', function () { fig.classList.add('is-playing'); }, { once: true });
          }
          if (!v.hasAttribute('data-user-paused')) attempt(v);
        } else if (e.intersectionRatio < 0.05) {
          v.pause();
        }
      });
    }, { threshold: [0, 0.05, 0.25, 0.5], rootMargin: '150px 0px' });
    secVids.forEach(function (v) {
      v.muted = true;
      io.observe(v);
      var btn = v.parentNode.querySelector('.vid-pause');
      if (btn) {
        btn.addEventListener('click', function () {
          var paused = !v.hasAttribute('data-user-paused');
          if (paused) { v.setAttribute('data-user-paused', ''); v.pause(); } else { v.removeAttribute('data-user-paused'); attempt(v); }
          btn.setAttribute('aria-pressed', String(paused));
          btn.setAttribute('aria-label', paused ? 'Play video' : 'Pause video');
        });
      }
    });
  }

  /* ---------- Our Work video player ---------- */
  var dlg = document.getElementById('video-dialog');
  if (dlg && typeof dlg.showModal === 'function') {
    var dv = dlg.querySelector('video');
    var dt = document.getElementById('vdlg-title');
    document.querySelectorAll('.tile-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        dt.textContent = b.getAttribute('data-title');
        dv.src = b.getAttribute('data-video');
        dlg.showModal();
        var p = dv.play();
        if (p && p.catch) p.catch(function () {});
      });
    });
    var closeDlg = function () { dlg.close(); };
    dlg.querySelector('.vdlg__close').addEventListener('click', closeDlg);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) closeDlg(); });
    dlg.addEventListener('close', function () { dv.pause(); dv.removeAttribute('src'); dv.load(); });
  }

  /* ---------- Our Work filter ---------- */
  var filters = document.querySelectorAll('.filter');
  var items = document.querySelectorAll('#gallery > li');
  var empty = document.getElementById('gallery-empty');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      var shown = 0;
      items.forEach(function (li) {
        var match = key === 'all' || li.getAttribute('data-cat') === key;
        li.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    });
  });

  /* ---------- Feedback: star rating -> Next -> both options, for every rating (no review gating) ---------- */
  var rateCard = document.getElementById('rate-card');
  if (rateCard) {
    var rStars = rateCard.querySelectorAll('.rate-stars input');
    var rLabels = rateCard.querySelectorAll('.rate-stars label');
    var rNext = document.getElementById('rate-next');
    var rLive = document.getElementById('rate-live');
    var rOpts = document.getElementById('rate-options');
    var rWords = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    var rCur = 0;
    var paint = function (n) { rLabels.forEach(function (l, i) { l.classList.toggle('is-on', i < n); }); };
    rStars.forEach(function (r) {
      r.addEventListener('change', function () {
        rCur = +r.value;
        paint(rCur);
        rNext.disabled = false;
        rLive.textContent = rCur + ' of 5 stars selected: ' + rWords[rCur - 1] + '.';
      });
    });
    rLabels.forEach(function (l, i) {
      l.addEventListener('mouseenter', function () { paint(i + 1); });
    });
    rateCard.querySelector('.rate-stars').addEventListener('mouseleave', function () { paint(rCur); });
    rNext.addEventListener('click', function () {
      if (!rCur) return;
      // 1-3 stars: separate private-feedback page (no Google link). 4-5 stars: offer the Google review.
      if (rCur <= 3) { location.href = '/feedback/private/?rating=' + rCur; return; }
      var link = document.getElementById('rate-private-link');
      if (link) link.href = '/feedback/private/?rating=' + rCur;
      rOpts.hidden = false;
      var gs = document.getElementById('gsec'); if (gs) gs.hidden = false;
      rNext.hidden = true;
      var h = document.getElementById('rate-options-h');
      h.focus();
      h.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  }

  /* Private feedback page: carry the star rating from the previous step into the submission. */
  var fbNote = document.getElementById('fb-rating-note');
  if (fbNote) {
    var qr = parseInt(new URLSearchParams(location.search).get('rating'), 10);
    if (qr >= 1 && qr <= 5) {
      document.getElementById('fb-rating').value = String(qr);
      document.getElementById('fb-subject').value = 'Customer feedback (' + qr + ' star' + (qr > 1 ? 's' : '') + '): The Original Patch Master';
      fbNote.textContent = 'Your rating: ' + qr + ' of 5 stars';
      fbNote.hidden = false;
    }
  }

  /* ---------- Forms (estimate request, job application, feedback) ----------
     Each form has its own endpoint (data-endpoint). Nothing is "sent" unless the endpoint accepts it.
     Customer estimate form only: after Formspree accepts a lead, the same lead (same lead_id) is forwarded once to the
     same-origin GHL proxy (data-ghl-proxy), if one is configured. A GHL failure never changes what the customer sees. */
  var newId = function () {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'lead-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  };

  document.querySelectorAll('form[data-endpoint]').forEach(function (form) {
    var status = form.querySelector('.form-note');
    var required = (form.getAttribute('data-required') || '').split(',').filter(Boolean);
    var requireAny = (form.getAttribute('data-require-any') || '').split(',').filter(Boolean);
    var say = function (msg, kind) {
      status.textContent = msg;
      status.className = 'form-note' + (kind ? ' is-' + kind : '');
    };
    var leadId = newId();   // stays the same across retries of the same request, so a lead is never counted twice

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements._gotcha && form.elements._gotcha.value) return;

      var missing = [];
      required.forEach(function (n) {
        var el = form.elements[n];
        var bad = !el.value.trim() || (el.type === 'email' && !el.checkValidity());
        el.setAttribute('aria-invalid', String(bad));
        if (bad) missing.push(el);
      });
      if (missing.length) {
        say(form.getAttribute('data-missing') || 'Please fill in your name, phone number and a short description of the job.', 'error');
        missing[0].focus();
        return;
      }
      if (form.hasAttribute('data-check-email') && form.elements.email && form.elements.email.value.trim() && !form.elements.email.checkValidity()) {
        form.elements.email.setAttribute('aria-invalid', 'true');
        say('That email address does not look right. You can leave it blank.', 'error');
        form.elements.email.focus();
        return;
      }
      if (requireAny.length && !requireAny.some(function (n) { var el = form.elements[n]; return el && el.value && el.value.trim(); })) {
        say(form.getAttribute('data-missing') || 'Please fill in the form first.', 'error');
        return;
      }

      var endpoint = form.getAttribute('data-endpoint');
      if (!endpoint) {
        say(form.getAttribute('data-noendpoint') || 'Online requests are not switched on yet, so nothing was sent. Please call 734-489-2284 or email raegirlg@icloud.com.', 'error');
        return;
      }

      // Lead tracking: which page it came from and when (the only extras sent besides what the customer typed).
      var now = new Date().toISOString();
      if (form.elements.source_page) form.elements.source_page.value = document.title + ' (' + location.pathname + ')';
      if (form.elements.submitted_at) form.elements.submitted_at.value = now;
      if (form.elements.lead_id) form.elements.lead_id.value = leadId;

      // SMS consent record: per category, the checkbox result (Yes/No), the exact wording shown, and when.
      var consentBoxes = form.querySelectorAll('input[data-consent]');
      consentBoxes.forEach(function (box) {
        var cat = box.getAttribute('data-consent');
        var txt = form.querySelector('[data-consent-text="' + cat + '"]');
        if (form.elements['sms_' + cat + '_consent']) form.elements['sms_' + cat + '_consent'].value = box.checked ? 'Yes' : 'No';
        if (form.elements['sms_consent_' + cat]) form.elements['sms_consent_' + cat].value = box.checked ? 'true' : 'false';
        if (form.elements['sms_' + cat + '_consent_text']) form.elements['sms_' + cat + '_consent_text'].value = txt ? txt.textContent.trim() : '';
      });
      if (form.elements.sms_consent_recorded_at) form.elements.sms_consent_recorded_at.value = now;

      var btn = form.querySelector('button[type=submit]');
      if (form.getAttribute('data-sending') === '1') return;   // ignore repeated clicks while a request is in flight
      form.setAttribute('data-sending', '1');
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
      var done = function () { form.removeAttribute('data-sending'); if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); } };
      say('Sending...', '');

      var data = new FormData(form);
      var proxy = form.getAttribute('data-ghl-proxy');
      var bookUrl = form.getAttribute('data-book-url');
      var payload = null;
      if (proxy) {
        payload = {};
        data.forEach(function (v, k) { if (k.charAt(0) !== '_') payload[k] = v; });
      }

      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          // Success only when the endpoint accepts it (HTTP 2xx and no errors); the fields stay filled otherwise.
          if (!res.ok || (res.d && res.d.errors)) throw new Error('rejected');
          done();
          form.reset();
          leadId = newId();
          say(form.getAttribute('data-ok') || 'Thank you. Your request was sent. We will get back to you during business hours.', 'ok');
          if (payload) forwardToGhl(proxy, payload);
          if (bookUrl) setTimeout(function () { location.href = bookUrl; }, 1800);
        })
        .catch(function () {
          done();
          say('Your submission did not go through. Your information is still here, so you can try again. Or call 734-489-2284 or email raegirlg@icloud.com.', 'error');
        });
    });
  });

  // Forward an already-accepted lead to the server-side GHL proxy. Fire-and-forget with one retry; never shown to the customer.
  function forwardToGhl(url, payload) {
    var send = function () {
      return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), keepalive: true })
        .then(function (r) { if (!r.ok) throw new Error('ghl ' + r.status); });
    };
    send().catch(function () { setTimeout(function () { send().catch(function () { /* Formspree still has the lead */ }); }, 3000); });
  }

  /* ---------- SMS opt-in page ----------
     Separate from the inquiry forms: no Formspree. The record goes to a server-side GHL webhook (data-optin-endpoint).
     Success is shown only when the server confirms GHL accepted the record. */
  var optin = document.getElementById('optin-form');
  if (optin) {
    var oStatus = optin.querySelector('.form-note');
    var oSay = function (msg, kind) { oStatus.textContent = msg; oStatus.className = 'form-note' + (kind ? ' is-' + kind : ''); };
    var oLead = newId();
    // 10-digit US mobile number (a leading 1 or +1 is accepted) -> +1XXXXXXXXXX
    var normPhone = function (raw) {
      var d = String(raw || '').replace(/\D/g, '');
      if (d.length === 11 && d.charAt(0) === '1') d = d.slice(1);
      return /^[2-9]\d{9}$/.test(d) ? '+1' + d : '';
    };
    optin.addEventListener('submit', function (e) {
      e.preventDefault();
      var endpoint = optin.getAttribute('data-optin-endpoint');
      if (!endpoint) { oSay('Sign-up could not be sent right now. Please call 734-489-2284.', 'error'); return; }
      if (optin.elements._gotcha && optin.elements._gotcha.value) return;

      var name = optin.elements.name, phoneEl = optin.elements.phone, email = optin.elements.email;
      var phone = normPhone(phoneEl.value);
      var boxes = optin.querySelectorAll('input[data-consent]');
      var anyConsent = false;
      boxes.forEach(function (b) { if (b.checked) anyConsent = true; });
      var nameBad = !name.value.trim(), phoneBad = !phone, emailBad = !!email.value.trim() && !email.checkValidity();
      name.setAttribute('aria-invalid', String(nameBad)); phoneEl.setAttribute('aria-invalid', String(phoneBad)); email.setAttribute('aria-invalid', String(emailBad));
      if (nameBad) { oSay('Please enter your full name.', 'error'); name.focus(); return; }
      if (phoneBad) { oSay('Please enter a valid 10-digit mobile phone number.', 'error'); phoneEl.focus(); return; }
      if (emailBad) { oSay('That email address does not look right. You can leave it blank.', 'error'); email.focus(); return; }
      if (!anyConsent) { oSay('Please check the box to agree to receive text messages. Without it we cannot sign you up.', 'error'); boxes[0].focus(); return; }

      if (optin.getAttribute('data-sending') === '1') return;
      optin.setAttribute('data-sending', '1');
      var btn = optin.querySelector('button[type=submit]');
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
      var finish = function () { optin.removeAttribute('data-sending'); if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); } };

      // The record: contact, per-category consent (true/false and Yes/No), the exact wording shown, version, time and source URL.
      var rec = { name: name.value.trim(), phone: phone, email: email.value.trim(), form_type: 'SMS opt-in', lead_id: oLead,
        _subject: 'SMS opt-in: The Original Patch Master',
        sms_consent_version: optin.getAttribute('data-consent-version'), sms_consent_recorded_at: new Date().toISOString(),
        source_url: location.href, source_page: document.title,
        sms_consent_service: 'false', sms_consent_marketing: 'false' };
      boxes.forEach(function (b) {
        var cat = b.getAttribute('data-consent');
        var txt = optin.querySelector('[data-consent-text="' + cat + '"]');
        rec['sms_consent_' + cat] = b.checked ? 'true' : 'false';
        rec['sms_' + cat + '_consent'] = b.checked ? 'Yes' : 'No';
        rec['sms_' + cat + '_consent_text'] = txt ? txt.textContent.trim() : '';
      });
      oSay('Sending...', '');
      // Formspree-style endpoint: multipart form data. A same-origin /api/ proxy (the later GHL setup): JSON.
      var viaProxy = endpoint.charAt(0) === '/';
      var req;
      if (viaProxy) {
        req = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rec) };
      } else {
        var fd = new FormData();
        Object.keys(rec).forEach(function (k) { fd.append(k, rec[k]); });
        req = { method: 'POST', body: fd, headers: { Accept: 'application/json' } };
      }
      fetch(endpoint, req)
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          // Success only when the endpoint confirms: HTTP 2xx, no errors, and (for the proxy) an explicit ok:true.
          if (!res.ok || (res.d && res.d.errors) || (viaProxy && (!res.d || res.d.ok !== true))) throw new Error('not recorded');
          optin.reset(); oLead = newId();
          setTimeout(finish, 4000);   // keep the button locked briefly so the confirmation stays on screen
          oSay("Thanks! You're signed up for text messages from The Original Patch Master. Reply STOP anytime to opt out.", 'ok');
        })
        .catch(function () {
          finish();
          oSay('We could not record your sign-up, so you are not signed up yet. Your information is still here, so you can try again. Or call 734-489-2284.', 'error');
        });
    });
  }
})();
