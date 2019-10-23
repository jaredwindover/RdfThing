import React from 'react';
import {
  compose,
  branch,
  renderNothing
} from 'recompose';

const hideIfCantConnect = branch(({status}) => status != 200, renderNothing);

const ContentType = compose(hideIfCantConnect)(
  ({contentType}) => (<p>contentType: {contentType}</p>)
);

export default ({
  server: {url, status, contentType},
  change,
  init,
  ...rest
}) => (
  <div {...rest}>
    <div>
      <p>url: {url}</p>
      <p>status: {status}</p>
      <ContentType {...({status, contentType})}/>
    </div>
    <button onClick={change}>change</button>
    <button onClick={init}>init</button>
  </div>
)
