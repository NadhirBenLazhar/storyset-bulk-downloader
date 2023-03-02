import axios from 'axios'
import * as fs from 'fs'
import headers from './headers.js'

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchTotalFiles(theDir, theStyle) {

  let originals = []
  console.log('\nfetch: ')
  const lastPageData = await axios.get(`https://stories.freepiklabs.com/api/vectors?style=${theStyle}`, { headers: headers })
  const lastPage = parseInt(lastPageData.data.meta.last_page)
  for (const value of generateSequence(1, lastPage)) {
    process.stdout.write(`${value}, `)
    const data = await axios.get(`https://stories.freepiklabs.com/api/vectors?style=${theStyle}&page=${value}&order=recent&app=true`, { headers: headers })
    originals.push(...data.data.data)
  }
  console.log(`\ntotal: ${originals.length}`)
  await fs.promises.writeFile(`./data/${theDir}-${theStyle}.json`, JSON.stringify(originals))

}

async function downloadFiles(theDir, theStyle) {
  await fs.promises.rm(`./data/${theDir}-${theStyle}`, { recursive: true, force: true })
  await fs.promises.mkdir(`./data/${theDir}-${theStyle}`)
  const originals = await fs.promises.readFile(`./data/${theDir}-${theStyle}.json`, 'utf-8')
  const originalsArray = JSON.parse(originals)
  console.log(`\ntotal: ${originalsArray.length}`)
  console.log('\nwriteFile: ')
  for (const [l, link] of originalsArray.entries()) {

    if (l >= 0) {
      process.stdout.write(`${l}, `)
      try {
        const res = await axios.get(link.src, { responseType: "arraybuffer" });
        await fs.promises.writeFile(`./data/${theDir}-${theStyle}/${l}.svg`, res.data);
      } catch (error) {
        console.log('error: ' + error)
      }
    }
  }
  console.log('\n')
}

async function changeToColor(theColor, theDir, theStyle) {
  const files = await fs.promises.readdir(`./data/${theDir}-${theStyle}/`)
  await fs.promises.rm(`./data/${theColor}-${theStyle}`, { recursive: true, force: true })
  await fs.promises.mkdir(`./data/${theColor}-${theStyle}`)
  console.log('\neditFile: ')
  for (const [f, file] of files.entries()) {
    if (f >= 0) {
      process.stdout.write(`${f}, `)
      const data = await fs.promises.readFile(`./data/${theDir}-${theStyle}/${file}`, "utf8")
      const newData = data.toString().replace(/#BA68C8/g, theColor.toString())
      await fs.promises.writeFile(`./data/${theColor}-${theStyle}/${file}`, newData)
    }
  }
  console.log('\n')
}
(async () => {
  // default folder name
  const dir = 'original'
  // default style: rafiki, bro, amico, pana, cuate
  const style = 'amico'
  // run this first alone
  await fetchTotalFiles(dir, style)
  // run this second alone
  // await downloadFiles(dir, style)
  // run this third alone
  // await changeToColor('#f97316', dir, style)
})()