import React from 'react';
import './styles.scss';
import Modal from '../Modal/index'

const uploadFile = (evt) => {
  evt.preventDefault();
  // TODO open modal with dropbox
  console.log('creating template')
  // const form = evt.target;
  // const formData = new FormData(form)

  // formData.append('active', true);
  // formData.append('templateId', 1);

  // const options = {
  //   method: "POST",
  //   body: formData
  // }

  // fetch('/api/upload/files', options)
  //   .then(response => response.json())
  //   .then(json => {
  //   })
  //   .catch(err => console.error({ err }));
}

export default ({data}) => (
  <div className="data-files-component">
    <Modal>
      <div class='modal'>testing</div>
    </Modal>
    <header>
      <span> Add/View Inline Data </span>
      <aside onClick={uploadFile}>
          {/* add img src and alt */}
          Upload File <img height="20" width="20" />
      </aside>
    </header>
  </div>
)

