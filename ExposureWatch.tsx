import * as React from 'react';
import { ExposureService } from './service/exposure.service';

export default class ExposureWatch extends React.Component<any, any> {
  public ref: any;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    ExposureService.initExposureCondition(this.ref);
  }

  render() {
    this.ref = React.Children.only(this.props.children);
    return React.cloneElement(this.ref, { ref: el => (this.ref = el) });
  }
}
