// frontend logic
(() => {
  const display = document.getElementById('display');
  const buttons = document.getElementById('buttons');
  const historyList = document.getElementById('historyList');

  let current = '';
  let lhs = null;
  let op = null;
  let shouldReset = false;
  let history = [];

  // render display
  function render() {
    display.textContent = current || '0';
  }

  // push to history
  function pushHistory(text) {
    history.unshift(text);
    if (history.length > 30) history.pop();
    historyList.innerHTML = history.map(h => `<li>${h}</li>`).join('');
  }

  // call server API for arithmetic
  async function computeServer(a, b, operation) {
    try {
      const url = `/calc?num1=${encodeURIComponent(a)}&num2=${encodeURIComponent(b)}&op=${operation}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(await res.text());
      return await res.text();
    } catch (err) {
      return `Error: ${err.message}`;
    }
  }

  // handle equals - uses server to compute
  async function handleEquals() {
    if (lhs === null || op === null) return;
    const rhs = parseFloat(current || '0');
    const resultText = await computeServer(lhs, rhs, op);
    pushHistory(`${lhs} ${op} ${rhs} = ${resultText.split('=').pop().trim()}`);
    current = (resultText.split('=').pop().trim());
    lhs = null; op = null; shouldReset = true;
    render();
  }

  // handle button clicks
  buttons.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.matches('button')) return;

    const t = target.textContent;
    const action = target.dataset.action;
    const dataOp = target.dataset.op;

    if (action === 'clear') { current = ''; lhs = null; op = null; render(); return; }
    if (action === 'plusminus') { current = (parseFloat(current || '0') * -1).toString(); render(); return; }
    if (action === 'percent') { current = (parseFloat(current || '0') / 100).toString(); render(); return; }

    if (dataOp) {
      // operation pressed: send previous to server later
      if (lhs === null) {
        lhs = parseFloat(current || '0');
        current = '';
        op = dataOp;
      } else {
        // chain: compute previous then set op
        (async () => {
          const rhs = parseFloat(current || '0');
          const txt = await computeServer(lhs, rhs, op);
          const val = parseFloat(txt.split('=').pop().trim());
          pushHistory(`${lhs} ${op} ${rhs} = ${val}`);
          lhs = val;
          current = '';
          op = dataOp;
          render();
        })();
      }
      return;
    }

    if (action === 'equals') { handleEquals(); return; }

    // numbers and dot
    if (action === '.') {
      if (current.includes('.')) return;
      current += '.';
      render();
      return;
    }

    // numeric zero action
    if (action === '0') {
      current += '0';
      render();
      return;
    }

    // normal number button
    if (!isNaN(t)) {
      if (shouldReset) { current = ''; shouldReset = false; }
      current += t;
      render();
    }
  });

  // theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('change', (e) => {
    document.body.classList.toggle('dark', e.target.checked);
    // store choice
    localStorage.setItem('calcThemeDark', e.target.checked ? '1' : '0');
  });
  // initialize theme
  if (localStorage.getItem('calcThemeDark') === '1') {
    themeToggle.checked = true;
    document.body.classList.add('dark');
  }

  // Age from DOB
  document.getElementById('calcAge').addEventListener('click', () => {
    const dobVal = document.getElementById('dob').value;
    const out = document.getElementById('ageResult');
    if (!dobVal) { out.textContent = 'Please choose a date.'; return; }
    const dob = new Date(dobVal);
    const now = new Date();
    if (dob > now) { out.textContent = 'DOB cannot be in the future.'; return; }
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();
    if (days < 0) { months -= 1; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years -= 1; months += 12; }
    out.textContent = `${years} years, ${months} months, ${days} days`;
  });

  // Time converter
  document.getElementById('convertTime').addEventListener('click', () => {
    const val = parseFloat(document.getElementById('timeIn').value);
    const unit = document.getElementById('timeUnit').value;
    const out = document.getElementById('timeResult');
    if (isNaN(val)) { out.textContent = 'Enter a number.'; return; }
    let secs = 0;
    if (unit === 'seconds') secs = val;
    if (unit === 'minutes') secs = val * 60;
    if (unit === 'hours') secs = val * 3600;
    out.innerHTML = `Seconds: ${secs}<br>Minutes: ${secs/60}<br>Hours: ${secs/3600}`;
  });

  // Base converter
  document.getElementById('toBin').addEventListener('click', () => {
    const v = parseInt(document.getElementById('baseIn').value, 10);
    const out = document.getElementById('baseResult');
    if (isNaN(v)) { out.textContent = 'Enter a valid decimal number.'; return; }
    out.textContent = `Binary: ${v.toString(2)}`;
  });
  document.getElementById('toHex').addEventListener('click', () => {
    const v = parseInt(document.getElementById('baseIn').value, 10);
    const out = document.getElementById('baseResult');
    if (isNaN(v)) { out.textContent = 'Enter a valid decimal number.'; return; }
    out.textContent = `Hex: ${v.toString(16).toUpperCase()}`;
  });

  // initial render
  render();
})();
