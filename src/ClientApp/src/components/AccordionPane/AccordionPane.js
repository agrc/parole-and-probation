import classnames from 'clsx';
import * as React from 'react';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import './AccordionPane.css';

export default function AccordionPane(props) {
  const [open, setOpen] = React.useState(props.open);
  const classes = classnames(
    'accordion-pane',
    props.className
  );

  return (<>
    <Card className={classes}>
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
