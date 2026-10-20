(function () {
  var page = (document.querySelector('[data-page]') || {}).getAttribute ? document.querySelector('[data-page]').getAttribute('data-page') : '';

  /* ---------- Shared header & footer ---------- */
  var links = [
    ['products.html', 'Products', 'products'],
    ['services.html', 'Services', 'services'],
    ['marketplace-data.html', 'Marketplace Data', 'marketplace'],
    ['about.html', 'About', 'about'],
    ['contact.html', 'Contact', 'contact']
  ];
  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML =
      '<div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="The Data Inc home"><img class="brand-logo" src="img/tdi-mark-light.png" alt="" width="34" height="38"><span class="brand-name">The Data Inc</span></a>' +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">' +
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h14M3 10h14M3 14h14"/></svg></button>' +
      '<nav class="nav" id="site-nav" aria-label="Main" data-open="false">' +
      links.map(function (l) { return '<a href="' + l[0] + '"' + (page === l[2] ? ' aria-current="page"' : '') + '>' + l[1] + '</a>'; }).join('') +
            '<a class="btn btn-primary" href="contact.html">Discuss your project</a>' +
      '</nav></div>';
    var btn = header.querySelector('.menu-btn');
    var nav = header.querySelector('.nav');
    btn.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      btn.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    });
  }

  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
      '<div><img src="img/tdi-mark-light.png" alt="" width="44" height="49" style="margin-bottom:6px"><span class="brand-name">The Data Inc</span><span class="muted">Turning data into decisions.</span><span class="chips" style="margin-top:6px"><span class="chip">UK</span><span class="chip">USA</span><span class="chip">KSA</span></span></div>' +
      '<div><span class="foot-label">COMPANY</span><a href="services.html">Services</a><a href="marketplace-data.html">Marketplace data</a><a href="products.html">Products</a><a href="about.html">About</a><a class="ext" href="https://www.omnicrt.com">OMNIcrt</a></div>' +
      '<div><span class="foot-label">CONTACT</span><span>atif@thedatainc.com</span><span>Coventry, United Kingdom</span></div>' +
      '<div><span class="foot-label">FOLLOW</span><a href="https://www.linkedin.com/company/the-data-inc/" target="_blank" rel="noopener">LinkedIn</a></div>' +
      '</div><div class="legal"><span>© 2026 THEDATAINC LTD. Registered in England &amp; Wales, Company No. 16241687.</span><span><a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a></span></div></div>';
  }

  /* ---------- Tabs (services) ---------- */
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length], true);
        if (e.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length], true);
      });
    });
    var hash = location.hash.replace('#', '');
    var initial = tabs.filter(function (t) { return t.id === 'tab-' + hash; })[0] || tabs[0];
    select(initial);
  });

  /* ---------- Chip filters (case studies) ---------- */
  var filterBar = document.getElementById('case-filters');
  if (filterBar) {
    var chips = filterBar.querySelectorAll('button');
    var cards = document.querySelectorAll('[data-tags]');
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        var f = c.getAttribute('data-filter');
        cards.forEach(function (card) { card.hidden = f !== 'all' && card.getAttribute('data-tags').indexOf(f) === -1; });
      });
    });
  }

  /* ---------- OMNIcrt demo ---------- */
  var tbody = document.getElementById('cert-rows');
  if (tbody) {
    var DAY = 86400000;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    function fmt(d) { return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }
    function statusOf(d) {
      var days = Math.round((d - today) / DAY);
      if (days < 0) return 'expired';
      if (days <= 30) return 'expiring';
      return 'valid';
    }
    var rows = [
      { cert: 'Lifting equipment inspection', asset: 'Crane 02', site: 'Dammam yard', days: 142 },
      { cert: 'Pressure test certificate', asset: 'Unit 07', site: 'Rig 3', days: 12 },
      { cert: 'Calibration certificate', asset: 'Gauge 14', site: 'Rig 3', days: -6 },
      { cert: 'NDT inspection report', asset: 'Pipe spool 31', site: 'Jubail base', days: 210 },
      { cert: 'BOP function test', asset: 'BOP stack A', site: 'Rig 1', days: 25 },
      { cert: 'Load test certificate', asset: 'Sling set 09', site: 'Dammam yard', days: 77 },
      { cert: 'Wire rope inspection', asset: 'Winch 04', site: 'Rig 1', days: -19 },
      { cert: 'Relief valve test', asset: 'PSV-118', site: 'Jubail base', days: 301 }
    ].map(function (r) { r.date = new Date(today.getTime() + r.days * DAY); return r; });

    var samples = {
      pressure: { cert: 'Pressure test certificate', asset: 'Choke manifold 05', site: 'Rig 2', days: 18, issuer: 'Third-party inspection body', no: 'PT-2026-0418' },
      calibration: { cert: 'Calibration certificate', asset: 'Torque wrench 22', site: 'Dammam yard', days: 340, issuer: 'Accredited calibration lab', no: 'CAL-55190' },
      lifting: { cert: 'Lifting equipment inspection', asset: 'Forklift 03', site: 'Jubail base', days: -3, issuer: 'Lifting inspection contractor', no: 'LEI-7731' }
    };

    var filter = 'all', query = '';
    var search = document.getElementById('cert-search');
    var fchips = document.querySelectorAll('#cert-filters button');

    function render() {
      var counts = { valid: 0, expiring: 0, expired: 0 };
      rows.forEach(function (r) { counts[statusOf(r.date)]++; });
      document.getElementById('k-valid').textContent = counts.valid;
      document.getElementById('k-expiring').textContent = counts.expiring;
      document.getElementById('k-expired').textContent = counts.expired;
      var shown = rows.filter(function (r) {
        var s = statusOf(r.date);
        var hay = (r.cert + ' ' + r.asset + ' ' + r.site).toLowerCase();
        return (filter === 'all' || s === filter) && hay.indexOf(query) !== -1;
      }).sort(function (a, b) { return a.date - b.date; });
      tbody.innerHTML = shown.length ? shown.map(function (r) {
        var s = statusOf(r.date);
        var label = s === 'valid' ? 'Valid' : s === 'expiring' ? 'Expiring' : 'Expired';
        return '<tr' + (r.isNew ? ' class="new"' : '') + '><td>' + r.cert + '</td><td>' + r.asset + '</td><td class="muted">' + r.site + '</td><td>' + fmt(r.date) + '</td><td><span class="status s-' + s + '">' + label + '</span></td></tr>';
      }).join('') : '<tr><td colspan="5" class="muted">No certificates match this filter.</td></tr>';
    }
    fchips.forEach(function (c) {
      c.addEventListener('click', function () {
        fchips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        filter = c.getAttribute('data-filter'); render();
      });
    });
    search.addEventListener('input', function () { query = search.value.trim().toLowerCase(); render(); });

    var runBtn = document.getElementById('run-demo');
    var steps = document.querySelectorAll('#demo-progress > div');
    var out = document.getElementById('demo-output');
    runBtn.addEventListener('click', function () {
      var pick = document.querySelector('input[name="sample"]:checked').value;
      var s = samples[pick];
      runBtn.disabled = true; out.hidden = true;
      steps.forEach(function (st) { st.setAttribute('data-state', 'idle'); });
      var i = 0;
      (function next() {
        if (i > 0) steps[i - 1].setAttribute('data-state', 'done');
        if (i === steps.length) {
          var d = new Date(today.getTime() + s.days * DAY);
          document.getElementById('x-cert').textContent = s.cert;
          document.getElementById('x-no').textContent = s.no;
          document.getElementById('x-asset').textContent = s.asset;
          document.getElementById('x-issuer').textContent = s.issuer;
          document.getElementById('x-exp').textContent = fmt(d);
          var st = statusOf(d);
          var xs = document.getElementById('x-status');
          xs.className = 'status s-' + st;
          xs.textContent = st === 'valid' ? 'Valid' : st === 'expiring' ? 'Expiring soon: alert scheduled' : 'Expired: flagged to site manager';
          out.hidden = false;
          rows.forEach(function (r) { r.isNew = false; });
          rows.push({ cert: s.cert, asset: s.asset, site: s.site, date: d, isNew: true });
          filter = 'all'; fchips.forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-filter') === 'all' ? 'true' : 'false'); });
          render();
          runBtn.disabled = false;
          return;
        }
        steps[i].setAttribute('data-state', 'active');
        i++;
        setTimeout(next, 750);
      })();
    });
    render();
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      ['c-name', 'c-email', 'c-message'].forEach(function (id) {
        var el = document.getElementById(id);
        var err = document.getElementById(id + '-err');
        var msg = '';
        if (!el.value.trim()) msg = 'Please fill this in.';
        else if (id === 'c-email' && !/^\S+@\S+\.\S+$/.test(el.value.trim())) msg = 'Enter an email address like name@company.com.';
        err.textContent = msg;
        el.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (msg) ok = false;
      });
      if (!ok) return;
      var first = document.getElementById('c-name').value.trim().split(' ')[0];
      var btn = document.getElementById('c-submit');
      var sendErr = document.getElementById('c-send-err');
      sendErr.textContent = '';
      btn.disabled = true; btn.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('send failed');
          form.hidden = true;
          document.getElementById('done-name').textContent = first;
          document.getElementById('form-done').hidden = false;
        })
        .catch(function () {
          sendErr.textContent = 'Sorry, your message could not be sent. Please email atif@thedatainc.com instead.';
        })
        .then(function () { btn.disabled = false; btn.textContent = 'Send message'; });
    });
    var again = document.getElementById('form-again');
    if (again) again.addEventListener('click', function () { form.reset(); form.hidden = false; document.getElementById('form-done').hidden = true; });
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var label = b.textContent;
      function done(t) { b.textContent = t; setTimeout(function () { b.textContent = label; }, 1600); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done('Copied'); }, function () { done('Select the address to copy'); });
      } else { done('Select the address to copy'); }
    });
  });
})();
