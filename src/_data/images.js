// Images from the reference site (gigawattenergy.com.au).
// LOCAL=false hotlinks the live site (fine for the pages.dev preview).
// Run `bash scripts/localize-images.sh` before launch: it downloads every image
// to src/assets/img/ref/ with SEO filenames and flips LOCAL to true.
const LOCAL = false;

const items = {
  roof:        { remote: "https://gigawattenergy.com.au/wp-content/uploads/2026/03/09_gigawatt_roof-768x312.png", file: "gigawatt-energy-rooftop-solar-installation-melbourne.png", alt: "Gigawatt Energy rooftop solar panel installation on a Melbourne home" },
  award2023:   { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/09/excellence_awards_2023-300x300.jpg", file: "vic-excellence-awards-2023-electrician-finalist.jpg", alt: "VIC Excellence Awards 2023 — Electrician of the Year finalist" },
  award2024:   { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/09/state_excellence_awards_2024-300x300.jpg", file: "vic-excellence-awards-2024-electrician-finalist.jpg", alt: "VIC State Excellence Awards 2024 — Electrician of the Year finalist" },
  awardWic24:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/09/excellence_awards_2024-300x300.jpg", file: "vic-women-in-contracting-2024-finalist.jpg", alt: "VIC Excellence Awards 2024 — Women in Contracting finalist" },
  award2025:   { remote: "https://gigawattenergy.com.au/wp-content/uploads/2025/12/2025-VIC-State-MEA-Excellence-Award-Finalist-Electrician-of-the-Year-300x300.png", file: "vic-mea-excellence-award-2025-electrician-of-the-year-finalist.png", alt: "2025 VIC State MEA Excellence Award finalist — Electrician of the Year" },
  awardWic25:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2025/12/2025-VIC-State-MEA-Excellence-Award-Women-in-Contracting-300x300.png", file: "vic-mea-excellence-award-2025-women-in-contracting-finalist.png", alt: "2025 VIC State MEA Excellence Award finalist — Women in Contracting" },
  awardChamp:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2025/06/australian-small-business.png", file: "champion-awards-2025-electrical-business-finalist.png", alt: "Australian Small Business Champion Awards 2025 — Electrical Business finalist" },
  badgeRec:    { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/08/GIGA-Registered-Electrical-Contractor.png", file: "registered-electrical-contractor-rec-32099-badge.png", alt: "Registered Electrical Contractor REC-32099" },
  badgeSaa:    { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/08/solar-accrediation-australia-768x280.jpeg", file: "solar-accreditation-australia-installer-badge.jpg", alt: "Solar Accreditation Australia accredited installer" },
  badgeSolvic: { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/08/solvic.png", file: "solar-victoria-authorised-retailer-badge.png", alt: "Solar Victoria authorised solar retailer" },
  badgeTesla:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/07/Tesla-Certified-Installer.png", file: "tesla-certified-installer-badge.png", alt: "Tesla Certified Installer" },
  badgePw:     { remote: "https://gigawattenergy.com.au/wp-content/uploads/2025/02/T3_Powerwall-Certified-Installer_B.svg", file: "tesla-powerwall-certified-installer-badge.svg", alt: "Tesla Powerwall Certified Installer" },
  badgeNetcc:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/09/netcc-approved-seller-badge-300x300-1.png", file: "netcc-approved-seller-badge.png", alt: "NETCC Approved Seller" },
  badgeMea:    { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/08/master-electricians-australia.png", file: "master-electricians-australia-member-badge.png", alt: "Master Electricians Australia member" },
  badgeSigen:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2025/08/sigenergy-certified-installer-logo-768x231.jpeg", file: "sigenergy-certified-installer-badge.jpg", alt: "Sigenergy Certified Installer" },
  brandJinko:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/09/Jinko_Solar_logo-1024x349.webp", file: "jinko-solar-panels-logo.webp", alt: "Jinko Solar panels" },
  brandLongi:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/09/LONGi_Logo_PNG-1024x384.png", file: "longi-solar-panels-logo.png", alt: "LONGi solar panels" },
  brandTrina:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2025/05/trina-solar.png", file: "trina-solar-panels-logo.png", alt: "Trina Solar panels" },
  brandJa:     { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/09/Jasolar.png", file: "ja-solar-panels-logo.png", alt: "JA Solar panels" },
  brandTw:     { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/09/tv-solar-1024x176.png", file: "tw-solar-panels-logo.png", alt: "TW Solar panels" },
  brandTesla:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2025/05/teslawall.jpg", file: "tesla-powerwall-home-battery-logo.jpg", alt: "Tesla Powerwall home battery" },
  brandSigen:  { remote: "https://gigawattenergy.com.au/wp-content/uploads/2025/05/Sigenergy-LOGO-Horizontal-qa2ltc28neilil5qvppzhbqv1cqc7t720ugxjz2gow.png", file: "sigenergy-home-battery-logo.png", alt: "Sigenergy home batteries" },
  brandSungrow:{ remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/09/sungrow-1.png", file: "sungrow-inverter-battery-logo.png", alt: "Sungrow inverters and batteries" },
  brandGoodwe: { remote: "https://gigawattenergy.com.au/wp-content/uploads/2024/09/goodwe-logo.png", file: "goodwe-inverter-battery-logo.png", alt: "GoodWe inverters and batteries" },
  brandFox:    { remote: "https://gigawattenergy.com.au/wp-content/uploads/2026/02/fox-optimized.webp", file: "fox-ess-home-battery-logo.webp", alt: "Fox ESS home batteries" },
};

const out = {};
for (const [k, v] of Object.entries(items)) {
  out[k] = { src: LOCAL ? `/assets/img/ref/${v.file}` : v.remote, alt: v.alt };
}
out._items = items;
module.exports = out;
