import React from 'react';
import { baseUrl } from './baseUrl';
import axios from 'axios';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      currentTask: {
        title: '',
        id: ''
      },
      editingId: null
    };
    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }

  async getItem() {
    try {
      const response = await axios.get(baseUrl);
      this.setState({ task: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getItem();
  }

  async addTask(event) {
    event.preventDefault();
    const { title } = this.state.currentTask;
    if (title !== "") {
      try {
        await axios.post(baseUrl, { title });
        this.setState({
          currentTask: { title: '', id: '' }
        });
        this.getItem();
      } catch (err) {
        console.log(err);
      }
    }
  }

  handleInput(event) {
    this.setState({
      currentTask: {
        title: event.target.value,
        id: this.state.editingId ? this.state.editingId : ''
      }
    });
  }

  editTask(task) {
    this.setState({
      currentTask: { title: task.title, id: task.id },
      editingId: task.id
    });
  }

  async saveEdit(event) {
    event.preventDefault();
    const { title, id } = this.state.currentTask;
    if (title && id) {
      try {
        await axios.put(`${baseUrl}/${id}`, { title });
        this.setState({
          currentTask: { title: '', id: '' },
          editingId: null
        });
        this.getItem();
      } catch (err) {
        console.log(err);
      }
    }
  }

  async deleteTask(id) {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      this.getItem();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { task, currentTask, editingId } = this.state;
    return (
      <div className="Todo">
        <h2 className='m-6'>TaskManager</h2>
        <form id="todo-list" onSubmit={editingId ? this.saveEdit : this.addTask}>
          <input
            type="text"
            className="titleInput"
            placeholder="Enter Item"
            value={currentTask.title}
            onChange={this.handleInput}
          />
          <button type="submit">{editingId ? "Save" : "Add"}</button>
        </form>
        <div className="container">
          <table width="40%" id="tblTasks">
            <tbody>
              {task.map(oneTask => (
                <tr key={oneTask.id}>
                  <td width="50%" height="50px">
                    <div id={oneTask.id}>{oneTask.title}</div>
                  </td>
                  <td width="10%" height="50px">
                    <button
                      id="btnEdit"
                      onClick={() => this.editTask(oneTask)}
                    >
                      Edit
                    </button>
                  </td>
                  <td width="10%" height="50px">
                    <button
                      id="btnDelete"
                      onClick={() => this.deleteTask(oneTask.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TestComponent;
