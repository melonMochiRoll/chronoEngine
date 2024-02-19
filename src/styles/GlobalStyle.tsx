import React from 'react';
import { Global, css } from '@emotion/react';
import PretendardBlack from 'Assets/fonts/pretendard/Pretendard-Black.subset.woff';
import PretendardBlack2 from 'Assets/fonts/pretendard/Pretendard-Black.subset.woff2';
import PretendardExtraBold from 'Assets/fonts/pretendard/Pretendard-ExtraBold.subset.woff';
import PretendardExtraBold2 from 'Assets/fonts/pretendard/Pretendard-ExtraBold.subset.woff2';
import PretendardBold from 'Assets/fonts/pretendard/Pretendard-Bold.subset.woff';
import PretendardBold2 from 'Assets/fonts/pretendard/Pretendard-Bold.subset.woff2';
import PretendardSemiBold from 'Assets/fonts/pretendard/Pretendard-SemiBold.subset.woff';
import PretendardSemiBold2 from 'Assets/fonts/pretendard/Pretendard-SemiBold.subset.woff2';
import PretendardMedium from 'Assets/fonts/pretendard/Pretendard-Medium.subset.woff';
import PretendardMedium2 from 'Assets/fonts/pretendard/Pretendard-Medium.subset.woff2';
import PretendardRegular from 'Assets/fonts/pretendard/Pretendard-Regular.subset.woff';
import PretendardRegular2 from 'Assets/fonts/pretendard/Pretendard-Regular.subset.woff2';
import PretendardLight from 'Assets/fonts/pretendard/Pretendard-Light.subset.woff';
import PretendardLight2 from 'Assets/fonts/pretendard/Pretendard-Light.subset.woff2';
import PretendardExtraLight from 'Assets/fonts/pretendard/Pretendard-ExtraLight.subset.woff';
import PretendardExtraLight2 from 'Assets/fonts/pretendard/Pretendard-ExtraLight.subset.woff2';
import PretendardThin from 'Assets/fonts/pretendard/Pretendard-Thin.subset.woff';
import PretendardThin2 from 'Assets/fonts/pretendard/Pretendard-Thin.subset.woff2';

const style = css`

  * {
    font-family: 'Pretendard';
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
	  font-display: swap;
    src:
      url(${PretendardBlack2}) format('woff2'),
      url(${PretendardBlack}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
	  font-display: swap;
    src:
      url(${PretendardExtraBold}) format('woff2'),
      url(${PretendardExtraBold2}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
	  font-display: swap;
    src:
      url(${PretendardBold2}) format('woff2'),
      url(${PretendardBold}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
	  font-display: swap;
    src:
      url(${PretendardSemiBold2}) format('woff2'),
      url(${PretendardSemiBold}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
	  font-display: swap;
    src:
      url(${PretendardMedium2}) format('woff2'),
      url(${PretendardMedium}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
	  font-display: swap;
    src:
      url(${PretendardRegular2}) format('woff2'),
      url(${PretendardRegular}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
	  font-display: swap;
    src:
      url(${PretendardLight2}) format('woff2'),
      url(${PretendardLight}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
	  font-display: swap;
    src:
      url(${PretendardExtraLight2}) format('woff2'),
      url(${PretendardExtraLight}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
	  font-display: swap;
    src:
      url(${PretendardThin2}) format('woff2'),
      url(${PretendardThin}) format('woff');
  }
`

export const GlobalStyle = () => <Global styles={style} />