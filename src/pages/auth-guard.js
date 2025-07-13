// 通用前端路由守卫，只需在需要鉴权的页面顶部引入本文件即可
(function() {
  // 允许匿名访问的路径
  const PUBLIC_PATHS = [
    '/', '/login', '/register', '/404', '/500', '/public', '/favicon.svg', '/robots.txt'
  ];
  const path = window.location.pathname;
  if (!PUBLIC_PATHS.some(p => path === p || path.startsWith(p + '/'))) {
    console.log(document.cookie)
    if (!document.cookie.includes('token=')) {
      window.location.href = '/login';
    }
  }
})();
