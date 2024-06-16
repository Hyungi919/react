import React from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { call, signout } from "./service/ApiService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      selectedItems: new Set(),
    };
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    call("/todo", "GET", null)
      .then((response) =>
        this.setState({ items: response.data, loading: false })
      )
      .catch((error) => console.error("Error fetching todos:", error));
  };

  addTodo = (newTodo) => {
    call("/todo", "POST", newTodo)
      .then((response) => this.fetchTodos())
      .catch((error) => console.error("Error adding todo:", error));
  };

  deleteTodo = (todoToDelete) => {
    call("/todo", "DELETE", todoToDelete)
      .then((response) => this.fetchTodos())
      .catch((error) => console.error("Error deleting todo:", error));
  };

  updateTodo = (updatedTodo) => {
    call("/todo", "PUT", updatedTodo)
      .then((response) => this.fetchTodos())
      .catch((error) => console.error("Error updating todo:", error));
  };

  handleBatchDelete = () => {
    const { selectedItems } = this.state;
    const todoIds = Array.from(selectedItems).map((item) => item.id);

    call("/todo/batch-delete", "DELETE", todoIds)
      .then((response) => {
        this.setState({ selectedItems: new Set() }); // Clear selected items after successful batch delete
        this.fetchTodos();
      })
      .catch((error) => console.error("Error batch deleting todos:", error));
  };

  handleSelectItem = (todo) => {
    const { selectedItems } = this.state;
    if (selectedItems.has(todo)) {
      selectedItems.delete(todo);
    } else {
      selectedItems.add(todo);
    }
    this.setState({ selectedItems: new Set(selectedItems) });
  };

  render() {
    const { items, loading, selectedItems } = this.state;

    const todoItems =
      items.length > 0 ? (
        <Paper style={{ margin: 16 }}>
          <List>
            {items.map((item) => (
              <Todo
                key={item.id}
                item={item}
                delete={this.deleteTodo}
                update={this.updateTodo}
                onSelect={this.handleSelectItem}
                selected={selectedItems.has(item)}
              />
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="h6">No todos found</Typography>
      );

    const loadingPage = <h1>Loading...</h1>;
    const content = loading ? loadingPage : todoItems;

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6">Todo List</Typography>
              </Grid>
              <Grid item>
                <Button
                  color="inherit"
                  disabled={selectedItems.size === 0}
                  onClick={this.handleBatchDelete}
                >
                  Batch Delete
                </Button>
                <Button color="inherit" onClick={signout}>
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <AddTodo add={this.addTodo} />
          <div style={{ marginTop: 16 }}>{content}</div>
        </Container>
      </div>
    );
  }
}

export default App;
