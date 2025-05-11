const width = 10
const height = 10
const size = 30

const board = []

let heroX = 1
let heroY = 1
let heroMove = [1, 0]

let score = 0
let messageDiv = null

const render = () => {
    for (let y = 1; y < height + 1; y++) {
        for (let x = 1; x < width + 1; x++) {
            cell = board[y][x]
            cell.div.textContent = cell.text
        }
    }
    messageDiv.textContent = `Score: ${score}`
}

const init = () => {
    messageDiv = document.createElement('div')
    document.body.appendChild(messageDiv)
    messageDiv.style.position = 'relative'

    const container = document.createElement('div')
    document.body.appendChild(container)
    container.style.position = 'relative'

    for (let y = 0; y < height + 2; y++) {
        board[y] = []
        for (let x = 0; x < width + 2; x++) {
            if (y === 0 || y === height + 1 || x === 0 || x === width + 1) {
                board[y][x] = { 'text': 'x' }
                continue
            }
            const div = document.createElement('div')
            container.appendChild(div)
            div.style.position = 'absolute'
            div.style.width = `${size}px`
            div.style.height = `${size}px`
            div.style.left = `${(x - 1) * size}px`
            div.style.top = `${(y - 1) * size}px`
            div.style.backgroundColor = '#ccf'
            div.style.border = '1px solid #000'
            div.style.boxSizing = 'border-box'
            div.style.textAlign = 'center'
            div.style.fontSize = `${size * 0.7}px`
            board[y][x] = { 'text': '', div }
        }
    }

    document.onkeydown = (e) => {
        console.log(e.key);
        switch (e.key) {
            case "ArrowRight":
                heroMove = [1, 0]
                break;
            case "ArrowLeft":
                heroMove = [-1, 0]
                break;
            case "ArrowUp":
                heroMove = [0, -1]
                break;
            case "ArrowDown":
                heroMove = [0, 1]
                break;
            default:
                break;
        }
        console.log(heroMove);
    }
}

// ここわかんねえ
// なぜこんなことすらわからないのか，辛い
window.onload = async () => {
    init()
    for (let i = 0; i < 1000; i++) {
        await new Promise(r => setTimeout(r, 2000))
        // heroCell は用意するとかえって扱いづらいかもしれない？
        // nextCell とか作ればいいのか，それはそれでわかりづらいか
        //heroCell = board[heroY][heroX]
        board[heroY][heroX].text = '🐾'
        const [dx, dy] = heroMove
        // ここで分けて受け取っておくと後でわかりやすい気がする
        heroX += dx
        heroY += dy
        if (board[heroY][heroX].text) {
            board[heroY - dy][heroX - dx].text = '💥'
            render()
            return;
        } else {
            board[heroY][heroX].text = '🐥'
            render()
        }

        if (Math.random() < 0.2) {
            const rx = Math.trunc(Math.random() * width + 1)
            const ry = Math.trunc(Math.random() * height + 1)
            board[ry][rx].text = '🌲'
        }
        score++;
    }
}
