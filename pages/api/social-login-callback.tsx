import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(404).send(undefined);
    return;
  }

  res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
<html>
<head>
<script>
  const response = ${JSON.stringify(req.body)}.data;
  window.localStorage.setItem("socialAuthData", response);
  window.close();
</script>
</head>
<body/>
</html>
`);
}
