# blog site hosted by vercel, and with notion as CMS

this is a personal blog site project, with the deploy platform vercel, and use notion as a CMS.

## environment

before dev and deploy

you need install `vercel` command line tool provided by vercel, it will be used for start the local dev server, then deploy the vercel serverless function to production environment from local.

install vercel: `yarn global add vercel`

install the project dependencies:  `yarn install`

## dev

start web page dev server, and start vercel serverless function dev server

in the root of this project, execute command `vercel dev`

then will output log bellow when success:

```shell
❯ vercel dev
Vercel CLI 23.1.2 dev (beta) — https://vercel.com/feedback
> Running Dev Command “react-app-rewired start”
The following changes are being made to your tsconfig.json file:
  - compilerOptions.paths must not be set (aliased imports are not supported)

ℹ ｢wds｣: Project is running at http://10.12.170.12/
ℹ ｢wds｣: webpack output is served from 
ℹ ｢wds｣: Content not from webpack is served from /Users/chegequmu/Documents/vercel-notion-blog/chegi-vercel-blog/public
ℹ ｢wds｣: 404s will fallback to /
Starting the development server...

> Ready! Available at http://localhost:3000
Browserslist: caniuse-lite is outdated. Please run:
npx browserslist@latest --update-db

Why you should do it regularly:
https://github.com/browserslist/browserslist#browsers-data-updating
Compiled successfully!

You can now view create-react-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.12.170.12:3000

Note that the development build is not optimized.
To create a production build, use yarn build.

```

## deploy

just execute `vercel --prod`, then can be visit the ths site onlne.