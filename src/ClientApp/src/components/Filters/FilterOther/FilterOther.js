import React from 'react';
import { Button, ButtonGroup, Card, CardBody, Container, Col, FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import MultiDownshift from '../../MultiDownshift';
import useFilterReducer from '../useFilterReducer';
import produce from 'immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './FilterOther.css';

const type = 'UPDATE_OTHER';

const itemToString = item => (item ? item.name : '');
const items = [{
    name: 'CCC',
    id: 'CCC',
    default: false
}, {
    name: 'PVP',
    id: 'PVP',
    default: false
}, {
    name: 'COMP',
    id: 'COMP',
    default: false
}, {
    name: 'DEP',
    id: 'DEP',
    default: false
}, {
    name: 'EM',
    id: 'EM',
    default: true
}, {
    name: 'GPS',
    id: 'GPS',
    default: true
}, {
    name: 'SO',
    id: 'SO',
    default: true
}, {
    name: 'SO-A',
    id: 'SO-A',
    default: true
}, {
    name: 'SO-B',
    id: 'SO-B',
    default: true
}, {
    name: 'SO-C',
    id: 'SO-C',
    default: true
}, {
    name: 'FUG',
    id: 'FUG',
    default: false
}, {
    name: 'INCAR',
    id: 'INCAR',
    default: false
}, {
    name: 'RESID',
    id: 'RESID',
    default: false
}, {
    name: 'DRUG CT',
    id: 'DRUG CT',
    default: false
}, {
    name: 'DORA',
    id: 'DORA',
    default: true
}, {
    name: 'ECR',
    id: 'ECR',
    default: true
}, {
    name: 'FOSI',
    id: 'FOSI',
    default: true
}, {
    name: 'IG INT',
    id: 'IG INT',
    default: true
}, {
    name: 'MIO',
    id: 'MIO',
    default: true
}];

export default function FilterOther(props) {
    const [gang, setGang] = useFilterReducer(props, type, 'gang');
    const [offense, setOffense] = useFilterReducer(props, type, 'offense');

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
                                                        selectedItem: items
                                                    });
                                                }}>All</Button>
                                            <Button color="info" outline size="sm"
                                                onClick={() => {
                                                    setState({
                                                        selectedItem: items.filter(item => item.default)
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

                                                        const value = items
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

                                                        const value = items
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
                                                {items.filter(item => (!inputValue && !props.criteria.supervision.includes(item)) || (inputValue && !props.criteria.supervision.includes(item) && item.name.toLowerCase().includes(inputValue.toLowerCase())))
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
                    <Label>Gang Name</Label>
                    <Input type="text" name="stg" id="stg" value={gang} onChange={setGang} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Offense Type</Label>
                    <Input type="text" name="offense" id="offense" value={offense} onChange={setOffense} />
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
