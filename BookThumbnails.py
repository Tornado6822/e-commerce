import json
import requests

with open("books.json", "r") as f:
    books = json.load(f)

books_with_covers = []

for book in books:
    ISBN = book["ISBN/UID"]
    
    if(ISBN.isdigit() and len(ISBN) >= 10):
        url = f"https://openlibrary.org/api/books?bibkeys=ISBN:{ISBN}&format=json&jscmd=data"
        response = requests.get(url)
        data = response.json()
        
        book_data = data.get(f"ISBN:{ISBN}")

        if book_data and "cover" in book_data:
            thumbnail = book_data["cover"].get("medium")
            fullImage = book_data["cover"].get("large")
        else:
            thumbnail = "No Thumbnail"
            fullImage = "No Cover"

        book["thumbnail"] = thumbnail
        book["fullImage"] = fullImage
        books_with_covers.append(book)
    else:
        book["thumbnail"] = "No Thumbnail"
        book["fullImage"] = "No Cover"
        books_with_covers.append(book)
    
with open("books_with_covers.json", "w") as file:
    json.dump(books_with_covers, file)

print("Success!")