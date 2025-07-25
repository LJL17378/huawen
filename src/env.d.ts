/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/// <reference types="astro/client" />

interface Window {
  // 邀请函模态框
  openInvitationModal: () => void;
  closeInvitationModal: () => void;
  setupInvitationModal: () => void;
  openSearch: () => void;
  openInvitation: () => void;
  authModal: (trigger: Element) => void;
  hasLogin: boolean;
  // 内部状态标识
  __invitationModalInitialized?: boolean;
}
