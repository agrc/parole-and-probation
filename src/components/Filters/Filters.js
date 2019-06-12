import React, { useReducer } from 'react';
import FilterSelector from './FilterSelector';
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
            <FilterSelector dispatcher={dispatcher} />
            <FilterAgent active={filters.active} />
            <FilterDate active={filters.active} />
            <FilterOffender active={filters.active} />
            <FilterLocation active={filters.active} dispatcher={props.mapDispatcher} />
            <FilterOther active={filters.active} />
            <FilterActions />
        </>
    )
}
