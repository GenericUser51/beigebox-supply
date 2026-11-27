(function () {
  const $ = (s) => document.querySelector(s);
  const money = (n) => "$" + n.toLocaleString("en-US");

  /* ---------- Product art (inline SVG, token colours) ---------- */
  const S = (inner) => `<svg viewBox="0 0 200 140" aria-hidden="true">${inner}</svg>`;
  const stripe = (x, y, w, h = 3, g = 2) =>
    ["var(--brown)", "var(--rust)", "var(--orange)", "var(--amber)"]
      .map((c, i) => `<rect x="${x}" y="${y + i * (h + g)}" width="${w}" height="${h}" fill="${c}"/>`).join("");
  /* Depth helpers. Light comes from the upper left: top faces are lit,
     right-hand sides sit in shade, and everything casts a soft floor shadow. */
  const shadow = (cx, cy, rx, ry = 4) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity=".13"/>`;
  // Oblique box: front face at (x, y, w, h), receding d units up and to the right.
  const box = (x, y, w, h, d, r = 3, front = "var(--shell)") => {
    const dy = d * 0.6;
    const top = `M${x} ${y} L${x + d} ${y - dy} H${x + w + d} L${x + w} ${y} Z`;
    return `<path d="${top}" fill="${front}" stroke="var(--line)" stroke-linejoin="round"/>
      <path d="${top}" fill="#fff" opacity=".35"/>
      <path d="M${x + w} ${y} L${x + w + d} ${y - dy} V${y + h - dy - r} L${x + w} ${y + h} Z" fill="var(--putty-deep)" stroke="var(--line)" stroke-linejoin="round"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${front}" stroke="var(--line)"/>
      <path d="M${x + r} ${y + 1.2} H${x + w - r}" stroke="#fff" stroke-width="1.2" opacity=".55"/>`;
  };
  // Recessed opening: a dark fill with a shadow along its top edge.
  const inset = (x, y, w, h, fill = "var(--putty-deep)", r = 1.5) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="var(--line)"/>
     <rect x="${x + .5}" y="${y + .5}" width="${w - 1}" height="${Math.min(2, h / 3)}" fill="#000" opacity=".22"/>`;
  // Sculpted keycap: darker skirt with a lighter dished top surface set toward the back.
  const keycap = (x, y, w, h, f = "var(--shell)") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${f}" stroke="var(--line)"/>
     <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#000" opacity=".1"/>
     <rect x="${x + 2.5}" y="${y + 1.5}" width="${w - 5}" height="${h - 6}" rx="2" fill="${f}"/>
     <rect x="${x + 2.5}" y="${y + 1.5}" width="${w - 5}" height="${h - 6}" rx="2" fill="#fff" opacity=".22"/>`;
  // Round raised button seen from the front: a darker rim under a lit cap.
  const button = (cx, cy, r, f) =>
    `<circle cx="${cx}" cy="${cy + 1.6}" r="${r}" fill="#000" opacity=".3"/>
     <circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}"/>
     <circle cx="${cx - r * .3}" cy="${cy - r * .35}" r="${r * .35}" fill="#fff" opacity=".35"/>`;
  const glow = (cx, cy, r, f) => `<circle cx="${cx}" cy="${cy}" r="${r * 2.4}" fill="${f}" opacity=".18"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}"/>`;

  const art = {
    tower: S(`${shadow(100, 132, 54)}
      ${box(56, 20, 70, 110, 16, 4)}
      ${inset(62, 28, 58, 14, "var(--putty)")}<rect x="66" y="33" width="50" height="4" rx="1" fill="#000" opacity=".12"/>
      ${inset(62, 46, 58, 14, "var(--putty)")}<rect x="70" y="52" width="42" height="2.5" fill="var(--ink)"/>
      ${stripe(56, 70, 70)}
      ${keycap(64, 92, 12, 12, "var(--putty-deep)")}
      ${glow(112, 98, 2.4, "var(--led)")}
      <path d="M64 112h54M64 117h54M64 122h54" stroke="var(--line)" stroke-width="2.4"/>
      <path d="M64 111h54M64 116h54M64 121h54" stroke="#000" stroke-width=".8" opacity=".2"/>`),
    slab: S(`<rect x="54" y="28" width="108" height="36" rx="3" fill="var(--putty-deep)" stroke="var(--line)" opacity=".5"/>
      ${shadow(102, 121, 80)}
      ${box(24, 78, 138, 40, 14, 4)}
      ${inset(32, 86, 46, 12, "var(--putty)")}<rect x="38" y="91" width="34" height="2" fill="var(--ink)"/>
      ${inset(32, 102, 46, 10, "var(--putty)")}
      ${stripe(90, 88, 48)}
      ${button(150, 106, 5, "var(--putty-deep)")}${glow(150, 90, 2, "var(--led)")}`),
    keys: S(`${shadow(100, 132, 86, 3)}
      ${Array.from({ length: 24 }, (_, i) => { const r = Math.floor(i / 8), c = i % 8;
        return keycap(24 + c * 19.5, 30 + r * 26, 17, 22, (c === 0 || c === 7) ? "var(--putty-deep)" : "var(--shell)"); }).join("")}
      ${keycap(63, 108, 74, 20)}`),
    keys2: S(`${shadow(100, 132, 86, 3)}
      ${Array.from({ length: 24 }, (_, i) => { const r = Math.floor(i / 8), c = i % 8;
        const f = (r === 0 && c === 7) ? "var(--orange)" : (c === 0 || c === 7) ? "var(--putty-deep)" : "var(--shell)";
        return keycap(24 + c * 19.5, 30 + r * 26, 17, 22, f); }).join("")}
      ${keycap(63, 108, 74, 20)}`),
    deck: S(`${shadow(102, 110, 84)}
      ${box(20, 44, 152, 62, 10)}
      ${inset(38, 54, 88, 42, "var(--crt)", 3)}
      <rect x="46" y="62" width="72" height="26" rx="2" fill="#2E2823"/>
      <circle cx="68" cy="75" r="8" fill="var(--shell)"/><circle cx="96" cy="75" r="8" fill="var(--shell)"/>
      <circle cx="68" cy="75" r="3" fill="var(--crt)"/><circle cx="96" cy="75" r="3" fill="var(--crt)"/>
      <path d="M46 63 L74 63 L60 87 L46 87 Z" fill="#fff" opacity=".07"/>
      ${[0, 1, 2, 3].map(i => keycap(134 + (i % 2) * 17, 54 + Math.floor(i / 2) * 21, 14, 17, "var(--putty-deep)")).join("")}
      <rect x="28" y="99" width="8" height="3" fill="var(--rust)"/>`),
    turbo: S(`${shadow(100, 104, 82)}
      ${box(20, 46, 150, 54, 10)}
      ${inset(32, 56, 64, 34, "var(--crt)", 2)}
      <text x="64" y="84" text-anchor="middle" font-family="VT323, monospace" font-size="32" fill="var(--led-off)">88</text>
      <text x="64" y="84" text-anchor="middle" font-family="VT323, monospace" font-size="32" fill="var(--led)">66</text>
      ${keycap(106, 58, 24, 24, "var(--putty-deep)")}
      <text x="118" y="94" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7" fill="var(--ink-soft)">TURBO</text>
      ${glow(146, 64, 3, "var(--led)")}${glow(158, 64, 3, "var(--amber)")}
      <text x="152" y="82" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7" fill="var(--ink-soft)">MHz</text>`),
    floppy: S(`${shadow(104, 98, 66)}
      ${box(38, 52, 118, 42, 10)}
      ${inset(52, 62, 90, 8, "var(--ink)", 1)}
      ${keycap(124, 76, 15, 10, "var(--putty-deep)")}
      ${glow(54, 82, 2.2, "var(--phosphor-dim)")}
      ${inset(64, 78, 16, 8, "var(--crt)", 2)}${inset(86, 78, 12, 8, "var(--crt)", 1)}`),
    bezel: S(`${shadow(100, 133, 64)}
      <path d="M72 120 H120 L130 128 H62 Z" fill="var(--putty-deep)" stroke="var(--line)"/>
      <rect x="78" y="112" width="34" height="10" fill="var(--putty-deep)" stroke="var(--line)"/>
      ${box(30, 22, 126, 92, 18, 12)}
      ${inset(43, 33, 100, 66, "var(--crt)", 10)}
      <path d="M52 44h40M52 52h58M52 60h30" stroke="var(--phosphor)" stroke-width="3" opacity=".8"/>
      <ellipse cx="70" cy="46" rx="26" ry="12" fill="#fff" opacity=".07"/>
      ${stripe(44, 102, 26, 2, 1)}${glow(136, 106, 2.6, "var(--led)")}`),
    cable: S(`${shadow(100, 98, 88, 3)}
      <path d="M22 70 H44" stroke="var(--line)" stroke-width="9" stroke-linecap="round"/>
      <path d="M22 70 H44" stroke="var(--shell)" stroke-width="7" stroke-linecap="round"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${52 + i * 8} 52 A6 18 0 0 0 ${52 + i * 8} 88" fill="none" stroke="var(--putty-deep)" stroke-width="5"/>`).join("")}
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${52 + i * 8} 52 A6 18 0 0 1 ${52 + i * 8} 88" fill="none" stroke="var(--line)" stroke-width="6.5"/><path d="M${52 + i * 8} 52 A6 18 0 0 1 ${52 + i * 8} 88" fill="none" stroke="var(--shell)" stroke-width="4.5"/><path d="M${53 + i * 8} 56 A5 14 0 0 1 ${56 + i * 8} 70" fill="none" stroke="#fff" stroke-width="1.2" opacity=".55"/>`).join("")}
      <path d="M150 70 H168" stroke="var(--line)" stroke-width="9"/><path d="M150 70 H168" stroke="var(--shell)" stroke-width="7"/>
      ${[[6, 18], [166, 20]].map(([x, w]) => `<rect x="${x}" y="61" width="${w}" height="18" rx="3" fill="var(--rust)"/><rect x="${x}" y="72" width="${w}" height="7" rx="3" fill="#000" opacity=".2"/><rect x="${x + 2}" y="63" width="${w - 4}" height="3" rx="1.5" fill="#fff" opacity=".35"/>`).join("")}`),
    badge: S(`${[[28, 38, 64, 30], [108, 38, 64, 30], [44, 80, 112, 28]].map(([x, y, w, h]) => `<rect x="${x + 1}" y="${y + 3}" width="${w}" height="${h}" rx="4" fill="#000" opacity=".2"/>`).join("")}
      <rect x="28" y="38" width="64" height="30" rx="4" fill="var(--brown)" stroke="var(--amber)" stroke-width="1.5"/>
      <text x="60" y="58" text-anchor="middle" font-family="Michroma, sans-serif" font-size="11" fill="var(--amber)">TURBO</text>
      <rect x="108" y="38" width="64" height="30" rx="4" fill="var(--shell)" stroke="var(--line)"/>${stripe(116, 44, 48, 3, 2)}
      <rect x="44" y="80" width="112" height="28" rx="4" fill="var(--ink)" stroke="var(--line)"/>
      <text x="100" y="99" text-anchor="middle" font-family="Michroma, sans-serif" font-size="10" fill="var(--putty)">686 · 33MHz</text>
      ${[[28, 38, 64], [108, 38, 64], [44, 80, 112]].map(([x, y, w]) => `<path d="M${x + 4} ${y + 2.5} H${x + w - 4}" stroke="#fff" stroke-width="2" opacity=".35" stroke-linecap="round"/>`).join("")}`),
    led: S(`${shadow(100, 84, 90, 3)}
      ${box(12, 62, 168, 16, 8, 3, "var(--putty-deep)")}
      ${Array.from({ length: 12 }, (_, i) => glow(22 + i * 14, 70, 3.6, "var(--phosphor)")).join("")}
      <rect x="12" y="62" width="168" height="5" rx="2" fill="#fff" opacity=".18"/>`),
    riser: S(`<rect x="62" y="18" width="88" height="34" rx="6" fill="var(--putty-deep)" stroke="var(--line)" opacity=".5"/>
      ${shadow(102, 114, 82)}
      <rect x="28" y="100" width="12" height="12" fill="var(--putty-deep)" stroke="var(--line)"/>
      <rect x="152" y="100" width="12" height="12" fill="var(--putty-deep)" stroke="var(--line)"/>
      ${box(22, 64, 150, 38, 14)}
      ${inset(48, 72, 98, 24, "var(--putty-deep)", 2)}
      <rect x="52" y="74" width="90" height="20" rx="2" fill="var(--putty)" stroke="var(--line)"/>
      <path d="M54 75.5 H140" stroke="#fff" stroke-width="1" opacity=".5"/>
      <rect x="85" y="81" width="24" height="6" rx="3" fill="var(--brown)"/><rect x="87" y="82" width="20" height="1.5" rx=".75" fill="#fff" opacity=".3"/>`),
    headset: S(`${shadow(100, 132, 66)}
      <path d="M52 92 V70 A48 48 0 0 1 148 70 V92" fill="none" stroke="var(--line)" stroke-width="11" stroke-linecap="round"/>
      <path d="M52 92 V70 A48 48 0 0 1 148 70 V92" fill="none" stroke="var(--shell)" stroke-width="8" stroke-linecap="round"/>
      <path d="M50 86 V70 A50 50 0 0 1 100 20" fill="none" stroke="#fff" stroke-width="1.8" opacity=".55"/>
      ${stripe(84, 18, 32, 1.5, 1)}
      ${[[28, 1], [150, -1]].map(([x, s]) => `<rect x="${x}" y="82" width="22" height="42" rx="7" fill="var(--putty-deep)" stroke="var(--line)"/>
        <rect x="${s > 0 ? x : x + 16}" y="84" width="6" height="38" rx="3" fill="#000" opacity=".12"/>
        <rect x="${s > 0 ? x + 14 : x + 3}" y="86" width="3" height="32" rx="1.5" fill="#fff" opacity=".35"/>`).join("")}
      <ellipse cx="56" cy="103" rx="8" ry="22" fill="var(--amber)"/><ellipse cx="57" cy="103" rx="4" ry="15" fill="#000" opacity=".15"/>
      <ellipse cx="144" cy="103" rx="8" ry="22" fill="var(--amber)"/><ellipse cx="143" cy="103" rx="4" ry="15" fill="#000" opacity=".15"/>
      <path d="M40 122 Q48 134 82 128" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
      ${button(84, 127, 4.5, "var(--rust)")}${glow(162, 90, 1.8, "var(--led)")}`),
    stand: S(`${shadow(100, 130, 56, 4)}
      <path d="M50 120 V125 A50 8 0 0 0 150 125 V120 Z" fill="var(--putty-deep)" stroke="var(--line)"/>
      <path d="M50 123 A50 8 0 0 0 150 123" fill="none" stroke="var(--rust)" stroke-width="1.5"/>
      <ellipse cx="100" cy="120" rx="50" ry="8" fill="var(--shell)" stroke="var(--line)"/>
      <ellipse cx="100" cy="120" rx="50" ry="8" fill="#fff" opacity=".25"/>
      <rect x="96" y="44" width="9" height="76" fill="var(--shell)" stroke="var(--line)"/>
      <rect x="97.5" y="46" width="2.2" height="72" fill="#fff" opacity=".5"/><rect x="101.5" y="46" width="3" height="72" fill="#000" opacity=".08"/>
      <circle cx="103" cy="40" r="27" fill="var(--putty-deep)" stroke="var(--line)"/>
      <circle cx="100" cy="38" r="27" fill="var(--shell)" stroke="var(--line)"/>
      <circle cx="100" cy="38" r="20" fill="none" stroke="var(--line)" stroke-dasharray="2 3"/>
      ${[0, 120, 240].map(a => inset(100 + 13 * Math.cos(a * Math.PI / 180) - 5, 38 + 13 * Math.sin(a * Math.PI / 180) - 5, 10, 10, "var(--putty-deep)", 5)).join("")}
      <circle cx="100" cy="38" r="5" fill="var(--crt)"/>
      <path d="M80 22 A27 27 0 0 1 104 11.3" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/>`),
    mic: S(`${shadow(100, 128, 48)}
      ${box(62, 114, 70, 10, 8, 3, "var(--putty-deep)")}
      ${glow(124, 119, 2.2, "var(--led)")}<rect x="70" y="117" width="14" height="4" rx="2" fill="var(--shell)"/>
      <rect x="97" y="84" width="7" height="27" fill="var(--putty-deep)" stroke="var(--line)"/>
      <path d="M74 48 V86 H126 V48" fill="none" stroke="var(--line)" stroke-width="6"/>
      <path d="M74 48 V86 H126 V48" fill="none" stroke="var(--putty-deep)" stroke-width="4"/>
      <path d="M73 50 V85" stroke="#fff" stroke-width="1" opacity=".4"/>
      <rect x="82" y="12" width="36" height="68" rx="18" fill="var(--shell)" stroke="var(--line)"/>
      <path d="M88 24h24M86 30h28M86 36h28M86 42h28M88 48h24" stroke="var(--line)" stroke-width="2" stroke-dasharray="2 2"/>
      ${stripe(82, 58, 36, 2, 1)}
      <rect x="86" y="18" width="4" height="56" rx="2" fill="#fff" opacity=".4"/>
      <rect x="110" y="18" width="5" height="56" rx="2.5" fill="#000" opacity=".09"/>`),
    micshell: S(`${shadow(100, 124, 44)}
      ${box(72, 112, 52, 8, 8, 2, "var(--putty-deep)")}
      <rect x="92" y="100" width="14" height="12" fill="var(--putty-deep)" stroke="var(--line)"/>
      ${box(66, 22, 64, 80, 12, 6)}
      ${Array.from({ length: 9 }, (_, i) => inset(75 + i * 5.4, 32, 2.8, 42, "var(--putty-deep)", 1.4)).join("")}
      ${stripe(66, 82, 64, 2, 1)}
      <path d="M36 40 h18 M36 40 v18 M164 40 h-18 M164 40 v18" stroke="var(--rust)" stroke-width="2"/>
      <text x="100" y="136" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7" fill="var(--ink-soft)">FITS 50–62 mm BODIES</text>`),
    pad: S(`${shadow(100, 116, 76)}
      <path d="M100 44 C100 22 128 26 138 8" fill="none" stroke="var(--line)" stroke-width="3"/>
      <rect x="28" y="49" width="144" height="62" rx="14" fill="var(--putty-deep)" stroke="var(--line)"/>
      <rect x="28" y="44" width="144" height="62" rx="14" fill="var(--shell)" stroke="var(--line)"/>
      <path d="M42 45.5 H158" stroke="#fff" stroke-width="1.4" opacity=".6"/>
      ${stripe(82, 54, 36, 3, 2)}
      <path d="M45 72h10v-10h10v10h10v10h-10v10h-10v-10h-10z" fill="#000" opacity=".25"/>
      <path d="M45 70h10v-10h10v10h10v10h-10v10h-10v-10h-10z" fill="var(--ink)"/>
      <path d="M56 61h8v9" fill="none" stroke="#fff" stroke-width="1" opacity=".25"/>
      ${button(140, 64, 5.5, "var(--rust)")}${button(151, 75, 5.5, "var(--orange)")}
      ${button(140, 86, 5.5, "var(--amber)")}${button(129, 75, 5.5, "var(--brown)")}
      ${keycap(86, 83, 12, 7, "var(--putty-deep)")}${keycap(102, 83, 12, 7, "var(--putty-deep)")}`),
    stick: S(`<ellipse cx="100" cy="127" rx="72" ry="5" fill="#000" opacity=".12"/>
      <path d="M34 104 L166 104 L166 120 Q166 124 162 124 L38 124 Q34 124 34 120 Z" fill="var(--putty-deep)" stroke="var(--line)"/>
      <path d="M60 82 L140 82 L166 104 L34 104 Z" fill="var(--shell)" stroke="var(--line)" stroke-linejoin="round"/>
      <path d="M36 103.5 H164" stroke="#fff" stroke-width="1.2" opacity=".45"/>
      ${stripe(42, 107.5, 116, 2, 1)}
      <ellipse cx="66" cy="98" rx="7" ry="3.4" fill="var(--brown)"/><ellipse cx="66" cy="96.4" rx="7" ry="3.4" fill="var(--rust)"/>
      <ellipse cx="134" cy="98" rx="7" ry="3.4" fill="var(--brown)"/><ellipse cx="134" cy="96.4" rx="7" ry="3.4" fill="var(--rust)"/>
      <ellipse cx="100" cy="92" rx="18" ry="5.5" fill="var(--crt)"/>
      <ellipse cx="100" cy="90" rx="13" ry="3.8" fill="#2E2823"/>
      <rect x="95" y="50" width="10" height="40" fill="var(--ink)"/>
      <rect x="97" y="50" width="2.5" height="40" fill="#fff" opacity=".15"/>
      <rect x="86" y="16" width="28" height="42" rx="11" fill="var(--putty-deep)" stroke="var(--line)"/>
      <rect x="89" y="22" width="4" height="30" rx="2" fill="#fff" opacity=".35"/>
      <rect x="107" y="22" width="4" height="30" rx="2" fill="#000" opacity=".08"/>
      <circle cx="100" cy="25" r="4" fill="var(--rust)"/>
      <rect x="93" y="34" width="14" height="5" rx="2.5" fill="var(--orange)"/>
      <rect x="93" y="42" width="14" height="5" rx="2.5" fill="var(--amber)"/>`)
  };

  /* ---------- Catalog data ---------- */
  const DEPTS = ["All", "Cases", "Keyboards", "Front bays", "Displays", "Headsets", "Microphones", "Controllers", "Cables & light", "Badges"];
  const PRODUCTS = [
    { id: "BB-0451", name: "Model 84 Tower Shell", dept: "Cases", price: 289, art: "tower", tag: "Bestseller", desc: "Full ATX tower in putty ABS with three 5.25\" bays and a roof vent for a 360 mm radiator.", specs: ["ATX / mATX", "340mm GPU", "3× 5.25\""] },
    { id: "BB-0218", name: "Desktop Slab Chassis", dept: "Cases", price: 249, art: "slab", desc: "Horizontal desktop case built to sit under a monitor, the way office PCs used to.", specs: ["mATX / ITX", "SFX PSU", "2× 5.25\""] },
    { id: "BB-1102", name: "Putty Doubleshot Keycaps", dept: "Keyboards", price: 129, art: "keys", desc: "Thick PBT doubleshots in two-tone beige with a 1980s terminal legend font.", specs: ["PBT 1.5mm", "MX stem", "104 + 26"] },
    { id: "BB-1140", name: "Mission Control Keycaps", dept: "Keyboards", price: 139, art: "keys2", tag: "New", defaults: { finish: "smoke" }, desc: "Warm greys with one orange Escape, modelled on lab equipment keyboards.", specs: ["PBT 1.5mm", "MX stem", "ISO + ANSI"] },
    { id: "BB-3301", name: "Tape Deck Bay Cover", dept: "Front bays", price: 74, art: "deck", tag: "New", desc: "A 5.25\" fan controller dressed as a cassette deck. The play keys set fan curves.", specs: ["5.25\" bay", "4-pin PWM ×4", "Silent mode"] },
    { id: "BB-3320", name: "Turbo Panel, 7-Seg", dept: "Front bays", price: 59, art: "turbo", desc: "Red seven-segment readout for CPU clock or temperature, plus a working Turbo button you can map.", specs: ["5.25\" bay", "USB 2.0 header", "Mappable key"] },
    { id: "BB-3355", name: "Floppy Faceplate, USB-C", dept: "Front bays", price: 34, art: "floppy", desc: "A 3.5\" floppy slot with a flip door that hides USB-C 20 Gbps and an SD reader.", specs: ["3.5\" bay", "USB-C 20Gbps", "SD UHS-II"] },
    { id: "BB-5010", name: "CRT Bezel Hood, 27\"", dept: "Displays", price: 179, art: "bezel", desc: "A snap-on shell that turns a flat 27\" monitor into a deep-chin tube display.", specs: ["24–27\" panels", "VESA 100", "Tool-free"] },
    { id: "BB-5022", name: "Monitor Riser with Drawer", dept: "Displays", price: 95, art: "riser", desc: "Putty riser with a felt-lined drawer sized for keycap pullers and spare switches.", specs: ["Holds 20 kg", "520 mm wide", "Felt drawer"] },
    { id: "BB-7002", name: "Coiled Aviator Cable", dept: "Cables & light", price: 42, art: "cable", desc: "USB-C to USB-C keyboard cable in putty sleeving with rust GX16 connectors.", specs: ["1.5 m", "GX16", "USB-C"] },
    { id: "BB-7100", name: "Phosphor LED Strip", dept: "Cables & light", price: 27, art: "led", opts: ["glow", "finish"], desc: "Interior lighting tuned to real CRT phosphor colours, diffused so you never see the dots.", specs: ["ARGB 5V", "40 cm", "Diffused"] },
    { id: "BB-8810", name: "Enamel Case Badge Set", dept: "Badges", price: 18, art: "badge", desc: "Three adhesive enamel badges: TURBO, the stripe plate and a 686 · 33MHz chip badge.", specs: ["3 badges", "3M adhesive", "Hard enamel"] },
    { id: "BB-9101", name: "Portable Stereo Headset", dept: "Headsets", price: 119, art: "headset", tag: "New", desc: "On-ear headset with foam pads in your accent colour and a flip-down boom mic. The pads follow the stripe you pick.", specs: ["2.4 GHz + 3.5 mm", "40 mm drivers", "30 h battery"] },
    { id: "BB-9108", name: "Tape Reel Headset Stand", dept: "Headsets", price: 39, art: "stand", desc: "Weighted desk stand topped with a 7\" tape reel that cradles any headset band.", specs: ["Weighted base", "Fits all bands", "Cable hook"] },
    { id: "BB-9120", name: "Broadcast Desk Mic", dept: "Microphones", price: 149, art: "mic", desc: "Dynamic USB-C microphone styled after studio broadcast mics, with a yoke mount and a mute light on the base.", specs: ["USB-C + XLR", "Cardioid", "Tap-to-mute"] },
    { id: "BB-9126", name: "Mic Shell Kit", dept: "Microphones", price: 45, art: "micshell", desc: "A slotted retro shell that clips over the USB mic you already own, plus a matching base cover.", specs: ["50–62 mm bodies", "Tool-free", "Base cover"] },
    { id: "BB-9140", name: "Gamepad 84", dept: "Controllers", price: 69, art: "pad", tag: "New", desc: "Flat, rectangular controller with a clicky D-pad and four face buttons coloured by your stripe set.", specs: ["Wireless + USB-C", "Hall-effect", "PC / Switch"] },
    { id: "BB-9152", name: "Desktop Flight Stick", dept: "Controllers", price: 129, art: "stick", desc: "Heavy-base joystick with a two-button grip and fire buttons on the base, built for flight and space sims.", specs: ["Hall-effect axes", "12 buttons", "USB-C"] }
  ];

  /* ---------- Colourways ----------
     Each option overrides the CSS colour tokens the product art is drawn with,
     so one SVG can be shown in any colourway. */
  const OPTION_GROUPS = {
    finish: {
      label: "Shell finish",
      choices: [
        { id: "putty", name: "Putty", swatch: ["#EEE4CD"], vars: {} },
        { id: "smoke", name: "Smoke grey", swatch: ["#BDB8AC"], vars: { "--shell": "#C9C4B8", "--putty": "#B5B0A4", "--putty-deep": "#A39D91", "--line": "#7F796E" } },
        { id: "charcoal", name: "Charcoal", swatch: ["#3E3A36"], vars: { "--shell": "#46413D", "--putty": "#38342F", "--putty-deep": "#2C2926", "--line": "#1E1C1A", "--ink-soft": "#B5AA98" } },
        { id: "lab", name: "Lab white", swatch: ["#F4F4EF"], vars: { "--shell": "#F8F8F3", "--putty": "#E9EAE4", "--putty-deep": "#D7D9D1", "--line": "#AEB1A8" } }
      ]
    },
    accent: {
      label: "Accent stripe",
      choices: [
        { id: "sunset", name: "Sunset", swatch: ["#5B3A24", "#C4502A", "#E27A2C", "#EDB13F"] },
        { id: "mission", name: "Mission", swatch: ["#1F3550", "#2F6E9E", "#6FA9C9", "#C9DDE3"] },
        { id: "phosphor", name: "Phosphor", swatch: ["#1E3B25", "#3E7A4B", "#6FBF7F", "#A6FFB8"] },
        { id: "cola", name: "Cherry cola", swatch: ["#3A1418", "#8E1F2B", "#C8423F", "#E9A79A"] }
      ]
    },
    glow: {
      label: "Glow colour",
      choices: [
        { id: "p1", name: "P1 green", swatch: ["#A6FFB8"], vars: { "--phosphor": "#A6FFB8" } },
        { id: "p3", name: "P3 amber", swatch: ["#FFB347"], vars: { "--phosphor": "#FFB347" } },
        { id: "p4", name: "P4 white", swatch: ["#E6EEFF"], vars: { "--phosphor": "#E6EEFF" } },
        { id: "led", name: "LED red", swatch: ["#FF4A33"], vars: { "--phosphor": "#FF4A33" } }
      ]
    }
  };
  // Accent choices map their four swatch colours onto the stripe tokens.
  OPTION_GROUPS.accent.choices.forEach(c => {
    c.vars = { "--brown": c.swatch[0], "--rust": c.swatch[1], "--orange": c.swatch[2], "--amber": c.swatch[3] };
  });
  const optsFor = (p) => p.opts || ["finish", "accent"];
  const defaultsFor = (p) => {
    const d = {};
    optsFor(p).forEach(g => { d[g] = (p.defaults && p.defaults[g]) || OPTION_GROUPS[g].choices[0].id; });
    return d;
  };
  const choice = (g, id) => OPTION_GROUPS[g].choices.find(c => c.id === id);
  const varsStyle = (sel) => Object.entries(sel)
    .flatMap(([g, id]) => Object.entries(choice(g, id).vars))
    .map(([k, v]) => `${k}:${v}`).join(";");
  const paint = (p, sel) => `<span class="paint" style="${varsStyle(sel)}">${art[p.art]}</span>`;
  const selLabel = (sel) => Object.entries(sel).map(([g, id]) => choice(g, id).name + (g === "accent" ? " stripe" : "")).join(" · ");
  const swatchHTML = (c) => c.swatch.length > 1
    ? `<span class="chip stripe">${c.swatch.map(s => `<i style="background:${s}"></i>`).join("")}</span>`
    : `<span class="chip" style="background:${c.swatch[0]}"></span>`;

  /* ---------- Cart ---------- */
  const cart = new Map(); // key -> {name, sub, price, qty}
  function addToCart(key, item, qty = 1) {
    const cur = cart.get(key);
    if (cur) cur.qty += qty; else cart.set(key, { ...item, qty });
    renderCart();
  }
  function renderCart() {
    let count = 0, sub = 0;
    cart.forEach(i => { count += i.qty; sub += i.qty * i.price; });
    $("#cart-count").textContent = String(Math.min(count, 99)).padStart(2, "0");
    const lines = $("#lines");
    if (!cart.size) {
      lines.innerHTML = `<div class="empty">C:\\CART&gt; DIR<br>0 FILE(S) FOUND<br><br>Add a part from the catalog to get started.</div>`;
    } else {
      lines.innerHTML = "";
      cart.forEach((i, key) => {
        const el = document.createElement("div");
        el.className = "line";
        el.innerHTML = `<div class="t">${i.name}</div><div class="pr">${money(i.price * i.qty)}</div>
          <div class="s">${i.sub}</div>
          <div class="qty"><button type="button" aria-label="Remove one">−</button><span>${i.qty}</span><button type="button" aria-label="Add one">+</button></div>`;
        const [minus, plus] = el.querySelectorAll("button");
        minus.onclick = () => { i.qty--; if (i.qty <= 0) cart.delete(key); renderCart(); };
        plus.onclick = () => { i.qty++; renderCart(); };
        lines.appendChild(el);
      });
    }
    const ship = shipCost(sub, "standard");
    $("#subtotal").textContent = money(sub);
    $("#ship").textContent = sub === 0 ? "$0" : ship === 0 ? "Free" : money(ship);
    $("#ship-hint").textContent = sub > 0 && sub < FREE_SHIP ? `Add ${money(FREE_SHIP - sub)} more for free standard shipping.` : "";
    $("#checkout").disabled = !cart.size;
    $("#checkout-note").textContent = "";
    if (view === "checkout") updateCheckoutTotal();
  }
  const openCart = (open) => { $("#drawer").hidden = !open; $("#scrim").hidden = !open; if (open) $("#cart-close").focus(); };
  $("#cart-open").onclick = () => openCart(true);
  $("#cart-close").onclick = () => openCart(false);
  $("#scrim").onclick = () => openCart(false);
  document.addEventListener("keydown", e => { if (e.key === "Escape") openCart(false); });

  /* ---------- Checkout: cart -> shipping details -> order summary ---------- */
  const FREE_SHIP = 150;
  const SHIPPING = {
    standard: { name: "Standard", days: "5-8 business days" },
    express: { name: "Express", days: "2-3 business days" }
  };
  function shipCost(sub, method) { return method === "express" ? 25 : sub >= FREE_SHIP ? 0 : 12; }
  function cartSubtotal() { let s = 0; cart.forEach(i => { s += i.qty * i.price; }); return s; }
  var view = "cart";
  const TITLES = { cart: "Your order", checkout: "Shipping details", done: "Order summary" };
  function showView(v) {
    view = v;
    $("#view-cart").hidden = v !== "cart";
    $("#view-checkout").hidden = v !== "checkout";
    $("#view-done").hidden = v !== "done";
    $("#drawer-title").textContent = TITLES[v];
    const idx = ["cart", "checkout", "done"].indexOf(v);
    [...$("#steps").children].forEach((s, i) => s.classList.toggle("on", i <= idx));
  }
  const coForm = $("#view-checkout");
  const shipMethod = () => (coForm.querySelector('input[name="co-ship"]:checked') || {}).value || "standard";
  function updateCheckoutTotal() {
    const sub = cartSubtotal();
    $("#co-ship-standard-price").textContent = sub >= FREE_SHIP ? "Free" : "$12";
    $("#co-total").textContent = money(sub + shipCost(sub, shipMethod()));
  }
  $("#checkout").onclick = () => {
    if (!cart.size) { $("#checkout-note").textContent = "Your cart is empty."; return; }
    showView("checkout"); updateCheckoutTotal(); $("#co-name").focus();
  };
  $("#co-back").onclick = () => showView("cart");
  coForm.addEventListener("change", updateCheckoutTotal);
  coForm.addEventListener("input", e => { if (e.target.getAttribute("aria-invalid")) e.target.removeAttribute("aria-invalid"); });

  const FIELDS = [
    ["co-name", "full name"], ["co-email", "email"], ["co-address", "street address"],
    ["co-city", "city"], ["co-postcode", "postcode"], ["co-country", "country"]
  ];
  const pad = (l, r, w = 34) => l + " ".repeat(Math.max(1, w - l.length - r.length)) + r;
  const RULE = "-".repeat(34);
  let receiptText = "";
  coForm.addEventListener("submit", e => {
    e.preventDefault();
    const missing = [];
    FIELDS.forEach(([id, label]) => {
      const el = $("#" + id);
      const v = el.value.trim();
      const bad = !v || (id === "co-email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      if (bad) { el.setAttribute("aria-invalid", "true"); missing.push(label); } else el.removeAttribute("aria-invalid");
    });
    if (missing.length) {
      $("#co-err").textContent = `Check your ${missing.join(", ")}.`;
      $("#" + FIELDS.find(([id]) => $("#" + id).getAttribute("aria-invalid"))[0]).focus();
      return;
    }
    $("#co-err").textContent = "";
    const now = new Date();
    const ymd = now.toISOString().slice(2, 10).replace(/-/g, "");
    const orderNo = `BB-${ymd}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const sub = cartSubtotal(), method = shipMethod(), ship = shipCost(sub, method);
    const v = id => $("#" + id).value.trim();
    const lines = [
      "BEIGEBOX SUPPLY CO.", "ORDER SUMMARY", RULE,
      pad("ORDER NO.", orderNo),
      pad("DATE", now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })),
      RULE
    ];
    cart.forEach(i => {
      lines.push(`${i.qty} x ${i.name}`);
      lines.push(pad("  " + i.sub.split(" · ")[0], money(i.price * i.qty)));
      const extra = i.sub.split(" · ").slice(1).join(", ");
      if (extra) lines.push("  " + extra);
    });
    lines.push(RULE,
      pad("SUBTOTAL", money(sub)),
      pad(`SHIPPING (${SHIPPING[method].name.toUpperCase()})`, ship ? money(ship) : "FREE"),
      pad("TOTAL", money(sub + ship)),
      RULE, "SHIP TO",
      v("co-name"), v("co-address"), `${v("co-city")} ${v("co-postcode")}`, v("co-country"), v("co-email"),
      RULE, `${SHIPPING[method].name.toUpperCase()} DELIVERY: ${SHIPPING[method].days.toUpperCase()}`,
      "THANK YOU FOR SHOPPING BEIGEBOX");
    receiptText = lines.join("\n");
    $("#receipt").textContent = receiptText;
    $("#copy-note").textContent = "";
    showView("done");
    $("#receipt").focus();
  });
  $("#co-copy").onclick = () => {
    const fallback = () => {
      const r = document.createRange(); r.selectNodeContents($("#receipt"));
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      $("#copy-note").textContent = "Summary selected. Press Ctrl+C (or Cmd+C) to copy it.";
    };
    try {
      navigator.clipboard.writeText(receiptText).then(() => { $("#copy-note").textContent = "Summary copied."; }, fallback);
    } catch (err) { fallback(); }
  };
  $("#co-new").onclick = () => {
    cart.clear(); coForm.reset(); receiptText = "";
    showView("cart"); renderCart();
  };

  /* ---------- Catalog render ---------- */
  let dept = "All";
  function renderFilters() {
    const f = $("#filters");
    f.innerHTML = "";
    DEPTS.forEach(d => {
      const n = d === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.dept === d).length;
      const b = document.createElement("button");
      b.type = "button"; b.className = "tape"; b.setAttribute("aria-pressed", String(d === dept));
      b.innerHTML = `${d}<span class="n">${n}</span>`;
      b.onclick = () => { dept = d; renderFilters(); renderGrid(); };
      f.appendChild(b);
    });
  }
  function renderGrid() {
    const g = $("#grid");
    g.innerHTML = "";
    PRODUCTS.filter(p => dept === "All" || p.dept === dept).forEach(p => {
      const c = document.createElement("article");
      c.className = "card";
      const sel = defaultsFor(p);
      const firstGroup = OPTION_GROUPS[optsFor(p)[0]];
      c.innerHTML = `<button class="art" type="button" aria-label="View ${p.name} and its colourways">
          <span class="sku">${p.id}</span>${p.tag ? `<span class="tag">${p.tag}</span>` : ""}${paint(p, sel)}
          <span class="ways">${firstGroup.choices.map(ch => `<i style="background:${ch.swatch[ch.swatch.length > 1 ? 1 : 0]}"></i>`).join("")}<b>View colourways ▸</b></span>
        </button>
        <div class="body"><h3><button class="title-btn" type="button">${p.name}</button></h3><p>${p.desc}</p>
        <div class="specs">${p.specs.map(s => `<span>${s}</span>`).join("")}</div>
        <div class="foot"><span class="price">${money(p.price)}</span><button class="add" type="button">Add to cart</button></div></div>`;
      c.querySelector(".art").onclick = () => openDetail(p);
      c.querySelector(".title-btn").onclick = () => openDetail(p);
      const btn = c.querySelector(".add");
      btn.onclick = () => {
        addToCart(cartKey(p, sel), { name: p.name, sub: `${p.id} · ${selLabel(sel)}`, price: p.price });
        btn.textContent = "Added ✓"; btn.classList.add("done");
        setTimeout(() => { btn.textContent = "Add to cart"; btn.classList.remove("done"); }, 1400);
      };
      g.appendChild(c);
    });
  }
  const cartKey = (p, sel) => p.id + "|" + Object.values(sel).join("|");

  /* ---------- Product detail popup ---------- */
  const dlg = $("#pd");
  const pd = { product: null, sel: {}, qty: 1, opener: null };
  function renderDetailArt() {
    const p = pd.product;
    $("#pd-art").innerHTML = paint(p, pd.sel) +
      `<span class="pd-plate">${p.id} · ${selLabel(pd.sel).toUpperCase()}</span>`;
    $("#pd-qty").textContent = pd.qty;
    $("#pd-total").textContent = money(p.price * pd.qty);
  }
  function openDetail(p) {
    pd.product = p; pd.sel = defaultsFor(p); pd.qty = 1;
    pd.opener = document.activeElement;
    $("#pd-sku").textContent = `${p.id} · ${p.dept}`;
    $("#pd-title").textContent = p.name;
    $("#pd-desc").textContent = p.desc;
    $("#pd-specs").innerHTML = p.specs.map(s => `<span>${s}</span>`).join("");
    $("#pd-opts").innerHTML = optsFor(p).map(g => {
      const grp = OPTION_GROUPS[g];
      return `<fieldset><legend>${grp.label}: <b id="pd-name-${g}">${choice(g, pd.sel[g]).name}</b></legend><div class="swatches">${
        grp.choices.map(c => `<div class="opt"><input type="radio" name="pd-${g}" id="pd-${g}-${c.id}" value="${c.id}" ${c.id === pd.sel[g] ? "checked" : ""}><label for="pd-${g}-${c.id}">${swatchHTML(c)}${c.name}</label></div>`).join("")
      }</div></fieldset>`;
    }).join("");
    $("#pd-add").textContent = "Add to cart";
    renderDetailArt();
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    $("#pd-close").focus();
  }
  function closeDetail() {
    if (dlg.open) dlg.close();
  }
  dlg.addEventListener("close", () => { if (pd.opener && pd.opener.focus) pd.opener.focus(); });
  dlg.addEventListener("click", e => { if (e.target === dlg) closeDetail(); }); // click on the backdrop
  $("#pd-close").onclick = closeDetail;
  $("#pd-opts").addEventListener("change", e => {
    const g = e.target.name.replace("pd-", "");
    pd.sel[g] = e.target.value;
    $("#pd-name-" + g).textContent = choice(g, pd.sel[g]).name;
    renderDetailArt();
  });
  $("#pd-minus").onclick = () => { pd.qty = Math.max(1, pd.qty - 1); renderDetailArt(); };
  $("#pd-plus").onclick = () => { pd.qty = Math.min(20, pd.qty + 1); renderDetailArt(); };
  $("#pd-add").onclick = () => {
    const p = pd.product;
    addToCart(cartKey(p, pd.sel), { name: p.name, sub: `${p.id} · ${selLabel(pd.sel)}`, price: p.price }, pd.qty);
    $("#pd-add").textContent = `Added ${pd.qty} ✓`;
    setTimeout(closeDetail, 650);
  };
  // Footer department links filter the catalog, then the anchor scrolls to it.
  $("#foot-depts").innerHTML = DEPTS.slice(1).map(d => `<li><a href="#catalog" data-dept="${d}">${d}</a></li>`).join("");
  $("#foot-depts").addEventListener("click", e => {
    const a = e.target.closest("a[data-dept]");
    if (a) { dept = a.dataset.dept; renderFilters(); renderGrid(); }
  });

  // Help desk links open the matching question before the page scrolls to it.
  function openHelp(id) {
    const d = document.getElementById(id);
    if (d && d.tagName === "DETAILS") d.open = true;
  }
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#help-"]');
    if (a) openHelp(a.getAttribute("href").slice(1));
  });
  window.addEventListener("hashchange", () => openHelp(location.hash.slice(1)));
  if (location.hash) openHelp(location.hash.slice(1));

  /* ---------- Rig builder ---------- */
  const SHELLS = [
    { id: "putty", name: "Putty", base: "#EEE4CD", edge: "#BDAE90", ink: "#2A231E", price: 0 },
    { id: "smoke", name: "Smoke grey", base: "#BDB8AC", edge: "#8E887C", ink: "#2A231E", price: 0 },
    { id: "charcoal", name: "Charcoal", base: "#3E3A36", edge: "#24211F", ink: "#EEE4CD", price: 20 }
  ];
  const STRIPESETS = [
    { id: "sunset", name: "Sunset", c: ["#5B3A24", "#C4502A", "#E27A2C", "#EDB13F"] },
    { id: "mission", name: "Mission", c: ["#1F3550", "#2F6E9E", "#6FA9C9", "#C9DDE3"] },
    { id: "phosphor", name: "Phosphor", c: ["#1E3B25", "#3E7A4B", "#6FBF7F", "#A6FFB8"] }
  ];
  const BAYS = [
    { id: "deck", name: "Tape deck fan control", price: 74 },
    { id: "turbo", name: "Turbo panel, 7-seg", price: 59 },
    { id: "floppy", name: "Floppy faceplate, USB-C", price: 34 }
  ];
  const BASE = 289;
  const state = { shell: "putty", stripe: "sunset", bays: new Set(["deck", "turbo", "floppy"]), badge: "KL-84" };

  function opt(group, type, id, checked, labelHTML) {
    return `<div class="opt"><input type="${type}" name="${group}" id="${group}-${id}" value="${id}" ${checked ? "checked" : ""}><label for="${group}-${id}">${labelHTML}</label></div>`;
  }
  $("#shells").innerHTML = SHELLS.map(s => opt("shell", "radio", s.id, s.id === state.shell,
    `<span class="chip" style="background:${s.base}"></span>${s.name}${s.price ? `<span class="p">+$${s.price}</span>` : ""}`)).join("");
  $("#stripesets").innerHTML = STRIPESETS.map(s => opt("stripe", "radio", s.id, s.id === state.stripe,
    `<span class="chip stripe">${s.c.map(c => `<i style="background:${c}"></i>`).join("")}</span>${s.name}`)).join("");
  $("#bays").innerHTML = BAYS.map(b => opt("bay", "checkbox", b.id, state.bays.has(b.id),
    `${b.name}<span class="p">+$${b.price}</span>`)).join("");

  const esc = (t) => t.replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

  function towerSVG() {
    const sh = SHELLS.find(s => s.id === state.shell);
    const st = STRIPESETS.find(s => s.id === state.stripe).c;
    const order = BAYS.filter(b => state.bays.has(b.id)).map(b => b.id);
    while (order.length < 3) order.push("blank");
    const bay = (kind, y) => {
      const x = 46, w = 148, h = 40;
      let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${sh.base}" stroke="${sh.edge}"/>`;
      if (kind === "deck") s += `<rect x="${x + 10}" y="${y + 7}" width="78" height="26" rx="2" fill="#101912"/>
        <circle cx="${x + 34}" cy="${y + 20}" r="7" fill="${sh.base}"/><circle cx="${x + 64}" cy="${y + 20}" r="7" fill="${sh.base}"/>
        <circle cx="${x + 34}" cy="${y + 20}" r="2.5" fill="#101912"/><circle cx="${x + 64}" cy="${y + 20}" r="2.5" fill="#101912"/>
        ${[0, 1, 2, 3].map(i => `<rect x="${x + 96 + i * 12}" y="${y + 13}" width="10" height="14" rx="1.5" fill="${sh.edge}"/>`).join("")}`;
      else if (kind === "turbo") s += `<rect x="${x + 10}" y="${y + 6}" width="56" height="28" rx="2" fill="#101912"/>
        <text x="${x + 38}" y="${y + 29}" text-anchor="middle" font-family="VT323, monospace" font-size="28" fill="#FF4A33">66</text>
        <rect x="${x + 80}" y="${y + 10}" width="20" height="20" rx="3" fill="${sh.edge}"/>
        <text x="${x + 90}" y="${y + 38}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="6" fill="${sh.ink}">TURBO</text>
        <circle cx="${x + 118}" cy="${y + 14}" r="2.5" fill="#FF4A33"/><circle cx="${x + 130}" cy="${y + 14}" r="2.5" fill="#EDB13F"/>`;
      else if (kind === "floppy") s += `<rect x="${x + 34}" y="${y + 6}" width="80" height="28" rx="2" fill="${sh.base}" stroke="${sh.edge}"/>
        <rect x="${x + 42}" y="${y + 15}" width="64" height="5" rx="1" fill="#2A231E"/>
        <circle cx="${x + 46}" cy="${y + 27}" r="2" fill="#6FBF7F"/><rect x="${x + 92}" y="${y + 24}" width="12" height="6" rx="1.5" fill="${sh.edge}"/>`;
      else s += [0, 1, 2, 3, 4].map(i => `<rect x="${x + 14}" y="${y + 8 + i * 5.5}" width="${w - 28}" height="2" fill="${sh.edge}" opacity=".7"/>`).join("");
      return s;
    };
    const badge = esc((state.badge || "").toUpperCase().slice(0, 10));
    return `<svg viewBox="0 0 240 420" role="img" aria-label="Preview: ${sh.name} tower, ${STRIPESETS.find(s => s.id === state.stripe).name} stripes, ${order.filter(o => o !== "blank").length} bay modules">
      <rect x="40" y="406" width="22" height="8" rx="2" fill="#2A231E" opacity=".5"/><rect x="178" y="406" width="22" height="8" rx="2" fill="#2A231E" opacity=".5"/>
      <rect x="32" y="8" width="176" height="400" rx="8" fill="${sh.base}" stroke="${sh.edge}" stroke-width="1.5"/>
      <rect x="32" y="8" width="176" height="10" rx="5" fill="#fff" opacity=".25"/>
      <rect x="200" y="14" width="8" height="390" fill="#000" opacity=".06"/>
      ${bay(order[0], 28)}${bay(order[1], 74)}${bay(order[2], 120)}
      ${st.map((c, i) => `<rect x="32" y="${184 + i * 9}" width="176" height="6" fill="${c}"/>`).join("")}
      <rect x="62" y="236" width="116" height="30" rx="3" fill="${state.shell === "charcoal" ? "#EEE4CD" : "#2A231E"}"/>
      <text x="120" y="256" text-anchor="middle" font-family="Michroma, sans-serif" font-size="12" letter-spacing="1.5" fill="${state.shell === "charcoal" ? "#2A231E" : "#EEE4CD"}">${badge || "BEIGEBOX"}</text>
      <rect x="54" y="290" width="26" height="26" rx="4" fill="${sh.edge}" opacity=".6"/><circle cx="67" cy="303" r="7" fill="none" stroke="${sh.ink}" stroke-width="2"/><rect x="66" y="294" width="2" height="8" fill="${sh.ink}"/>
      <circle cx="98" cy="298" r="3" fill="#FF4A33"/><circle cx="98" cy="310" r="3" fill="#6FBF7F"/>
      <text x="106" y="301" font-family="IBM Plex Mono, monospace" font-size="6" fill="${sh.ink}">PWR</text>
      <text x="106" y="313" font-family="IBM Plex Mono, monospace" font-size="6" fill="${sh.ink}">HDD</text>
      ${Array.from({ length: 8 }, (_, i) => `<rect x="54" y="${334 + i * 8}" width="132" height="3" rx="1.5" fill="${sh.edge}" opacity=".8"/>`).join("")}
    </svg>`;
  }
  function buildTotal() {
    const sh = SHELLS.find(s => s.id === state.shell);
    let t = BASE + sh.price;
    BAYS.forEach(b => { if (state.bays.has(b.id)) t += b.price; });
    if ((state.badge || "").trim()) t += 18;
    return t;
  }
  function renderBuilder() {
    $("#preview").innerHTML = towerSVG();
    $("#build-total").textContent = "$" + buildTotal();
  }
  const form = $("#build-form");
  form.addEventListener("change", e => {
    const t = e.target;
    if (t.name === "shell") state.shell = t.value;
    if (t.name === "stripe") state.stripe = t.value;
    if (t.name === "bay") { t.checked ? state.bays.add(t.value) : state.bays.delete(t.value); }
    renderBuilder();
  });
  $("#badge-text").addEventListener("input", e => { state.badge = e.target.value; renderBuilder(); });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const sh = SHELLS.find(s => s.id === state.shell).name;
    const st = STRIPESETS.find(s => s.id === state.stripe).name;
    const bays = BAYS.filter(b => state.bays.has(b.id)).length;
    const key = `KIT-${state.shell}-${state.stripe}-${[...state.bays].sort().join("")}-${state.badge}`;
    addToCart(key, { name: `Model 84 Kit · ${sh}`, sub: `${st} stripes · ${bays} bay module${bays === 1 ? "" : "s"}${state.badge.trim() ? ` · badge "${state.badge.toUpperCase()}"` : ""}`, price: buildTotal() });
    const btn = $("#build-add"); btn.textContent = "Kit added ✓";
    setTimeout(() => { btn.textContent = "Add kit to cart"; }, 1400);
  });

  /* ---------- CRT ambience: loading meter + typed command ---------- */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    const cmds = ["SHOP /ALL", "DIR CASES", "RUN BUILDER.EXE", "TYPE KEYCAPS.TXT", "SHOP /ALL"];
    let p = 75, ci = 0, chars = cmds[0].length, deleting = false, hold = 30;
    setInterval(() => {
      p = p >= 100 ? 0 : p + 1;
      const filled = Math.round(p / 100 * 16);
      $("#meter").textContent = "[" + "█".repeat(filled) + "░".repeat(16 - filled) + "]";
      $("#pct").textContent = String(p).padStart(2, " ");
    }, 140);
    setInterval(() => {
      const cmd = cmds[ci];
      if (hold > 0) { hold--; return; }
      if (!deleting) { if (chars < cmd.length) chars++; else { deleting = true; hold = 25; } }
      else { if (chars > 0) chars--; else { deleting = false; ci = (ci + 1) % cmds.length; } }
      $("#typed").textContent = cmds[ci].slice(0, chars);
    }, 90);
  }

  renderFilters(); renderGrid(); renderCart(); renderBuilder();
})();
