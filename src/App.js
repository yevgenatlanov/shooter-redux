import React, { Component } from 'react';
import { Button } from './Button';
import { connect } from 'react-redux';



class App extends Component {
  constructor() {
    super();
    this.state = {
      bulletHolder: 5,
      holderActive: true,
      ammoActive: true
    }

    this.handleShooting = this.handleShooting.bind(this);
    this.handleReloading = this.handleReloading.bind(this);
  }

  handleShooting() {
    const { bulletHolder, holderActive } = this.state;
    this.setState({
      bulletHolder: bulletHolder - 1
    }, () => {
      if (this.state.bulletHolder <= 0) {
        this.setState({
          holderActive: false
        });
      }
    });
  }

  handleReloading() {
    const { dispatch, ammoBox } = this.props;
    const { bulletHolder } = this.state;
    const spentAmmos = 5 - bulletHolder;

    dispatch({
      type: 'DECREMENT_AMMO',
      payload: (ammoBox > spentAmmos) ? ammoBox - spentAmmos : 0
    });
    this.setState({
      holderActive: true,
      bulletHolder: (ammoBox > spentAmmos) ? bulletHolder + spentAmmos : bulletHolder + ammoBox
    }, () => {
       this.setState({
         ammoActive: (this.props.ammoBox <= 0) ? false : true
       });
    });


  }
  render() {
    return (
      <div>
        <div>
          <h2>Welcome to Shooter</h2>
        </div>
        <div>
          <Button title='Shoot' active={this.state.holderActive} onClick={this.handleShooting} />
          <Button title='Reload' active={this.state.ammoActive} onClick={this.handleReloading} />
        </div>

        <div>
          <h1>Магазин: {this.state.bulletHolder}</h1>
          <h1>Боезапас: {this.props.ammoBox}</h1>
        </div>
      </div>
    );
  }
}
// берем данные из redux store и присоединяем к props компонента
const select = (state) => ({
  ammoBox: state.ammoBox
});

export default connect(select)(App);