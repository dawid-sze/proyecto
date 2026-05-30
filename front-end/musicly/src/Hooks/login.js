
    export const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (!res.error) {
        return res;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };
