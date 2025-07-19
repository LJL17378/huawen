/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/// <reference types="astro/client" />

interface Window {
  // 邀请函模态框
  openInvitationModal: () => void;
  closeInvitationModal: () => void;
  setupInvitationModal: () => void;
  
  // 内部状态标识
  __invitationModalInitialized?: boolean;
}
