import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { signup } from "./service/ApiService";

class SignUp extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    signup({ email: email, username: username, password: password }).then(
      (response) => {
        window.location.href = "/login";
      }
    );
  };

  render() {
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">계정생성</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="사용자 이름"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="current-password"
                name="password"
                variant="outlined"
                required
                fullWidth
                type="password"
                id="password"
                label="패스워드"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                계정생성
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  이미 계정이 있습니까? 로그인 하세요.
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default SignUp;
