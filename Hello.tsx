import React, { Component } from 'react';
import { ExposureService } from './service/exposure.service';

export default class Hello extends Component<any, any> {
  public ref: any;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    console.log('this.ref.clientWidth:', this.ref.clientWidth);
    console.log('this.ref.clientHeight:', this.ref.clientHeight);
    console.log(
      'ExposureService:',
      ExposureService.getExposureConditions(this.ref)
    );
  }

  render() {
    this.ref = React.Children.only(this.props.children);
    return React.cloneElement(this.ref, { ref: el => (this.ref = el) });
  }
}
