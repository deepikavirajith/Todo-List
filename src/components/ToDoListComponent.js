import React, { Component } from "react";
import { Input, Button, Form } from "reactstrap";
import axios from "axios";
import { baseUrl } from "./baseUrl";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [],
      inputData: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
   
  }

  handleOnChange(event) {
    this.setState({
      inputData: event.target.value,
    });
    event.preventDefault();
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
          const items = [...this.state.itemsList.id];
          this.setState({
            itemsList: items,
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
          this.setState({
            itemsList: items.filter((item) => item.id !== id),
            inputData:val,
          });
          console.log(items);
          console.log(val);
        });
    } catch (err) {
      console.log(err);
    }
  }
  

  render() {
    return (
      <div className="Todo">
          <Form id="todo-list" onSubmit={this.addItem} className="m-1">
            <Input
              type="text"
              name="name"
              value={this.state.inputData}
              placeholder="Add Item"
              onChange={this.handleOnChange}
            ></Input>
            <Button
              type="submit"
              className="m-2"
              color="primary"
            >
              Add
            </Button>
          </Form>
            {this.state.itemsList.map((todo) => (
               <div key={todo.id} className="card">
               <div className="container">
                 <p>
                   {todo.title}
                   <div>
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
                   </div>
                 </p>
               </div>
             </div>
           ))}
            </div>
            /*<li key={todo.id}>
                {todo.title}
                <span
                  className="fa fa-trash fa-lg"
                  onClick={() => {
                    this.deleteItem(todo.id);
                  }}
                ></span>
                <span
                  className="fa fa-edit fa-lg"
                  onClick={() => {
                    this.updateItem(todo.id, todo.title);
                    console.log(this.updateItem(todo.id, todo.title));
                  }}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      </div>*/
    );
  }
}
export default ToDoList;
