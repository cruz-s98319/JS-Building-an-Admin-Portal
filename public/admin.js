async function main() {
    let books = await fetch('http://localhost:3001/listBooks')
    let booksJSON = await books.json()

    booksJSON.forEach(function(book) {
        let div = document.createElement('div')
        div.innerHTML = `
            <img src = "${book.imageURL}" width="200" />
            <h3 id="title-${book.id}">${book.title}</h3>
            <p>Year published: ${book.year}</p>
            <p id="quantity-${book.id}">Quantity: ${book.quantity}</p>
            <input id="title-input-${book.id}" type="text" />
            <input type="submit" onclick="changeTitle('title-input-${book.id}', ${book.id})" />
            <input id="quantity-input-${book.id}" type="text" />
            <input type="submit" onclick="changeQuantity('quantity-input-${book.id}', ${book.id})" />
        `
        document.body.append(div)
    })
}

main ()

async function changeTitle(inputId, bookId) {
    let input = document.getElementById(inputId)
    let value = input.value

    let response = await fetch('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: bookId,
            title: value
        })
    })
    let responseJSON = await response.json()
    console.log(responseJSON)

    document.getElementById(`title-${bookId}`).textContent = value
}

async function changeQuantity(inputId, bookId) {
    let input = document.getElementById(inputId)
    let value = input.value

    let response = await fetch('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: bookId,
            quantity: value
        })
    })
    let responseJSON = await response.json()
    console.log(responseJSON)

    document.getElementById(`quantity-${bookId}`).textContent = "Quantity: " + value
}