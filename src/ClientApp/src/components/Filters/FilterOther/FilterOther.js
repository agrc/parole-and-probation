import React from 'react';
import { Button, ButtonGroup, Card, CardBody, Container, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import produce from 'immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import MultiDownshift from '../../MultiDownshift';
import { supervisionItems, mainGangs, offenseTypes } from '../lookupData';
import './FilterOther.css';

const type = 'UPDATE_OTHER';

const itemToString = item => (item ? item.name : '');

export default function FilterOther(props) {
    return (
        <Container fluid className="filter-other">
            <Col>
                <FormGroup>
                    <Label>Legal Status</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {['probation', 'parole'].map((payload, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={props.criteria.status === payload ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        if (props.criteria.status === payload) {
                                            payload = null
                                        }

                                        props.update({ type, payload, meta: 'status' });
                                    }}>
                                    {payload}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Standard of Supervision</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {['no std', 'low', 'mod', 'hi', 'int'].map((sos, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={props.criteria.sos.indexOf(sos) > -1 ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        const payload = produce(props.criteria.sos, draft => {
                                            const index = draft.indexOf(sos);

                                            if (index === -1) {
                                                draft.splice(0, 0, sos);
                                            } else {
                                                draft.splice(index, 1);
                                            }
                                        });

                                        props.update({ type, payload, meta: 'sos' });
                                    }}>
                                    {sos}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <MultiDownshift
                        type={type}
                        field='supervision'
                        update={props.update}
                        selectedItems={props.criteria.supervision}
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
                                    <Label>Special Supervision</Label>
                                    <div className="text-center mb-3">
                                        <ButtonGroup>
                                            <Button color="secondary" outline size="sm"
                                                onClick={() => {
                                                    setState({
                                                        selectedItem: supervisionItems
                                                    });
                                                }}>All</Button>
                                            <Button color="info" outline size="sm"
                                                onClick={() => {
                                                    setState({
                                                        selectedItem: supervisionItems.filter(item => item.default)
                                                    });
                                                }}>Default</Button>
                                            <Button color="secondary" outline size="sm"
                                                onClick={() => {
                                                    setState({
                                                        selectedItem: []
                                                    });
                                                }}>None</Button>
                                        </ButtonGroup>
                                    </div>
                                    {props.criteria.supervision.length > 0 ?
                                        <Card className="mb-3 p-3">
                                            <CardBody className="filter-other__items-container p-0">
                                                {props.criteria.supervision.map(item => (
                                                    <Button className="mb-1" color="secondary" size="sm" outline key={item.id} {...getRemoveButtonProps({ item })}>
                                                        {item.name}
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

                                                        const alreadySelected = props.criteria.supervision.map(item => item.name);

                                                        const value = supervisionItems
                                                            .filter(item => inputValue &&
                                                                !alreadySelected.includes(item.name) &&
                                                                item.name.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value) {
                                                            setState({
                                                                inputValue: value.name,
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

                                                        const alreadySelected = props.criteria.supervision.map(item => item.name);

                                                        const value = supervisionItems
                                                            .filter(item => inputValue &&
                                                                !alreadySelected.includes(item.name) &&
                                                                item.name.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value && inputValue === value.name) {
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
                                        })} />
                                        <InputGroupAddon addonType="append">
                                            <Button {...getToggleButtonProps()}>
                                                {isOpen ? <FontAwesomeIcon icon={faChevronUp} size='xs' /> : <FontAwesomeIcon icon={faChevronUp} size='xs' flip='vertical' />}
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {!isOpen ? null : (
                                        <div className="downshift__match-dropdown" {...getMenuProps()}>
                                            <ul className="downshift__matches">
                                                {supervisionItems.filter(item => (!inputValue && !props.criteria.supervision.includes(item)) || (inputValue && !props.criteria.supervision.includes(item) && item.name.toLowerCase().includes(inputValue.toLowerCase())))
                                                    .map((item, index) => (
                                                        <li key={index}
                                                            {
                                                            ...getItemProps({
                                                                item,
                                                                index,
                                                                className: "downshift__match-item" + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                                            })}>
                                                            {item.name}
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
                    <MultiDownshift
                        type={type}
                        field='gang'
                        update={props.update}
                        selectedItems={props.criteria.gang}
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
                                    <Label>Gang Name</Label>
                                    {props.criteria.gang.length > 0 ?
                                        <Card className="mb-3 p-3">
                                            <CardBody className="filter-other__items-container p-0">
                                                {props.criteria.gang.map(item => (
                                                    <Button className="mb-1" color="secondary" size="sm" outline key={item.id} {...getRemoveButtonProps({ item })}>
                                                        {item.name}
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

                                                        const alreadySelected = props.criteria.gang.map(item => item.name);

                                                        const value = mainGangs
                                                            .filter(item => inputValue &&
                                                                !alreadySelected.includes(item.name) &&
                                                                item.name.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value) {
                                                            setState({
                                                                inputValue: value.name,
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

                                                        const alreadySelected = props.criteria.gang.map(item => item.name);

                                                        const value = mainGangs
                                                            .filter(item => inputValue &&
                                                                !alreadySelected.includes(item.name) &&
                                                                item.name.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value && inputValue === value.name) {
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
                                        })} />
                                        <InputGroupAddon addonType="append">
                                            <Button {...getToggleButtonProps()}>
                                                {isOpen ? <FontAwesomeIcon icon={faChevronUp} size='xs' /> : <FontAwesomeIcon icon={faChevronUp} size='xs' flip='vertical' />}
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {!isOpen ? null : (
                                        <div className="downshift__match-dropdown" {...getMenuProps()}>
                                            <ul className="downshift__matches">
                                                {mainGangs.filter(item => (!inputValue && !props.criteria.gang.includes(item)) || (inputValue && !props.criteria.gang.includes(item) && item.name.toLowerCase().includes(inputValue.toLowerCase())))
                                                    .map((item, index) => (
                                                        <li key={index}
                                                            {
                                                            ...getItemProps({
                                                                item,
                                                                index,
                                                                className: "downshift__match-item" + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                                            })}>
                                                            {item.name}
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
                    <MultiDownshift
                        type={type}
                        field='offense'
                        update={props.update}
                        selectedItems={props.criteria.offense}
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
                                    <Label>Offense Type</Label>
                                    {props.criteria.offense.length > 0 ?
                                        <Card className="mb-3 p-3">
                                            <CardBody className="filter-other__items-container p-0">
                                                {props.criteria.offense.map(item => (
                                                    <Button className="mb-1" color="secondary" size="sm" outline key={item.id} {...getRemoveButtonProps({ item })}>
                                                        {item.name}
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

                                                        const alreadySelected = props.criteria.offense.map(item => item.name);

                                                        const value = offenseTypes
                                                            .filter(item => inputValue &&
                                                                !alreadySelected.includes(item.name) &&
                                                                item.name.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value) {
                                                            setState({
                                                                inputValue: value.name,
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

                                                        const alreadySelected = props.criteria.offense.map(item => item.name);

                                                        const value = offenseTypes
                                                            .filter(item => inputValue &&
                                                                !alreadySelected.includes(item.name) &&
                                                                item.name.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value && inputValue === value.name) {
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
                                        })} />
                                        <InputGroupAddon addonType="append">
                                            <Button {...getToggleButtonProps()}>
                                                {isOpen ? <FontAwesomeIcon icon={faChevronUp} size='xs' /> : <FontAwesomeIcon icon={faChevronUp} size='xs' flip='vertical' />}
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {!isOpen ? null : (
                                        <div className="downshift__match-dropdown" {...getMenuProps()}>
                                            <ul className="downshift__matches">
                                                {offenseTypes.filter(item => (!inputValue && !props.criteria.offense.includes(item)) || (inputValue && !props.criteria.offense.includes(item) && item.name.toLowerCase().includes(inputValue.toLowerCase())))
                                                    .map((item, index) => (
                                                        <li key={index}
                                                            {
                                                            ...getItemProps({
                                                                item,
                                                                index,
                                                                className: "downshift__match-item" + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                                            })}>
                                                            {item.name}
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
                    <Label>Active Warrant</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {['Yes', 'No'].map((payload, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={props.criteria.warrant === payload ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        if (props.criteria.warrant === payload) {
                                            payload = null;
                                        }

                                        props.update({ type, payload, meta: 'warrant' });
                                    }}>
                                    {payload}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
        </Container>
    )
}
