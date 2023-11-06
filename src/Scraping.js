import React, { useEffect } from "react";
const { Cluster } = require("puppeteer-cluster");
const fs = require("fs");

function Scraping() {
  useEffect(() => {
    const haxhijahaUrl = "https://b2bhaxhijahatrade.com/CustomerLogin/";
    // const autollapiUrl = "http://www.autollapi.com/b2b/";
    const urls = [haxhijahaUrl];

    (async () => {
      const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 100,
        // monitor: true,
        puppeteerOptions: {
          headless: false,
          defaultViewport: false,
          userDataDir: "./tmp",
        },
      });

      cluster.on("taskerror", (err, data) => {
        console.log(`Error crawling ${data}: ${err.message}`);
        console.log(err);
      });

      await cluster.task(async ({ page, data: url }) => {
        await page.goto(url, { timeout: 50000 });
        // await page.waitForTimeout(30000);

        url === haxhijahaUrl
          ? await page.screenshot({ path: "haxhijaha.png" })
          : await page.screenshot({ path: "autollapi.png" });

        let selector = "div.card-body";
        let usernamePlaceholder = "Null";
        let passwordPlaceholder = "Null";
        let username = "Europa F.Kosove";
        let password = "Europa@8751";
        let usernameValue = "null";
        let passwordValue = "null";
        let usernameClicked = false;
        let passwordClicked = false;
        let loginButtonClicked = false;
        let searchBoxClicked = false;
        let searchBtnClicked = false;

        const loginHandle = await page.$$(selector, { timeout: 50000 });
        for (const loginField of loginHandle) {
          try {
            usernamePlaceholder = await page.evaluate(
              (el) =>
                el.querySelector("#usernameTB").getAttribute("placeholder"),
              loginField
            );
            usernameValue = await page.evaluate(
              (el, username) => {
                el.querySelector("#usernameTB").value = username;
                return el.querySelector("#usernameTB").value;
              },
              loginField,
              username
            );

            // await page.waitForTimeout(4000);
            usernameClicked = await page.$("#usernameTB", { visible: true });
            await usernameClicked.click();
            await page.waitForTimeout(1000);

            // if (usernamePlaceholder) {
            //   usernameClicked = await page.$("#usernameTB", { visible: true });
            //   await Promise.all([
            //     usernameClicked.click(),
            //     page.waitForNavigation(),
            //   ]);
            // } else {
            //   passwordClicked = await page.$("#passwordTB", { visible: true });
            //   await Promise.all([
            //     passwordClicked.click(),
            //     page.waitForNavigation(),
            //   ]);
            // }
          } catch (error) {}
          try {
            passwordPlaceholder = await page.evaluate(
              (el) =>
                el.querySelector("#passwordTB").getAttribute("placeholder"),
              loginField
            );
            passwordValue = await page.evaluate(
              (el, password) => {
                el.querySelector("#passwordTB").value = password;
                return el.querySelector("#passwordTB").value;
              },
              loginField,
              password
            );
            passwordClicked = await page.$("#passwordTB", { visible: true });
            await passwordClicked.click();
            await page.waitForTimeout(1000);
          } catch (error) {}
        }

        console.log(usernamePlaceholder + " : " + username);
        console.log(passwordPlaceholder + " : " + password);

        loginButtonClicked = await page.$("#loginbtn", { visible: true });
        await loginButtonClicked.click();
        await page.waitForNavigation(
          { waitUntil: "networkidle2" },
          { timeout: 40000 }
        );

        searchBoxClicked = await page.$("#SearchBox", { visible: true });
        await searchBoxClicked.click();
        await page.$eval("#SearchBox", (el) => (el.value = "FN288"));
        await page.waitForTimeout(1000);

        searchBtnClicked = await page.$("a.btn.btn-secondary.shadow", {
          visible: true,
        });
        await page.evaluate((searchBtnClicked) => {
          searchBtnClicked.style.backgroundColor = "orange";
          // return searchBtnClicked;
        }, searchBtnClicked);

        await searchBtnClicked.click();

        console.log("U klikua butoni Login");
        await page.waitForNavigation({
          waitUntil: "networkidle2",
          timeout: 40000,
        });
        await page.waitForTimeout(6000);
        console.log(
          "Mire se erdhet ne faqen kryesore, kyçja u realizua me sukses"
        );

        const productsHandles = await page.$$("div.mainDiv", {
          timeout: 50000,
        });
        console.log(
          "Gjithsej rezultate te gjetura per: FN288 : " + productsHandles.length
        );
        console.log("...");
        let numri = 0;

        for (const producthandle of productsHandles) {
          let title = "Null";
          let price = "Null";
          let img = "Null";
          try {
            title = await page.evaluate(
              (el) => el.querySelector("h6.productTitle").textContent,
              producthandle
            );
          } catch (error) {}

          try {
            price = await page.evaluate(
              (el) => el.querySelector("p.productFinalPrice").textContent,
              producthandle
            );
          } catch (error) {}

          try {
            img = await page.evaluate(
              (el) => el.querySelector("img.zoomImg").getAttribute("src"),
              producthandle
            );
          } catch (error) {}

          if (title !== null) {
            numri++;
            console.log(
              `Produkti: ${numri},  --  ${title}, ${img}, ${price}\n`
            );

            fs.appendFile(
              "HaxhijahaResults.csv",
              `Produkti: ${numri}, ${title}, ${img}, ${price}\n`,
              function (err) {
                if (err) throw err;
              }
            );
          }
        }
        console.log("Saved to csv!");

        await page.waitForTimeout(6000);
      });
      for (const url of urls) {
        await cluster.queue(url);
      }

      // many more pages

      await cluster.idle();
      await cluster.close();
    })();
  });

  return <div></div>;
}

export default Scraping;
