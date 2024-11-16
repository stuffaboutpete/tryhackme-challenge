interface Props {
  hotels?: Array<{
    _id: string;
    hotel_name: string;
  }>;
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
              {props.hotels && props.hotels.length > 0 && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <h2>Hotels</h2>
                  {props.hotels.length ? props.hotels.map((hotel, index) => (
                    <li key={index}>
                      <a href={`/hotels/${hotel._id}`} className="dropdown-item">
                        <i className="fa fa-building mr-2"></i>
                        {hotel.hotel_name}
                      </a>
                      <hr className="divider" />
                    </li>
                  )) : <p>No hotels matched</p>}
                  <h2>Countries</h2>
                  <p>No countries matched</p>
                  <h2>Cities</h2>
                  <p>No cities matched</p>
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
