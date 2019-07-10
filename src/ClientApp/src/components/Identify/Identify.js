import React, { useEffect } from 'react';
import './Identify.css';
import { Button, Container, Col, Label, Row } from 'reactstrap';

const controller = new AbortController();
const signal = controller.signal;

var dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });

const labelSize = 3;

const IdentifyInformation = (props) => {

  useEffect(() => {
    return function cleanup() {
      controller.abort();
    }
  }, []);

  props = {
    show: props.show,
    offender: {
      name: 'Sarah Sanders',
      number: 1234556,
      age: 35,
      gender: 'Female',
      agent: 'Ace Ventura',
      gang: 'BARRIO MEXICANOS LOCOS'
    },
    contact: {
      phone: 'CELL: (801) 888-4325',
      street: '123 Red Street',
      unit: '#7',
      city: 'Salt Lake City',
      zip: 84111,
      addressType: '1st physical',
      addressDuration: new Date('December 17, 1995'),
      employer: 'McDonalds'
    },
    visit: {
      fieldDate: new Date('June 17, 2019'),
      fieldResult: 'Successful',
      officeDate: new Date('May 05, 2019')
    },
    status: {
      legal: 'Probation',
      warrant: 'No Active Warrant',
      sos: 'LOW',
      specialSupervisionTitle: 'SO',
      specialSupervision: 'Sex Offender',
      crimeDegree: 'F1',
      crime: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      supervisionStart: new Date('January 1, 2018'),
      complianceCredit: new Date('May 15, 2019')
    }
  }

  return (
    <Container className="identify pt-4">
      <figure className="mb-1 pt-1 figured-flex identify__figure identify--center-content">
        <div className="d-flex f-row border border-info">
          <img alt="200x200"
            src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16b6823d4d9%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16b6823d4d9%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.65%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            data-holder-rendered="true" />
          <figcaption className="identify__figure-caption text-truncate">
            <small className="pl-2 text-lowercase">{props.offender.gang}</small>
          </figcaption>
          <div className="d-flex border border-left-0 identify__image-addon f-column text-center">
            <div className="d-flex pl-1 border-bottom border-info identify__addon-item">{props.offender.age} {props.offender.gender}</div>
            <div className="d-flex pl-1 border-bottom border-info identify__addon-item">{props.status.sos}</div>
            <div className="d-flex pl-1 border-bottom border-info identify__addon-item"><abbr title={props.status.specialSupervision}>{props.status.specialSupervisionTitle}</abbr></div>
            <div className="d-flex pl-1 border-bottom border-info identify__addon-item">{props.status.legal}</div>
            <div className="d-flex pl-1 identify__addon-item">{props.status.warrant}</div>
          </div>
        </div>
      </figure>
      <h4>{props.offender.name}</h4>
      <Row className="border-bottom">
        <Label className={`pt-0 pb-0 pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Number</Label>
        <Col className={`pl-0  col-sm-${12 - labelSize}`}>
          <Label className={'pt-0 pb-0 pl-3 col-form-label'}>{props.offender.number}</Label>
        </Col>
        <Label className={`pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Agent</Label>
        <Col className={`pl-0 mb-1 col-sm-${12 - labelSize}`}>
          <Label className={'pl-3 col-form-label'}>{props.offender.agent}</Label>
        </Col>
      </Row>
      <h5 className="mt-2">Recent Contact</h5>
      <Row className="j-between border-bottom">
        <Col>
          <Label className="font-weight-bolder">Field</Label>
          <Label className={`d-block`}>{dateFormatter.format(props.visit.fieldDate)}</Label>
        </Col>
        <Col>
          <Label className="font-weight-bolder">Result</Label>
          <Label className={'d-block'}>{props.visit.fieldResult}</Label>
        </Col>
        <Col>
          <Label className="font-weight-bolder">Office</Label>
          <Label className={'d-block'}>{dateFormatter.format(props.visit.officeDate)}</Label>
        </Col>
      </Row>
      <h5 className="mt-2">Contact Information</h5>
      <Row>
        <Label className={`pr-0 pb-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Phone</Label>
        <Col className={`pl-0 col-sm-${12 - labelSize}`}>
          <Label className={'pl-3 pb-0 col-form-label'}>{props.contact.phone}</Label>
        </Col>
      </Row>
      <Row>
        <Label className={`pr-0 pb-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Address</Label>
        <Col className={`pl-0 col-sm-${12 - labelSize}`}>
          <Label className={'pl-3 pb-0 col-form-label'}>{props.contact.street} {props.contact.unit}</Label>
        </Col>
      </Row>
      <Row>
        <Col className={`offset-${labelSize} pl-0 col-sm-10`}>
          <Label className={'pl-3 col-form-label'}>{props.contact.city} {props.contact.zip}</Label>
        </Col>
      </Row>
      <Row>
        <Label className={`pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Type</Label>
        <Col className={`pl-0 col-sm-${12 - labelSize}`}>
          <Label className={'pl-3 pb-0 col-form-label'}>{props.contact.addressType}</Label>
        </Col>
      </Row>
      <Row>
        <Label className={`pr-0 pb-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Since</Label>
        <Col className={`pl-0 col-sm-${12 - labelSize}`}>
          <Label className={'pl-3 pb-0 col-form-label'}>{dateFormatter.format(props.contact.addressDuration)}</Label>
        </Col>
      </Row>
      <Row className="border-bottom">
        <Label className={`pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Employer</Label>
        <Col className={`pl-0 col-sm-${12 - labelSize}`}>
          <Label className={'pl-3 col-form-label'}>{props.contact.employer}</Label>
        </Col>
      </Row>
      <h5 className="mt-2">Crime</h5>
      <Row className="border-bottom">
        <Label className={`pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Degree</Label>
        <Col className={`pl-0 col-sm-${12 - labelSize}`}>
          <Label className={'pl-3 col-form-label'}>{props.status.crimeDegree}</Label>
        </Col>
        <Col className={`pl-0`}>
          <p className={'pl-3 text-justify'}>{props.status.crime}</p>
        </Col>
      </Row>
      <Row className="mt-3 j-between">
        <Col>
          <Label className="font-weight-bolder">Supervision Start</Label>
          <Label className={`d-block`}>{dateFormatter.format(props.status.supervisionStart)}</Label>
        </Col>
        <Col>
          <Label className="font-weight-bolder">Compliance Credit</Label>
          <Label className={'d-block'}>{dateFormatter.format(props.status.complianceCredit)}</Label>
        </Col>
      </Row>
      <Row className="identify--center-content pt-5 pb-3">
        <Button color="primary" onClick={() => props.show(false)}>Close</Button>
      </Row>
    </Container>
  );
}

const IdentifyContainer = (props) => {
  return (
    <div className="identify__container side-bar side-bar--with-border side-bar--open">
      <button type="button" className="identify__close" aria-label="Close" onClick={() => props.show(false)}>
        <span aria-hidden="true">&times;</span>
      </button>
      {props.children}
    </div>
  );
}

export { IdentifyInformation, IdentifyContainer };