import { Range } from '../model/array/type/range';
import { segregate } from '../model/array/segregate';

interface Props {
  text: string;
  highlights: Range[];
  highlightClassName: string;
}

function TextHighlight(props: Props) {
  return (
    <>
      {segregate(props.highlights, props.text.length).map((group, index) => {
        if (index % 2 === 0) {
          return props.text.slice(group.start, group.end);
        }

        return (
          <span className={props.highlightClassName} key={index}>
            {props.text.slice(group.start, group.end)}
          </span>
        );
      })}
    </>
  );
}

export default TextHighlight;
