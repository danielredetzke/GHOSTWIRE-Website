// Copy buttons and the latest release number. No other script runs on the page.
(() => {
  const toasts = document.getElementById('toasts');
  function toast(text, err) {
    const t = document.createElement('div');
    t.className = err ? 'toast err' : 'toast';
    t.textContent = text;
    toasts.append(t);
    setTimeout(() => t.remove(), 2600);
  }

  // The "$ " prompt is left out of the copied text.
  for (const btn of document.querySelectorAll('[data-copy]')) {
    btn.addEventListener('click', async () => {
      const pre = document.getElementById(btn.dataset.copy);
      const text = [...pre.childNodes].filter((n) => !(n.classList && n.classList.contains('p'))).map((n) => n.textContent).join('');
      try {
        await navigator.clipboard.writeText(text);
        toast('Copied');
        btn.classList.add('done');
        setTimeout(() => btn.classList.remove('done'), 1600);
      } catch {
        const r = document.createRange();
        r.selectNodeContents(pre);
        getSelection().removeAllRanges();
        getSelection().addRange(r);
        toast('Copy failed: press ⌘C or Ctrl+C to copy the selected command', true);
      }
    });
  }

  // The number in the page is the fallback; latest.json is Gitea's latest
  // release, forwarded by nginx because Gitea sends no CORS headers.
  fetch('latest.json')
    .then((r) => (r.ok ? r.json() : null))
    .then((rel) => { if (rel && /^v\d+\.\d+\.\d+$/.test(rel.tag_name)) document.getElementById('ver').textContent = rel.tag_name; })
    .catch(() => {});
})();
