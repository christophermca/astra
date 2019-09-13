const handleExecute = (selectedTemplate) => {
    let url= `/api/templates/execute?templateId=${selectedTemplate}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(selectedTemplate),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.text())
      .then(data => console.log(data))
  }

const handleDelete = (selectedTemplate) => {
    let url= `/api/templates/deleted?templateId=${selectedTemplate}`
      fetch(url, {
        method: "DELETE",
        body: JSON.stringify(selectedTemplate),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.text())
        .then(data => {
          console.log(data)
        })
  }

export {
  handleExecute,
  handleDelete
}
