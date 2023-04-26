const getCookie = (c, n) => c && c.split("; ").filter(i => i.startsWith(n)).pop()?.slice(n.length+1);
let verified = new Set();
let onverify = new Map();
let normalreq = ["GET", "HEAD"];
let max = 3;
let cookiename = "__nobot_sid";
let body = '<html><head><meta http-equiv="refresh" content="1" /></head><body><p>Checking your browser....</p><p>If this page does not refresh automatically, Please refresh.</p></body></html>'

module.exports = (req, res, n) => {
  const sid = getCookie(req.headers?.cookie, cookiename);

  if ((onverify.get(sid) || 0) <= max) {
    const newSid = Date.now() + "_" + Math.random().toString(36).slice(2)
    let curSess = onverify.get(sid);

    if (curSess) onverify.delete(sid);
    if (!curSess) curSess = 0;
    onverify.set(newSid, curSess+1);
    return res.writeHead(203, {
      "Set-Cookie": `${cookiename}=${newSid}`,
      "Content-Type": "text/html",
      "Content-Length": body.length
    }).end(body);
  } else if (onverify.get(sid) >= max)
    verified.add(sid);

  if (!normalreq.includes(req.method))
    verified.delete(sid);

  n();
};

module.exports.setMax = _ => max = _;
module.exports.setCookieName = _ => cookieName = _;

setInterval(() => {
  onverify.forEach((i, n) => {
    onverify.delete(n);
  });
}, 10000);
