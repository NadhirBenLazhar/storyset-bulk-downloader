# storyset-bulk-downloader
Download &amp; Change the Color of all Storyset SVG Illustrations

## Support Open Source
1. `Star` and `Watch` this repository.
2. `Follow NadhirBenLazhar` everywhere.
3. `Mention Storyset` in your projects.
```html
<a href="https://storyset.com/">illustrations by Storyset</a>
```
4. `Donate` to open source projects.

## Screenshot of results
![](https://github.com/NadhirBenLazhar/storyset-bulk-downloader/raw/main/images/screenshot.png)



## Prerequisites

1. Node
2. Yarn or NPM
3. Git

## Usage
1. Clone the repo:
```bash
git clone https://github.com/NadhirBenLazhar/storyset-bulk-downloader
```
2. Go inside the dir:
```bash
cd ./storyset-bulk-downloader/
```
3. Install packages.
```bash
yarn install // or npm install
```
4. Open `index.js`
```bash
code .
```
5. Set default folder name:
```JS
  // default folder name
  const dir = 'original'
```
6. Set default style:
```JS
  // default style: rafiki, bro, amico, pana, cuate
  const style = 'amico'
```
7. Add your color `#f97316` to generate a set with the custom color:
```JS
  await changeToColor('#f97316', dir, style)
```
8. Run the command to start:

```bash
node index.js
```

## Functions
- `fetchTotalFiles`: fetch all files links and store results in `.json` file.
- `downloadFiles`: download all svg files and store them in the chosen folder name.
- `changeToColor`: edit `svg` files color with chosen color and generate a new set.

```bash
node index.js
```

## Final results
```
└── data
    ├── #f97316-amico
    │   ├── 0.svg
    │   ├── 1.svg
    │   └── 2.svg
    │   └── ...
    ...
    ├── original-amico
    │   ├── 0.svg
    │   ├── 1.svg
    │   └── 2.svg
    │   └── ...
    ...
    └── original-amico.json
```

## Tips
1. You can change the color and generate many colors folder without run download each time.

## License
- Read the `LICENSE` file.