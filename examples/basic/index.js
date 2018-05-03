import windowed from '../../src/windowed';

windowed(
  {
    items: Array.from(Array(1000), (_, x) => ({id: x + 1000})),
    rowHeight: 50,
    renderRowContents: item => `
      <h3>Item #${item.id}</h3>
      <div>Quck brown fox jumped</div>
      <div>over the lazy dog</div>
      <nav>
        <ul>
          <li><a href="">Some link</a></li>
          <li><a href="">Another link</a></li>
          <li><a href="">And again</a></li>
        </ul>
      </nav>
    `
  },
  document.querySelector('div[data-windowed]')
);
