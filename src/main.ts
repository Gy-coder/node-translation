import * as https from "https";
import * as querystring from "querystring";
import md5 from "md5";
import chalk from "chalk";
import { appId, appSecret } from "../src/private";

type ErrorMap = {
  [key: string]: string;
};

const errorMap: ErrorMap = {
  52003: " 未授权用户 	",
  54001: "签名错误",
  54004: "账户余额不足",
  52002: "系统错误",
  54000: "必填参数为空 	 请检查是否少传参数 ",
};

export const translate = (word: string, from?: string, to?: string) => {
  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);

  const query: string = querystring.stringify({
    q: word,
    from,
    to,
    appid: appId,
    salt,
    sign,
  });

  const options = {
    hostname: "api.fanyi.baidu.com",
    port: 443,
    path: "/api/trans/vip/translate?" + query,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    const chunks: Buffer[] = [];
    res.on("data", (chunk) => {
      chunks.push(chunk);
    });
    res.on("end", () => {
      const str = Buffer.concat(chunks).toString();
      type BaiduResult = {
        error_code?: string;
        error_msg?: string;
        from: string;
        to: string;
        trans_result: { src: string; dst: string }[];
      };
      const obj: BaiduResult = JSON.parse(str);
      if (obj.error_code) {
        console.error(`
          ❌ ${chalk.red(errorMap[obj.error_code] || obj.error_msg)}
        `);
        process.exit(1);
      } else {
        console.error(`
         ✨ ${chalk.green(
           `${word}对应的目标词汇是: ${obj.trans_result[0].dst}`
         )}
        `);
        process.exit(0);
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};
