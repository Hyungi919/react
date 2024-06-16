// Todo.js

import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true, selected: false };
    this.delete = props.delete;
    this.update = props.update;
  }

  handleCheckboxChange = () => {
    const newItem = { ...this.state.item, done: !this.state.item.done };
    this.update(newItem);
  };

  handleDelete = () => {
    this.delete(this.state.item);
  };

  handleDoubleClick = () => {
    this.setState({ readOnly: false });
  };

  handleInputChange = (e) => {
    const newItem = { ...this.state.item, title: e.target.value };
    this.setState({ item: newItem });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.setState({ readOnly: true });
      this.update(this.state.item);
    }
  };

  handleListItemClick = () => {
    this.setState((prevState) => ({ selected: !prevState.selected }));
  };

  render() {
    const { item, readOnly, selected } = this.state;

    return (
      <ListItem button onClick={this.handleListItemClick} selected={selected}>
        <Checkbox checked={item.done} onChange={this.handleCheckboxChange} />
        <ListItemText>
          <InputBase
            inputProps={{
              "aria-label": "naked",
              readOnly: readOnly,
            }}
            value={item.title}
            fullWidth
            onChange={this.handleInputChange}
            onDoubleClick={this.handleDoubleClick}
            onKeyPress={this.handleKeyPress}
          />
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.handleDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
