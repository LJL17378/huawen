import {setupInvitationModal} from '../layouts/helpers/InvitationModal.tsx';

// console.log('window',window)

// if (typeof window !== 'undefined') {
//         // 检查是否已初始化
//         if (!window.__invitationModalInitialized) {
//           // 定义全局函数
//           window.setupInvitationModal = window.setupInvitationModal || function() {};
//           window.openInvitationModal = window.openInvitationModal || function() {};
//           window.closeInvitationModal = window.closeInvitationModal || function() {};
          
//           // 执行初始化
//           try {
//             setupInvitationModal();
//             window.__invitationModalInitialized = true;
//           } catch (e) {
//             console.error('Failed to initialize invitation modal', e);
//           }
//         }
//       }