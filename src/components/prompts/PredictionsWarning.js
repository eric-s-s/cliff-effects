import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Form,
  Modal,
} from 'semantic-ui-react';

/**
 * Displays a model that requires the user to accept the terms and conditions before using the app
 * @extends React.Component
 * @param {boolean} termsAccepted - boolean indicating whether terms and conditions have been accepted by the user
 * @param {function} toggleDistrustConfirmed - function to set the termsAccepted in app state
 * @param {object} translations - object containing translations
 */
class TermsAndConditions extends Component {
  
  state = { 
    checkbox1: false,
    checkbox2: false,
  };

  handleChange = (checkboxField) => {
    let checked = !this.state[ checkboxField ];
    this.setState({ [ checkboxField ]: checked });
  };

  allowContinue = () => {
    return (
      this.state.checkbox1 === true && 
      this.state.checkbox2 === true
    ) ? true : false;
  };

  closeModal = (accept) => {
    if (accept) {
      this.props.toggleDistrustConfirmed();
    } else {
      this.props.history.push('/');
    }
  };

  render() {
  
    const {
      termsAccepted,
      translations,
    } = this.props;

    return (
      <Modal
        id={ `WarningModal` }
        mountNode = { document.getElementById('App') }
        size='large'
        open={ !termsAccepted }
        closeOnDimmerClick={ false }
        closeOnEscape={ false }>
        <Modal.Header> 
          { translations.i_header }
        </Modal.Header>
        <Modal.Content scrolling>

          { translations.i_warning } 

          <h4>{ translations.i_formInstructions }</h4>

          <div
            className="radio-yes-no"
            key= { `ReqCkBx1` }>
            <Form.Field>
              <Checkbox
                checked = { this.state.Checkbox1 }
                name    = { `checkbox1` }
                onClick = { () => {return this.handleChange('checkbox1');} } />
            </Form.Field>
            <Form.Field>
              { translations.i_checkboxLabel1 }
            </Form.Field>
          </div>

          <div
            className="radio-yes-no"
            key= { `ReqCkBx2` }>
            <Form.Field>
              <Checkbox
                checked = { this.state.Checkbox2 }
                name    = { `checkbox2` }
                onClick = { () => {return this.handleChange('checkbox2');} } />
            </Form.Field>
            <Form.Field>
              { translations.i_checkboxLabel2 }
            </Form.Field>
          </div>
         
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={ () => {return this.closeModal(false);} }>
            { translations.i_buttonCancel }
          </Button>
          <Button
            disabled={ !this.allowContinue() }
            onClick={ () => {return this.closeModal(true);} }
            color='teal'>
            { translations.i_buttonAcceptWarning }
          </Button>
        </Modal.Actions>
      </Modal>
    ); // End return()
  } // End render()
};

export default withRouter(TermsAndConditions);
