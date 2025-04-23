// pages/404.tsx
import dynamic from 'next/dynamic';

const Custom404 = dynamic(() => import('../components/404Content'), {
  ssr: false,
});

export default Custom404;
