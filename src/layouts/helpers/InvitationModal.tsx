import React, { useEffect, useState } from 'react';

// 自定义 SVG 图标
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const QrCodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"/>
  </svg>
);

const WeChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.2 13.6c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2.7 0 1.2.6 1.2 1.2 0 .6-.5 1.2-1.2 1.2zm5.5 0c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2.7 0 1.2.6 1.2 1.2 0 .6-.5 1.2-1.2 1.2z"/>
    <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm6.6-4.8c-1.1.8-2.5 1.3-4 1.3-1.4 0-2.7-.4-3.8-1.1l-.4-.3-1.3.3.4-1.2-.2-.4c-1.1-1.6-1.7-3.6-1.7-5.6 0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.1-.8 4-2.2 5.5l.3 1.4-1.5-.5z"/>
  </svg>
);

// 模块级变量存储函数引用
let globalOpenModal: (() => void) | null = null;
let globalAuthModal: ((trigger: Element) => void) | null = null;

const InvitationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 打开modal
  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // 关闭modal
  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  // 处理遮罩层点击
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // 处理ESC键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // 暴露全局函数
  useEffect(() => {
    // 挂载到window对象
    (window as any).openInvitationModal = openModal;
    (window as any).closeInvitationModal = closeModal;
    
    // 设置模块级引用
    globalOpenModal = openModal;
    globalAuthModal = authModal;

    return () => {
      // 清理window对象
      delete (window as any).openInvitationModal;
      delete (window as any).closeInvitationModal;
      
      // 清理模块级引用
      globalOpenModal = null;
      globalAuthModal = null;
    };
  }, []);

  // 外部触发器绑定
  useEffect(() => {
    const invitationModalTriggers = document.querySelectorAll("[data-invitation-trigger]");
    
    invitationModalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", openModal);
    });

    return () => {
      invitationModalTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", openModal);
      });
    };
  }, []);

  // 认证模态触发器绑定
  useEffect(() => {
    const modalAuthTriggers = document.querySelectorAll("[modal-auth-trigger]");
    
    modalAuthTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => authModal(trigger));
    });
    
    return () => {
      modalAuthTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", () => authModal(trigger));
      });
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      id="invitationModal" 
      style={{ zIndex: 100 }} 
      className="fixed inset-0 transition-all duration-300"
    >
      {/* 遮罩层 */}
      <div 
        id="invitationModalOverlay" 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleOverlayClick}
      />

      <div className="relative h-full flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-2xl max-h-[95vh] rounded-xl overflow-hidden shadow-2xl flex flex-col bg-white transform transition-all duration-300 scale-95 animate-scaleIn">
          {/* 顶部标题栏 */}
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 py-3 sm:py-5 px-4 sm:px-6 text-center relative flex-shrink-0">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-amber-50 tracking-wider font-serif">
              来自诗和远方的邀请函
            </h2>
            <button 
              onClick={closeModal}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-amber-100 hover:text-white transition-colors p-1 transform hover:scale-110 duration-200"
              aria-label="关闭"
            >
              <CloseIcon />
            </button>
          </div>
          
          {/* 主要内容 */}
          <div className="bg-[#f9f7f0] flex-1 overflow-y-auto border-l-4 sm:border-l-8 border-r-4 sm:border-r-8 border-amber-800/20">
            <div className="p-4 sm:p-6 md:p-8 relative">
              {/* 背景纹理 */}
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiM4YjQ1MTMiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')]"></div>
              
              <div className="relative z-10 space-y-3 sm:space-y-5 text-amber-900 font-serif">
                <p className="text-lg sm:text-xl font-bold">亲爱的朋友：</p>
                
                <p className="text-base sm:text-lg">见字如晤。</p>
                
                <p className="text-sm sm:text-base leading-relaxed">我们是一群从顶尖学府走出的追光者，怀揣着对教育的赤诚与对文化的敬畏，踏浪而来。</p>
                
                <p className="text-sm sm:text-base leading-relaxed">我们打造 "山软华文"文化品牌，就是希望能让每一枚汉字都跳出屏幕的禁锢，让每一组词语都绽放时代的光彩，让每一阕诗词都在代码的土壤里，长成更本真的模样。而这一切，我们希望有你的参与。</p>
                
                <div className="h-4 sm:h-8"></div>
                
                {/* 突出显示部分 */}
                <div className="bg-gradient-to-r from-amber-800/5 to-amber-900/5 p-3 sm:p-6 border-l-4 border-amber-800 text-center shadow-inner rounded-lg">
                  <p className="text-base sm:text-xl font-bold mb-2 leading-tight">现在，诚挚邀请你微信搜索、关注 "山软华文" 服务号并后台私信</p>
                  <p className="text-sm sm:text-lg font-semibold leading-tight text-amber-800">——前 2000 名用户将免费获得股东帐号，即刻加入 "朝歌华文" 服务圈！</p>
                </div>
                
                <div className="h-4 sm:h-8"></div>
                
                <p className="text-sm sm:text-base leading-relaxed">这不仅是一场穿越古今的至尊文化体验，更是一次与千年文脉共舞的机遇 —— 在这里，传统与未来撞出星火，每一次阅读都是与先贤的对话，每一次书写都是为文明续上新的注脚。</p>
                
                <p className="text-sm sm:text-base leading-relaxed">别等了，让我们一起，让华文在数字时代，活得热气腾腾！</p>
                
                {/* 二维码区域 */}
                <div className="flex justify-center my-4 sm:my-6">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-lg border border-amber-200 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-gray-100 border-2 border-dashed rounded-xl w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center mb-2 sm:mb-3">
                      <div className="scale-50 sm:scale-75 md:scale-100 animate-pulse">
                        <img className='width-[100%] height-[100%] object-cover' src="/public/images/qrcode.jpg" alt="二维码" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-700 font-medium">微信扫码关注 "山软华文"</p>
                  </div>
                </div>
                
                {/* 签名 */}
                <div className="text-right mt-6 sm:mt-8">
                  <p className="text-lg sm:text-xl font-bold italic text-amber-800">山软华文团队</p>
                  <p className="text-sm sm:text-lg text-amber-700">2025年7月20日</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 导出的函数实现
export const openInvitation = () => {
  // 优先使用模块级引用
  if (globalOpenModal) {
    globalOpenModal();
    return;
  }
  
  // 回退到window对象上的引用
  if (typeof window !== 'undefined' && (window as any).openInvitationModal) {
    (window as any).openInvitationModal();
    return;
  }
  
  // 如果都没有，打印警告
  console.warn("openInvitationModal function is not available");
};

export const authModal = (trigger: Element) => {
  // 优先使用模块级引用
  if (globalAuthModal) {
    globalAuthModal(trigger);
    return;
  }
  
  // 回退逻辑
  const href = trigger.getAttribute("href");
  const PUBLIC_PATHS = [
    '/', '/login', '/register', '/404', '/500', '/public', '/favicon.svg', '/robots.txt'
  ];
  
  if (href) {
    const isPublicPath = PUBLIC_PATHS.some(p => 
      href === p || href.startsWith(p + '/')
    );
    
    if (!isPublicPath && !document.cookie.includes('token=')) {
      if (globalOpenModal) {
    globalOpenModal();
    return;
  }
  
  // 回退到window对象上的引用
  if (typeof window !== 'undefined' && (window as any).openInvitationModal) {
    (window as any).openInvitationModal();
    return;
  }
  
  // 如果都没有，打印警告
  console.warn("openInvitationModal function is not available");
    } else {
      window.location.href = href;
    }
  }
};

export default InvitationModal;