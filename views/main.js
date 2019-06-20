const html = require("html-template-tag");
const layout = require("./layout");

//const moduleLoop =

module.exports = pages =>
  layout(html`
    <h3>Pages</h3>
    <hr />
    <form method="GET" action="/wiki/search">
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </form>
    <hr />
    <ul class="list-unstyled">
      ${pages.map(page => {
        return html`
          <li><a href="/wiki/${page.slug}">'${page.title}'</a></li>
        `;
      })}
    </ul>
  `);

// for (let i = 0; i < pages.length; i++) {
//   const li = document.createElement("li");
//   const anchor = document.createElement("a");
//   const linkAttribute = document.createAttribute("href");
//   //linkAttribute.value = pages[i].slug;
//   anchor.setAttribute(linkAttribute, pages[i].slug);
//   const nameAttribute = document.createAttribute("name");
//   anchor.setAttribute(nameAttribute, pages[i].title);
//   li.appendChild(anchor);

//   const pageLinks = document.getElementById("page-links");
//   pageLinks.appendChild(li);
//}
