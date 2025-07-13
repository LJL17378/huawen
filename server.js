// /home/huawenfrontend/server.js
const { createServer } = require('http');
const { loadVercelBuildOutput } = require('@vercel/node');

// 加载 Vercel 构建输出
const buildOutput = require('./.vercel/output/config.json');
const app = loadVercelBuildOutput(buildOutput);

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = createServer(async (req, res) => {
  try {
    // 处理请求
    await app.fetch(req, res);
  } catch (error) {
    console.error('Server Error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});