import React, { Component } from "react";
import { Input, Button, Form, FormGroup } from "reactstrap";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import UpdateComponent from "./UpdateComponent";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [],
      inputData: "",
      editInput: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  handleOnChange(event) {
    event.preventDefault();
    this.setState({
      inputData: event.target.value,
    });
  }

  getItem() {
    try {
      axios.get(baseUrl).then((response) => {
        console.log(response.data);
        this.setState({
          itemsList: response.data,
        });
        console.log(this.state.itemsList);
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getItem();
  }

  addItem(event) {
    event.preventDefault();
    if (this.state.inputData !== "") {
      try {
        axios.post(baseUrl, { title: this.state.inputData }).then((res) => {
          console.log(this.state.inputData);
          this.setState({
            inputData: "",
          });
          this.getItem();
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  deleteItem(id) {
    try {
      axios.delete(`http://localhost:3001/data/${id}`).then((res) => {
        const currentTaskArray = [...this.state.itemsList];
        const taskAfterDeleted = currentTaskArray.filter(
          (deleteItem) => deleteItem.id !== id
        );
        this.setState({
          itemsList: taskAfterDeleted,
        });
        this.getItem();
      });
    } catch (err) {
      console.log(err);
    }
  }

  updateItem(id, val) {
    try {
      axios
        .patch(`http://localhost:3001/data/${id}`, { title: val })
        .then((res) => {
          console.log(val);
          const items = this.state.itemsList;
          items.map((item) => {
            if (item.id === id) {
              item.title = val;
            }
          });
          this.setState({
            itemsList: items
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container-fluid">
        
          <Form id="todo-list" onSubmit={this.addItem}>
          <div className="form-group row">
            <Input
              className="input col-12 col-sm-6"
              type="text"
              name="name"
              value={this.state.inputData}
              placeholder="Add Item"
              onChange={this.handleOnChange}
            ></Input>
            <Button className="btn-add col-12 col-sm-2" type="submit">
              Add
            </Button>
            </div>
          </Form> 
        
        <div className="form-group row">
          <UpdateComponent
            itemsList={this.state.itemsList}
            editInput={this.state.editInput}
            deleteItem={this.deleteItem}
            updateItem={this.updateItem}
          />
        </div>
      </div>
    );
  }
  /*<div>
                     <button
                       className="fa fa-trash fa-lg"
                       onClick={() => this.deleteItem(todo.id)
                      }
                       
                     >
                       Delete
                     </button>
                     <button
                       className="fa fa-edit fa-lg"
                       onClick={() =>
                         this.updateItem(todo.id, todo.title)
                       }
                     >
                       Edit
                     </button>
                   </div>*/
}
export default ToDoList;
