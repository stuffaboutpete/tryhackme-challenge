import { SearchTermGroup } from '../model/search/type/search-term-group';
import TextHighlight from './text-highlight';

interface Props {
  header: string;
  noResultText: string;
  icon: string;
  results: Array<{
    displayName: string;
    link: string;
    searchTermGroups: SearchTermGroup[];
  }>
}

function SearchResultSection(props: Props) {
  return (
    <div>
      <h2>{props.header}</h2>
      {props.results.length > 0 && props.results.map((result, index) => (
        <li key={index}>
          <a href={result.link} className="dropdown-item">
            <i className={`fa fa-${props.icon} mr-2`}></i>
            <TextHighlight
              text={result.displayName}
              highlights={result.searchTermGroups}
              highlightClassName="text-info font-weight-bold"
            />
          </a>
          <hr className="divider" />
        </li>
      ))}
      {props.results.length === 0 && (
        <p>{props.noResultText}</p>
      )}
    </div>

  );
}

export default SearchResultSection;
