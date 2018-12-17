import React, { Component } from 'react';
import Modal, {closeStyle, __esModule} from 'simple-react-modal';
import * as AutopartService from '../src/Autoparts'
import _ from 'lodash';
import './App.css';

class App extends Component {

  constructor(args){
    super(args);
    this.state = {
      partToEdit: {},
      loading: true,
      errors: null,
      showModal: false,
      parts: []
    }
  }

  componentDidMount(){
    AutopartService.getAutoparts()
      .then(
        (result) => {
          this.setState({
            loading: false,
            errors: null,
            parts: result.data
          });
        },
        (error) => {
          this.setState({
            loading: false,
            errors: [error],
            parts: []
          });
        }
      );
  }

  hideModal = () => {
    this.setState({ showModal: false });

    var newPart = {
      id: document.getElementById('id_input').value,
      partNumber: document.getElementById('number_input').value,
      name: document.getElementById('name_input').value,
      description: document.getElementById('desc_input').value,
      manufacturerName: document.getElementById('manuf_input').value
    };
    
    if(newPart.id > 99999 || newPart.id < 0){
      alert("The ID must be between 0 and 99999");
      return;
    }

    if(!this.state.partToEdit.id){
      //adding part
      if(_.some(this.state.parts, (p) => { return p.id == newPart.id})){
        alert('The ID must be unique.');
        return;
      }
      AutopartService.postAutopart(newPart)
        .then(() => {
          AutopartService.getAutoparts()
            .then((result) => {
              this.setState({parts: result.data});
            });
        });
    }
    else{
      //editing part
      if(this.state.partToEdit.id != newPart.id){
        if(_.some(this.state.parts, (p) => { return p.id == newPart.id})){
          alert('The ID must be unique.');
          return;
        }
      }
      AutopartService.putAutopart(this.state.partToEdit.id, newPart)
        .then(() => {
          AutopartService.getAutoparts()
            .then((result) => {
              this.setState({parts: result.data});
            });
        });
    }
    this.setState({partToEdit: {}});
  }

  showModal = () => {
    this.setState({ showModal: true });
  }

  onEditClick = (part) => {
    this.setState({ showModal: true, partToEdit: part });
  }

  onAddClick = () => {
    this.setState({ showModal: true, partToEdit: {}});
  }

  onDeleteClick = (part) => {
    AutopartService.deleteAutopart(part)
      .then(() => {
        AutopartService.getAutoparts()
          .then((result) => {
            this.setState({parts: result.data});
          });
      });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="Header-text">NIHF Auto Parts</h1>
        </header>
        <Modal
          containerStyle={{background: '#bebebe'}} 
          containerClassName="test"
          closeOnOuterClick={true}
          show={this.state.showModal}
          onClose={this.hideModal.bind(this)}>
    
          <a style={closeStyle} onClick={this.hideModal.bind(this)}>X</a>
          <div>
            <table>
              <tbody>
                <tr><td>Id:</td><td><input id="id_input" disabled={this.state.partToEdit.id} type="number" defaultValue={this.state.partToEdit.id}/></td></tr>
                <tr><td>Number:</td><td><input id="number_input" type="text" defaultValue={this.state.partToEdit.partNumber}/></td></tr>
                <tr><td>Name:</td><td><input id="name_input" type="text" defaultValue={this.state.partToEdit.name}/></td></tr>
                <tr><td>Description:</td><td><input id="desc_input" type="text" defaultValue={this.state.partToEdit.description}/></td></tr>
                <tr>
                  <td>Manufacturer:</td>
                  <td><input id="manuf_input" type="text" defaultValue={this.state.partToEdit.manufacturerName}/></td>
                  <td><button onClick={this.hideModal.bind(this)}>Save</button></td>
                </tr>
              </tbody>
            </table>
          </div> 
        </Modal>
        <div className="Content-area">
          <p> Current Stock: </p>
          <table className="table">
            <thead>
              <tr>
                <th> ID </th>
                <th> Number </th>
                <th> Name </th>
                <th> Description </th>
                <th> Manufacturer </th>
                <th> Edit </th>
                <th> Delete </th>
              </tr>
            </thead>
            <tbody>
              { 
                this.state.parts.map(part => {
                  return <tr key={part.id.toString()}>
                    <td>{part.id}</td>
                    <td>{part.partNumber}</td>
                    <td>{part.name}</td>
                    <td>{part.description}</td>
                    <td>{part.manufacturerName}</td>
                    <td><button onClick={() => this.onEditClick(part)}>Edit</button></td>
                    <td><button onClick={() => this.onDeleteClick(part)}>Delete</button></td>
                  </tr>
                })
              }
              <tr className="addRow"><td colSpan="7"><button onClick={this.onAddClick}>Add Part</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
