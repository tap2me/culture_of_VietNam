/* =====================================================================
   VIỆT NAM – HÀNH TRÌNH VĂN HÓA · script chính
   - Song ngữ Việt / Anh (mọi chữ có data-vi & data-en)
   - Điều hướng theo #/trang, bản đồ tương tác, nhạc nền từng miền
   - Sổ tay du lịch, hộ chiếu con dấu, phát âm tiếng Việt, 12 con giáp,
     đếm ngược Tết, đố vui & chứng nhận
   ===================================================================== */
(() => {
  "use strict";

  const D = window.VN_DATA;
  const MAP = window.VN_MAP;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Lưu trữ cục bộ (an toàn khi trình duyệt chặn) ---------- */
  const store = {
    get(k, def) {
      try { const v = localStorage.getItem("vn." + k); return v === null ? def : JSON.parse(v); } catch (e) { return def; }
    },
    set(k, v) { try { localStorage.setItem("vn." + k, JSON.stringify(v)); } catch (e) {} },
    raw(k, v) { try { localStorage.setItem("vn." + k, v); } catch (e) {} }
  };

  /* ---------- Song ngữ ---------- */
  let lang = document.documentElement.lang === "en" ? "en" : "vi";
  const T = (o) => (o == null ? "" : typeof o === "string" ? o : o[lang] != null ? o[lang] : o.vi);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const tx = (o, tag = "span", attrs = "") => `<${tag}${attrs ? " " + attrs : ""} data-vi="${esc(o.vi)}" data-en="${esc(o.en)}">${esc(o[lang])}</${tag}>`;
  const ariaT = (o) => ` data-vi-aria="${esc(o.vi)}" data-en-aria="${esc(o.en)}" aria-label="${esc(o[lang])}" title="${esc(o[lang])}"`;
  const ariaL = (o) => ` data-vi-aria="${esc(o.vi)}" data-en-aria="${esc(o.en)}" aria-label="${esc(o[lang])}"`;
  const altT = (o) => ` data-vi-alt="${esc(o.vi)}" data-en-alt="${esc(o.en)}" alt="${esc(o[lang])}"`;
  const src = (p) => encodeURI(p);
  const fmtNum = (n) => Number(n).toLocaleString(lang === "vi" ? "vi-VN" : "en-US");
  const langListeners = [];
  const onLang = (fn) => { langListeners.push(fn); fn(); };

  const SITE = { vi: "Việt Nam – Hành trình văn hóa", en: "Vietnam – A Cultural Journey" };
  const VIEW_TITLES = {
    home: null,
    map: { vi: "Bản đồ di sản", en: "Heritage map" },
    north: { vi: "Miền Bắc – Hà Nội", en: "Northern Vietnam – Hanoi" },
    central: { vi: "Miền Trung – Huế", en: "Central Vietnam – Hue" },
    south: { vi: "Miền Nam – Sài Gòn", en: "Southern Vietnam – Saigon" },
    finish: { vi: "Hành trình hoàn tất", en: "Journey complete" },
    phrases: { vi: "Nói tiếng Việt", en: "Speak Vietnamese" },
    zodiac: { vi: "12 con giáp", en: "Vietnamese zodiac" },
    festivals: { vi: "Lễ hội & Tết", en: "Festivals & Tết" },
    tips: { vi: "Cẩm nang du lịch", en: "Travel tips" },
    quiz: { vi: "Đố vui & chứng nhận", en: "Quiz & certificate" }
  };

  function applyLang(next) {
    lang = next === "en" ? "en" : "vi";
    document.documentElement.lang = lang;
    store.raw("lang", lang);
    $$("[data-vi]").forEach((el) => { const v = el.dataset[lang]; if (v != null) el.textContent = v; });
    $$("[data-vi-aria]").forEach((el) => { const v = el.dataset[lang + "Aria"]; el.setAttribute("aria-label", v); if (el.hasAttribute("title")) el.title = v; });
    $$("[data-vi-ph]").forEach((el) => { el.placeholder = el.dataset[lang + "Ph"]; });
    $$("[data-vi-alt]").forEach((el) => { el.alt = el.dataset[lang + "Alt"]; });
    $$(".lang-switch button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    $("#mainnav").setAttribute("aria-label", lang === "vi" ? "Điều hướng chính" : "Main navigation");
    updateTitle();
    langListeners.forEach((fn) => fn());
  }
  function updateTitle() {
    const vt = VIEW_TITLES[currentView];
    document.title = vt ? `${T(vt)} · ${T(SITE)}` : T(SITE);
  }

  /* ---------- Thông báo nhỏ ---------- */
  let toastTimer;
  function toast(o) {
    const el = $("#toast");
    el.textContent = T(o);
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
  }

  /* =====================================================================
     TRỐNG ĐỒNG ĐÔNG SƠN – vẽ bằng toán học, dùng cho SVG lẫn canvas
     ===================================================================== */
  const BIRD = [
    ["M", 19, 0], ["L", 8, -2.2], ["C", 6, -5, 2, -5.5, 0, -3.6], ["L", -8, -3.2], ["L", -14, -9.5], ["L", -11, -2.6],
    ["L", -19, -5.5], ["L", -11, 0.4], ["L", -16, 4.5], ["L", -6, 2.6], ["C", -2, 3.6, 4, 3, 8, 0.8], ["Z"],
    ["M", 3.6, -5.4], ["L", -3, -11.5], ["L", 1.5, -4.4], ["Z"],
    ["M", 3, -3.8], ["L", -4, -13.6], ["L", -9, -14], ["L", -1, -3.4], ["Z"]
  ];
  function drumGeometry(full) {
    const C = 200, TAU = Math.PI * 2;
    const r1 = (n) => Math.round(n * 10) / 10;
    const P = (r, a) => [r1(C + r * Math.cos(a)), r1(C + r * Math.sin(a))];
    const circ = (r, cx = C, cy = C) => `M${r1(cx - r)} ${r1(cy)}a${r1(r)} ${r1(r)} 0 1 0 ${r1(2 * r)} 0a${r1(r)} ${r1(r)} 0 1 0 ${r1(-2 * r)} 0`;
    let S = "", F = "";
    // Ngôi sao 14 cánh ở tâm mặt trống
    for (let i = 0; i < 28; i++) {
      const [x, y] = P(i % 2 ? 15 : 44, -Math.PI / 2 + (i * Math.PI) / 14);
      F += (i ? "L" : "M") + x + " " + y;
    }
    F += "Z";
    const ring = (r) => { S += circ(r); };
    const ticks = (a, b, n) => { for (let i = 0; i < n; i++) { const t = (i / n) * TAU, p = P(a, t), q = P(b, t); S += `M${p[0]} ${p[1]}L${q[0]} ${q[1]}`; } };
    const beads = (r, rr, n) => { for (let i = 0; i < n; i++) { const [x, y] = P(r, (i / n) * TAU); S += circ(rr, x, y); F += circ(rr * 0.34, x, y); } };
    const zig = (a, b, n) => { for (let i = 0; i <= 2 * n; i++) { const [x, y] = P(i % 2 ? b : a, (i / (2 * n)) * TAU); S += (i ? "L" : "M") + x + " " + y; } };
    // Chim Lạc bay ngược chiều kim đồng hồ quanh mặt trống
    const birds = (r, n, s) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * TAU;
        const tX = Math.sin(a), tY = -Math.cos(a), iX = -Math.cos(a), iY = -Math.sin(a);
        const cx = C + r * Math.cos(a), cy = C + r * Math.sin(a);
        BIRD.forEach((seg) => {
          let out = seg[0];
          for (let k = 1; k < seg.length; k += 2) {
            const lx = seg[k] * s, ly = seg[k + 1] * s;
            out += (k > 1 ? " " : "") + r1(cx + lx * tX + ly * iX) + " " + r1(cy + lx * tY + ly * iY);
          }
          F += out;
        });
      }
    };
    if (full) {
      ring(51); ticks(51, 59, 60); ring(59);
      beads(66, 5.4, 36); ring(73);
      zig(73, 83, 36); ring(83);
      ring(87); birds(110, 18, 1); ring(133);
      ring(137); ticks(137, 145, 120); ring(145);
      beads(152, 5.6, 80); ring(159);
      zig(159, 169, 60); ring(169);
      ring(173); ticks(173, 181, 150); ring(181);
      beads(187, 4.8, 110); ring(193); ring(198);
    } else {
      ring(54); beads(68, 8, 24); ring(82);
      birds(111, 10, 1.3); ring(140);
      zig(140, 160, 24); ring(160);
      beads(177, 8.5, 50); ring(194);
    }
    return { S, F };
  }
  const DRUM = drumGeometry(true);
  const DRUM_LITE = drumGeometry(false);
  (function injectDrums() {
    const defs = $("svg defs");
    const sym = (id, g) => `<symbol id="${id}" viewBox="0 0 400 400"><path d="${g.S}" fill="none" stroke="currentColor"/><path d="${g.F}" fill="currentColor" stroke="none"/></symbol>`;
    defs.insertAdjacentHTML("beforeend", sym("drum", DRUM) + sym("drum-lite", DRUM_LITE));
  })();

  /* =====================================================================
     PHÁT ÂM TIẾNG VIỆT (Web Speech API)
     ===================================================================== */
  let viVoice = null, voicesChecked = false, warnedVoice = false;
  const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
  function loadVoices() {
    if (!synth) return;
    const vs = synth.getVoices();
    if (!vs.length) return;
    voicesChecked = true;
    viVoice = vs.find((v) => /^vi([-_]|$)/i.test(v.lang)) || null;
    $("#voice-warning").hidden = !!viVoice;
  }
  if (synth) {
    loadVoices();
    synth.addEventListener ? synth.addEventListener("voiceschanged", loadVoices) : (synth.onvoiceschanged = loadVoices);
  }
  let speakingBtn = null;
  function speak(text, slow, btn) {
    if (!synth) { toast({ vi: "Trình duyệt này chưa hỗ trợ đọc giọng nói.", en: "This browser doesn't support speech." }); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(String(text).replace(/\s*\/\s*/g, ", "));
    u.lang = "vi-VN";
    if (viVoice) u.voice = viVoice;
    u.rate = slow ? 0.55 : 0.88;
    const audio = currentRegion && audios[currentRegion];
    const clear = () => {
      if (speakingBtn) speakingBtn.classList.remove("is-speaking");
      speakingBtn = null;
      if (audio) audio.volume = 0.6;
    };
    u.onstart = () => {
      if (speakingBtn) speakingBtn.classList.remove("is-speaking");
      speakingBtn = btn || null;
      if (btn) btn.classList.add("is-speaking");
      if (audio && !audio.paused) audio.volume = 0.15;
    };
    u.onend = clear;
    u.onerror = clear;
    synth.speak(u);
    if (voicesChecked && !viVoice && !warnedVoice) {
      warnedVoice = true;
      toast({ vi: "Máy chưa có giọng đọc tiếng Việt – phát âm có thể chưa chuẩn.", en: "No Vietnamese voice on this device – pronunciation may be off." });
    }
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-speak]");
    if (b) speak(b.dataset.speak, !!b.dataset.slow, b);
  });

  /* =====================================================================
     NHẠC NỀN TỪNG MIỀN (giữ logic gốc: nhạc tắt khi xem video)
     ===================================================================== */
  const audios = { north: $("#audio-north"), central: $("#audio-central"), south: $("#audio-south") };
  let currentRegion = null, isMutedByUser = false, resumeAfterVideo = false;
  const player = $("#player"), disc = $("#player-disc"), trackTitle = $("#track-title"), trackSub = $("#track-subtitle");
  const toggleAudioBtn = $("#toggle-audio-btn"), audioIcon = toggleAudioBtn.querySelector("i");
  const allVideos = () => $$(".region-view video");

  function setI18n(el, o) { el.dataset.vi = o.vi; el.dataset.en = o.en; el.textContent = o[lang]; }
  function setAria(el, o) { el.dataset.viAria = o.vi; el.dataset.enAria = o.en; el.setAttribute("aria-label", o[lang]); el.title = o[lang]; }
  function updateAudioUI(playing) {
    disc.classList.toggle("spinning", playing);
    audioIcon.classList.toggle("fa-pause", playing);
    audioIcon.classList.toggle("fa-play", !playing);
    setAria(toggleAudioBtn, playing ? { vi: "Tạm dừng nhạc", en: "Pause music" } : { vi: "Phát nhạc", en: "Play music" });
  }
  function stopAllMusic() {
    Object.values(audios).forEach((a) => { if (a) { a.pause(); try { a.currentTime = 0; } catch (e) {} } });
    disc.classList.remove("spinning");
  }
  const isAnyVideoPlaying = () => allVideos().some((v) => !v.paused && !v.ended);
  function pauseAllMusic() {
    Object.values(audios).forEach((a) => { if (a && !a.paused) a.pause(); });
    updateAudioUI(false);
  }
  // Chốt chặn: nhạc nền không bao giờ phát chồng lên video
  Object.values(audios).forEach((a) => {
    ["play", "playing"].forEach((evt) => a.addEventListener(evt, () => { if (isAnyVideoPlaying()) { a.pause(); updateAudioUI(false); } }));
  });
  function playRegionMusic(id) {
    stopAllMusic();
    currentRegion = id;
    const a = audios[id], r = D.regions[id];
    if (!a || !r) return;
    player.hidden = false;
    setI18n(trackTitle, r.music.title);
    setI18n(trackSub, r.music.subtitle);
    if (isMutedByUser || isAnyVideoPlaying()) { updateAudioUI(false); return; }
    a.volume = 0.6;
    a.play().then(() => updateAudioUI(true)).catch(() => updateAudioUI(false)); // trình duyệt chặn tự phát
  }
  toggleAudioBtn.addEventListener("click", () => {
    const a = currentRegion && audios[currentRegion];
    if (!a) return;
    if (a.paused) {
      isMutedByUser = false;
      resumeAfterVideo = false;
      allVideos().forEach((v) => { if (!v.paused) v.pause(); });
      a.volume = 0.6;
      a.play().then(() => updateAudioUI(true)).catch(() => updateAudioUI(false));
    } else {
      isMutedByUser = true;
      a.pause();
      updateAudioUI(false);
    }
  });
  function stopVideos() {
    allVideos().forEach((v) => { if (!v.paused) v.pause(); if (v.currentTime > 0) v.currentTime = 0; });
  }
  function bindVideo(video) {
    const onStart = () => {
      const a = currentRegion && audios[currentRegion];
      if (a && !a.paused) resumeAfterVideo = true;
      if (isMutedByUser) resumeAfterVideo = false;
      pauseAllMusic();
    };
    video.addEventListener("play", onStart);
    video.addEventListener("playing", onStart);
    const onStop = () => {
      if (isAnyVideoPlaying()) return;
      if (player.hidden) { resumeAfterVideo = false; return; }
      if (!resumeAfterVideo || isMutedByUser) return;
      resumeAfterVideo = false;
      const a = currentRegion && audios[currentRegion];
      if (a && a.paused) a.play().then(() => updateAudioUI(true)).catch(() => updateAudioUI(false));
    };
    video.addEventListener("pause", onStop);
    video.addEventListener("ended", onStop);
  }

  /* =====================================================================
     HỘ CHIẾU CON DẤU & SỔ TAY
     ===================================================================== */
  const STAMPS = [
    { id: "north", color: "#a3171b", center: "Hà Nội", arc: { vi: "MIỀN BẮC · VIỆT NAM ·", en: "THE NORTH · VIETNAM ·" } },
    { id: "central", color: "#5b2a63", center: "Huế", arc: { vi: "MIỀN TRUNG · VIỆT NAM ·", en: "THE CENTRE · VIETNAM ·" } },
    { id: "south", color: "#1f6b52", center: "Sài Gòn", arc: { vi: "MIỀN NAM · VIỆT NAM ·", en: "THE SOUTH · VIETNAM ·" } },
    { id: "quiz", color: "#a8792a", center: "★", arc: { vi: "ĐỖ KHOA THI VĂN HÓA ·", en: "CULTURE EXAM PASSED ·" } }
  ];
  let stamps = store.get("stamps", []);
  let saved = store.get("saved", []);
  let uid = 0;
  function stampSVG(s) {
    const id = "arc" + ++uid;
    return `<svg viewBox="0 0 120 120" aria-hidden="true">
      <defs><path id="${id}" d="M60 60m-42 0a42 42 0 1 1 84 0a42 42 0 1 1-84 0"/></defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width="3"/>
      <circle cx="60" cy="60" r="51" fill="none" stroke="currentColor" stroke-width="1"/>
      <circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 3"/>
      <text><textPath href="#${id}" textLength="258" lengthAdjust="spacing" data-vi="${esc(s.arc.vi)}" data-en="${esc(s.arc.en)}">${esc(s.arc[lang])}</textPath></text>
      <text class="st-center" x="60" y="${s.center === "★" ? 70 : 66}" text-anchor="middle" ${s.center === "★" ? 'style="font-size:30px"' : s.center.length > 5 ? 'style="font-size:16px"' : ""}>${esc(s.center)}</text>
    </svg>`;
  }
  const STAMP_NAMES = { north: { vi: "Miền Bắc", en: "North" }, central: { vi: "Miền Trung", en: "Central" }, south: { vi: "Miền Nam", en: "South" }, quiz: { vi: "Đố vui", en: "Quiz" } };
  function renderStamps() {
    $$("[data-stamps]").forEach((box) => {
      box.innerHTML = STAMPS.map((s, i) => `<div class="stamp${stamps.includes(s.id) ? " is-on" : ""}" style="--stamp:${s.color};--rot:${[-8, 6, -4, 9][i]}deg">${stampSVG(s)}${tx(STAMP_NAMES[s.id], "small")}</div>`).join("");
    });
    $("#stamp-progress").textContent = `${stamps.length}/4`;
  }
  function addStamp(id) {
    if (stamps.includes(id)) return;
    stamps.push(id);
    store.set("stamps", stamps);
    renderStamps();
    setTimeout(() => toast({ vi: `Đã đóng dấu “${STAMP_NAMES[id].vi}” vào hộ chiếu văn hóa!`, en: `“${STAMP_NAMES[id].en}” stamp added to your culture passport!` }), 700);
  }

  function savedLookup(key) {
    const [rid, t, i] = key.split(":");
    const r = D.regions[rid];
    if (!r) return null;
    const it = (t === "l" ? r.landmarks : r.dishes)[+i];
    return it ? { r, it, t } : null;
  }
  function renderSaved() {
    const list = $("#saved-list");
    saved = saved.filter((k) => savedLookup(k));
    list.innerHTML = saved.map((k) => {
      const { r, it, t } = savedLookup(k);
      const name = t === "d" ? { vi: it.name.vi, en: it.name.vi + " – " + it.name.en } : it.name;
      const kind = t === "d" ? { vi: "Món ăn", en: "Dish" } : { vi: "Địa danh", en: "Landmark" };
      return `<li class="saved-item"><img src="${src(it.img)}" alt="" loading="lazy" />
        <a href="#/${r.id}">${tx(name, "b")}<small>${tx(kind)} · ${tx(r.city)}</small></a>
        <button type="button" data-unsave="${k}"${ariaT({ vi: "Bỏ lưu", en: "Remove" })}><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></li>`;
    }).join("");
    $("#saved-empty").hidden = saved.length > 0;
    $("#saved-print").disabled = !saved.length;
    const c = $("#journal-count");
    c.hidden = !saved.length;
    c.textContent = saved.length;
    $$("[data-save]").forEach((b) => {
      const on = saved.includes(b.dataset.save);
      b.setAttribute("aria-pressed", String(on));
      b.querySelector("i").className = (on ? "fa-solid" : "fa-regular") + " fa-heart";
    });
  }
  function toggleSave(key) {
    const on = saved.includes(key);
    saved = on ? saved.filter((k) => k !== key) : saved.concat(key);
    store.set("saved", saved);
    renderSaved();
    if (!on) {
      const c = $("#journal-count");
      c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
      toast({ vi: "Đã lưu vào sổ tay du lịch ♥", en: "Saved to your travel journal ♥" });
    }
  }
  document.addEventListener("click", (e) => {
    const s = e.target.closest("[data-save]");
    if (s) { toggleSave(s.dataset.save); return; }
    const u = e.target.closest("[data-unsave]");
    if (u) toggleSave(u.dataset.unsave);
  });

  // Ngăn kéo sổ tay
  const drawer = $("#journal"), scrim = $("#scrim"), journalBtn = $("#journal-btn");
  let drawerOpener = null;
  function openDrawer() {
    drawerOpener = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    journalBtn.setAttribute("aria-expanded", "true");
    scrim.hidden = false;
    setTimeout(() => $("#journal-close").focus(), 50);
  }
  function closeDrawer() {
    if (!drawer.classList.contains("is-open")) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    journalBtn.setAttribute("aria-expanded", "false");
    scrim.hidden = true;
    if (drawerOpener) drawerOpener.focus();
  }
  journalBtn.addEventListener("click", openDrawer);
  $("#journal-close").addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);
  drawer.addEventListener("click", (e) => { if (e.target.closest(".saved-item a")) closeDrawer(); });
  $("#saved-clear").addEventListener("click", () => {
    if (!saved.length) return;
    if (!confirm(lang === "vi" ? "Xóa toàn bộ địa điểm và món ăn đã lưu?" : "Remove all saved places and dishes?")) return;
    saved = [];
    store.set("saved", saved);
    renderSaved();
  });
  $("#saved-print").addEventListener("click", () => {
    document.body.classList.add("print-journal");
    window.print();
  });
  window.addEventListener("afterprint", () => document.body.classList.remove("print-journal"));

  /* =====================================================================
     XEM ẢNH LỚN
     ===================================================================== */
  const lbEl = $("#lightbox");
  const lb = { group: null, i: 0, opener: null };
  const lbItems = (g) => { const [rid, t] = g.split(":"); return t === "l" ? D.regions[rid].landmarks : D.regions[rid].dishes; };
  function renderLightbox() {
    if (!lb.group) return;
    const items = lbItems(lb.group), it = items[lb.i], isDish = lb.group.endsWith(":d");
    const img = $("#lb-img");
    img.src = src(it.img);
    img.alt = isDish ? it.name.vi : T(it.name);
    $("#lb-title").textContent = isDish ? `${it.name.vi} · ${it.name.en}` : T(it.name);
    $("#lb-desc").textContent = T(it.desc);
    $("#lb-count").textContent = `${lb.i + 1} / ${items.length}`;
    $("#lb-prev").hidden = $("#lb-next").hidden = items.length < 2;
  }
  function openLightbox(group, i, opener) {
    lb.group = group; lb.i = i; lb.opener = opener;
    renderLightbox();
    lbEl.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lb-close").focus();
  }
  function closeLightbox() {
    if (lbEl.hidden) return;
    lbEl.hidden = true;
    document.body.style.overflow = "";
    lb.group = null;
    if (lb.opener) lb.opener.focus();
  }
  function stepLightbox(d) { const n = lbItems(lb.group).length; lb.i = (lb.i + d + n) % n; renderLightbox(); }
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", () => stepLightbox(-1));
  $("#lb-next").addEventListener("click", () => stepLightbox(1));
  lbEl.addEventListener("click", (e) => { if (e.target === lbEl) closeLightbox(); });
  document.addEventListener("click", (e) => {
    const m = e.target.closest("[data-lightbox]");
    if (m) openLightbox(m.dataset.lightbox, +m.dataset.index, m);
  });
  langListeners.push(renderLightbox);

  /* =====================================================================
     TRANG CHỦ
     ===================================================================== */
  const CARD_ACCENT = { north: "#a3171b", central: "#5b2a63", south: "#1f6b52" };
  function renderHome() {
    $("#home-regions").innerHTML = D.regionOrder.map((id, i) => {
      const r = D.regions[id];
      return `<a class="region-card reveal" href="#/${id}" style="--card-accent:${CARD_ACCENT[id]};transition-delay:${i * 0.12}s">
        <img src="${src(r.cover || r.hero)}" alt="" loading="lazy" />
        <span class="rc-num">0${i + 1} · ${tx(r.name)}</span>
        ${tx(r.city, "h3")}
        ${tx(r.tagline, "p")}
        <span class="rc-go">${tx({ vi: "Khám phá", en: "Explore" })} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
      </a>`;
    }).join("");
    $$(".exp-card").forEach((c, i) => { c.style.transitionDelay = (i % 3) * 0.08 + "s"; });
  }

  // Con số chạy
  let counted = false;
  function renderStats(animate) {
    $$(".stats dt[data-count]").forEach((dt) => {
      const end = +dt.dataset.count, suf = dt.dataset.suffix || "";
      if (!animate || reduceMotion) { dt.textContent = fmtNum(end) + suf; return; }
      const t0 = performance.now(), dur = 1400;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        dt.textContent = fmtNum(Math.round(end * e)) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }
  langListeners.push(() => renderStats(false));

  // Tục ngữ xoay vòng
  let proverbIdx = 0, proverbTimer = null;
  function showProverb(i, instant) {
    proverbIdx = (i + D.proverbs.length) % D.proverbs.length;
    const box = $("#proverb"), p = D.proverbs[proverbIdx];
    const set = () => {
      $(".proverb-vi", box).textContent = p.vi;
      $(".proverb-en", box).textContent = p.en;
      box.classList.remove("fade");
    };
    $$("#proverb-dots button").forEach((b, k) => b.setAttribute("aria-selected", String(k === proverbIdx)));
    if (instant) set(); else { box.classList.add("fade"); setTimeout(set, 450); }
  }
  function startProverbs() {
    clearInterval(proverbTimer);
    proverbTimer = setInterval(() => { if (currentView === "home" && !document.hidden) showProverb(proverbIdx + 1); }, 7000);
  }
  function initProverbs() {
    $("#proverb-dots").innerHTML = D.proverbs.map((_, i) => `<button type="button" role="tab" aria-label="${i + 1}"></button>`).join("");
    $$("#proverb-dots button").forEach((b, i) => b.addEventListener("click", () => { showProverb(i); startProverbs(); }));
    showProverb(0, true);
    startProverbs();
  }

  /* =====================================================================
     BẢN ĐỒ TƯƠNG TÁC
     ===================================================================== */
  const BAND_COLOR = { north: "#c8261d", central: "#7b3b86", south: "#1f8a63" };
  function renderMap() {
    const [, , W, H] = MAP.viewBox.split(" ").map(Number);
    const yN = Math.round(H * 0.215), yS = Math.round(H * 0.745);
    const bands = { north: [0, yN], central: [yN, yS], south: [yS, H] };
    const stage = $("#map-stage");
    stage.innerHTML = `
      <svg class="vn-map" viewBox="${MAP.viewBox}" role="img"${ariaT({ vi: "Bản đồ Việt Nam với quần đảo Hoàng Sa và Trường Sa", en: "Map of Vietnam including the Hoàng Sa and Trường Sa archipelagos" })}>
        <defs>
          <linearGradient id="gold-leaf" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="${H}">
            <stop offset="0" stop-color="#f8e7b4"/><stop offset=".4" stop-color="#e2b961"/><stop offset=".72" stop-color="#c3933a"/><stop offset="1" stop-color="#efd189"/>
          </linearGradient>
          ${Object.entries(bands).map(([id, [a, b]]) => `<clipPath id="clip-${id}"><rect x="0" y="${a}" width="${W}" height="${b - a}"/></clipPath>`).join("")}
        </defs>
        ${tx({ vi: "BIỂN ĐÔNG", en: "EAST SEA" }, "text", `class="sea-label" x="${W * 0.995}" y="${H * 0.64}" text-anchor="end"`)}
        <g class="land-wrap"><path class="land" d="${MAP.land}"/><path class="plug" d="${MAP.plug}"/></g>
        ${D.regionOrder.map((id) => `<g class="band" data-band="${id}" clip-path="url(#clip-${id})" style="--band:${BAND_COLOR[id]}"><path d="${MAP.land}"/><path d="${MAP.plug}"/></g>`).join("")}
        <path class="islands" d="${MAP.islands}"/>
        <ellipse class="isl-ring" cx="${W * 0.925}" cy="${H * 0.442}" rx="${W * 0.1}" ry="${H * 0.058}"/>
        <ellipse class="isl-ring" cx="${W * 0.8}" cy="${H * 0.972}" rx="${W * 0.135}" ry="${H * 0.04}"/>
        ${tx({ vi: "QĐ. HOÀNG SA", en: "HOÀNG SA IS." }, "text", `class="isl-label" x="${W}" y="${H * 0.372}" text-anchor="end"`)}
        ${tx({ vi: "QĐ. TRƯỜNG SA", en: "TRƯỜNG SA IS." }, "text", `class="isl-label" x="${W * 0.8}" y="${H * 0.918}" text-anchor="middle"`)}
      </svg>
      ${D.regionOrder.map((id) => {
        const r = D.regions[id];
        return `<a class="pin${r.pin.left ? " label-left" : ""}" href="#/${id}" data-region="${id}" style="left:${r.pin.x}%;top:${r.pin.y}%">
          <span class="pin-dot"><i class="fa-solid ${r.icon}" aria-hidden="true"></i></span>
          <span class="pin-label">${tx(r.name, "small")}${tx(r.city, "b")}</span></a>`;
      }).join("")}
      ${D.gems.map((g) => `<button type="button" class="gem${g.x < 30 ? " tip-right" : g.x > 62 ? " tip-left" : ""}" style="left:${g.x}%;top:${g.y}%"${ariaL(g.name)}>
          <span class="gem-tip" role="tooltip">${tx(g.name, "b")}${tx(g.desc)}</span></button>`).join("")}`;

    const setBand = (id) => $$(".vn-map .band", stage).forEach((b) => b.classList.toggle("is-on", b.dataset.band === id));
    $$(".pin", stage).forEach((pin) => {
      const id = pin.dataset.region;
      const on = () => { setBand(id); $$(".pin", stage).forEach((p) => p.classList.toggle("is-on", p === pin)); renderPanel(id); };
      pin.addEventListener("mouseenter", on);
      pin.addEventListener("focus", on);
      pin.addEventListener("mouseleave", () => { setBand(null); pin.classList.remove("is-on"); });
      pin.addEventListener("blur", () => { setBand(null); pin.classList.remove("is-on"); });
    });
    renderPanel(null);
  }
  function renderPanel(id) {
    const panel = $("#map-panel");
    if (!id) {
      panel.innerHTML = `<div class="mp-card mp-intro">
        <span class="kicker">${tx({ vi: "Chọn một miền", en: "Pick a region" })}</span>
        ${tx({ vi: "Hành trình ba miền", en: "A three-region journey" }, "h2")}
        ${tx({ vi: "Mỗi miền có nhạc nền riêng – hãy bật loa để cảm nhận trọn vẹn. Ghé đủ ba miền để nhận con dấu hộ chiếu!", en: "Each region has its own soundtrack – turn your sound on. Visit all three to collect your passport stamps!" }, "p")}
        <div class="mp-list">${D.regionOrder.map((rid) => {
          const r = D.regions[rid];
          return `<a href="#/${rid}" data-region="${rid}"><img src="${src(r.cover || r.hero)}" alt="" loading="lazy" /><span>${tx(r.city, "b")}${tx(r.name, "small")}</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>`;
        }).join("")}</div></div>`;
      return;
    }
    const r = D.regions[id];
    panel.innerHTML = `<div class="mp-card" data-region="${id}">
      <div class="mp-media"><img src="${src(r.hero)}" ${altT(r.city)} />${tx(r.name)}</div>
      <div class="mp-body">
        ${tx(r.title, "h2")}
        ${tx(r.tagline, "p")}
        <ul class="mp-facts">${r.facts.map((f) => `<li><i class="fa-solid ${f.icon}" aria-hidden="true"></i><span>${tx(f.label, "small")}${tx(f.value)}</span></li>`).join("")}</ul>
        <a class="btn btn-primary" href="#/${id}">${tx({ vi: `Khám phá ${r.name.vi}`, en: `Explore ${r.city.en}` })} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
      </div></div>`;
  }

  /* =====================================================================
     TRANG TỪNG MIỀN
     ===================================================================== */
  function renderRegion(id) {
    const view = $(`.region-view[data-region="${id}"]`);
    const r = D.regions[id], idx = D.regionOrder.indexOf(id);
    const prevId = D.regionOrder[idx - 1], nextId = D.regionOrder[idx + 1];
    const landmark = (it, i) => `<article class="card reveal" style="transition-delay:${(i % 4) * 0.08}s">
        <button type="button" class="card-media" data-lightbox="${id}:l" data-index="${i}"${ariaT({ vi: "Xem ảnh lớn: " + it.name.vi, en: "View larger: " + it.name.en })}>
          <img src="${src(it.img)}" ${altT(it.name)} loading="lazy" />
          <span class="zoom-hint" aria-hidden="true"><i class="fa-solid fa-expand"></i></span>
        </button>
        <button type="button" class="save-btn" data-save="${id}:l:${i}" aria-pressed="false"${ariaT({ vi: "Lưu vào sổ tay", en: "Save to journal" })}><i class="fa-regular fa-heart" aria-hidden="true"></i></button>
        <div class="card-body">
          ${tx(it.name, "h3")}
          ${tx({ vi: it.name.en, en: it.name.vi }, "p", 'class="card-alt"')}
          ${tx(it.desc, "p")}
        </div>
      </article>`;
    const dish = (it, i) => `<article class="card reveal" style="transition-delay:${(i % 4) * 0.08}s">
        <button type="button" class="card-media" data-lightbox="${id}:d" data-index="${i}"${ariaT({ vi: "Xem ảnh lớn: " + it.name.vi, en: "View larger: " + it.name.vi })}>
          <img src="${src(it.img)}" alt="${esc(it.name.vi)}" loading="lazy" />
          <span class="zoom-hint" aria-hidden="true"><i class="fa-solid fa-expand"></i></span>
        </button>
        <button type="button" class="save-btn" data-save="${id}:d:${i}" aria-pressed="false"${ariaT({ vi: "Lưu vào sổ tay", en: "Save to journal" })}><i class="fa-regular fa-heart" aria-hidden="true"></i></button>
        <div class="card-body">
          <h3 lang="vi">${esc(it.name.vi)}</h3>
          <p class="card-alt" lang="en">${esc(it.name.en)}</p>
          ${tx(it.desc, "p")}
          <div class="card-foot">
            <span class="taste"><i class="fa-solid fa-pepper-hot" aria-hidden="true"></i>${tx(it.taste)}</span>
            <button type="button" class="speak-btn" data-speak="${esc(it.name.vi)}"><i class="fa-solid fa-volume-high" aria-hidden="true"></i>${tx({ vi: "Nghe tên món", en: "Hear it" })}</button>
          </div>
        </div>
      </article>`;
    const pager = () => {
      let prev, next;
      if (prevId) {
        const p = D.regions[prevId];
        prev = `<a class="pager-link" href="#/${prevId}"><span class="pg-ico"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></span><img src="${src(p.cover || p.hero)}" alt="" loading="lazy" /><span>${tx({ vi: "Miền trước", en: "Previous region" }, "small")}<b>${tx(p.name)} · ${tx(p.city)}</b></span></a>`;
      } else {
        prev = `<a class="pager-link" href="#/map"><span class="pg-ico"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></span><span class="pg-medal" style="color:var(--gold)"><svg class="drum" viewBox="0 0 400 400" style="width:64px;height:64px;stroke-width:3"><use href="#drum-lite"/></svg></span><span>${tx({ vi: "Quay lại", en: "Back to" }, "small")}${tx({ vi: "Bản đồ di sản", en: "Heritage map" }, "b")}</span></a>`;
      }
      if (nextId) {
        const n = D.regions[nextId];
        next = `<a class="pager-link next" href="#/${nextId}"><span class="pg-ico"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span><img src="${src(n.cover || n.hero)}" alt="" loading="lazy" /><span>${tx({ vi: "Miền tiếp theo", en: "Next region" }, "small")}<b>${tx(n.name)} · ${tx(n.city)}</b></span></a>`;
      } else {
        next = `<a class="pager-link next finish-link" href="#/finish"><span class="pg-ico"><i class="fa-solid fa-flag-checkered" aria-hidden="true"></i></span><span class="pg-medal"><svg class="drum" viewBox="0 0 400 400" style="stroke-width:3"><use href="#drum-lite"/></svg></span><span>${tx({ vi: "Kết thúc hành trình", en: "Finish the journey" }, "small")}${tx({ vi: "Nhận hộ chiếu văn hóa", en: "Collect your passport" }, "b")}</span></a>`;
      }
      return prev + next;
    };
    view.innerHTML = `
      <div class="region-banner">
        <img src="${src(r.hero)}" ${altT(r.city)} />
        <div class="container rb-inner">
          <div class="rb-eyebrow">${tx(r.name, "span", 'class="kicker"')}<span class="rb-step">0${idx + 1} / 03</span></div>
          ${tx(r.city, "h1")}
          ${tx(r.title, "p", 'class="rb-title"')}
          ${tx(r.tagline, "p", 'class="rb-tagline"')}
          <ul class="rb-facts">${r.facts.map((f) => `<li class="rb-fact"><i class="fa-solid ${f.icon}" aria-hidden="true"></i><span>${tx(f.label, "small")}${tx(f.value, "b")}</span></li>`).join("")}</ul>
        </div>
      </div>
      <nav class="region-subnav"${ariaT({ vi: "Điều hướng miền", en: "Region navigation" })}>
        <div class="container">
          <div class="rs-tabs">
            <a href="#/map"><i class="fa-solid fa-map" aria-hidden="true"></i>${tx({ vi: "Bản đồ", en: "Map" })}</a>
            ${D.regionOrder.map((rid) => `<a href="#/${rid}"${rid === id ? ' aria-current="page"' : ""}><i class="fa-solid ${D.regions[rid].icon}" aria-hidden="true"></i>${tx(D.regions[rid].short)}</a>`).join("")}
          </div>
          <div class="rs-jump">
            <a href="#" data-jump="${id}-places">${tx({ vi: "Danh thắng", en: "Landmarks" })}</a>
            <a href="#" data-jump="${id}-art">${tx({ vi: "Nghệ thuật", en: "Heritage art" })}</a>
            <a href="#" data-jump="${id}-food">${tx({ vi: "Ẩm thực", en: "Cuisine" })}</a>
          </div>
        </div>
      </nav>
      <div class="container">
        <section class="r-section" id="${id}-places">
          <div class="r-head reveal"><span class="r-num" aria-hidden="true">01</span><div>${tx({ vi: "Danh thắng", en: "Landmarks" }, "p", 'class="kicker"')}${tx({ vi: "Những địa danh không thể bỏ lỡ", en: "Landmarks you can't miss" }, "h2", 'class="sec-title"')}</div></div>
          <div class="card-grid">${r.landmarks.map(landmark).join("")}</div>
        </section>
        <section class="r-section" id="${id}-art">
          <div class="r-head reveal"><span class="r-num" aria-hidden="true">02</span><div>${tx({ vi: "Di sản phi vật thể", en: "Intangible heritage" }, "p", 'class="kicker"')}${tx({ vi: "Nghệ thuật truyền thống", en: "Traditional performing arts" }, "h2", 'class="sec-title"')}</div></div>
          <div class="art-block reveal">
            <div class="video-frame">
              <video controls playsinline preload="metadata"${ariaT(r.art.title)}><source src="${src(r.art.video)}" type="video/mp4" /></video>
            </div>
            <div class="art-copy">
              <span class="badge"><i class="fa-solid fa-award" aria-hidden="true"></i>${tx(r.art.badge)}</span>
              ${tx(r.art.title, "h3")}
              ${tx(r.art.desc, "p")}
              <p class="art-note"><i class="fa-solid fa-headphones" aria-hidden="true"></i>${tx({ vi: "Nhạc nền sẽ tự tạm dừng khi bạn xem video.", en: "Background music pauses automatically while the video plays." })}</p>
            </div>
          </div>
        </section>
        <section class="r-section" id="${id}-food">
          <div class="r-head reveal"><span class="r-num" aria-hidden="true">03</span><div>${tx({ vi: "Ẩm thực", en: "Cuisine" }, "p", 'class="kicker"')}${tx({ vi: `Hương vị ${r.city.vi}`, en: `Flavours of ${r.city.en}` }, "h2", 'class="sec-title"')}</div></div>
          <div class="card-grid">${r.dishes.map(dish).join("")}</div>
        </section>
        <aside class="funfact reveal">
          <svg class="drum" viewBox="0 0 400 400" style="stroke-width:3" aria-hidden="true"><use href="#drum-lite"/></svg>
          <div>${tx({ vi: "Bạn có biết?", en: "Did you know?" }, "b")}${tx(r.funfact, "p")}</div>
        </aside>
        <nav class="region-pager"${ariaT({ vi: "Chuyển miền", en: "Change region" })}>${pager()}</nav>
      </div>`;
    $$("video", view).forEach(bindVideo);
  }
  document.addEventListener("click", (e) => {
    const j = e.target.closest("[data-jump]");
    if (!j) return;
    e.preventDefault();
    const t = document.getElementById(j.dataset.jump);
    if (t) t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });

  /* =====================================================================
     TIẾNG VIỆT – THANH ĐIỆU & CÂU NÓI
     ===================================================================== */
  let phraseCat = "all", phraseQuery = "";
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  function renderPhrasebook() {
    $("#tones").innerHTML = D.tones.map((t) => `<button type="button" class="tone" data-speak="${esc(t.word)}" data-slow="1">
        <span class="tone-word" lang="vi">${esc(t.word)}</span>
        <svg viewBox="0 0 60 30" aria-hidden="true"><path d="${t.curve}"/>${t.word === "mạ" ? '<circle cx="54" cy="26" r="2.6" fill="currentColor" stroke="none" style="color:var(--gold)"/>' : ""}</svg>
        ${tx(t.tone, "span", 'class="tone-name"')}
        ${tx(t.mean, "span", 'class="tone-mean"')}
      </button>`).join("");
    $("#phrase-cats").innerHTML = D.phraseCats.map((c) => `<button type="button" class="chip" role="tab" data-cat="${c.id}" aria-selected="${c.id === phraseCat}"><i class="fa-solid ${c.icon}" aria-hidden="true"></i>${tx(c.name)}</button>`).join("");
    $$("#phrase-cats .chip").forEach((b) => b.addEventListener("click", () => {
      phraseCat = b.dataset.cat;
      $$("#phrase-cats .chip").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
      renderPhrases();
    }));
    $("#phrase-search").addEventListener("input", (e) => { phraseQuery = e.target.value; renderPhrases(); });
    renderPhrases();
  }
  function renderPhrases() {
    const q = norm(phraseQuery.trim());
    const cats = Object.fromEntries(D.phraseCats.map((c) => [c.id, c]));
    const items = D.phrases.filter((p) => (phraseCat === "all" || p.cat === phraseCat) && (!q || norm(`${p.vi} ${p.en} ${p.say}`).includes(q)));
    $("#phrase-grid").innerHTML = items.map((p, i) => `<article class="phrase" style="animation-delay:${Math.min(i, 12) * 0.03}s">
        <span class="phrase-cat"><i class="fa-solid ${cats[p.cat].icon}" aria-hidden="true"></i>${tx(cats[p.cat].name)}</span>
        <p class="phrase-vi" lang="vi">${esc(p.vi)}</p>
        <p class="phrase-say">/${esc(p.say)}/</p>
        <p class="phrase-en" lang="en">${esc(p.en)}</p>
        <div class="phrase-actions">
          <button type="button" class="speak-btn" data-speak="${esc(p.vi)}"><i class="fa-solid fa-volume-high" aria-hidden="true"></i>${tx({ vi: "Nghe", en: "Listen" })}</button>
          <button type="button" class="speak-btn" data-speak="${esc(p.vi)}" data-slow="1"><i class="fa-solid fa-gauge-simple" aria-hidden="true"></i>${tx({ vi: "Đọc chậm", en: "Slowly" })}</button>
        </div>
      </article>`).join("");
    $("#phrase-empty").hidden = items.length > 0;
  }

  /* =====================================================================
     12 CON GIÁP
     ===================================================================== */
  const cycle = (y) => (((y - 4) % 60) + 60) % 60;
  const zodiacOf = (y) => { const p = cycle(y); return { stem: D.stems[p % 10], zi: p % 12, z: D.zodiac[p % 12], nap: D.napam[Math.floor(p / 2)] }; };
  const tetList = D.tetDates.map((s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); });
  function lunarYearOf(date) {
    let ly = date.getFullYear();
    const t = tetList.find((d) => d.getFullYear() === ly);
    if (t && date < t) ly -= 1;
    else if (!t && date.getMonth() === 0) ly -= 1;
    return ly;
  }
  let zodiacSel = null;
  function renderZodiacGrid() {
    $("#zodiac-grid").innerHTML = D.zodiac.map((z, i) => `<button type="button" class="zg-item" data-zi="${i}" aria-pressed="false">
        <span class="zg-medal" aria-hidden="true">${z.emoji}</span>${tx(z.name, "b")}<small>${esc(z.branch)}</small></button>`).join("");
    $$("#zodiac-grid .zg-item").forEach((b) => b.addEventListener("click", () => showZodiac({ zi: +b.dataset.zi })));
    $("#zodiac-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const y = parseInt($("#zodiac-year").value, 10);
      if (!(y >= 1900 && y <= 2100)) { toast({ vi: "Hãy nhập năm từ 1900 đến 2100.", en: "Please enter a year between 1900 and 2100." }); return; }
      store.set("birthYear", y);
      showZodiac({ year: y });
    });
    const by = store.get("birthYear", null);
    if (by) $("#zodiac-year").value = by;
    onLang(renderThisYear);
  }
  function renderThisYear() {
    const now = new Date(), ly = lunarYearOf(now), a = zodiacOf(ly), b = zodiacOf(ly + 1);
    $("#this-year").innerHTML = lang === "vi"
      ? `Năm nay là năm <b>${a.stem} ${a.z.branch}</b> – con ${a.z.name.vi} ${a.z.emoji}. Tết ${ly + 1} sẽ mở ra năm <b>${b.stem} ${b.z.branch}</b> – con ${b.z.name.vi} ${b.z.emoji}.`
      : `This is the year of <b>${a.stem} ${a.z.branch}</b> – the ${a.z.name.en} ${a.z.emoji}. Tết ${ly + 1} opens the year of <b>${b.stem} ${b.z.branch}</b> – the ${b.z.name.en} ${b.z.emoji}.`;
  }
  function showZodiac(sel) {
    zodiacSel = sel;
    const zi = sel.year != null ? zodiacOf(sel.year).zi : sel.zi;
    const z = D.zodiac[zi];
    $$("#zodiac-grid .zg-item").forEach((b) => { const on = +b.dataset.zi === zi; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", String(on)); });
    const now = new Date().getFullYear();
    const years = [];
    for (let y = now - 84; y <= now + 11; y++) if (cycle(y) % 12 === zi) years.push(y);
    const shown = years.slice(-8);
    let rows = "";
    let head = "";
    if (sel.year != null) {
      const info = zodiacOf(sel.year), el = D.elements[info.nap.el];
      head = `${tx({ vi: "Con giáp của bạn", en: "Your zodiac animal" }, "small")}
        ${tx({ vi: `Tuổi ${z.branch} – con ${z.name.vi}`, en: `Year of the ${z.name.en}` }, "h3")}
        <p class="zr-canchi">${esc(info.stem)} ${esc(z.branch)} · ${sel.year}</p>`;
      rows += `<div class="zr-row"><i class="fa-solid fa-yin-yang" aria-hidden="true"></i><div>${tx({ vi: "Bản mệnh (ngũ hành nạp âm)", en: "Element (Five Phases)" }, "small")}
        <span class="el-chip" style="--el:${el.color}">${tx({ vi: `${info.nap.vi} – mệnh ${el.vi}`, en: `${el.en} · “${info.nap.en}”` })}</span></div></div>`;
    } else {
      head = `${tx({ vi: "Con giáp", en: "Zodiac animal" }, "small")}
        ${tx({ vi: `Tuổi ${z.branch} – con ${z.name.vi}`, en: `The ${z.name.en} (${z.branch})` }, "h3")}`;
    }
    rows += `<div class="zr-row"><i class="fa-solid fa-star" aria-hidden="true"></i><div>${tx({ vi: "Tính cách", en: "Personality" }, "small")}${tx(z.trait)}</div></div>
      <div class="zr-row"><i class="fa-solid fa-calendar-days" aria-hidden="true"></i><div>${tx({ vi: `Những năm tuổi ${z.branch}`, en: `Years of the ${z.name.en}` }, "small")}
        <div class="zr-years">${shown.map((y) => `<span${y === sel.year ? ' class="me"' : ""}>${y}</span>`).join("")}</div></div></div>`;
    $("#zodiac-result").innerHTML = `<div class="zr-card">
      <svg class="drum" viewBox="0 0 400 400" aria-hidden="true"><use href="#drum"/></svg>
      <div class="zr-top"><span class="zr-emoji" aria-hidden="true">${z.emoji}</span><div>${head}</div></div>
      <div class="zr-rows">${rows}</div>
      ${z.note ? `<p class="zr-note">💡 ${tx(z.note)}</p>` : ""}
    </div>`;
    if (window.innerWidth < 900) $("#zodiac-result").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }

  /* =====================================================================
     LỄ HỘI – ĐẾM NGƯỢC TẾT
     ===================================================================== */
  function nextTet(now = new Date()) {
    for (const d of tetList) {
      const end = new Date(d.getTime() + 3 * 864e5);
      if (now < end) return { date: d, during: now >= d };
    }
    return null;
  }
  let lastDays = null;
  function tetInfo() {
    const t = nextTet();
    if (!t) return null;
    const y = t.date.getFullYear(), z = zodiacOf(y);
    return {
      ...t, y, z,
      title: { vi: `Tết ${z.stem} ${z.z.branch} ${y}`, en: `Lunar New Year ${y} · Year of the ${z.z.name.en}` },
      dateText: t.date.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    };
  }
  function renderTetStatic() {
    const info = tetInfo();
    const card = $("#tet-card"), chip = $("#hero-tet");
    if (!info) { card.hidden = true; chip.hidden = true; return; }
    $("#tet-title").textContent = info.during ? (lang === "vi" ? "Chúc mừng năm mới!" : "Happy Lunar New Year!") : T(info.title);
    $("#tet-date").textContent = info.during
      ? (lang === "vi" ? `Năm ${info.z.stem} ${info.z.z.branch} – con ${info.z.z.name.vi} ${info.z.z.emoji}` : `The year of the ${info.z.z.name.en} ${info.z.z.emoji} has begun`)
      : `${info.dateText} · ${info.z.z.emoji}`;
    $("#countdown").hidden = info.during;
    lastDays = null;
    tickTet();
  }
  function tickTet() {
    const info = nextTet();
    if (!info) return;
    const diff = Math.max(0, info.date - new Date());
    const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
    const set = (k, v) => { const el = $(`[data-cd="${k}"]`); const t = k === "d" ? String(v) : String(v).padStart(2, "0"); if (el.textContent !== t) el.textContent = t; };
    set("d", d); set("h", h); set("m", m); set("s", s);
    if (d !== lastDays) {
      lastDays = d;
      const y = info.date.getFullYear(), z = zodiacOf(y);
      $("[data-tet-text]").innerHTML = info.during
        ? (lang === "vi" ? `<b>Chúc mừng năm mới ${z.stem} ${z.z.branch}!</b>` : `<b>Happy Lunar New Year ${y}!</b>`)
        : lang === "vi"
          ? `Còn <b>${d}</b> ngày nữa là đến Tết ${z.stem} ${z.z.branch} ${y}`
          : `<b>${d}</b> days until Lunar New Year ${y} – Year of the ${z.z.name.en}`;
    }
    if (diff === 0 && !info.during) renderTetStatic();
  }
  function renderFestivals() {
    const petals = $("#petals");
    const colors = ["#f6c945", "#f4a7b9", "#f6c945", "#ffd1dc"];
    petals.innerHTML = Array.from({ length: 16 }, (_, i) => {
      const s = 12 + Math.random() * 12, x = Math.random() * 100, t = 8 + Math.random() * 8, d = -Math.random() * 16;
      return `<svg style="--s:${s.toFixed(0)}px;--x:${x.toFixed(1)}%;--t:${t.toFixed(1)}s;--d:${d.toFixed(1)}s;--c:${colors[i % 4]}"><use href="#blossom"/></svg>`;
    }).join("");
    $("#tet-greetings").innerHTML = D.tetGreetings.map((g) => `<button type="button" class="greet-btn" data-speak="${esc(g.vi)}"><i class="fa-solid fa-volume-high" aria-hidden="true"></i><span><b lang="vi">${esc(g.vi)}</b><small lang="en">${esc(g.en)}</small></span></button>`).join("");
    $("#tet-customs").innerHTML = D.tetCustoms.map((c, i) => `<div class="custom reveal" style="transition-delay:${i * 0.07}s"><span class="emoji" aria-hidden="true">${c.emoji}</span>${tx(c.name, "b")}${tx(c.desc, "p")}</div>`).join("");
    $("#festival-list").innerHTML = D.festivals.map((f) => `<li class="tl-item reveal" style="--fc:${f.color}">
        <span class="tl-icon" aria-hidden="true"><i class="fa-solid ${f.icon}"></i></span>
        <div class="tl-card">
          <div class="tl-when">${tx(f.lunar)}${tx(f.when)}</div>
          ${tx(f.name, "h3")}
          ${tx({ vi: f.name.en, en: f.name.vi }, "p", 'class="tl-alt"')}
          ${tx(f.desc, "p")}
        </div></li>`).join("");
    onLang(renderTetStatic);
    setInterval(tickTet, 1000);
  }

  /* =====================================================================
     CẨM NANG
     ===================================================================== */
  const MONTHS = { vi: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"], en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
  function renderTips() {
    $("#etiquette").innerHTML = D.etiquette.map((e, i) => `<button type="button" class="flip reveal" aria-pressed="false" style="transition-delay:${(i % 4) * 0.06}s">
        <span class="flip-inner">
          <span class="flip-face flip-front">
            <span class="flip-tag ${e.ok ? "ok" : "no"}"><i class="fa-solid ${e.ok ? "fa-check" : "fa-xmark"}" aria-hidden="true"></i>${tx(e.ok ? { vi: "Nên", en: "Do" } : { vi: "Không nên", en: "Don't" })}</span>
            <i class="fa-solid ${e.icon} flip-ico" aria-hidden="true"></i>
            ${tx(e.title, "span", 'class="flip-title"')}
            <span class="flip-hint"><i class="fa-solid fa-rotate" aria-hidden="true"></i>${tx({ vi: "Lật thẻ", en: "Flip" })}</span>
          </span>
          <span class="flip-face flip-back">${tx(e.title, "span", 'class="flip-back-title"')}${tx(e.text, "span", 'class="flip-text"')}</span>
        </span></button>`).join("");
    $$("#etiquette .flip").forEach((b) => b.addEventListener("click", () => {
      const on = !b.classList.contains("is-flipped");
      b.classList.toggle("is-flipped", on);
      b.setAttribute("aria-pressed", String(on));
    }));
    $("#seasons").innerHTML = D.seasons.map((s) => {
      const r = D.regions[s.region];
      return `<div class="sc-row" data-region="${s.region}">
        <div class="sc-name">${tx(r.name, "b")}${tx(r.city, "small")}</div>
        <div class="sc-months">${s.months.map((m, i) => `<span class="sc-m r${m}" data-vi="${MONTHS.vi[i]}" data-en="${MONTHS.en[i]}" title="${["", "★★★", "★★", "★"][m]}">${MONTHS[lang][i]}</span>`).join("")}</div>
        ${tx(s.note, "p", 'class="sc-note"')}
      </div>`;
    }).join("");
    $("#practical").innerHTML = D.practical.map((p, i) => `<div class="tip reveal" style="transition-delay:${(i % 3) * 0.07}s"><i class="fa-solid ${p.icon}" aria-hidden="true"></i><div>${tx(p.title, "h3")}${tx(p.text, "p")}</div></div>`).join("");
  }

  /* =====================================================================
     ĐỐ VUI & CHỨNG NHẬN
     ===================================================================== */
  const QN = 10;
  const quiz = { qs: [], i: 0, score: 0, marks: [], answered: false };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const rankOf = (s) => D.ranks.find((r) => s >= r.min);
  function quizStart() {
    const box = $("#quiz-box"), best = store.get("best", null);
    box.innerHTML = `<div class="q-card q-start">
      <svg class="q-emblem drum" viewBox="0 0 400 400" style="stroke-width:1.6" aria-hidden="true"><use href="#drum"/></svg>
      ${tx({ vi: "Khoa thi văn hóa Việt Nam", en: "The Vietnamese culture exam" }, "h2")}
      ${tx({ vi: "Mười câu hỏi ngẫu nhiên về di sản, ẩm thực, phong tục và lễ hội. Điểm càng cao, danh hiệu càng lớn – như các sĩ tử xưa ở Văn Miếu!", en: "Ten random questions on heritage, food, customs and festivals. The higher your score, the grander your title – just like the scholars of old at the Temple of Literature!" }, "p")}
      <ul class="q-rules">
        <li><i class="fa-solid fa-list-ol" aria-hidden="true"></i>${tx({ vi: "10 câu hỏi", en: "10 questions" })}</li>
        <li><i class="fa-solid fa-language" aria-hidden="true"></i>${tx({ vi: "Đổi ngôn ngữ bất cứ lúc nào", en: "Switch language anytime" })}</li>
        <li><i class="fa-solid fa-scroll" aria-hidden="true"></i>${tx({ vi: "Nhận chứng nhận PNG", en: "Get a PNG certificate" })}</li>
      </ul>
      <button type="button" class="btn btn-primary" id="quiz-go">${tx({ vi: "Bắt đầu thi", en: "Start the exam" })} <i class="fa-solid fa-feather-pointed" aria-hidden="true"></i></button>
      ${best != null ? `<p class="q-best">${tx({ vi: `Điểm cao nhất của bạn: ${best}/${QN}`, en: `Your best score: ${best}/${QN}` })}</p>` : ""}
    </div>`;
    $("#quiz-go").addEventListener("click", () => {
      quiz.qs = shuffle(D.quiz).slice(0, QN).map((q) => {
        const order = shuffle(q.options.map((_, k) => k));
        return { ...q, opts: order.map((k) => q.options[k]), ans: order.indexOf(q.answer) };
      });
      quiz.i = 0; quiz.score = 0; quiz.marks = [];
      quizQuestion();
    });
  }
  function quizQuestion() {
    const q = quiz.qs[quiz.i];
    quiz.answered = false;
    $("#quiz-box").innerHTML = `<div class="q-card">
      <div class="q-top">${tx({ vi: `Câu ${quiz.i + 1}/${QN}`, en: `Question ${quiz.i + 1} of ${QN}` })}<span>${tx({ vi: "Điểm", en: "Score" })}: <b>${quiz.score}</b></span></div>
      <div class="bamboo" aria-hidden="true">${Array.from({ length: QN }, (_, k) => `<span class="${k < quiz.marks.length ? (quiz.marks[k] ? "done" : "miss") : k === quiz.i ? "now" : ""}"></span>`).join("")}</div>
      ${tx(q.q, "h2", 'class="q-text"')}
      <div class="q-options">${q.opts.map((o, k) => `<button type="button" class="q-opt" data-k="${k}"><span class="q-letter">${"ABCD"[k]}</span>${tx(o)}</button>`).join("")}</div>
      <div id="q-after"></div>
    </div>`;
    $$(".q-opt").forEach((b) => b.addEventListener("click", () => quizAnswer(+b.dataset.k)));
    $(".q-opt").focus({ preventScroll: true });
  }
  function quizAnswer(k) {
    if (quiz.answered) return;
    quiz.answered = true;
    const q = quiz.qs[quiz.i], ok = k === q.ans;
    if (ok) quiz.score++;
    quiz.marks.push(ok);
    $$(".q-opt").forEach((b, j) => {
      b.disabled = true;
      if (j === q.ans) b.classList.add("correct");
      else if (j === k) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    const seg = $$(".bamboo span")[quiz.i];
    seg.className = ok ? "done" : "miss";
    $(".q-top b").textContent = quiz.score;
    const last = quiz.i === QN - 1;
    $("#q-after").innerHTML = `<div class="q-feedback ${ok ? "ok" : "no"}"><i class="fa-solid ${ok ? "fa-circle-check" : "fa-circle-xmark"}" aria-hidden="true"></i>
        <div>${tx(ok ? { vi: "Chính xác!", en: "Correct!" } : { vi: "Chưa đúng rồi!", en: "Not quite!" }, "b")}${tx(q.explain, "p")}</div></div>
      <div class="q-next"><button type="button" class="btn btn-primary" id="q-next">${tx(last ? { vi: "Xem kết quả", en: "See my result" } : { vi: "Câu tiếp theo", en: "Next question" })} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button></div>`;
    $("#q-next").addEventListener("click", () => { if (last) quizResult(); else { quiz.i++; quizQuestion(); } });
    $("#q-next").focus({ preventScroll: true });
  }
  function quizResult() {
    const s = quiz.score, rank = rankOf(s), best = store.get("best", null);
    if (best == null || s > best) store.set("best", s);
    addStamp("quiz");
    $("#quiz-box").innerHTML = `<div class="q-card q-result">
      <div class="score-ring" style="--p:${(s / QN) * 100}"><svg class="drum" viewBox="0 0 400 400" style="stroke-width:3" aria-hidden="true"><use href="#drum-lite"/></svg><b>${s}<small>/${QN}</small></b></div>
      ${tx({ vi: "Danh hiệu của bạn", en: "Your title" }, "p", 'class="kicker"')}
      ${tx(rank.name, "h2", 'class="q-rank"')}
      ${tx(rank.msg, "p", 'class="q-msg"')}
      <form class="cert-form" id="cert-form">
        <input id="cert-name" maxlength="40" required autocomplete="name" value="${esc(store.get("certName", ""))}" data-vi-ph="Nhập tên của bạn để in lên chứng nhận" data-en-ph="Your name for the certificate" placeholder="${lang === "vi" ? "Nhập tên của bạn để in lên chứng nhận" : "Your name for the certificate"}" />
        <button type="submit" class="btn btn-primary">${tx({ vi: "Tạo chứng nhận", en: "Create certificate" })} <i class="fa-solid fa-scroll" aria-hidden="true"></i></button>
      </form>
      <div class="cert-preview" id="cert-preview"></div>
      <div class="q-actions">
        <button type="button" class="btn btn-outline" id="q-retry"><i class="fa-solid fa-rotate-right" aria-hidden="true"></i>${tx({ vi: "Thi lại", en: "Try again" })}</button>
        <a class="btn btn-outline" href="#/map"><i class="fa-solid fa-map" aria-hidden="true"></i>${tx({ vi: "Khám phá thêm", en: "Keep exploring" })}</a>
      </div>
    </div>`;
    $("#q-retry").addEventListener("click", quizStart);
    $("#cert-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#cert-name").value.trim();
      if (!name) return;
      store.set("certName", name);
      makeCertificate(name, s, rank);
    });
  }

  let certURL = null;
  async function makeCertificate(name, score, rank) {
    const W = 1600, H = 1130, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    try {
      await Promise.all([
        document.fonts.load('700 60px "Playfair Display"'),
        document.fonts.load('italic 700 90px "Playfair Display"'),
        document.fonts.load('500 26px "Be Vietnam Pro"'),
        document.fonts.load('600 26px "Be Vietnam Pro"')
      ]);
    } catch (e) {}
    const other = lang === "vi" ? "en" : "vi";
    const RED = "#a3171b", GOLD = "#c1923a", INK = "#2b1b14", SOFT = "#6b5545";
    const spacing = (v) => { if ("letterSpacing" in ctx) ctx.letterSpacing = v; };
    const text = (t, x, y, font, color, ls = "0px", align = "center") => { ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; spacing(ls); ctx.fillText(t, x, y); spacing("0px"); };
    const drum = (cx, cy, size, color, alpha, lw, geo = DRUM) => {
      ctx.save(); ctx.globalAlpha = alpha; ctx.translate(cx - size / 2, cy - size / 2); ctx.scale(size / 400, size / 400);
      ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = lw;
      ctx.stroke(new Path2D(geo.S)); ctx.fill(new Path2D(geo.F)); ctx.restore();
    };
    // nền giấy
    const g = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, 900);
    g.addColorStop(0, "#fffaf0"); g.addColorStop(1, "#efe1c6");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    drum(W / 2, H / 2 + 20, 860, RED, 0.06, 0.8);
    // viền sơn mài + hạt Đông Sơn
    ctx.fillStyle = RED; ctx.fillRect(26, 26, W - 52, 22); ctx.fillRect(26, H - 48, W - 52, 22); ctx.fillRect(26, 26, 22, H - 52); ctx.fillRect(W - 48, 26, 22, H - 52);
    ctx.strokeStyle = "#f0cf85"; ctx.fillStyle = "#f0cf85"; ctx.lineWidth = 1.6;
    const bead = (x, y) => { ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill(); };
    for (let x = 60; x <= W - 60; x += 28) { bead(x, 37); bead(x, H - 37); }
    for (let y = 65; y <= H - 65; y += 28) { bead(37, y); bead(W - 37, y); }
    ctx.strokeStyle = GOLD; ctx.lineWidth = 2.5; ctx.strokeRect(64, 64, W - 128, H - 128);
    ctx.lineWidth = 1; ctx.strokeRect(74, 74, W - 148, H - 148);
    [[110, 110], [W - 110, 110], [110, H - 110], [W - 110, H - 110]].forEach(([x, y]) => drum(x, y, 74, GOLD, 0.9, 3, DRUM_LITE));
    // tiêu đề
    drum(W / 2, 168, 130, GOLD, 1, 2.2);
    const L = { vi: { t: "GIẤY CHỨNG NHẬN", s: "HÀNH TRÌNH VĂN HÓA VIỆT NAM", line: "Giấy chứng nhận · Hành trình văn hóa Việt Nam", p: "Trân trọng trao tặng", b1: "đã hoàn thành hành trình khám phá văn hóa ba miền Bắc – Trung – Nam", b2: `và đỗ danh hiệu ${rank.name.vi} với ${score}/${QN} câu trả lời đúng`, d: "Ngày cấp", tag: "Việt Nam – Vẻ đẹp vượt thời gian" },
      en: { t: "CERTIFICATE", s: "OF CULTURAL DISCOVERY · VIETNAM", line: "Certificate of Cultural Discovery · Vietnam", p: "This is proudly presented to", b1: "for completing the cultural journey through the North, Centre and South of Vietnam", b2: `earning the title of ${rank.name.en.split(" – ")[0]} with ${score}/${QN} correct answers`, d: "Issued on", tag: "Vietnam – Timeless Charm" } };
    const A = L[lang], B = L[other];
    text(A.t, W / 2, 302, '700 66px "Playfair Display", Georgia, serif', RED, "8px");
    text(A.s, W / 2, 348, '600 22px "Be Vietnam Pro", sans-serif', GOLD, "6px");
    text(B.line, W / 2, 384, 'italic 500 22px "Playfair Display", Georgia, serif', SOFT);
    text(A.p, W / 2, 470, '500 28px "Be Vietnam Pro", sans-serif', SOFT);
    let fs = 100;
    ctx.font = `italic 700 ${fs}px "Playfair Display", Georgia, serif`;
    while (ctx.measureText(name).width > W - 420 && fs > 48) { fs -= 4; ctx.font = `italic 700 ${fs}px "Playfair Display", Georgia, serif`; }
    text(name, W / 2, 590, `italic 700 ${fs}px "Playfair Display", Georgia, serif`, RED);
    ctx.strokeStyle = GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W / 2 - 360, 622); ctx.lineTo(W / 2 - 20, 622); ctx.moveTo(W / 2 + 20, 622); ctx.lineTo(W / 2 + 360, 622); ctx.stroke();
    ctx.save(); ctx.translate(W / 2, 622); ctx.rotate(Math.PI / 4); ctx.fillStyle = GOLD; ctx.fillRect(-7, -7, 14, 14); ctx.restore();
    text(A.b1, W / 2, 690, '400 28px "Be Vietnam Pro", sans-serif', INK);
    text(A.b2, W / 2, 736, '600 28px "Be Vietnam Pro", sans-serif', INK);
    // con dấu ba miền
    STAMPS.slice(0, 3).forEach((s, i) => {
      const x = W / 2 + (i - 1) * 150, y = 860, on = stamps.includes(s.id);
      ctx.save(); ctx.globalAlpha = on ? 0.9 : 0.18; ctx.translate(x, y); ctx.rotate([-0.14, 0.1, -0.06][i]);
      ctx.strokeStyle = ctx.fillStyle = s.color; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, 0, 54, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, 47, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.font = '800 19px "Playfair Display", Georgia, serif'; ctx.textAlign = "center"; ctx.fillText(s.center, 0, 7);
      ctx.restore();
    });
    // ngày cấp
    const date = new Date().toLocaleDateString(lang === "vi" ? "vi-VN" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
    text(A.d, 300, 880, '500 22px "Be Vietnam Pro", sans-serif', SOFT);
    text(date, 300, 920, 'italic 600 30px "Playfair Display", Georgia, serif', INK);
    ctx.strokeStyle = GOLD; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(170, 942); ctx.lineTo(430, 942); ctx.stroke();
    // ấn son
    ctx.save(); ctx.translate(W - 300, 890); ctx.rotate(-0.08);
    ctx.fillStyle = "#b3141a"; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-78, -78, 156, 156, 14) : ctx.rect(-78, -78, 156, 156); ctx.fill();
    ctx.strokeStyle = "#fbe9cf"; ctx.lineWidth = 3; ctx.strokeRect(-66, -66, 132, 132);
    ctx.fillStyle = "#fbe9cf"; ctx.textAlign = "center";
    ctx.font = '800 44px "Playfair Display", Georgia, serif'; ctx.fillText("VIỆT", 0, -8);
    ctx.fillText("NAM", 0, 40);
    ctx.font = '600 13px "Be Vietnam Pro", sans-serif'; spacing("3px"); ctx.fillText(String(new Date().getFullYear()), 0, 60); spacing("0px");
    ctx.restore();
    text(A.tag, W / 2, H - 96, 'italic 500 24px "Playfair Display", Georgia, serif', GOLD);

    cv.toBlob((blob) => {
      if (!blob) return;
      if (certURL) URL.revokeObjectURL(certURL);
      certURL = URL.createObjectURL(blob);
      const slug = norm(name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "ban";
      $("#cert-preview").innerHTML = `<img src="${certURL}" ${altT({ vi: "Chứng nhận của " + name, en: "Certificate for " + name })} />
        <div class="q-actions"><a class="btn btn-gold" href="${certURL}" download="${lang === "vi" ? "chung-nhan" : "certificate"}-${slug}.png"><i class="fa-solid fa-download" aria-hidden="true"></i>${tx({ vi: "Tải chứng nhận (PNG)", en: "Download certificate (PNG)" })}</a></div>`;
      $("#cert-preview").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }, "image/png");
  }

  /* =====================================================================
     HIỆN DẦN KHI CUỘN
     ===================================================================== */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
        if (e.target.classList.contains("stats") && !counted) { counted = true; renderStats(true); }
      }), { rootMargin: "0px 0px -6% 0px", threshold: 0.06 })
    : null;
  function observeReveals(root = document) {
    $$(".reveal:not(.in)", root).forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
  }

  /* =====================================================================
     THANH ĐIỀU HƯỚNG, GIAO DIỆN SÁNG/TỐI, MENU DI ĐỘNG
     ===================================================================== */
  const topbar = $("#topbar"), menuBtn = $("#menu-btn");
  function updateHeader() { topbar.classList.toggle("is-solid", window.scrollY > 24 || topbar.classList.contains("nav-open")); }
  window.addEventListener("scroll", updateHeader, { passive: true });
  function setMenu(open) {
    topbar.classList.toggle("nav-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.querySelector("i").className = "fa-solid " + (open ? "fa-xmark" : "fa-bars");
    setAria(menuBtn, open ? { vi: "Đóng menu", en: "Close menu" } : { vi: "Mở menu", en: "Open menu" });
    updateHeader();
  }
  menuBtn.addEventListener("click", () => setMenu(!topbar.classList.contains("nav-open")));
  $$("#mainnav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  const themeBtn = $("#theme-btn");
  function syncThemeIcon() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    themeBtn.querySelector("i").className = "fa-solid " + (dark ? "fa-sun" : "fa-moon");
    document.querySelector('meta[name="theme-color"]').content = dark ? "#140b09" : "#7E1014";
  }
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store.raw("theme", next);
    syncThemeIcon();
  });
  $$(".lang-switch button").forEach((b) => b.addEventListener("click", () => { if (b.dataset.lang !== lang) applyLang(b.dataset.lang); }));

  document.addEventListener("keydown", (e) => {
    if (!lbEl.hidden) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") stepLightbox(-1);
      else if (e.key === "ArrowRight") stepLightbox(1);
      return;
    }
    if (e.key === "Escape") { closeDrawer(); setMenu(false); }
  });

  /* =====================================================================
     ĐIỀU HƯỚNG GIỮA CÁC TRANG (#/ten-trang)
     ===================================================================== */
  const VIEWS = ["home", "map", "north", "central", "south", "finish", "phrases", "zodiac", "festivals", "tips", "quiz"];
  const NAV_OF = { north: "map", central: "map", south: "map", finish: "map" };
  let currentView = null, firstRoute = true;
  function route() {
    let v = (location.hash.match(/^#\/([\w-]+)/) || [])[1] || "home";
    if (!VIEWS.includes(v)) v = "home";
    if (v === currentView) return;
    currentView = v;
    $$("main > .view").forEach((s) => { s.hidden = s.dataset.view !== v; });
    const navKey = NAV_OF[v] || v;
    $$("[data-nav]").forEach((a) => { if (a.dataset.nav === navKey) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    stopVideos();
    closeLightbox();
    closeDrawer();
    setMenu(false);
    if (D.regions[v]) {
      playRegionMusic(v);
      addStamp(v);
    } else {
      player.hidden = true;
      stopAllMusic();
      currentRegion = null;
    }
    if (v === "quiz" && !$("#quiz-box").children.length) quizStart();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    updateTitle();
    updateHeader();
    observeReveals($(`main > .view[data-view="${v}"]`));
    if (!firstRoute) $("#main").focus({ preventScroll: true });
    firstRoute = false;
  }
  window.addEventListener("hashchange", route);

  /* =====================================================================
     KHỞI ĐỘNG
     ===================================================================== */
  renderHome();
  initProverbs();
  renderMap();
  D.regionOrder.forEach(renderRegion);
  renderPhrasebook();
  renderZodiacGrid();
  renderFestivals();
  renderTips();
  renderStamps();
  renderSaved();
  updateAudioUI(false);
  syncThemeIcon();
  route();
  applyLang(lang);
  setTimeout(() => { if (synth && !voicesChecked) { voicesChecked = true; loadVoices(); if (!viVoice) $("#voice-warning").hidden = false; } }, 2500);
})();
