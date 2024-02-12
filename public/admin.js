async function main() {
    let books = await fetch('http://localhost:3001/listBooks')
    let booksJSON = await books.json()
    
    booksJSON.forEach(function(book) {
        let div = document.createElement('div')
        div.innerHTML = `
            <img src = "${book.imageURL}" width="200" />
            <h3 id="title-${book.id}">${book.title}</h3>
            <p>Year published: ${book.year}</p>
            <p>Quantity: ${book.quantity}</p>
            <input id="${book.id}" type="text" />
            <input type="submit" onclick="changeTitle(${book.id})" />
            <input id="${book.num}" type="text" />
            <input type="submit" onclick="changeQuantity(${book.num})" />
        `
        document.body.append(div)
    })
}

main()

async function changeTitle(id) {
    let input = document.getElementById(id)
    let value = input.value

    let response = await fetch('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            title: value
        })
    })
    let responseJSON = await response.json()
    console.log(responseJSON)

    document.getElementById(`title-${id}`).textContent = value
}

async function changeQuantity(num) {
    let input = document.getElementById(num)
    let value = input.value

    let response = await fetch('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: num,
            quantity: value
        })
    })
    let responseJSON = await response.json()
    console.log(responseJSON)

    document.getElementById(`quantity-${num}`).textContent = value
}