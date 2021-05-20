export function getList() {
    return fetch('http://localhost:3000/list')
      .then(data => data.json())
  }