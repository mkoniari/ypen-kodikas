import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    basePath:"ypen-kodikas",
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "static",
      static: false,
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "docs",
        label: "Docs",
        path: "content/docs",
        fields: [
          {
            name: 'slug',
            label: 'Slug',
            type: 'string',
            required: true,
            description: 'slug field should be art\<num\>',
          },
          {
            name: 'prev',
            label: 'Prev',
            type: 'string',
            required: true,
            description: 'prev field should be art\<num\>',
          },
          {
            name: 'next',
            label: 'Next',
            type: 'string',
            required: true,
            description: 'next field should be art\<num\>',
          },         
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: 'callout',
                label: 'Callout',
                match: {
                  start: '{{<',
                  end: '>}}',
                },
                fields: [
                  {
                    name: "children",
                    type: 'rich-text',
                    parser: {
                        type: 'markdown',
                        skipEscaping: 'all', // this allows {{< to go unescaped
                        },
                  }
                ],
              },
              {
                name: 'details',
                label: 'Details',
                match: {
                  start: '{{<',
                  end: '>}}',
                },
                fields: [
                  {
                    name: '_value',
                    label: 'value',
                    type: 'string',
                    required: false,
                  },
                  {
                    name: 'title',
                    label: 'Title',
                    type: 'string',
                    required: true,
                  },
                  {
                    name: 'closed',
                    label: 'Close',
                    type: 'boolean',
                    required: false,
                  },
                  {
                    name: "children",
                    type: "rich-text",
                    parser: {
                      type: 'markdown',
                      skipEscaping: 'all', // this allows {{< to go unescaped
                      },                  
                  }
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
