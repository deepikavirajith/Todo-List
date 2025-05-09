import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import { Input, Button, Form, Labelabel, Label } from "reactstrap";
import ToDoList from "./ToDoListComponent";

class AddComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            inputItem: '',
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.addItem = this.addItem.bind(this);

    }

    handleOnChange(event) {
        this.setState({ inputItem: event.target.value });
        event.preventDefault();
      }
    

    addItem(event) {
        event.preventDefault();
        if (this.state.inputItem !== "") {
            try {
              axios.post(baseUrl, {title: this.state.inputItem}).then((res) => {
                  console.log(res);
                  console.log(res.data);
                  this.setState({
                    inputItem: '',
                  });
              });
            } catch (err) {
              console.log(err);
            }
          }
      }

      render() {
        return (
          <div>
            <Form onSubmit = {this.addItem}>
              <Label>
                Person Name:
                <Input
              type="text"
              name="name"
              value={this.state.inputData}
              placeholder="Add Item"
              onChange={this.handleOnChange}
            ></Input>
              </Label>
              <Button type="submit">Add</Button>
            </Form>
          </div>
        )
      }

}
export default AddComponent;