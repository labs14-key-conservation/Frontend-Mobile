import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function ChevronLeftBlack(props) {
  const chevron_left_black = `
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" ><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>`;
  const ChevronLeftBlack = () => (
    <SvgXml
      xml={chevron_left_black}
      width='25'
      height='25'
      fill='#000'
      {...props}
    />
  );

  return <ChevronLeftBlack />;
}