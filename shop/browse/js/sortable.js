var createTable = function (target, data, css) {
  // (A) SORT FUNCTION
  // CREDITS: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  let sflag = { key: null, direction: true }, // chosen key to sort by
    sorder = []; // sort order
  let tsort = function () {
    // (A1) SET SORTING KEY (REVERSE SORT IF CLICK ON FIELD TWICE)
    let skey = this.innerHTML;
    if (sflag.key == skey) {
      sflag.direction = !sflag.direction;
    } else {
      sflag.key = skey;
      sflag.direction = true;
    }

    // (A2) MAP ARRAY TO BE SORTED
    var mapped = data[this.innerHTML].map(function (v, i) {
      return { i: i, v: v };
    });

    // (A3) SORT ARRAY - RETAIN INDEX POSITIONS
    if (sflag.direction) {
      mapped.sort(function (a, b) {
        if (a.v > b.v) {
          return 1;
        }
        if (a.v < b.v) {
          return -1;
        }
        return 0;
      });
    } else {
      mapped.sort(function (a, b) {
        if (a.v < b.v) {
          return 1;
        }
        if (a.v > b.v) {
          return -1;
        }
        return 0;
      });
    }

    // (A4) NEW SORT ORDER
    sorder = [];
    for (var idx in mapped) {
      sorder.push(mapped[idx].i);
    }

    // (A5) REDRAW TABLE
    tdraw();
  };

  // (B) DEAL WITH HTML TABLE
  target = document.getElementById(target);
  let etable = null,
    ehead = null,
    ehrow = null,
    ebody = null;

  // (B1) ADAPT FROM EXISTING HTML TABLE
  if (target.tagName == "TABLE") {
    // Adapt elements
    etable = target;
    ehead = etable.getElementsByTagName("thead")[0];
    ehrow = ehead.getElementsByTagName("tr")[0];
    ebody = etable.getElementsByTagName("tbody")[0];

    // Adapt data - get keys + attach click to sort
    data = {};
    let keys = [];
    for (let i of ehead.getElementsByTagName("th")) {
      keys.push(i.innerHTML);
      data[i.innerHTML] = [];
      i.addEventListener("click", tsort);
    }

    // Adapt data - get values
    let j = 0;
    for (let i of ebody.getElementsByTagName("td")) {
      if (j >= keys.length) {
        j = 0;
      }
      data[keys[j]].push(i.innerHTML);
      j++;
    }
  }

  // (B2) CREATE NEW TABLE
  else {
    etable = document.createElement("table");
    ehead = document.createElement("thead");
    ehrow = document.createElement("tr");
    ebody = document.createElement("tbody");
    etable.appendChild(ehead);
    etable.appendChild(ebody);
    ehead.appendChild(ehrow);
    target.appendChild(etable);
  }
  if (css) {
    etable.classList.add(css);
  }

  // (C) DRAW TABLE ROWS
  let tdraw = function () {
    // (C1) REMOVE OLD SORT ORDER
    ebody.innerHTML = "";

    // (C2) DRAW NEW SORT ORDER
    let row = null,
      title = null,
      cell = null;
    for (let i = 0; i < sorder.length; i++) {
      row = document.createElement("tr");
      row.id = `dataItem${i + 1}`;
      ebody.appendChild(row);
      let o = 0;
      for (let key in data) {
        cell = document.createElement("td");
        cell.id = `item${[i + 1]}${titles[sorder[o]]}`;
        o++;
        cell.innerHTML = data[key][sorder[i]];
        row.appendChild(cell);
      }
    }
  };

  let titles = [];
  // (D) FOR NEW TABLES ONLY
  if (target.tagName != "TABLE") {
    // (D1) CREATE HEADER CELLS
    let cell,
      title,
      i = 0;
    for (title in data) {
      cell = document.createElement("th");
      cell.innerHTML = title;
      titles[i] = title;
      cell.addEventListener("click", tsort);
      ehrow.appendChild(cell);
      i++;
    }

    // (D2) DRAW TABLE ROWS
    for (let i = 0; i < data[title].length; i++) {
      sorder.push(i);
    }
    tdraw();
  }
};
