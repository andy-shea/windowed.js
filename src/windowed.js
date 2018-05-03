function renderItems(items, renderRowContents, rowHeight, el) {
  const viewportHeight = window.innerHeight;
  const elTop = el.getBoundingClientRect().top;
  const offset = -Math.ceil(Math.min(0, elTop) / rowHeight);
  const limit = Math.ceil(Math.min(viewportHeight, viewportHeight - elTop) / rowHeight);
  let itemsHtml = '';
  for (let i = offset, j = Math.min(items.length, offset + limit); i < j; ++i) {
    itemsHtml += `
      <li class="windowed__item"
          style="position: absolute; width: 100%; transform: translateY(${i * rowHeight}px)">
        ${renderRowContents(items[i])}
      </li>
    `;
  }
  return itemsHtml;
}

function setElHeight(items, rowHeight, list) {
  list.style.height = `${rowHeight * items.length}px`;
}

function optimiseHandler(handler) {
  let isTicking = false;
  return () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        handler();
        isTicking = false;
      });
      isTicking = true;
    }
  };
}

function windowed(options, el) {
  let {items = [], rowHeight, renderRowContents} = options;
  const list = document.createElement('ul');
  list.classList.add('windowed');
  list.style.position = 'relative';
  setElHeight(items, rowHeight, list);

  const render = () => {
    list.innerHTML = renderItems(items, renderRowContents, rowHeight, el);
  };

  const scrollHandler = optimiseHandler(render);
  window.addEventListener('scroll', scrollHandler);
  const resizeHandler = optimiseHandler(render);
  window.addEventListener('resize', resizeHandler);

  list.innerHTML = renderItems(items, renderRowContents, rowHeight, el);
  el.appendChild(list);

  return {
    setItems(newItems) {
      items = newItems;
      setElHeight(items, rowHeight, list);
      render();
    },
    render,
    dispose() {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    }
  };
}

export default windowed;
