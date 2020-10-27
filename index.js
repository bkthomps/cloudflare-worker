const links = [
  { "name": "GitHub", "url": "https://github.com/bkthomps" },
  { "name": "LinkedIn", "url": "https://www.linkedin.com/in/bk-thompson/" },
  { "name": "AngelList", "url": "https://angel.co/u/bkthomps" }
];

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const uri = url.pathname;
  if (uri === "/links") {
    return handleJson();
  }
  return handleHtml();
}

async function handleJson() {
  const response = JSON.stringify(links, null, 2);
  return new Response(response, {
    headers: { "content-type": "application/json" }
  });
}

async function handleHtml() {
  const staticPage = await fetch("https://static-links-page.signalnerve.workers.dev");
  return new HTMLRewriter()
    .on("div#links", new LinksTransformer())
    .on("img#avatar", { element: e => e.setAttribute("src", "https://assets.foxdcg.com/dpp-uploaded/images/cosmos-possible-worlds/keyart_s2cosmo.jpg") })
    .on("h1#name", { element: e => e.setInnerContent("Bailey Thompson") })
    .transform(staticPage);
}

class LinksTransformer {
  element(element) {
    links.forEach(function(link) {
      const entry = "<a href=\"" + link.url + "\">" + link.name + "</a>";
      element.append(entry, { html: true });
    });
  }
}
