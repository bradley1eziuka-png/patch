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
    if (window.innerWidth >= 1200) setMenu(false);
  });

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

  /* ---------- Estimate form ---------- */
  var form = document.getElementById('estimate-form');
  if (form) {
    var status = document.getElementById('form-status');
    var endpoint = form.getAttribute('data-endpoint');
    var say = function (msg, kind) {
      status.textContent = msg;
      status.className = 'form-note' + (kind ? ' is-' + kind : '');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements._gotcha && form.elements._gotcha.value) return;

      var missing = [];
      ['name', 'phone', 'message'].forEach(function (n) {
        var el = form.elements[n];
        var bad = !el.value.trim();
        el.setAttribute('aria-invalid', String(bad));
        if (bad) missing.push(el);
      });
      if (missing.length) {
        say('Please fill in your name, phone number and a short description of the job.', 'error');
        missing[0].focus();
        return;
      }

      if (!endpoint) {
        say('Online requests are not switched on yet, so nothing was sent. Please call 734-489-2284 or email raegirlg@icloud.com.', 'error');
        return;
      }

      say('Sending...', '');
      fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('bad response');
          form.reset();
          say('Thank you. Your request was sent. We will get back to you during business hours.', 'ok');
        })
        .catch(function () {
          say('Your request did not go through. Please call 734-489-2284 or email raegirlg@icloud.com.', 'error');
        });
    });
  }
})();
