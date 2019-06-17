import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import './AccordionPane.css';

export default function AccordionPane(props) {
  const [open, setOpen] = useState(false);

  return (<>
    <Card>
      <CardHeader onClick={() => setOpen(!open)}>
        {props.title}
      </CardHeader>
      <Collapse isOpen={open} >
        <CardBody>
          {props.children}
        </CardBody>
      </Collapse>
    </Card>
  </>)
}
