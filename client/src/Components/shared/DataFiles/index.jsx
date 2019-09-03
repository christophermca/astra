import React from 'react';
import './styles.scss';

const uploadFile = () => {
  /*
   * TODO update function
   *
   * open modal with dropbox
   * call data upload
  */
}

export default ({data}) => (
  <div className="data-files-component">
    <header>
      <span> Add/View Inline Data </span>
      <aside onClick={uploadFile}>
          {/* add img src and alt */}
          Upload File <img height="20" width="20" />
      </aside>
    </header>
  </div>
)

