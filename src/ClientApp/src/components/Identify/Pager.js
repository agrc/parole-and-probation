import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default function (props) {
  return (
    props.features.length > 1 ? (
      <Pagination listClassName="justify-content-center">
        <PaginationItem disabled={props.index - 1 < 0} className="justify-content-center">
          <PaginationLink first disabled={props.index - 1 < 0} onClick={() => props.update({ type: 'IDENTIFY_PAGINATE', payload: 0 })} />
        </PaginationItem>
        <PaginationItem disabled={props.index - 1 < 0}>
          <PaginationLink previous disabled={props.index - 1 < 0} onClick={() => props.update({ type: 'IDENTIFY_PAGINATE', payload: props.index - 1 })} />
        </PaginationItem>
        <PaginationItem disabled>
          <PaginationLink disabled>{`${props.index + 1} of ${props.features.length}`}</PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={props.index + 1 >= props.features.length}>
          <PaginationLink next disabled={props.index + 1 >= props.features.length} onClick={() => props.update({ type: 'IDENTIFY_PAGINATE', payload: props.index + 1 })} />
        </PaginationItem>
        <PaginationItem disabled={props.index + 1 >= props.features.length}>
          <PaginationLink last disabled={props.index + 1 >= props.features.length} onClick={() => props.update({ type: 'IDENTIFY_PAGINATE', payload: props.features.length - 1 })} />
        </PaginationItem>
      </Pagination>
    ) : null
  );
};
