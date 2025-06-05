
const AuthStyles = () => (
  <style>{`
    @keyframes smoothSlideIn {
      from { 
        transform: translateY(20px) scale(0.98); 
        opacity: 0; 
      }
      to { 
        transform: translateY(0) scale(1); 
        opacity: 1; 
      }
    }

    @keyframes smoothSlideOut {
      from { 
        transform: translateY(0) scale(1); 
        opacity: 1; 
      }
      to { 
        transform: translateY(-20px) scale(0.98); 
        opacity: 0; 
      }
    }

    @keyframes logoBreathing {
      0%, 100% { 
        transform: scale(1); 
        opacity: 1;
      }
      50% { 
        transform: scale(1.05); 
        opacity: 0.9;
      }
    }

    @keyframes backgroundFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .auth-container {
      font-family: 'Georgia', serif;
      opacity: 0;
      animation: backgroundFade 1.2s ease forwards;
      transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
      background-color: #1a1410;
    }

    .auth-container.visible {
      opacity: 1;
    }

    .auth-container.exiting {
      opacity: 0;
      transform: scale(0.98);
    }

    .form-box {
      animation: smoothSlideIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .form-box.exiting {
      animation: smoothSlideOut 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .logo-breathing {
      animation: logoBreathing 3s ease-in-out infinite;
    }

    .tab-button {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .tab-button.active {
      background: #7d4f1a;
      color: white;
      font-weight: bold;
    }

    .back-button {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .back-button:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}</style>
);

export default AuthStyles;
