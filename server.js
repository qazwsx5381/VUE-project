require("dotenv").config();
const express = require("express");
const path = require("path");
const _path = path.join(__dirname, "./dist");
const logger = require("morgan");
const VSchema = require("./mdb.cjs");
const app = express();
const request = require("request");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();
const axios = require("axios");
const cheerio = require("cheerio");
const key = process.env.okey;
const ex_key = process.env.ex_key;
const url = `https://apis.data.go.kr/6260000/BusanBIMS/stopArrByBstopid`;

/* post를 위한 구문 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* 스태딕 경로 */
app.use("/", express.static(_path));
/* 로그 정보(최소화 해서 표현) */
app.use(logger("tiny"));

/* 2. 실시간 환율 */
const price_url = `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${ex_key}&data=AP01`;
function fetchData() {
  axios.post(price_url).then((res) => {
    console.log(res);
  });
}

fetchData();
/* 4. 실시간 번역기 */
const client_id = process.env.naverClientID;
const client_secret = process.env.naverClientSecret;
app.post("/translate", function (req, res) {
  console.log(req.body);
  let sou = req.body.ori_lang;
  let tar = req.body.trans_lang;
  let transLang = req.body.trans_text;
  const api_transurl = "https://openapi.naver.com/v1/papago/n2mt";
  const options = {
    url: api_transurl,
    form: { source: sou, target: tar, text: transLang },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      const trans = JSON.parse(body);
      console.log(trans.message.result.translatedText);
      res.end(trans.message.result.translatedText);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

/* 5. 버스 정보 수신해서 html로 보내기 */
let bus_array = [];
app.post("/busStopnum", (req, res) => {
  const bstop = encodeURIComponent(req.body.busstop);
  const opt = "?bstopid=" + bstop + "&serviceKey=";
  const urlTotal = url + opt + key;
  let _ = "";
  request(urlTotal, (e, re, body) => {
    const view = parser.parse(body);
    const _ = view.response.body.items.item;
    _.forEach((v) => {
      bus_array.push({
        bus_num: v.lineno,
        bus_stopname: v.nodenm,
        bus_carnum: v.carno1,
        bus_carnum1: v.carno2,
        bus_min: v.min1,
        bus_min2: v.min2,
        bus_type: v.bustype,
      });
    });
    bus_array.sort((a, b) => a.bus_min - b.bus_min);
    res.send(bus_array);
    bus_array = [];
  });
});

/* 7. 주식정보(MongoDB CRUD) */
// (1) 주식정보 저장(서버가 켜지면 1분마다 저장 시작)
function datasave() {
  let today = new Date();
  const price_url = `https://kr.investing.com/equities/samsung-electronics-co-ltd`;
  axios.get(price_url).then((res) => {
    const $ = cheerio.load(res.data);
    const price_data = $(".mb-6 .text-5xl").text();
    // console.log(today);
    // console.log(typeof today.toLocaleString());
    (() => {
      const _data = {
        name: "삼성전자",
        data: price_data,
        name_code: "005930",
        time: today.toLocaleString(),
      };
      const vs = new VSchema(_data);
      vs.save();
      console.log(today.toLocaleString(), "저장되었습니다.");
    })();
  });
}
datasave();
setInterval(() => {
  datasave();
}, 60 * 1000);

// (2) 저장된 데이터 내보내기
app.post("/samsungDB", (req, res) => {
  const show_count = req.body.chartData;
  console.log(show_count);
  const read = () => {
    if (show_count === "All") {
      VSchema.find({}, { _id: 0, __v: 0 })
        .sort({ time: -1 })

        .then((rst) => {
          res.send(rst);
        });
    } else {
      VSchema.find({}, { _id: 0, __v: 0 })
        .sort({ time: -1 })
        .limit(show_count)
        .then((rst) => {
          res.send(rst);
        });
    }
  };
  read();
});

// app.get('/dbr/:date', (req, res) => {
//   const date = req.params.date
//   const read = () => {
//     VSchema.findOne({ date }, { _id: 0, __v: 0 })
//       .then((rst) => {
//         res.send(rst)
//         app.post('/dbu', (req, res) => {
//           const edit_title = req.body.title
//           const edit_content = req.body.content
//           const edit_date = req.body.date
//           ;(() => {
//             VSchema.updateOne(
//               { date: { $eq: rst.date } },
//               {
//                 $set: {
//                   title: edit_title,
//                   content: edit_content,
//                   date: edit_date
//                 }
//               }
//             )
//               .then(() => {
//                 res.send('수정이 완료되었습니다.')
//               })
//               .catch((e) => console.error(e))
//           })()
//         })
//       })
//       .catch((e) => console.error(e))
//   }
//   read()
// })

// app.post('/dbd', (req, res) => {
//   const del_date = req.body.del_date
//   console.log(del_date)
//   VSchema.deleteOne({ date: del_date }).then(() => {
//     res.send('삭제가 완료되었습니다.')
//   })
// })

app.listen(3000, () => {
  console.log("3000 포트를 열었습니다.");
});
