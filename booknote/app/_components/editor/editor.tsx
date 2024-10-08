'use client'
import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { useStore } from 'zustand';
import useMemoStore from '@/stores/memo-store';


const MarkdownEditor: React.FC = () => {
  const {content,setContent}=useStore(useMemoStore,(state)=>state);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parseMarkdown = async () => {
      if (previewRef.current) {
        marked.setOptions({
            gfm: true,
            breaks: true,
          });
        const html = await marked(content);
        previewRef.current.innerHTML = html;
      }
    };
    parseMarkdown();
  }, [content]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex w-full max-w-6xl">
        <div className="w-1/2 p-2">
          <textarea
            className="w-full h-96 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={content}
            onChange={handleInputChange}
            placeholder="Markdown을 입력하세요..."
          ></textarea>
        </div>
        <div className="w-1/2 p-2">
          <div
            ref={previewRef}
            className="prose border p-4 rounded h-96 overflow-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
