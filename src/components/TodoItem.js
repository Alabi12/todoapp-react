import React, { Component } from 'react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './TodoItem.module.css';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
  }

  handleEditing = () => {
    this.setState({
      editing: true,
    });
  };

  // editTodo
  handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      this.setState({ editing: false });
    }
  };

  render() {
    const {
      todo, handleChangeProps, deleteTodoProps, setUpdate,
    } = this.props;
    const { editing } = this.state;

    const completedStyle = {
      fontStyle: 'italic',
      color: '#595959',
      opacity: 0.4,
      textDecoration: 'line-through',
    };

    // delete
    const viewMode = {};
    const editMode = {};

    if (editing) {
      viewMode.display = 'none';
    } else {
      editMode.display = 'none';
    }

    // destruction
    const { completed, id, title } = todo;

    return (
      <li className={styles.item}>
        <div onDoubleClick={this.handleEditing} style={viewMode}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={completed}
            onChange={() => handleChangeProps(id)}
          />
          <button type="button" onClick={() => deleteTodoProps(todo.id)}>
            <FaTrash />
          </button>
          <span style={todo.completed ? completedStyle : null}>{title}</span>
        </div>
        <input
          style={editMode}
          type="text"
          className={styles.textInput}
          value={title}
          onChange={(e) => setUpdate(e.target.value, id)}
          onKeyDown={this.handleUpdatedDone}
        />
      </li>
    );
  }
}
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
};
