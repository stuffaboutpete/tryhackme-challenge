import { Range } from './type/range';

type T = (ranges: Range[], fullLength: number) => Range[];

export const segregate: T = (ranges, fullLength) => {
  const outputs: Range[] = [];

  outputs.push({ start: 0, end: ranges[0].start });

  for (let i = 0; i < ranges.length; i++) {
    outputs.push({ start: ranges[i].start, end: ranges[i].end });

    if (i !== ranges.length - 1) {
      outputs.push({ start: ranges[i].end, end: ranges[i + 1].start });
    } else if (fullLength !== ranges[i].end) {
      outputs.push({ start: ranges[i].end, end: fullLength });
    }
  }

  return outputs;
};
