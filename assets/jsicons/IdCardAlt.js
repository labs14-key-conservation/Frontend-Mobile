import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function IdCardAlt(props) {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M512 64H368V32c0-17.7-14.3-32-32-32h-96c-17.7 0-32 14.3-32 32v32H64C28.7 64 0 92.7 0 128v320c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64zM256 48h64v64h-64V48zm272 400c0 8.8-7.2 16-16 16H399.2c.2-1.1.8-2.1.8-3.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 1.1.5 2.1.8 3.2H64c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16h144v48h160v-48h144c8.8 0 16 7.2 16 16v320zM288 224c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64z"/></svg>`;

  const IdCardAlt = () => (
    <SvgXml xml={xml} width="36" height="36" {...props} />
  );

  return <IdCardAlt />;
}
