const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

var http = require('http')
var url = require('url')
//var util = require('util')

http
.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    var params = url.parse(req.url, true).query
    console.log(new Date().toLocaleString() +
      '=======开始下单======='
    )

    console.log('goods_id:' + params.goods_id +' money:'+ params.money + '元 num:' + params.num + ' pay_type:' + params.pay_type + ' user_id:' + params.user_id + ' AccessToken:' + params.AccessToken + ' proxyUrl:' + params.proxyUrl);
    (async function () {
      res.writeHeader(200, {
        'Content-Type': 'application/json;charset=UTF-8'
      })
      var data = await get_data(
        params.goods_id,
        params.pay_type,
        params.num,
        params.user_id,
        params.phone,
        params.AccessToken,
        params.proxyUrl
      )

      res.write(JSON.stringify(data))
      res.end()
    })().catch(err => {
		 console.log('--- log 4 -----')
      console.log(err)
       console.log('--- log 5 -----')

      res.end()

    })
  }
})
.listen(3000)
console.log(new Date().toLocaleString() +'=======启动成功=======')
const get_data = async (
  goods_id,
  pay_type = 0,
  num = params.num,
  user_id,
  phone,
  AccessToken,
  proxyUrl = ''
) => {
  //let cookieString2 ='api_uid=rBRqfl08NZmXohhmCqSWAg==; _nano_fp=Xpdjn0Pxn5U8X0danT_A8i9dxItV1g~k0ieigm6n; msec=1800000; pdd_user_id=9752959190402; pdd_user_uin=PPUVE6JZKKHIZIIXFWZDDMWMVE_GEXDA; goods_detail=goods_detail_kJJHXF; rec_list_order_detail=rec_list_order_detail_rRhGBd; PDDAccessToken=VGYK2SMADRBKSK7MPIEWVDYCUGJGLGZS2IGGZAAIIJ6QLDWHYHCQ10182b3; ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F76.0.3809.132%20Safari%2F537.36; webp=1; rec_list_mall_bottom=rec_list_mall_bottom_WLt26s; goods_detail_mall=goods_detail_mall_1AI1Gx; rec_list_index=rec_list_index_2yuzlb; JSESSIONID=1D7C02B21F02ECA8F2D1F4C5FC8EE57F'

  let cookieString =
    'msec=1800000; pdd_user_id=' +
    user_id +
    '; PDDAccessToken=' +
    AccessToken +
    '; ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F76.0.3809.132%20Safari%2F537.36; webp=1; rec_list_mall_bottom=rec_list_mall_bottom_WLt26s; goods_detail_mall=goods_detail_mall_1AI1Gx; rec_list_index=rec_list_index_2yuzlb;'

  const browser = await puppeteer.launch({
    // headless: false,
    // devtools: true, // 开启开发者控制台
    // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', //path to your chrome
    //args: ['--no-sandbox']
    args: ['--no-sandbox', `--proxy-server=${proxyUrl}`]
  })
  try {
    const page = await browser.newPage()

    await addCookies(cookieString, page, 'mobile.yangkeduo.com')
    /* let cookies={
  ////aaaadsadfaadsf  asdf  a
  }
  for(let data of cookies){
      await page.setCookie(data)
  } */
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    )
    await page.tracing.start({
      path: './trace.json'
    })
    //await page.setRequestInterception(true)
    await page.goto(
      'https://mobile.yangkeduo.com/goods.html?goods_id=' +
      goods_id +
      '&refer_page_name=goods_detail&refer_page_id=10014_1568971038562_2vmifZaj3c&refer_page_sn=10014', {
        waitUntil: 'networkidle2' // 等待网络状态为空闲的时候才继续执行
      }
    )

    // let scrollEnable = false;
    // let scrollStep = 500; //每次滚动的步长
    // while (scrollEnable) {
    //     scrollEnable = await page.evaluate((scrollStep) => {
    //         let scrollTop = document.scrollingElement.scrollTop;
    //         document.scrollingElement.scrollTop = scrollTop + scrollStep;
    //         return document.body.clientHeight > scrollTop + 1080 ? true : false
    //     }, scrollStep);
    //     await page.waitFor(100)
    // }
    // await page.evaluate(_ => {
    //     window.scrollBy(0, 100)
    // });
    // if (
    //   page.url().indexOf('verification') !== -1
    // ) {
    //   //登录不成功
    //   console.log(page.url())
    //   console.log('需要划动')
    //   //等待再一次跳转
    //   while (true) {
    //     await page.waitForNavigation({
    //       waitUntil: 'load'
    //     })
    //
    //     if (
    //       page.url().indexOf('verification') == false
    //     ) {
    //       console.log('划动成功')
    //       break
    //     }
    //   }
    // }
 if (
      page.url().indexOf('verification') !== -1
    ) {
      //登录不成功
      console.log(page.url())
      console.log('需要划动')
      //等待再一次跳转
	  
	}
    await page.waitForSelector('div[data-active=before-red] span', {
      timeout: 2000
    })
    const inputElement = await page.$('div[data-active=before-red] span')

    //const inputElement = await page.$('._3r8Ds_Kf');
    //await console.log(inputElement);
    await inputElement.click()
    //await page.waitFor(300)
    await page.waitForSelector('.oc-payment-item-padding', {
      timeout: 2000
    })

    const inputElement2 = await page.$$('.oc-payment-item-padding')
    await page.waitFor(100)
    await inputElement2[pay_type].click()

    await page.waitForSelector('input', {
      timeout: 2000
    })

    searchInputs = await page.$('input[placeholder=请输入账号]')
    if (searchInputs) {

      //await page.waitForSelector('input', {
      //timeout: 4000
      // })
      // await page.waitFor(300)
      //await page.waitFor('input[placeholder=请输入账号]')
      await page.type('input', phone)
      await page.waitFor(300)

    }

    // await page.waitForSelector('.oc-goods-increase', {
    //   timeout: 4000
    // })
    if (num > 1) {
      console.log('购买数量:'+num +'个' )
      const add_button = await page.$('input[type=number]+div')

      for (let index = 1; index < num; index++) {
        await add_button.click()
        await page.waitFor(100)
      }
    }
    //延时操作 模拟更真}

    // await inputElement3.click()

    //await page.waitFor(300)
    const inputElement3 = await page.$('div[data-active=red]')

    inputElement3.click()

    // page.on('response', response => {
    //   if (
    //     response.url().indexOf('https://mobile.yangkeduo.com/proxy/api/order') !==
    //     -1
    //   ) {
    //     ;(async function() {
    //       let resa = await response.text()
    //       console.log(resa)
    //     })()
    //   }

    //let result = await res.json();
    // data.fp_id = res
    //})
    let data = {}
    return new Promise(function (resolve) {
      page.on('requestfinished', request => {
        data.url = request.url()

        if (
          request
          .url()
          .indexOf('https://mobile.yangkeduo.com/proxy/api/order?') !== -1
        ) {
          ;
          (async function (data) {
            let resa = await request.response().json()
            data.fp_id = resa.fp_id
            data.order_amount = resa.order_amount / 100
          })(data)
        }
        if (
          data.url.indexOf(
            'https://mobile.yangkeduo.com/transac_wechat_wapcallback.html?option_json'
          ) !== -1
        ) {
          data.referer = data.url
          data.order_sn = parseQueryString(data.referer).order_sn
        }

        if (
          data.url.indexOf('https://mapi.alipay.com/gateway.do') !== -1 ||
          data.url.indexOf('https://wx.tenpay.com/cgi-bin') !== -1
        ) {
          browser.close()
          if (data.referer) {
            data.order_sn = parseQueryString(data.referer).order_sn
          } else {
            data.order_sn = parseQueryString(
              decodeURIComponent(parseQueryString(data.url).return_url)
            ).order_sn
          }
          console.log(data)
          console.log('\n')
          resolve(data)
        }

      })
    })
  } catch (err) {
	   console.log('--- log 1 -----')
	browser.close()
	   console.log('--- log 2 -----')
    console.log(err)
	 console.log('--- log 3 -----')
  
  }
}
const parseQueryString = url => {
  var json = {}
  var arr = url.substr(url.indexOf('?') + 1).split('&')
  arr.forEach(item => {
    var tmp = item.split('=')
    json[tmp[0]] = tmp[1]
  })
  return json
}

const addCookies = async (cookies_str, page, domain) => {
  let cookies = cookies_str.split(';').map(pair => {
    let name = pair.trim().slice(0, pair.trim().indexOf('='))
    let value = pair.trim().slice(pair.trim().indexOf('=') + 1)
    return {
      name,
      value,
      domain
    }
  })
  await Promise.all(
    cookies.map(pair => {
      //  console.log(pair)
      return page.setCookie(pair)
    })
  )
}
