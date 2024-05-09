import React from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

const MainEditor: React.FC<{}> = () => {
  const editor = useCreateBlockNote();
  return <BlockNoteView editor={editor} />;
};

export default MainEditor;
