// GET 请求
function getTodos() {
  console.log('GET 请求');
}

// POST 请求
function addTodo() {
  console.log('POST 请求');
}

// PUT/PATCH 请求
function updateTodo() {
  console.log('PUT/PATCH 请求');
}

// DELETE 请求
function removeTodo() {
  console.log('DELETE 请求');
}

// 批量请求数据
function getData() {
  console.log('批量请求数据');
}

// 自定义请求头
function customHeaders() {
  console.log('自定义请求头');
}

// TRANSFORMING 请求 & 响应
function transformResponse() {
  console.log('Transform Response 对响应的数据进行转换');
}

// ERROR 处理
function errorHandling() {
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// 请求拦截

// AXIOS 实例化

// 数据展示
function showOutput(res) {
  document.getElementById('res').innerHTML = `
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
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
