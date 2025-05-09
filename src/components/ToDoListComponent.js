import React, { Component } from "react";
<<<<<<< HEAD
import { Input, Button, Form, FormGroup } from "reactstrap";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import UpdateComponent from "./UpdateComponent";
=======
import axios from "axios";
import { baseUrl } from "./baseUrl";
import EditComponent from "./EditComponent";
>>>>>>> 3cbb44c (updated-css)

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [],
<<<<<<< HEAD
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
=======
      editingId: null, // Track which item is being edited
    };
  }

  async getItem() {
>>>>>>> 3cbb44c (updated-css)
    try {
      const response = await axios.get(baseUrl);
      this.setState({ itemsList: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getItem();
  }

<<<<<<< HEAD
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
=======
  async deleteItem(id) {
>>>>>>> 3cbb44c (updated-css)
    try {
      await axios.delete(`http://localhost:3001/data/${id}`);
      // Option 1: Refetch items from server
      this.getItem();
      // Option 2: Update state locally (uncomment if you prefer this)
      // this.setState({
      //   itemsList: this.state.itemsList.filter((item) => item.id !== id),
      // });
    } catch (err) {
      console.log(err);
    }
  }

<<<<<<< HEAD
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
=======
  handleEdit(id) {
    this.setState({ editingId: id });
>>>>>>> 3cbb44c (updated-css)
  }

  render() {
    return (
<<<<<<< HEAD
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
=======
      <ul>
        {this.state.itemsList.map((item) => (
          <li key={item.id}>
            {item.title}
            <span
              className="fa fa-trash fa-lg"
              onClick={() => this.deleteItem(item.id)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            ></span>
            <span
              className="fa fa-edit fa-lg"
              onClick={() => this.handleEdit(item.id)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            ></span>
            {/* Render EditComponent conditionally */}
            {this.state.editingId === item.id && (
              <EditComponent
                item={item}
                onClose={() => this.setState({ editingId: null })}
                // Pass other props as needed
              />
            )}
          </li>
        ))}
      </ul>
    );
  }
>>>>>>> 3cbb44c (updated-css)
}

export default ToDoList;
