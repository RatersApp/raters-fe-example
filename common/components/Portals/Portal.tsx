import { useEffect, useState, memo } from 'react';
import ReactDOM from 'react-dom';
import { arrayOf, oneOfType, string, node, any } from 'prop-types';

const Portal = ({ children, classes }) => {
  const [modalContainer] = useState(
    process.browser ? document.createElement('div') : <div />,
  );

  useEffect(() => {
    if (process.browser) {
      let modalRoot = document.getElementById('modal-root');

      if (!modalRoot) {
        const tempEl = document.createElement('div');
        tempEl.id = 'modal-root';
        tempEl.classList.add('portalWrapper', 'overlay', [...classes]);
        document.body.append(tempEl);
        modalRoot = tempEl;
      }

      modalRoot.appendChild(modalContainer);
      return () => {
        document.body.removeChild(modalRoot);
      };
    }
  }, []);

  return process.browser
    ? ReactDOM.createPortal(children, modalContainer)
    : null;
};

Portal.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  classes: oneOfType([arrayOf(string), arrayOf(any)]).isRequired,
};

export default memo(Portal);
