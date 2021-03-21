/**
 * Simple script that takes an `input.json` that captures the parameters, options, token, ...
 * for a GitHub rendering request, does the (mermaid) rendering and drops the output in `output.json`
 */

const fs = require('fs').promises;
const path = require('path');

const dataDir = '/extendo-compute'
const inputFile = `${dataDir}/input.json`
const outputFile = `${dataDir}/output.json`

const defaultConfig = { theme: 'default' }
const defaultBackground = 'white'
const defaultViewPort = { width: 800, height: 600, deviceScaleFactor: 1 }

async function createBrowser(mode) {
  if (mode === 'lambda') {
    console.log('1 ...')
    const chromium = require('chrome-aws-lambda');
    const params = {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true, // chromium.headless,
      ignoreHTTPSErrors: true,
    }
    return chromium.puppeteer.launch(params)
  } else if (mode === 'local') {
    const puppeteer = require('puppeteer')
    return puppeteer.launch({ args: ['--no-sandbox'] })
  }
}

async function render(definition, inputs) {
  console.log('In runner...')
  const browser = await createBrowser(process.env.MODE || 'local')
  console.log('2 ...')
  const page = await browser.newPage();
  console.log('3 ...')
  page.setViewport({ ...defaultViewPort, ...inputs.viewPort });
  await page.goto(`file://${path.join(__dirname, './node_modules/@mermaid-js/mermaid-cli', 'index.html')}`);
  console.log('4 ...')
  await page.evaluate(`document.body.style.background = '${inputs.backgroundColor || defaultBackground}'`);

  function setup(container, definition, config) {
    console.log('in setup ...')
    container.textContent = definition;
    window.mermaid.initialize(config);
    try {
      window.mermaid.init(undefined, container);
      return { status: 'success' };
    } catch (error) {
      return { status: 'error', error, message: error.message };
    }
  }
  const config = { ...defaultConfig, ...inputs.config }
  const result = await page.$eval('#container', setup, definition, config);
  if (result.status === 'error') throw new Error(result.message);

  const svg = await page.$eval('#container', container => container.innerHTML)
  await browser.close();
  return svg
}

console.log('starting')
module.exports = async () => {
  console.log('running')
  try {
    const inputData = await fs.readFile(inputFile)
    console.log(inputData)
    const { content, options } = JSON.parse(inputData)
    const svg = await render(content, options)
    console.log(svg)
    const response = { html: svg }
    await fs.writeFile(outputFile, JSON.stringify(response))
  } catch (error) {
    console.log(error.message)
    await fs.writeFile(outputFile, JSON.stringify({ error }, null, 2))
    process.exit(1)
  }
}
