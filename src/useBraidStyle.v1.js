import { css } from 'emotion';

const calculateTypeOffset = correctionRatio => fontSize => lh => {
  const lhRatio = lh / fontSize;
  return (lhRatio - 1) / 2 + correctionRatio;
};

export default ({
  correctionRatio = 0.12,
  capHeightRatio = 0.6,
  gridHeight = 8,
  fontSize = 16,
  measure = 999,
  leading = 0,
  flow = 0
} = {}) => {
  // calculate actual size
  const capSize = capHeightRatio * fontSize;

  // type in grid lines
  const typeHeight = Math.ceil(capSize / gridHeight) * gridHeight;

  // leading height in baseline units
  const leadingGridHeight = Math.round(leading) * gridHeight;

  // line height
  const lineHeight = typeHeight + leadingGridHeight;

  // flow
  const flowHeight = flow * gridHeight;

  // negative space
  const negativeSpace = lineHeight - typeHeight;

  // type offset
  const typeOffset = calculateTypeOffset(correctionRatio)(fontSize)(lineHeight);

  // height correction
  const heightCorrection = negativeSpace - (negativeSpace % gridHeight);

  // add 1px space
  const preventCollapse = 1;

  return css`
    display: block;
    max-width: ${measure}ch;
    position: relative;
    font-family: 'MarkOT';
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
    transform: translateY(${typeOffset}em) translateX(-0.08em);
    padding-top: ${preventCollapse}px;
    margin-bottom: ${flowHeight}px;
    &:before {
      content: '';
      margin-top: ${-(heightCorrection + preventCollapse)}px;
      display: block;
      height: 0;
    }
  `;
};