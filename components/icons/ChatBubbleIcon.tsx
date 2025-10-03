import React from 'react';

const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.125 1.125 0 01-1.59 0l-3.72-3.72A1.125 1.125 0 013.75 14.886V10.608c0-.97.616-1.813 1.5-2.097m15 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 8.511m17.25 0l-3.72-3.72a1.125 1.125 0 00-1.59 0L12 8.118l-3.375-3.375a1.125 1.125 0 00-1.59 0L3.75 8.511" />
  </svg>
);

export default ChatBubbleIcon;
