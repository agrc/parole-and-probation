import React from 'react';
import { UserData } from 'react-oidc';
import { Button, ButtonGroup, FormGroup, Label, Input, Container, Col } from 'reactstrap'
import { debounce } from 'lodash';
import Downshift from 'downshift';
import Helpers from '../../../Helpers';

import './FilterOffender.css';

const type = 'UPDATE_OFFENDER';

export default function FilterOffender(props) {
  const publish = (selectedItem, field) => {
    console.log(`Downshift:onChange ${selectedItem}`);

    props.update({
      type: type,
      meta: field,
      payload: selectedItem
    });
  };

  return (
    <Container fluid className="filter-offender">
      <form autocomplete="off" autoComplete="off">
      <Col>
        <FormGroup>
          <Label>Name</Label>
          <Downshift itemToString={item => (item ? item : '')}
            onChange={selectedItem => publish(selectedItem, 'name')}
            inputValue={props.downshift.offenderName}
            selectedItem={props.criteria.name}
            onStateChange={(changes, helpers) => {
              if (changes.hasOwnProperty('inputValue')) {
                props.update({
                  type,
                  meta: {
                    downshift: true,
                    field: 'OFFENDER_NAME'
                  },
                  payload: changes.inputValue
                });

                if (changes.inputValue.trim() === '') {
                  helpers.clearSelection();
                  helpers.closeMenu();
                }
              }
            }}
          >
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
                  <Input {...getInputProps({
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
                    },
                    type: 'text'
                  })} />
                  {!isOpen ? null : (
                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                      <ul className="downshift__matches">
                        <FetchItems
                          field="name"
                          filter={props.currentFilter}
                          searchValue={inputValue}
                          onLoaded={({ data }) => {
                            console.log('Downshift:onLoaded', data);
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
            onChange={selectedItem => publish(selectedItem, 'number')}
            inputValue={props.downshift.offenderNumber}
              selectedItem={props.criteria.number}
            onStateChange={(changes, helpers) => {
              if (changes.hasOwnProperty('inputValue')) {
                props.update({
                  type,
                  meta: {
                    downshift: true,
                    field: 'OFFENDER_NUMBER'
                  },
                  payload: changes.inputValue
                });

                if (changes.inputValue === '') {
                  helpers.clearSelection();
                  helpers.closeMenu();
                }
              }
            }}>
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
                  <Input {...getInputProps({
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
                    },
                    type: 'number'
                  })} />
                  {!isOpen ? null : (
                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                      <ul className="downshift__matches">
                        <FetchItems
                          field="number"
                          filter={props.currentFilter}
                          searchValue={inputValue}
                          onLoaded={({ data }) => {
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
            onChange={selectedItem => publish(selectedItem, 'tel')}
            inputValue={props.downshift.offenderTelephone}
              selectedItem={props.criteria.tel}
              onStateChange={(changes, helpers) => {
                if (changes.hasOwnProperty('inputValue')) {
                  props.update({
                    type,
                    meta: {
                      downshift: true,
                      field: 'OFFENDER_TEL'
                    },
                    payload: changes.inputValue
                  });

                  if (changes.inputValue === '') {
                    helpers.clearSelection();
                    helpers.closeMenu();
                  }
                }
              }}>
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
                  <Input {...getInputProps({
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
                    },
                    type: 'tel'
                  })} />
                  {!isOpen ? null : (
                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                      <ul className="downshift__matches">
                        <FetchItems
                          field="phone"
                          filter={props.currentFilter}
                          searchValue={inputValue}
                          onLoaded={({ data }) => {
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
            onChange={selectedItem => publish(selectedItem, 'employer')}
            inputValue={props.downshift.offenderEmployer}
              selectedItem={props.criteria.employer}
              onStateChange={(changes, helpers) => {
                if (changes.hasOwnProperty('inputValue')) {
                  props.update({
                    type,
                    meta: {
                      downshift: true,
                      field: 'OFFENDER_EMPLOYER'
                    },
                    payload: changes.inputValue
                  });

                  if (changes.inputValue === '') {
                    helpers.clearSelection();
                    helpers.closeMenu();
                  }
                }
              }}>
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
                  <Input {...getInputProps({
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
                    },
                    type: 'text'
                  })} />
                  {!isOpen ? null : (
                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                      <ul className="downshift__matches">
                        <FetchItems
                          field="employer"
                          filter={props.currentFilter}
                          searchValue={inputValue}
                          onLoaded={({ data }) => {
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
      </form>
    </Container>
  )
};

class FetchItems extends React.Component {
  static contextType = UserData;
  static initialState = { loading: false, error: null, data: [] };
  requestId = 0;
  state = FetchItems.initialState;
  mounted = false;

  reset(overrides) {
    this.setState({ ...FetchItems.initialState, ...overrides });
  }

  scrub(string, property) {
    // removes the current applied filter when it's being edited
    let regex;

    if (property === 'name') {
      regex = /offender='.*'( AND )?/gm;
    } else if (property === 'number') {
      regex = /offender_id=\d+( AND )?/gm;
    } else if (property === 'phone') {
      regex = /offender_phone='.*'( AND )?/gm;
    } else if (property === 'employer') {
      regex = /employer='.*'( AND )?/gm;
    }

    string = string.replace(regex, '');

    if (string.endsWith(' AND')) {
      string = string.substring(0, string.length - 5);
    }

    string = string.trim();

    return string;
  }

  fetch = debounce(
    async () => {
      if (!this.mounted || this.props.searchValue.trim().length < 1) {
        return;
      }

      this.requestId++;

      let data;

      try {
        console.log('FetchItems:fetch fetching data');

        const query = Helpers.toQueryString({
          filters: this.scrub(this.props.filter, this.props.field),
          requestId: this.requestId,
          limit: 25
        });

        const baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${process.env.REACT_APP_BASENAME}`;
        const url = `${baseUrl}/api/data/${this.props.field}/${this.props.searchValue}?${query}`;

        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.context.user.access_token}`
          }
        });

        data = await response.json();

        if (this.mounted && data.requestId === this.requestId) {
          console.log(`FetchItems:fetch calling onLoaded with ${data.data.length} items`);

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
