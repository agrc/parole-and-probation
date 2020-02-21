import React from 'react';
import { Button, ButtonGroup, Card, CardBody, FormGroup, Label, Input, InputGroup, InputGroupAddon, Container, Col } from 'reactstrap';
import useFilterReducer from '../useFilterReducer';
import produce from 'immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import MultiDownshift from '../../MultiDownshift';
import { counties } from '../lookupData';
import './FilterLocation.css';

const type = 'UPDATE_LOCATION';

const itemToString = item => (item ? item : '');

export default function FilterLocation(props) {
    const [zip, setZip] = useFilterReducer(props, type, 'zip');
    const [city, setCity] = useFilterReducer(props, type, 'city');

    return (
        <Container fluid className="filter-location">
          <form autocomplete="off" autoComplete="off">
            <Col>
                <FormGroup>
                    <Label>City</Label>
                    <Input type="text" value={city} onChange={setCity} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Zip</Label>
                    <Input type="number" value={zip} onChange={setZip} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <MultiDownshift
                        type={type}
                        field='counties'
                        update={props.update}
                        selectedItems={props.criteria.counties}
                        itemToString={itemToString}>
                        {({
                            closeMenu,
                            clearSelection,
                            getInputProps,
                            getItemProps,
                            getMenuProps,
                            getRemoveButtonProps,
                            getToggleButtonProps,
                            highlightedIndex,
                            inputValue,
                            isOpen,
                            selectedItem,
                            setState,
                        }) => (
                                <div>
                                    <Label>County</Label>
                                    {props.criteria.counties.length > 0 ?
                                        <Card className="mb-3 p-3">
                                            <CardBody className="filter-other__items-container p-0">
                                                {props.criteria.counties.map(item => (
                                                    <Button className="mb-1" color="secondary" size="sm" outline key={item} {...getRemoveButtonProps({ item })}>
                                                        {item}
                                                    </Button>
                                                ))}
                                            </CardBody>
                                        </Card> : null}
                                    <InputGroup>
                                        <Input {...getInputProps({
                                            onBlur: closeMenu,
                                            onKeyDown: event => {
                                                switch (event.key) {
                                                    case 'Tab': {
                                                        highlightedIndex = highlightedIndex || 0;

                                                        const value = counties
                                                            .filter(item => inputValue &&
                                                                !props.criteria.counties.includes(item) &&
                                                                item.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value) {
                                                            setState({
                                                                inputValue: value,
                                                                isOpen: false,
                                                                type: '__autocomplete_tab_selection__'
                                                            });

                                                            event.preventDefault();
                                                        }

                                                        break;
                                                    }
                                                    case 'Enter': {
                                                        console.log(`Downshift:onKeyDown ${event.key}`);

                                                        if (selectedItem) {
                                                            clearSelection();

                                                            break;
                                                        }

                                                        highlightedIndex = highlightedIndex || 0;

                                                        const value = counties
                                                            .filter(item => inputValue &&
                                                                !props.criteria.counties.includes(item) &&
                                                                item.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value && inputValue === value) {
                                                            setState({
                                                                selectedItem: value,
                                                                isOpen: false,
                                                                type: '__autocomplete_keydown_enter__'
                                                            });
                                                        }

                                                        break;
                                                    }
                                                    default:
                                                        break;
                                                }
                                            }
                                        })}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button {...getToggleButtonProps()}>
                                                {isOpen ? <FontAwesomeIcon icon={faChevronUp} size='xs' /> : <FontAwesomeIcon icon={faChevronUp} size='xs' flip='vertical' />}
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {!isOpen ? null : (
                                        <div className="downshift__match-dropdown" {...getMenuProps()}>
                                            <ul className="downshift__matches">
                                                {counties.filter(item => (!inputValue && !props.criteria.counties.includes(item)) || (inputValue && !props.criteria.counties.includes(item) && item.toLowerCase().includes(inputValue.toLowerCase())))
                                                    .map((item, index) => (
                                                        <li key={index}
                                                            {
                                                            ...getItemProps({
                                                                item,
                                                                index,
                                                                className: "downshift__match-item" + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                                            })}>
                                                            {item}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                    </MultiDownshift>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Region</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {[1, 3, 4, 5, 6].map(region =>
                                <Button
                                    key={region}
                                    value={region}
                                    size="sm"
                                    color={props.criteria.region.indexOf(region) > -1 ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        const payload = produce(props.criteria.region, draft => {
                                            const index = draft.indexOf(region);

                                            if (index === -1) {
                                                draft.splice(0, 0, region);
                                            } else {
                                                draft.splice(index, 1);
                                            }
                                        });

                                        props.update({ type, payload, meta: 'region' });
                                    }}>
                                    {region}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
          </form>
        </Container>
    )
}
