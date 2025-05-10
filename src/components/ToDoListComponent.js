import { Component } from "react";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import EditComponent from "./EditComponent";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [],
      editingId: null, // Track which item is being edited
    };
  }

  async getItem() {
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

  async deleteItem(id) {
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

  handleEdit(id) {
    this.setState({ editingId: id });
  }

  render() {
    return (
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
}

export default ToDoList;
