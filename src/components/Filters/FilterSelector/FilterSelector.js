import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap'
import './FilterSelector.css';

export default function FilterSelector(props) {
    const [active, setActive] = useState('Agent');
    const buttons = ['Agent', 'Offender', 'Location', 'Date', 'Other'];

    return (
        <div className="filter-selector">
            <ButtonGroup>
                {buttons.map((name, index) => <Button size="sm" key={index} color={active === name ? 'info' : 'secondary'} onClick={() => {
                    setActive(name);
                    props.dispatcher({ type: 'selection', filterName: name });
                }
                }>{name}</Button>)}
            </ButtonGroup>
        </div>
    )
}
