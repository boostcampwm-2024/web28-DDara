import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The about_sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many about_sidebars as you want.
 */
const archive_sidebars: SidebarsConfig = {
  archiveSidebar: [
    {
      type: 'category',
      label: '📝 Archive',
      collapsible: false,
      items: [
        {
          type: 'autogenerated',
          dirName: '.',
        },
      ],
    },
  ],
};

export default archive_sidebars;