import { Component } from "react";
import axios from "axios";
import { Input, Button, Form, Label } from "reactstrap";

class EditComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputItem: props.val,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.updateItem = this.updateItem.bind(this);

  }

  handleOnChange(event) {
    this.setState({ inputItem: event.target.value });
    event.preventDefault();
  }


  async updateItem(id, val) {
    try {
      const res = await axios.put(`http://localhost:3001/data/${id}`, { title: val });
      this.setState({
        itemsList: this.state.itemsList.map((item) =>
          item.id !== id ? item : { ...item, title: val }
        ),
        inputData: val,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.updateItem}>
          <Label>
            <Input
              type="text"
              value={this.state.inputData}
              placeholder="Add Item"
              onChange={this.handleOnChange}
            ></Input>
          </Label>
          <Button type="submit">Edit</Button>
        </Form>
      </div>
    )
  }

}
export default EditComponent;