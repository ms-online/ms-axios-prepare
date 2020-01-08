// 请求接口: http://jsonplaceholder.typicode.com/todos

axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// GET 请求
function getTodos() {
  // axios({
  //   method: "get",
  //   url: "http://jsonplaceholder.typicode.com/todos",
  //   params: {
  //     _limit: 5
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

  axios
    .get("http://jsonplaceholder.typicode.com/todos?_limit=5", {
      timeout: 5000
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// POST 请求
function addTodo() {
  axios
    .post("http://jsonplaceholder.typicode.com/todos", {
      title: "米修在线1",
      completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// PUT/PATCH 请求
function updateTodo() {
  axios
    .patch("http://jsonplaceholder.typicode.com/todos/1", {
      title: "米修在线1",
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// DELETE 请求
function removeTodo() {
  axios
    .delete("http://jsonplaceholder.typicode.com/todos/1")
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// 批量请求数据
function getData() {
  axios
    .all([
      axios.get("http://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("http://jsonplaceholder.typicode.com/posts?_limit=5")
    ])
    // .then(res => showOutput(res[1]))
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err));
}

// 自定义请求头
function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "sometoken"
    }
  };

  axios
    .post(
      "http://jsonplaceholder.typicode.com/todos",
      {
        title: "米修在线1",
        completed: true
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// TRANSFORMING 请求 & 响应
function transformResponse() {
  const options = {
    method: "post",
    url: "http://jsonplaceholder.typicode.com/todos",
    data: {
      title: "hello world"
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then(res => showOutput(res));
}

// ERROR 处理
function errorHandling() {
  axios
    .get("http://jsonplaceholder.typicode.com/todoss")
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status == 404) {
          alert("客户端请求出现问题");
        } else if (err.response.status >= 500) {
          alert("服务端接口出现问题");
        }
      } else if (err.request) {
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get("http://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log("request canceld", thrown.message);
      }
    });

  if (true) {
    source.cancel("请求取消");
  }
}

// 请求拦截
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// AXIOS 实例化
const axiosInstance = axios.create({
  baseURL: "http://jsonplaceholder.typicode.com"
});
axiosInstance.get("/comments?_limit=5").then(res => showOutput(res));

// 数据展示
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// 事件监听
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
