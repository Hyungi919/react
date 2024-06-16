import { API_BASE_URL } from "../app-config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  const options = {
    method: method,
    headers: headers,
    body: JSON.stringify(request),
    credentials: "include", // CORS 관련 옵션, 필요시 수정
  };

  const url = API_BASE_URL + api;

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        console.error("API call failed with status:", response.status);
        throw new Error("API call failed");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("API call error:", error);
      if (error.status === 403) {
        window.location.href = "/login"; // Redirect to login page for unauthorized access
      }
      throw error; // Rethrow the error to propagate it to the caller
    });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      if (response.token) {
        localStorage.setItem(ACCESS_TOKEN, response.token);
        window.location.href = "/"; // Redirect to home page after successful signin
      } else {
        console.error("No token found in response:", response);
        // Handle cases where no token is returned in response (optional)
      }
    })
    .catch((error) => {
      console.error("Signin error:", error);
      // Handle signin errors (e.g., display error message to user)
    });
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO)
    .then((response) => {
      if (response.id) {
        // 회원가입이 성공적으로 이루어진 경우 홈 페이지로 리다이렉션합니다.
        window.location.href = "/";
      } else {
        // 서버가 예상하지 못한 응답을 보낸 경우 처리합니다.
        console.error("회원가입 응답에서 예기치 않은 결과:", response);
        return Promise.reject(new Error("회원가입 응답에서 예기치 않은 결과"));
      }
    })
    .catch((error) => {
      // API 호출 중 발생한 오류를 처리합니다.
      console.error("회원가입 오류:", error);
      if (error && error.status === 403) {
        // 권한이 없는 경우 회원가입 페이지로 리다이렉션합니다.
        window.location.href = "/auth/signup";
      } else {
        // 기타 오류가 발생한 경우 처리합니다.
        console.error("회원가입 중 처리되지 않은 오류:", error);
      }
      // 호출자에게 오류를 전파합니다.
      return Promise.reject(error);
    });
}
export function signout() {
  localStorage.removeItem(ACCESS_TOKEN);
  window.location.href = "/"; // Redirect to home page after signing out
}
