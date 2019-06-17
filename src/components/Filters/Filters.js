import React, { useReducer } from 'react';
import AccordionPane from '../AccordionPane';
import FilterActions from './FilterActions';
import FilterAgent from './FilterAgent';
import FilterDate from './FilterDate';
import FilterOffender from './FilterOffender';
import FilterLocation from './FilterLocation';
import FilterOther from './FilterOther';
import './Filters.css';

export default function Filters(props) {
    function reducer(_, action) {
        switch (action.type) {
            case 'selection':
                return { active: action.filterName };
            default:
                throw new Error();
        }
    }

    const [filters, dispatcher] = useReducer(reducer, { active: 'Agent' });

    return (
        <>
            <AccordionPane title="Agent">
                <FilterAgent />
            </AccordionPane>
            <AccordionPane title="Offender">
                <FilterOffender />
            </AccordionPane>
            <AccordionPane title="Location">
                <FilterLocation dispatcher={props.mapDispatcher} />
            </AccordionPane>
            <AccordionPane title="Supervision Contact">
                <FilterDate />
            </AccordionPane>
            <AccordionPane title="Other">
                <FilterOther />
            </AccordionPane>
            <FilterActions />
        </>
    )
}
