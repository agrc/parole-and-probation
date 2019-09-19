import React from 'react';
import { Button, ButtonGroup, FormGroup, Label, Input, Container, Col } from 'reactstrap'
import { debounce } from 'lodash';
import Downshift from 'downshift';
import './FilterOffender.css';

const type = 'UPDATE_OFFENDER';

export default function FilterOffender(props) {
  const publish = (selectedItem, field) => {
    console.log(`Downshift:handleSelection ${selectedItem}`);

    props.update({
      type: type,
      meta: field,
      payload: selectedItem
    });
  };

  return (
    <Container fluid className="filter-offender">
      <Col>
        <FormGroup>
          <Label>Name</Label>
          <Downshift itemToString={item => (item ? item : '')}
            onChange={selectedItem => publish(selectedItem, 'name')}>
            {({
              closeMenu,
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              setHighlightedIndex,
              setItemCount,
            }) => {
              if (highlightedIndex === null) {
                highlightedIndex = 0;
              }
              return (
                <div>
                  <Input autoComplete="nope" {...getInputProps({
                    onBlur: closeMenu,
                    onKeyDown: event => {
                      switch (event.key) {
                        case 'Tab': {
                          event.preventDefault();
                          break
                        }
                        default:
                          break;
                      }
                    }
                  })} />
                  {!isOpen ? null : (
                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                      <ul className="downshift__matches">
                        <FetchItems
                          field="name"
                          searchValue={inputValue}
                          onLoaded={({ data }) => {
                            console.log(arguments);
                            if (data) {
                              setHighlightedIndex(data.length ? 0 : null)
                              setItemCount(data.length)
                            }
                          }}>
                          {({ loading, data, error }) => (
                            <>
                              {loading ? (
                                <li className='downshift__match-item'>loading...</li>
                              ) : error ? (
                                <li className='downshift__match-item'>error...</li>
                              ) : data.length ? (
                                data.map((item, index) => (
                                  <li {...getItemProps({
                                    key: item,
                                    index,
                                    item,
                                    className: 'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                  })}>
                                    {item}
                                  </li>
                                ))
                              ) : (
                                      <li className='downshift__match-item'>no results...</li>
                                    )}
                            </>
                          )}
                        </FetchItems>
                      </ul>
                    </div>
                  )}
                </div>
              )
            }}
          </Downshift>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>Offender Number</Label>
          <Downshift itemToString={item => (item ? item : '')}
            onChange={selectedItem => publish(selectedItem, 'number')}>
            {({
              closeMenu,
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              setHighlightedIndex,
              setItemCount,
            }) => {
              if (highlightedIndex === null) {
                highlightedIndex = 0;
              }
              return (
                <div>
                  <Input type="number" name="number" id="number" autoComplete="nope" {...getInputProps({
                    onBlur: closeMenu,
                    onKeyDown: event => {
                      switch (event.key) {
                        case 'Tab': {
                          event.preventDefault();
                          break
                        }
                        default:
                          break;
                      }
                    }
                  })} />
                  {!isOpen ? null : (
                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                      <ul className="downshift__matches">
                        <FetchItems
                          field="number"
                          searchValue={inputValue}
                          onLoaded={({ data }) => {
                            console.log(arguments);
                            if (data) {
                              setHighlightedIndex(data.length ? 0 : null)
                              setItemCount(data.length)
                            }
                          }}>
                          {({ loading, data, error }) => (
                            <>
                              {loading ? (
                                <li className='downshift__match-item'>loading...</li>
                              ) : error ? (
                                <li className='downshift__match-item'>error...</li>
                              ) : data.length ? (
                                data.map((item, index) => (
                                  <li {...getItemProps({
                                    key: item,
                                    index,
                                    item,
                                    className: 'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                  })}>
                                    {item}
                                  </li>
                                ))
                              ) : (
                                      <li className='downshift__match-item'>no results...</li>
                                    )}
                            </>
                          )}
                        </FetchItems>
                      </ul>
                    </div>
                  )}
                </div>
              )
            }}
          </Downshift>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>Gender</Label>
          <div className="text-center">
            <ButtonGroup>
              {['Male', 'Female'].map((gender, index) =>
                <Button
                  key={index}
                  size="sm"
                  color={props.criteria.gender === gender ? 'warning' : 'secondary'}
                  onClick={() => {
                    if (props.criteria.gender === gender) {
                      gender = '';
                    }

                    props.update({
                      type,
                      payload: gender,
                      meta: 'gender'
                    });
                  }}>
                  {gender}
                </Button>
              )}
            </ButtonGroup>
          </div>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>Phone</Label>
          <Downshift itemToString={item => (item ? item : '')}
            onChange={selectedItem => publish(selectedItem, 'tel')}>
            {({
              closeMenu,
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              setHighlightedIndex,
              setItemCount,
            }) => {
              if (highlightedIndex === null) {
                highlightedIndex = 0;
              }
              return (
                <div>
                  <Input type="tel" name="phone" id="phone" autoComplete="nope" {...getInputProps({
                    onBlur: closeMenu,
                    onKeyDown: event => {
                      switch (event.key) {
                        case 'Tab': {
                          event.preventDefault();
                          break
                        }
                        default:
                          break;
                      }
                    }
                  })} />
                  {!isOpen ? null : (
                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                      <ul className="downshift__matches">
                        <FetchItems
                          field="phone"
                          searchValue={inputValue}
                          onLoaded={({ data }) => {
                            console.log(arguments);
                            if (data) {
                              setHighlightedIndex(data.length ? 0 : null)
                              setItemCount(data.length)
                            }
                          }}>
                          {({ loading, data, error }) => (
                            <>
                              {loading ? (
                                <li className='downshift__match-item'>loading...</li>
                              ) : error ? (
                                <li className='downshift__match-item'>error...</li>
                              ) : data.length ? (
                                data.map((item, index) => (
                                  <li {...getItemProps({
                                    key: item,
                                    index,
                                    item,
                                    className: 'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                  })}>
                                    {item}
                                  </li>
                                ))
                              ) : (
                                      <li className='downshift__match-item'>no results...</li>
                                    )}
                            </>
                          )}
                        </FetchItems>
                      </ul>
                    </div>
                  )}
                </div>
              )
            }}
          </Downshift>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>Employer</Label>
          <Downshift itemToString={item => (item ? item : '')}
            onChange={selectedItem => publish(selectedItem, 'employer')}>
            {({
              closeMenu,
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              setHighlightedIndex,
              setItemCount,
            }) => {
              if (highlightedIndex === null) {
                highlightedIndex = 0;
              }
              return (
                <div>
                  <Input type="text" name="employer" id="employer" autoComplete="nope" {...getInputProps({
                    onBlur: closeMenu,
                    onKeyDown: event => {
                      switch (event.key) {
                        case 'Tab': {
                          event.preventDefault();
                          break
                        }
                        default:
                          break;
                      }
                    }
                  })} />
                  {!isOpen ? null : (
                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                      <ul className="downshift__matches">
                        <FetchItems
                          field="employer"
                          searchValue={inputValue}
                          onLoaded={({ data }) => {
                            console.log(arguments);
                            if (data) {
                              setHighlightedIndex(data.length ? 0 : null)
                              setItemCount(data.length)
                            }
                          }}>
                          {({ loading, data, error }) => (
                            <>
                              {loading ? (
                                <li className='downshift__match-item'>loading...</li>
                              ) : error ? (
                                <li className='downshift__match-item'>error...</li>
                              ) : data.length ? (
                                data.map((item, index) => (
                                  <li {...getItemProps({
                                    key: item,
                                    index,
                                    item,
                                    className: 'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                  })}>
                                    {item}
                                  </li>
                                ))
                              ) : (
                                      <li className='downshift__match-item'>no results...</li>
                                    )}
                            </>
                          )}
                        </FetchItems>
                      </ul>
                    </div>
                  )}
                </div>
              )
            }}
          </Downshift>

        </FormGroup>
      </Col>
    </Container>
  )
};

class FetchItems extends React.Component {
  static initialState = { loading: false, error: null, data: [] };
  requestId = 0;
  state = FetchItems.initialState;
  mounted = false;

  reset(overrides) {
    this.setState({ ...FetchItems.initialState, ...overrides });
  }

  fetch = debounce(
    async () => {
      if (!this.mounted || this.props.searchValue.length < 1) {
        return;
      }

      this.requestId++;

      let data;

      try {
        console.log('fetching data');

        const response = await fetch(`https://localhost:5001/api/data/${this.props.field}/${this.props.searchValue}?requestId=${this.requestId}&limit=25`, {
          method: 'GET',
          mode: 'cors'
        });

        console.log('reading content');
        data = await response.json();

        console.dir(data);

        if (this.mounted && data.requestId === this.requestId) {
          console.log(`calling loaded with ${data.data.length} items`);

          this.props.onLoaded({ data: data.data });
          this.setState({ loading: false, data: data.data });
        }
      } catch (error) {
        if (this.mounted && data.requestId === this.requestId) {
          this.props.onLoaded({ error });
          this.setState({ loading: false, error });
        }
      }
    }, 300)

  prepareFetch() {
    this.reset({ loading: true });
  }

  componentDidMount() {
    this.mounted = true;
    this.prepareFetch();
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.prepareFetch();
      this.fetch();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return this.props.children(this.state);
  }
}
