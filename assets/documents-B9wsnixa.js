import{z as b}from"./model-CUgUSwaD.js";function _(o){const t=o.booking.status;return{voucher:t==="confirmed"||t==="hotel_confirmation_pending"||t==="payment_succeeded",receipt:o.payment?.status==="succeeded"}}function w(o,t){return t.childAges.length?o("trips.room.partyWithChildren",{adults:t.adults,children:t.childAges.length,ages:t.childAges.join(", ")}):o("trips.room.partyAdults",{adults:t.adults})}function $(o,t){return t.meal.type==="room_only"?o("room.breakfastNone"):o("trips.room.breakfastFor",{guests:t.breakfastGuests})}function x(o,t,p){const{t:e,f:n,locale:a}=p,m=t.booking,s=m.snapshot,i=s.totals,f=n.deadline(t.now).full,c=[];if(c.push({heading:e("trips.doc.stay"),rows:[{label:e("trips.doc.property"),value:s.listingName[a]},{label:e("search.dates"),value:`${n.dateRange(s.checkIn,s.checkOut,{weekday:"short"})} · ${n.stayNights(s.checkIn,s.checkOut)}`},{label:e("trips.doc.leadGuest"),value:m.guest.leadName},{label:e("trips.doc.bookingStatus"),value:e(t.bucket==="pending_hotel_confirmation"?"booking.pending":m.status==="cancelled"?"booking.cancelled":"trips.status.confirmed")}]}),o==="voucher")s.rooms.forEach((r,d)=>{const u=t.deadlines[d],h=u?b(u):null,g=h?h.hasDeadline&&u?.deadline?e(h.key,{deadline:n.deadline(u.deadline).deadline,timeZone:n.deadline(u.deadline).timeZone}):e(h.key):e("policy.unknown");c.push({heading:e("trips.room.heading",{number:d+1,room:r.roomName[a]}),rows:[{label:e("room.rateOption"),value:r.rateName[a]},{label:e("trips.room.guests"),value:w(e,r.party)},{label:e("trips.room.meals"),value:$(e,r)},{label:e("policy.title"),value:g}]})}),c.push({heading:e("trips.doc.terms"),rows:[{label:e("price.totalStay"),value:n.money(i.accommodationTotal)},{label:e("trips.doc.snapshot"),value:e("policy.snapshot")}]});else{const r=[{label:e("price.totalStay"),value:n.money(i.accommodationTotal)}];i.sponsorContribution>0&&r.push({label:e("trips.money.sponsor"),value:n.money(i.sponsorContribution)}),i.platformFunding>0&&r.push({label:e("trips.money.coupon"),value:n.money(i.platformFunding)}),r.push({label:e("trips.doc.paidBySimulation"),value:t.payment?n.money(t.travelerMoney.paid):e("common.unknown")}),t.atProperty==="due"?r.push({label:e("price.payAtProperty"),value:n.money(t.paymentPicture.collectAtProperty)}):t.atProperty==="settled_at_stay"?r.push({label:e("trips.money.atPropertyStay"),value:n.money(i.dueAtProperty)}):(t.atProperty==="no_longer_due_cancelled"||t.atProperty==="no_longer_due_no_show")&&r.push({label:e("price.payAtProperty"),value:n.money(0)}),t.payment&&r.push({label:e("payment.method"),value:e(`trips.payment.method.${t.payment.method}`)}),t.payment?.history[0]&&r.push({label:e("trips.doc.paymentRecorded"),value:n.deadline(t.payment.history[t.payment.history.length-1].at).full}),c.push({heading:e("trips.doc.payment"),rows:r}),t.refunds.length&&c.push({heading:e("trips.doc.refunds"),rows:t.refunds.map(d=>({label:d.kind==="date_change"?`${e("trips.money.returnedAfterChange")} · ${e(`trips.refund.status.${d.status}`)}`:e(`trips.refund.status.${d.status}`),value:n.money(d.amount)}))})}const y=[e("document.notValid"),e("trips.doc.generated",{time:f}),e("trips.doc.localOnly")];return o==="receipt"&&i.sponsorContribution>0&&y.splice(1,0,e("trips.doc.sponsorNotSettled")),{kind:o,title:e(o==="voucher"?"document.voucher":"document.receipt"),notice:e("document.notValid"),reference:e("booking.reference",{reference:m.reference}),sections:c,footer:y,filename:`tiewthai-demo-${o}-${m.reference}.html`.replace(/[^A-Za-z0-9._-]/g,"-")}}const l=o=>o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function k(o,t,p){const e=o.sections.map(n=>`<section><h2>${l(n.heading)}</h2><dl>${n.rows.map(a=>`<div><dt>${l(a.label)}</dt><dd>${l(a.value)}</dd></div>`).join("")}</dl></section>`).join("");return`<!doctype html>
<html lang="${t}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${l(o.title)} · ${l(o.reference)}</title>
<style>
body{font-family:system-ui,"Noto Sans Thai",sans-serif;line-height:1.6;max-width:42rem;margin:2rem auto;padding:0 1rem;color:#1d1d1f}
.notice{border:2px dashed #8a5a00;background:#fff7e6;padding:.75rem 1rem;border-radius:12px;font-weight:600}
.badge{display:inline-block;border:1px solid #6e6e73;border-radius:999px;padding:0 .6rem;font-size:.85rem}
h1{font-size:1.5rem;margin:.5rem 0}h2{font-size:1.1rem;margin:1.5rem 0 .5rem}
dl{margin:0}dl>div{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.25rem 1rem;border-bottom:1px solid #d2d2d7;padding:.4rem 0}
dt{color:#424245}dd{margin:0;font-weight:600;font-variant-numeric:tabular-nums}
footer{margin-top:2rem;font-size:.9rem;color:#424245}
</style>
</head>
<body>
<p><span class="badge">${l(p)}</span></p>
<p class="notice">${l(o.notice)}</p>
<h1>${l(o.title)}</h1>
<p>${l(o.reference)}</p>
${e}
<footer>${o.footer.map(n=>`<p>${l(n)}</p>`).join("")}</footer>
</body>
</html>
`}function A(o,t,p){const e=new Blob([k(o,t,p)],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(e),a=document.createElement("a");return a.href=n,a.download=o.filename,a.rel="noopener",a.style.display="none",document.body.appendChild(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(n),1e4),o.filename}export{A as a,x as b,_ as d};
