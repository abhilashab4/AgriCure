// // components/Chatbot.jsx
// import { useEffect } from 'react';
// import ChatIcon from '@mui/icons-material/Chat';
// import { Fab } from '@mui/material';

// const Chatbot = () => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
//     document.head.appendChild(script);
    
//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   return (
//     <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
//       <df-messenger
//         project-id="agricure-viaa"
//         agent-id="agricure-viaa"
//         language-code="en"
//       ></df-messenger>
//       <Fab color="primary" aria-label="chat">
//         <ChatIcon />
//       </Fab>
//     </div>
//   );
// };

// export default Chatbot;