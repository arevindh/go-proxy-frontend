"use client"

import ConfigFile from '@/types/config_file';
import { formatError } from '@/types/endpoints';
import { yaml } from '@codemirror/lang-yaml';
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ConfigEditor(args: { file: ConfigFile }) {
    const [editorValue, setEditorValue] = useState('');
    const extensions = [yaml()];
    const { theme } = useTheme();

    useEffect(() => {
        args.file.getContent()
            .then(setEditorValue)
            .catch((e) => setEditorValue(formatError(e)));
    }, []);

    return <CodeMirror
        style={{ minWidth: "55vw" }}
        value={editorValue}
        theme={theme === 'light' ? githubLight : andromeda}
        extensions={extensions}
        onChange={(value, _) => {
            args.file.setContent(value)
        }}
    />
}