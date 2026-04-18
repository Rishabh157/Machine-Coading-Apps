import React, { useEffect, useState } from "react";

type BooksType = {
  id: number;
  bookName: string;
  authorName: string;
};

const BookSelf = () => {
  const [books, setBooks] = useState<BooksType[]>([
    {
      id: 625923,
      bookName: "Zero To One",
      authorName: "Rishabh Gour",
    },
  ]);

  const [bookName, setBookName] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const bookData = {
      id: Math.floor(Math.random() * 100000),
      bookName: bookName,
      authorName: authorName,
    };

    setBooks([...books, bookData]);

    setAuthorName("");
    setBookName("");
  };

  const handleDelete = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  //   Currying
  function multiply(x: number) {
    return function (y: number) {
      return function (z: number) {
        return x * y * z;
      };
    };
  }

  const result = multiply(10)(10)(10);
  console.log("result ", result);

  //   Scope Chaning
  let globalVar = "Hello World From Global Var";

  function outerFunction() {
    let outerVar = "Hello World From Outer Function";

    function innerFunction() {
      let innerVar = "Hello World From Inner Function";

      // scope
      console.log(innerVar); // this look in the innerscope
      console.log(outerVar); // this looks in the outer scope
      console.log(globalVar); // this look in the global scope
    }
    innerFunction();
  }

  //   outerFunction();

  //   Promise Declaration

  //   const myPromise =  new Promise((resolve, reject) => {

  //     let success = true;

  //     if(success){
  //         console.log('RESOVLE THE PROMISE', resolve)
  //     }else{
  //         console.log('REJECT THE PROMISE', reject)
  //     }
  //   })

  //  console.log('myPromise', myPromise)

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      console.log("Promise is in Pending State");

      setTimeout(() => {
        let dataFound = false;

        if (dataFound) {
          resolve({ id: 1, name: "Zero to One", author: "Peter Thiel" });
        } else {
          reject("Error: Data not found.");
        }
      }, 2000);
    });
  };

  fetchData()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  // Rescursion
  //   function factorial(n: number): number {
  //     if (n <= 1) {
  //       return 1;
  //     }

  //     return n * factorial(n - 1);
  //   }

  //   const res = factorial(5);
  //   console.log("res", res);

  //   function countDown(n) {
  //     if (n <= 0) {
  //       console.log("Completed");
  //       return;
  //     }

  //     console.log("n", n);

  //     return countDown(n - 1);
  //   }

  //   console.log(countDown(10));

  // Closure

  //   function outerFunc() {
  //     let count = 0;

  //     return function () {
  //       count++;
  //       return count;
  //     };
  //   }

  //   const counter = outerFunc();
  //   console.log("counter", counter());

  //   let a = "hello";

  //   let b = a;

  //   b = b.toUpperCase();
  //   console.log(a);

  //   let a = { name: "Alice" };

  //   let b = a; // shallow copy

  //   b.name = "Bob";

  //   console.log('a.name', a.name); // What does this print?  // Bob
  //   console.log('b.name', b.name); // What does this print?  // Bob

  function updateValue(num: number, obj: any): any {
    num = num + 10;

    obj.value = obj.value + 10;

    obj = { value: 100 };

    return { num, obj };
  }

  let number = 5;
  let data = { value: 5 };

  const anotherResult = updateValue(number, data);

  console.log("1. ", number); //  5
  console.log("2. ", data); //  {value : 15}
  console.log("3. ", anotherResult.num); //  15
  console.log("4. ", anotherResult.obj); //  {value:100}

  return (
    <div className="mt-8 flex flex-col">
      <div className="flex mx-auto ">
        <form className="flex gap-x-4" onSubmit={handleSubmit}>
          <input
            className="border outline-none focus:border-blue-400 rounded px-2 py-1.5"
            placeholder="Enter a book name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <input
            className="border outline-none focus:border-blue-400 rounded px-2 py-1.5"
            placeholder="Enter a author name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />

          <button className="px-2 py-1.5 bg-blue-300 hover:bg-blue-400 cursor-pointer rounded">
            SUBMIT
          </button>
        </form>
      </div>
      <div className="mx-auto w-1/2 mt-10 border rounded border-slate-100 p-2">
        {books?.map((book) => (
          <div
            className="relative border border-slate-200 p-2 my-2 "
            key={book.id}
          >
            <p className="font-bold text-xl">{book.bookName}</p>
            <div>{book.authorName}</div>

            <div
              onClick={() => handleDelete(book.id)}
              className="bg-red-400 hover:bg-red-500 inline rounded p-1.5 absolute top-1/5 right-2 cursor-pointer"
            >
              🗑️
            </div>
          </div>
        ))}
      </div>

      <div className="">{}</div>
    </div>
  );
};

export default BookSelf;
