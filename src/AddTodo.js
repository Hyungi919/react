import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
    this.add = props.add;
  }

  handleInputChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleAddTodo = () => {
    if (this.state.title.trim()) {
      this.add({ title: this.state.title });
      this.setState({ title: "" });
    }
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleAddTodo();
    }
  };

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Add Todo here"
              fullWidth
              value={this.state.title}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          </Grid>
          <Grid xs={1} md={1} item>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={this.handleAddTodo}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;
