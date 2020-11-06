const Base64 = require('js-base64').Base64;
const md5 = require('js-md5');
const qs = require('qs');
const http = require('http');
const fs = require('fs');
const { mp3FilePath, resUrl } = require('./constant');
function createVoice(req, res) {
  // const text = req.query.text;
  // const lang = req.query.lang;
  const text =
    '讯飞开放平台配备完善的基于B/S架构的管理平台，按照权限登录，可实时监视开放平台服务状态；自动化监控、自动化部署以及自动化测试等平台为开放平台的稳定运行全程护航；利用云计算、大数据等相关技术处理完备的日志记录，为服务性能的提升、优化提供支持。';
  const lang = 'cn';
  const engineType = 'intp65';
  if (lang.toLowerCase == 'en') {
    engineType = 'intp65_en';
  }
  const speed = '30';
  const voiceParam = {
    auf: 'audio/L16;rate=16000',
    aue: 'lame',
    voice_name: 'xiaoyan',
    speed,
    volume: '50',
    pitch: '50',
    engine_type: engineType,
    text_type: 'text'
  };
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const apiKey = '473e2fac657852ff176ad0920ad58f46';
  const appId = '5fa4fbad';
  const xParam = Base64.encode(JSON.stringify(voiceParam));
  const checkSum = md5(apiKey + currentTime + xParam);
  const headers = {};
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  headers['X-Param'] = xParam;
  headers['X-Appid'] = appId;
  headers['X-CurTime'] = currentTime;
  headers['X-CheckSum'] = checkSum;
  headers['X-Real-Ip'] = '192.168.1.234';
  const data = qs.stringify({
    text: text
  });
  const options = {
    host: 'api.xfyun.cn',
    path: '/v1/service/v1/tts',
    method: 'POST',
    headers
  };
  const request = http.request(options, response => {
    let mp3 = '';
    const contentLength = response.headers['content-length'];
    response.setEncoding('binary');
    response.on('data', data => {
      mp3 += data;
      const process = (data.length / contentLength) * 100;
      const percent = parseInt(process.toFixed(2));
      // console.log(percent);
    });
    response.on('end', () => {
      console.log(response.headers);
      console.log(mp3);
      const contentType = response.headers['content-type'];
      if (contentType === 'text/html') {
        // res.json({
        //   error_code: 1,
        //   // 此时MP3 是一个html文件 404
        //   msg: mp3
        // });
        res.send(mp3);
      } else if (contentType === 'text/plain') {
        res.send(mp3);
      } else {
        const fileName = new Date().getTime();
        const filePath = `${mp3FilePath}/${fileName}.mp3`;
        // nginx 路径
        const downloadUrl = `${resUrl}/mp3/${fileName}.mp3`;
        // console.log(filePath, downloadUrl);
        fs.writeFile(filePath, mp3, 'binary', err => {
          if (err) {
            res.json({
              error_code: 1,
              msg: '下载失败'
            });
          } else {
            res.json({
              error_code: 0,
              msg: '下载成功',
              path: downloadUrl
            });
          }
        });
      }
    });
  });
  request.write(data);
  request.end();
}

module.exports = createVoice;
