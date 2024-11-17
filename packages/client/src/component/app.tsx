import { City } from '../model/entities/type/city';
import { Country } from '../model/entities/type/country';
import { Hotel } from '../model/entities/type/hotel';
import { SearchResult } from '../model/search/type/search-result';
import SearchResultSection from './search-result-section';

interface Props {
  hotels?: SearchResult<Hotel>[];
  countries?: SearchResult<Country>[];
  cities?: SearchResult<City>[];
  showClearButton: boolean;
  onSearch: (searchTerm: string) => void;
}

function App(props: Props) {
  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  onChange={event => props.onSearch(event.target.value)}
                />
                {props.showClearButton && (
                  <span className="left-pan">
                    <i className="fa fa-close"></i>
                  </span>
                )}
              </div>
              {(!!props.hotels?.length || !!props.countries?.length || !!props.cities?.length) && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <SearchResultSection
                    header="Hotels"
                    noResultText="No hotels matched"
                    icon="building"
                    results={(props.hotels || []).map(hotel => ({
                      displayName: hotel.entity.hotel_name,
                      link: `/hotels/${hotel.entity._id}`,
                      searchTermGroups: hotel.searchTermGroups
                    }))}
                  />
                  <SearchResultSection
                    header="Countries"
                    noResultText="No countries matched"
                    icon="globe"
                    results={(props.countries || []).map(country => ({
                      displayName: country.entity.country,
                      link: `/countries/${country.entity._id}`,
                      searchTermGroups: country.searchTermGroups
                    }))}
                  />
                  <SearchResultSection
                    header="Cities"
                    noResultText="No cities matched"
                    icon="map-marker"
                    results={(props.cities || []).map(city => ({
                      displayName: city.entity.name,
                      link: `/cities/${city.entity._id}`,
                      searchTermGroups: city.searchTermGroups
                    }))}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
