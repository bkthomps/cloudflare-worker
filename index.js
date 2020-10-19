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
  const links = {
    github: { "name": "GitHub", "url": "https://github.com/bkthomps" },
    linkedin: { "name": "LinkedIn", "url": "https://www.linkedin.com/in/bk-thompson/" },
    angellist: { "name": "AngelList", "url": "https://angel.co/u/bkthomps" }
  };
  const response = JSON.stringify(links, null, 2);
  return new Response(response, {
    headers: { "content-type": "application/json" }
  });
}

async function handleHtml() {
  return new Response("HTML Response", {
    headers: { "content-type": "text/html" }
  });
}
