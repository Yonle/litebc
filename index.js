const getCookie = (c, n) => c && c.split("; ").filter(i => i.startsWith(n)).pop()?.slice(n.length+1);
let verified = new Set();
let onverify = new Map();
let normalreq = ["GET", "HEAD"];
let max = 2;
let cookiename = "__nobot_sid";

module.exports = (req, res, n) => {
  //if (!req.headers.cookie) return res.writeHead(400).end("Your browser is unsupported.");
  const sid = getCookie(req.headers?.cookie, cookiename);

  if (!sid || onverify.get(sid) < max) {
    const newSid = Date.now() + "_" + Math.random().toString(36).slice(2)
    let curSess = onverify.get(sid);

    if (curSess) onverify.delete(sid);
    if (!curSess) curSess = 1;
    onverify.set(newSid, curSess+1);
    return res.writeHead(307, {
      "Set-Cookie": `${cookiename}=${newSid}; path=/`,
      "Location": req.url
    }).end();
  } else if (onverify.get(sid) >= max) {
    verified.add(sid);
    return n();
  }

  if (!normalreq.includes(req.method)) {
    verified.delete(sid);
    return n();
  }
};

module.exports.setMax = _ => max = _;
module.exports.setCookieName = _ => cookieName = _;
