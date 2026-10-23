import { ShoeSizeFinderParams, ShoeSizeFinderResult } from '@universal-chatbot/shared';

export function findShoeSize(params: ShoeSizeFinderParams): ShoeSizeFinderResult {
  let cm = params.footLengthCm || 0;
  if (!cm && params.footLengthInches) {
    cm = params.footLengthInches * 2.54;
  }

  if (cm <= 0) {
    cm = 26.5; // Average default
  }

  // Conversion formulas
  // EU Size roughly: (cm + 1.5) * 1.5
  const eu = Math.round((cm + 1.5) * 1.5);
  // US Men: (cm / 2.54) * 3 - 22
  const us = Math.round(((cm / 2.54) * 3 - 22) * 2) / 2;
  const uk = Math.max(us - 0.5, 4);

  return {
    recommendedEuSize: eu,
    recommendedUsSize: us,
    recommendedUkSize: uk,
    footLengthCm: Number(cm.toFixed(1)),
    fitTips: 'For athletic or running shoes, we recommend selecting 0.5 size larger to allow natural foot expansion during movement.'
  };
}
