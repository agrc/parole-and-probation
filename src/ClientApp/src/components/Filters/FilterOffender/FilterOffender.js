import Downshift from 'downshift';
import * as React from 'react';
import { Button, ButtonGroup, Col, Container, FormGroup, Input, Label } from 'reactstrap';
import Helpers from '../../../Helpers';
import './FilterOffender.css';

const type = 'UPDATE_OFFENDER';

export default function FilterOffender(props) {
  const publish = (selectedItem, field) => {
    console.log(`Downshift:onChange ${selectedItem}`);

    props.update({
      type: type,
      meta: field,
      payload: selectedItem,
    });
  };

  return (
    <Container fluid className="filter-offender">
      <form autoComplete="off">
        <Col>
          <FormGroup>
            <Label>Name</Label>
            <Downshift
              itemToString={(item) => (item ? item : '')}
              onChange={(selectedItem) => publish(selectedItem, 'name')}
              inputValue={props.downshift.offenderName}
              selectedItem={props.criteria.name}
              onStateChange={(changes, helpers) => {
                if (changes.hasOwnProperty('inputValue')) {
                  props.update({
                    type,
                    meta: {
                      downshift: true,
                      field: 'OFFENDER_NAME',
                    },
                    payload: changes.inputValue,
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
                    <Input
                      {...getInputProps({
                        onBlur: closeMenu,
                        onKeyDown: (event) => {
                          switch (event.key) {
                            case 'Tab': {
                              event.preventDefault();
                              break;
                            }
                            default:
                              break;
                          }
                        },
                        type: 'text',
                      })}
                    />
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
                                setHighlightedIndex(data.length ? 0 : null);
                                setItemCount(data.length);
                              }
                            }}
                          >
                            {({ loading, data, error }) => (
                              <>
                                {loading ? (
                                  <li className="downshift__match-item">loading...</li>
                                ) : error ? (
                                  <li className="downshift__match-item">error...</li>
                                ) : data.length ? (
                                  data.map((item, index) => (
                                    <li
                                      {...getItemProps({
                                        key: item,
                                        index,
                                        item,
                                        className:
                                          'downshift__match-item' +
                                          (highlightedIndex === index ? ' downshift__match-item--selected' : ''),
                                      })}
                                    >
                                      {item}
                                    </li>
                                  ))
                                ) : (
                                  <li className="downshift__match-item">no results...</li>
                                )}
                              </>
                            )}
                          </FetchItems>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              }}
            </Downshift>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Offender Number</Label>
            <Downshift
              itemToString={(item) => (item ? item : '')}
              onChange={(selectedItem) => publish(selectedItem, 'number')}
              inputValue={props.downshift.offenderNumber}
              selectedItem={props.criteria.number}
              onStateChange={(changes, helpers) => {
                if (changes.hasOwnProperty('inputValue')) {
                  props.update({
                    type,
                    meta: {
                      downshift: true,
                      field: 'OFFENDER_NUMBER',
                    },
                    payload: changes.inputValue,
                  });

                  if (changes.inputValue === '') {
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
                    <Input
                      {...getInputProps({
                        onBlur: closeMenu,
                        onKeyDown: (event) => {
                          switch (event.key) {
                            case 'Tab': {
                              event.preventDefault();
                              break;
                            }
                            default:
                              break;
                          }
                        },
                        type: 'number',
                      })}
                    />
                    {!isOpen ? null : (
                      <div className="downshift__match-dropdown" {...getMenuProps()}>
                        <ul className="downshift__matches">
                          <FetchItems
                            field="number"
                            filter={props.currentFilter}
                            searchValue={inputValue}
                            onLoaded={({ data }) => {
                              if (data) {
                                setHighlightedIndex(data.length ? 0 : null);
                                setItemCount(data.length);
                              }
                            }}
                          >
                            {({ loading, data, error }) => (
                              <>
                                {loading ? (
                                  <li className="downshift__match-item">loading...</li>
                                ) : error ? (
                                  <li className="downshift__match-item">error...</li>
                                ) : data.length ? (
                                  data.map((item, index) => (
                                    <li
                                      {...getItemProps({
                                        key: item,
                                        index,
                                        item,
                                        className:
                                          'downshift__match-item' +
                                          (highlightedIndex === index ? ' downshift__match-item--selected' : ''),
                                      })}
                                    >
                                      {item}
                                    </li>
                                  ))
                                ) : (
                                  <li className="downshift__match-item">no results...</li>
                                )}
                              </>
                            )}
                          </FetchItems>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              }}
            </Downshift>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Gender</Label>
            <div className="text-center">
              <ButtonGroup>
                {['Male', 'Female'].map((gender, index) => (
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
                        meta: 'gender',
                      });
                    }}
                  >
                    {gender}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Phone</Label>
            <Downshift
              itemToString={(item) => (item ? item : '')}
              onChange={(selectedItem) => publish(selectedItem, 'tel')}
              inputValue={props.downshift.offenderTelephone}
              selectedItem={props.criteria.tel}
              onStateChange={(changes, helpers) => {
                if (changes.hasOwnProperty('inputValue')) {
                  props.update({
                    type,
                    meta: {
                      downshift: true,
                      field: 'OFFENDER_TEL',
                    },
                    payload: changes.inputValue,
                  });

                  if (changes.inputValue === '') {
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
                    <Input
                      {...getInputProps({
                        onBlur: closeMenu,
                        onKeyDown: (event) => {
                          switch (event.key) {
                            case 'Tab': {
                              event.preventDefault();
                              break;
                            }
                            default:
                              break;
                          }
                        },
                        type: 'tel',
                      })}
                    />
                    {!isOpen ? null : (
                      <div className="downshift__match-dropdown" {...getMenuProps()}>
                        <ul className="downshift__matches">
                          <FetchItems
                            field="phone"
                            filter={props.currentFilter}
                            searchValue={inputValue}
                            onLoaded={({ data }) => {
                              if (data) {
                                setHighlightedIndex(data.length ? 0 : null);
                                setItemCount(data.length);
                              }
                            }}
                          >
                            {({ loading, data, error }) => (
                              <>
                                {loading ? (
                                  <li className="downshift__match-item">loading...</li>
                                ) : error ? (
                                  <li className="downshift__match-item">error...</li>
                                ) : data.length ? (
                                  data.map((item, index) => (
                                    <li
                                      {...getItemProps({
                                        key: item,
                                        index,
                                        item,
                                        className:
                                          'downshift__match-item' +
                                          (highlightedIndex === index ? ' downshift__match-item--selected' : ''),
                                      })}
                                    >
                                      {item}
                                    </li>
                                  ))
                                ) : (
                                  <li className="downshift__match-item">no results...</li>
                                )}
                              </>
                            )}
                          </FetchItems>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              }}
            </Downshift>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Employer</Label>
            <Downshift
              itemToString={(item) => (item ? item : '')}
              onChange={(selectedItem) => publish(selectedItem, 'employer')}
              inputValue={props.downshift.offenderEmployer}
              selectedItem={props.criteria.employer}
              onStateChange={(changes, helpers) => {
                if (changes.hasOwnProperty('inputValue')) {
                  props.update({
                    type,
                    meta: {
                      downshift: true,
                      field: 'OFFENDER_EMPLOYER',
                    },
                    payload: changes.inputValue,
                  });

                  if (changes.inputValue === '') {
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
                    <Input
                      {...getInputProps({
                        onBlur: closeMenu,
                        onKeyDown: (event) => {
                          switch (event.key) {
                            case 'Tab': {
                              event.preventDefault();
                              break;
                            }
                            default:
                              break;
                          }
                        },
                        type: 'text',
                      })}
                    />
                    {!isOpen ? null : (
                      <div className="downshift__match-dropdown" {...getMenuProps()}>
                        <ul className="downshift__matches">
                          <FetchItems
                            field="employer"
                            filter={props.currentFilter}
                            searchValue={inputValue}
                            onLoaded={({ data }) => {
                              if (data) {
                                setHighlightedIndex(data.length ? 0 : null);
                                setItemCount(data.length);
                              }
                            }}
                          >
                            {({ loading, data, error }) => (
                              <>
                                {loading ? (
                                  <li className="downshift__match-item">loading...</li>
                                ) : error ? (
                                  <li className="downshift__match-item">error...</li>
                                ) : data.length ? (
                                  data.map((item, index) => (
                                    <li
                                      {...getItemProps({
                                        key: item,
                                        index,
                                        item,
                                        className:
                                          'downshift__match-item' +
                                          (highlightedIndex === index ? ' downshift__match-item--selected' : ''),
                                      })}
                                    >
                                      {item}
                                    </li>
                                  ))
                                ) : (
                                  <li className="downshift__match-item">no results...</li>
                                )}
                              </>
                            )}
                          </FetchItems>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              }}
            </Downshift>
          </FormGroup>
        </Col>
      </form>
    </Container>
  );
}
const scrub = (string, property) => {
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

  let scrubbed = string.replace(regex, '');

  if (scrubbed.endsWith(' AND')) {
    scrubbed = scrubbed.substring(0, scrubbed.length - 5);
  }

  scrubbed = scrubbed.trim();

  return scrubbed;
};

const defaultFetchState = { loading: false, error: null, data: [] };

const FetchItems = ({ searchValue, filter, field, onLoaded, children }) => {
  const [fetchState, setFetchState] = React.useState(defaultFetchState);
  const requestId = React.useRef(0);
  const mounted = React.useRef(false);

  const prepareFetch = React.useCallback(() => {
    reset({ loading: true });
  }, []);

  const reset = (overrides) => {
    setFetchState({ defaultFetchState, ...overrides });
  };

  const queryApi = React.useCallback(() => {
    const getResults = async () => {
      requestId.current++;

      let data;

      try {
        console.log('FetchItems:fetch fetching data');

        const query = Helpers.toQueryString({
          filters: scrub(filter, field),
          requestId: requestId.current,
          limit: 25,
        });

        const baseUrl = `${window.location.protocol}//${window.location.hostname}${
          window.location.port ? `:${window.location.port}` : ''
        }${process.env.REACT_APP_BASENAME}`;
        const url = `${baseUrl}/api/data/${field}/${searchValue}?${query}`;

        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        data = await response.json();

        if (mounted.current && data?.requestId === requestId.current) {
          console.log(`FetchItems:fetch calling onLoaded with ${data.data.length} items`);

          onLoaded({ data: data.data });
          setFetchState({ loading: false, data: data.data });
        }
      } catch (error) {
        if (mounted.current && data?.requestId === requestId.current) {
          onLoaded({ error });
          setFetchState({ loading: false, error });
        }
      }
    };

    if (!mounted.current || searchValue.trim().length < 1) {
      return;
    }

    getResults();
  }, [searchValue, filter, field, onLoaded]);

  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    prepareFetch();
    queryApi();
  }, [queryApi, prepareFetch]);

  return children(fetchState);
};
