/* ============================================================
   내일종합관리 — 공용 헤더/푸터 주입 + 인터랙션
   사용: <body data-page="company"> ... <script src="assets/site.js"></script>
   ============================================================ */
(function(){
  var ARROW = '<svg class="ico" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.3"/></svg>';
  var CI = (window.__resources && window.__resources.ci) || 'assets/ci-transparent.png';
  var page = document.body.getAttribute('data-page') || 'home';

  var GNB = [
    { id:'company', label:'기업정보', href:'company.html', sub:[
      ['비전 및 경영철학','company.html'],
      ['인사말','greeting.html'],
      ['오시는 길','location.html']
    ]},
    { id:'business', label:'비즈니스', href:'management.html', sub:[
      ['건물종합관리','management.html'],
      ['드론청소','drone.html'],
      ['방역','disinfection.html']
    ]},
    { id:'notice', label:'공지사항', href:'notice.html' }
  ];

  /* ---------- Header ---------- */
  var gnbHtml = GNB.map(function(m){
    var cur = (m.id===page) ? ' current' : '';
    var subHtml = m.sub ? '<div class="submenu">'+m.sub.map(function(s){
      return '<a href="'+s[1]+'">'+s[0]+'</a>';
    }).join('')+'</div>' : '';
    return '<div class="gnb-item'+cur+'"><a href="'+m.href+'">'+m.label+'</a>'+subHtml+'</div>';
  }).join('');

  var header =
  '<header class="topnav"><div class="wrap">'+
    '<a href="index.html" class="brand"><img class="brand-logo" src="'+CI+'" alt="내일종합관리" /></a>'+
    '<nav class="gnb">'+gnbHtml+'</nav>'+
    '<div class="nav-right">'+
      '<a href="quote.html" class="btn btn-primary">무료 견적 및 문의'+ARROW+'</a>'+
      '<button class="hamb" aria-label="메뉴 열기" id="hambBtn"><span></span></button>'+
    '</div>'+
  '</div></header>';

  /* ---------- Mobile drawer ---------- */
  var drawerGroups = GNB.map(function(m){
    var subs = m.sub ? '<div class="md-sub">'+m.sub.map(function(s){return '<a href="'+s[1]+'">'+s[0]+'</a>';}).join('')+'</div>' : '';
    return '<div class="md-group"><a href="'+m.href+'">'+m.label+'</a>'+subs+'</div>';
  }).join('');
  var drawer =
  '<div class="m-drawer" id="mDrawer">'+
    '<div class="md-top"><a href="index.html" class="brand"><img class="brand-logo" src="'+CI+'" alt="내일종합관리" /></a>'+
      '<button class="md-close" id="mClose" aria-label="닫기">&times;</button></div>'+
    drawerGroups+
    '<div class="md-cta"><a href="quote.html" class="btn btn-primary">무료 견적 및 문의'+ARROW+'</a></div>'+
  '</div>';

  /* ---------- Footer ---------- */
  var footer =
  '<footer class="site-foot"><div class="wrap">'+
    '<div class="foot-grid foot-grid--info">'+
      '<div class="foot-brand">'+
        '<div class="name">내일종합관리</div>'+
      '</div>'+
      '<div class="foot-info">'+
        '<div class="fi-row fi-row--3">'+
          '<div class="fi"><b>대표전화</b>032-545-8740 / 010-3378-0078</div>'+
          '<div class="fi"><b>팩스</b>032-329-1638</div>'+
          '<div class="fi"><b>이메일</b>cs@naeilbiz.co.kr</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="foot-bottom">'+
      '<span>© 2026 ㈜내일종합관리 (NAEIL Total Management). All rights reserved.</span>'+
      '<span class="links"><a href="quote.html#consent">개인정보처리방침</a></span>'+
    '</div>'+
  '</div></footer>';

  /* ---------- Inject ---------- */
  var head = document.getElementById('site-header');
  if(head) head.innerHTML = header + drawer;
  var foot = document.getElementById('site-footer');
  if(foot) foot.innerHTML = footer;

  /* ---------- Drawer behaviour ---------- */
  var hamb = document.getElementById('hambBtn');
  var dr = document.getElementById('mDrawer');
  var cls = document.getElementById('mClose');
  if(hamb && dr){ hamb.addEventListener('click', function(){ dr.classList.add('open'); document.body.style.overflow='hidden'; }); }
  if(cls && dr){ cls.addEventListener('click', function(){ dr.classList.remove('open'); document.body.style.overflow=''; }); }
  if(dr){ dr.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ dr.classList.remove('open'); document.body.style.overflow=''; }); }); }
})();
