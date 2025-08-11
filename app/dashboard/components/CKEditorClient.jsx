'use client';

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorClient = ({  name, value, onChange}) => {
  return (
    <div>
      <CKEditor
         editor={ClassicEditor}
      data={value || ""}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(name, data); // Pass the field name and value
      }}
      />
    </div>
  );
};

export default CKEditorClient;
