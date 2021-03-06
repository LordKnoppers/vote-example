import React from 'react';
import { RoutingContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import routes from '../common/routes';

export default function renderRoute(request, reply) {
  const location = request.path;
  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      reply.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      reply(error.message).code(500);
    } else if (renderProps == null) {
      reply('Not found').code(404);
    } else {
      const html = renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps}/>
        </Provider>
      );
      const initialData = store.getState();
      reply(renderFullPage(html, initialData));
    }
  });
}

function renderFullPage(html, initialData) {
  return `<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8">
      <title>Votes as a Service</title>
      <link rel="stylesheet" href="/tetra.css">
<script>
  window.__INITIAL_STATE__ = ${JSON.stringify(initialData)};
</script>
  </head>

  <body>
    <div id="voteAppMountPoint">${html}</div>
  </body>

  <script type="text/javascript"
          src="/dist/vote-app.js">
  </script>
</html>`;
}