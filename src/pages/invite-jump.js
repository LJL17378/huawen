(function() {
  // 允许匿名访问的路径
  const PUBLIC_PATHS = [
    '/', '/login', '/register', '/404', '/500', '/public', '/favicon.svg', '/robots.txt'
  ];

  // 获取 URL 中的 to 参数并解码
  const urlParams = new URLSearchParams(window.location.search);
  const to = decodeURIComponent(urlParams.get('to'));

  // 获取当前路径
  const path = to;

  // 如果路径不需要鉴权
  if (PUBLIC_PATHS.some(p => path === p || path.startsWith(p + '/'))) {
    return;
  }

  // 如果没有 to 或者鉴权未通过，跳转到邀请函
  if (!document.cookie.includes('token=') || !to) {
    window.location.replace("/invitation");
  } else {
    // 如果有 to 参数，且鉴权通过，跳转到 to 指定的路径
    window.location.replace(to);
  }
})();