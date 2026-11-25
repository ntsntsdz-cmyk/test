(function(){var D=document,B=D.body,U=B.dataset.unit,K="speakout_b2_state_"+U,W="speakout_b2_wordlist",N="speakout_b2_name";
function g(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}}function p(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var S=Object.assign({ans:{},text:{},checked:{},score:{},meta:{}},g(K,{}));
var $=function(s,r){return(r||D).querySelector(s)},$$=function(s,r){return[].slice.call((r||D).querySelectorAll(s))};
function h(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function norm(s){return String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[.,!?;:]/g,"").replace(/\s+/g," ").trim()}
var main=$("#lesson"),wrap=h("div","wrap"),side=h("aside","side"),card=h("div","main");B.insertBefore(wrap,main);wrap.append(side,card);card.append(main);
side.innerHTML='<a href="index.html">← Main page</a><h1></h1><div class="nm"><label>YOUR NAME</label><input id="nm" placeholder="Type full name"><div class="pr"><b id="pc">0%</b><i><u id="pb"></u></i></div><small id="sv"></small></div><button id="wl"></button><nav id="nv"></nav>';
$("h1",side).textContent=B.dataset.title;var nm=$("#nm");nm.value=g(N,"");nm.oninput=function(){p(N,nm.value)};
var mb=h("button","","☰");mb.id="menu";mb.setAttribute("aria-label","Menu");mb.onclick=function(){side.classList.toggle("open")};B.append(mb);
$$("section",main).forEach(function(s,i){var hd=h("div","sh");hd.append(h("h2","",s.dataset.title));if(s.dataset.pages)hd.append(h("span","pg","Pages "+s.dataset.pages));s.prepend(hd);var a=h("a");a.href="#"+s.id;a.append(h("span","",i+1),s.dataset.title);a.onclick=function(){side.classList.remove("open")};$("#nv").append(a)});
var CAT={gap:["Fill the gaps","c1"],choice:["Choose","c1"],speaking:["Speak","c4"],reading:["Read","c3"]},ex=$$(".ex",main),WL=g(W,[]);
function save(){var c=0,t=0,o=0,a=0;ex.forEach(function(e){var y=e.dataset.type;if(y==="gap"||y==="choice"){t++;if(S.checked[e.id])c++}else if(y==="speaking"){t++;if(S.text[e.id])c++}});for(var k in S.score){o+=S.score[k][0];a+=S.score[k][1]}
var pc=t?Math.round(c/t*100):0;S.meta={pct:pc,score:a?Math.round(o/a*100):0,ts:Date.now()};p(K,S);$("#pc").textContent=pc+"%";$("#pb").style.width=pc+"%";$("#sv").textContent="Saved";$("#wl").textContent="📖 My words ("+WL.length+")"}
function check(e){var a=0,o=0;$$(".item",e).forEach(function(it){var ok=true;$$(".gf",it).forEach(function(f){var r=f.dataset.a.split("|").map(norm).indexOf(norm(f.value))>-1;f.classList.toggle("ok",r);f.classList.toggle("no",!r);a++;if(r)o++;ok=ok&&r});
var m=$(".mk",it)||it.appendChild(h("span","mk"));m.textContent=ok?"✓":"✗";m.className="mk "+(ok?"g":"r");if(it.dataset.why&&!$(".why",it)){var b=h("button","lk wb","Why?"),w=h("div","why",it.dataset.why);w.hidden=true;b.onclick=function(){w.hidden=!w.hidden};it.append(b,w)}});
$(".sc",e).textContent=o+" / "+a+" correct";S.checked[e.id]=1;S.score[e.id]=[o,a];save()}
ex.forEach(function(e,i){var y=e.dataset.type,c=CAT[y]||["Task","c1"],hd=h("div","eh"),ins=$(".instr",e);e.id="e"+i;hd.append(h("span","cat "+c[1],c[0]));if(e.dataset.number)hd.append(h("span","num",e.dataset.number));if(ins)hd.append(ins);if(y==="reading")hd.append(h("span","hint","Tap a word or phrase"));e.prepend(hd);
$$(".uselang",e).forEach(function(u){u.dataset.words.split("|").forEach(function(w){u.append(h("span","",w)," ")})});
if(y==="gap"||y==="choice"){$$(".gap",e).forEach(function(q,j){var o=q.dataset.o,f,key=i+"_"+j;if(o){f=h("select");f.append(new Option("Choose",""));o.split("|").forEach(function(x){f.append(new Option(x,x))})}else{f=h("input");f.autocomplete="off"}f.className="gf";f.dataset.a=q.dataset.a;f.setAttribute("aria-label","answer "+(j+1));
if(S.ans[key]!=null)f.value=S.ans[key];f.oninput=f.onchange=function(){S.ans[key]=f.value;f.classList.remove("ok","no");save()};q.replaceWith(f)});
$$(".wordbox span",e).forEach(function(c){c.tabIndex=0;c.setAttribute("role","button");var u=function(){var fs=$$(".gf",e),f=fs.filter(function(x){return x===D.activeElement})[0]||fs.filter(function(x){return!x.value})[0];if(f){f.value=c.textContent;f.dispatchEvent(new Event("input"));c.classList.add("used")}};c.onclick=u;c.onkeydown=function(k){if(k.key==="Enter"||k.key===" "){k.preventDefault();u()}}});
$$(".item",e).forEach(function(it){if(it.dataset.hint){var b=h("button","lk","Hint"),w=h("span","why hn",it.dataset.hint);w.hidden=true;b.onclick=function(){w.hidden=!w.hidden};it.append(" ",b,w)}});
var cl=h("div","ctl"),ck=h("button","pr1","Check answers"),sa=h("button","","Show answers"),rs=h("button","","Reset"),sc=h("span","sc");sc.setAttribute("aria-live","polite");ck.onclick=function(){check(e)};
sa.onclick=function(){$$(".gf",e).forEach(function(f){f.value=f.dataset.a.split("|")[0];f.dispatchEvent(new Event("input"))})};
rs.onclick=function(){$$(".gf",e).forEach(function(f){f.value="";f.dispatchEvent(new Event("input"))});$$(".mk,.wb,.why:not(.hn)",e).forEach(function(x){x.remove()});$$(".wordbox .used",e).forEach(function(x){x.classList.remove("used")});delete S.checked[e.id];delete S.score[e.id];sc.textContent="";save()};cl.append(ck,sa,rs,sc);e.append(cl)}
if(y==="speaking"){var ta=h("textarea","notes");ta.placeholder="My notes";ta.value=S.text[e.id]||"";ta.oninput=function(){S.text[e.id]=ta.value;save()};e.append(ta)}});
var DM={},pop=h("div","pop"),cur,from;pop.hidden=true;pop.setAttribute("role","dialog");pop.setAttribute("aria-label","Dictionary");B.append(pop);
function say(w,r){try{var u=new SpeechSynthesisUtterance(w);u.lang="en-GB";u.rate=r;var v=speechSynthesis.getVoices().filter(function(x){return x.lang==="en-GB"})[0];if(v)u.voice=v;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function close(){pop.hidden=true;if(from)from.focus()}
function open(el){var a=DM[el.dataset.k];if(!a)return;var w=a.dataset.w,q=function(s){return $(s,a)},t=h("div","pt"),bs=h("div","bs");from=el;pop.innerHTML="";
[["1×",1],["0.75×",.75]].forEach(function(r){var b=h("button","",r[0]);b.setAttribute("aria-label","Play at "+r[0]);b.onclick=function(){say(w,r[1])};bs.append(b)});var x=h("button","","✕");x.setAttribute("aria-label","Close");x.onclick=close;bs.append(x);t.append(h("h3","",w),bs);
var ip=h("div","ipa");ip.innerHTML=q(".ipa")?q(".ipa").innerHTML:"";var pl=h("div","pl");pl.append(h("span","",q(".pos")?q(".pos").textContent:""),h("span","",a.dataset.level||""));
var d=h("div","",q(".def")?q(".def").textContent:""),e2=h("div","ex2");e2.innerHTML=q(".ex")?q(".ex").innerHTML:"";pop.append(t,ip,pl,d,e2);
if(q(".tip")&&q(".tip").textContent)pop.append(h("div","tipb",q(".tip").textContent));
var ac=h("div","acts"),sv=h("button"),mo=h("button","","More ▾"),mr=h("div","mr");mr.hidden=true;
var on=function(){return WL.some(function(z){return z.word===w})},lab=function(){sv.textContent=on()?"✓ Saved":"+ Save to my words"};lab();
sv.onclick=function(){if(on())WL=WL.filter(function(z){return z.word!==w});else WL.push({word:w,ipa:ip.textContent,pos:pl.firstChild.textContent,meaning:d.textContent,example:e2.textContent,unit:U});p(W,WL);lab();save()};
mo.onclick=function(){mr.hidden=!mr.hidden;mo.textContent=mr.hidden?"More ▾":"Less ▴"};var m=q(".more");
if(m){if(m.querySelector(".alt")){mr.append(h("h5","","Other meanings"));var al=h("div");al.innerHTML=m.querySelector(".alt").innerHTML;mr.append(al)}
[[".combos","Common combinations",""],[".similar","Similar","s"]].forEach(function(z){var n=m.querySelector(z[0]);if(n){mr.append(h("h5","",z[1]));var cs=h("div","chips "+z[2]);n.textContent.split("|").forEach(function(c){cs.append(h("span","",c.trim()))});mr.append(cs)}})}else mo.hidden=true;
ac.append(sv,mo);pop.append(ac,mr);pop.hidden=false;
if(innerWidth>900){var r=el.getBoundingClientRect();pop.style.top=(scrollY+r.bottom+10)+"px";pop.style.left=Math.max(12,Math.min(innerWidth-pop.offsetWidth-12,r.left+scrollX-20))+"px"}sv.focus()}
function mark(){var ks=Object.keys(DM).sort(function(a,b){return b.length-a.length});if(!ks.length)return;var re=new RegExp("\\b("+ks.map(function(k){return k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("|")+")\\b","gi");
$$(".card p,.item,.prompt,li",main).forEach(function(el){var tw=D.createTreeWalker(el,NodeFilter.SHOW_TEXT),ns=[],n;while(n=tw.nextNode())ns.push(n);ns.forEach(function(n){if(n.parentNode.closest(".dw,.dp,button,select,input,textarea,.why"))return;var s=n.nodeValue;re.lastIndex=0;if(!re.test(s))return;re.lastIndex=0;var f=D.createDocumentFragment(),i=0,m;
while(m=re.exec(s)){f.append(s.slice(i,m.index));var sp=h("span",m[0].indexOf(" ")>-1?"dp":"dw",m[0]);sp.dataset.k=m[0].toLowerCase();sp.tabIndex=0;sp.setAttribute("role","button");f.append(sp);i=m.index+m[0].length}f.append(s.slice(i));n.replaceWith(f)})})}
main.addEventListener("click",function(e){var t=e.target.closest(".dw,.dp");if(t)open(t)});main.addEventListener("keydown",function(e){var t=e.target.closest&&e.target.closest(".dw,.dp");if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();open(t)}});
D.addEventListener("click",function(e){if(!pop.hidden&&!pop.contains(e.target)&&!e.target.closest(".dw,.dp"))pop.hidden=true});D.addEventListener("keydown",function(e){if(e.key==="Escape"&&!pop.hidden)close()});
fetch(U+"-dict.html").then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){var d=new DOMParser().parseFromString(t,"text/html");$$("article",d).forEach(function(a){var w=a.dataset.w;if(!w)return;DM[w.toLowerCase()]=a;(a.dataset.forms||"").split("|").forEach(function(f){if(f.trim())DM[f.trim().toLowerCase()]=a})});mark()}).catch(function(){});
save()})();
/* END OF FILE */
