'use client';

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorClient = ({ data, onChange }) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onChange={(event, editor) => {
          const content = editor.getData();
          onChange(content);
        }}
      />
    </div>
  );
};

export default CKEditorClient;
