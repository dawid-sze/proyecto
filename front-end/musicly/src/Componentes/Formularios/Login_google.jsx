const loginConGoogle = () => {
  const popup = window.open(
    "http://localhost:8000/auth/google",
    "googleLogin",
    "width=500,height=600"
  );

  window.addEventListener("message", (event) => {
    if (event.origin !== "http://localhost:8000") return;

    const { token } = event.data;

    if (token) {
      localStorage.setItem("token", token);
      popup.close();
    }
  }, { once: true });
};

export {
    loginConGoogle
}