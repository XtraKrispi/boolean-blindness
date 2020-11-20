---
title: Boolean Blindness
theme: night
---

# Boolean Blindness

### Using domain modelling to make your code (more) bug free


---
# About me

<img src="images/goldie-pic.jpg" style="margin:0;background:0;border:0;box-shadow:none;" /> 

* Lead Software Engineer, Analytics @ SPS Commerce
* Passionate about functional programming
* Always happy to teach, mentor, help

---

## We've all seen function calls like this before

```csharp
var x = GetVal(false, true);
```

How do we know which boolean is which without looking at the function definition? Did we get it right? What does `true` vs `false` mean for these arguments?

---

## What are booleans, really?

- Only indicate `true` or `false`: there's no _context_ or _meaning_

- Very easy to mix up the order of things

- Very easy to name booleans ambiguously, making it unclear what `true` means

---

## Has anyone ever had a bug where they had the wrong state for a boolean, or put it in the wrong spot in a function call?

---

## What if we could add some meaning to our binary data types?

### And have the compiler help us?

---

## Adding meaning

This would

- Reduce bugs with call order
- Allow for more context at call sites
- Be absolutely clear about what state is active

---

## Language dependent

Unfortunately, it is not very easy to fix in languages like C# and Java, but languages like **Typescript** and **F#** make this possible

---

## Problem

Let's look at the following function

```ts
const fn = (myData: Data, saveId: boolean, saveName: boolean) => {...}
```

We have to refer back to the function argument names in order to understand what the `booleans` mean, and even then it can still be confusing!


---

### We can disambiguate the booleans with _Abstract Data Types (aka Discriminated Unions)_

---

## What are Abstract Data Types?

### First, we have to understand *Product*  types

---
## What are Product Types?

### The types you use everyday (classes, structs, tuples, records)

---
## Why *Product*?

Think of the number of possible values of a data type such as:

```ts
interface MyInterface {
  myBool: boolean;
  myOtherBool: number;
}
```

How many different values are there for `MyInterface`?

---
## Why *Product*?

The number of possible values of `MyInterface`:
* 2 * number of possibilities of `number`. Why?

There is one boolean in this datatype, so the result is 2 (states in `boolean`) * incredibly high number (states in `number`)

This is a *Product* type: we can find out all possible combinations by multiplying each field's possibilities with the others.

---
## Why is this relevant?

### We can think of Abstract Data Types as *Sum* types

---
## Sum types

When we declare an ADT, we give multiples *choices* for values:

```ts
type YesNoOrMaybe = "Yes" | "No" | "Maybe"
```

Notice the `|`, which acts as an `or`.  Now, what is the number of possibilities for this data type?

It's 1 (`Yes`) + 1 (`No`) + 1 (`Maybe`).  The data type itself has three distinct possibilities.

---
## Sum types

We can also combine these with product types:

```ts
interface MyInterface {
  yesOrNo: YesNoOrMaybe;
  amount: number;
  hasDescription: boolean | null;
}
```

How many possible values exist for this datatype?

---
## Sum types

```ts
interface MyInterface {
  yesOrNo: YesNoOrMaybe;
  hasAmount: boolean;
  hasDescription: boolean | null;
}
```

The answer is 18: 3 (`YesNoOrMaybe`) * 2 (`boolean`) * 3 (2 (`boolean`) + (`|`) 1 (`null`))

---

## How can we utilize Abstract Data Types?

---
## We can start by replacing booleans with more meaningful representations

---
## Typescript

```ts
type IdSaveState = "SaveId" | "DontSaveId";

type NameSaveState = "SaveName" | "DontSaveName";
```

```ts
const fn = (myData: Data, saveId: IdSaveState, saveName: NameSaveState) => {...}
```

---

F#

```fsharp
type IdSaveState =
| SaveId | DontSaveId

type NameSaveState =
| SaveName | DontSaveName
```

```fsharp
let fn (myData: Data) (saveId: IdSaveState) (saveName: NameSaveState) = ...
```

---

## Call sites

```ts
fn(myData, "DontSaveId", "SaveName");
```

```fsharp
fn myData DontSaveId SaveName
```

---

## Demo

---

### This has a ripple effect through the code:

- Much clearer at the call site what is happening
- Impossible to mix up the values between params, it's a compiler error
- Handling the code in the function is more explicit (no copy-pasta errors with bools)

---

## We don't have to stop there though, we can model even more of our data with ADTs

---

## Let's talk about the Remote Data problem

---

### Who has seen this in their code before:

```ts
interface PageState {
  loading: boolean;
  errorMessage?: string;
  data: MyData;
}
```
---

### There is a problem with this that can lead to bugs in your code!

---

### This data model allows for `data`, `errorMessage`, AND `loading` to all be set at the same time...

---

## Does this sound familiar?

_"But this **should** never happen"_

---

## What If

What if we could make the impossible states **compiler** errors?

What if we could ensure that only one of the three states is allowed at a time?

We can reduce entire classes of bugs by modelling our data so that invalid states are **impossible**

---

## ADTs to the rescue

ADTs are not just glorified enums, they are much more powerful.

We can add data to our ADTs

---

## Modelling Data

Here's how we can model Remote Data in F# (it's much more terse, but it's easy in Typescript as well):

```
type RemoteData<'data,'err> =
| NotAsked
| Loading
| Success of 'data
| Error of 'err
```

```
type MyState = RemoteData<MyData, string>
```

---

## Modelling Data

And now where you need to build your UI, or do your business logic, it looks like this:

```
match state with
| NotAsked -> ...
| Loading -> ...
| Success data -> ...
| Failure error -> ...
```

---

## Demo

---

## What have we learned

- It is **impossible** to have a loading status with data
- It is **impossible** to have both data and an error message, and the compiler will prevent this, and we don't have to think about it

_We must handle all possible states in our code, so bugs can't happen where we forgot something._

---

## What have we learned

ADTs allow us to do so much with our data.

Most of our data types represent ANDs of data:

```
interface Foo {
    data1: Data1;
    data2: Data2;
}
```

A `Foo` is a `Data1` **AND** a `Data2`

---

## What have we learned

ADTs represent ORs in our data:

```
type Foo =
| D1 of Data1
| D2 of Data2
```

Now `Foo` is a `Data1` **OR** `Data2`

---

## What have we learned

This allows us to represent data in ways we never thought possible, since we are able to combine them as much as we want!

---
## Some more advanced data modelling

---
## Let's continue to make invalid states impossible

### Scenario: A user entry form that allows for a primary phone number or an email address for contact information

---
## Some may model this like so (fsharp used for brevity)

```fsharp
type UserEntryForm = {
  PrimaryPhone: string option
  Email: string option
}
```

*`Option` is similar to an explicit nullability type*

---

Our business logic indicates that we can't have both a primary phone and an email, but in our data model we can easily represent that:

```fsharp
let myValue = { PrimaryPhone = Some "555-5555"
                Email = Some "test@test.com" }

let myOtherValue = { PrimaryPhone = None
                     Email = None }
```

Our code now needs to handle these scenarios...
---
## We can do better

With ADTs, modelling this becomes trivial:

```fsharp
type ContactMethod = | PrimaryPhone of string | Email of string

type UserEntryForm = {
  ContactMethod: ContactMethod
}
```

By doing it this way, it is not possible to have both, or even none of the contact methods. We have eliminated a bug from our code, using the compiler, without ever having to deal with an invalid case!

---
## Let's see some more!

### Live demo time

---

## Final Thoughts

* Next time you want to reach for a boolean, think twice. If there's another way to model your data, try it out!

* When modelling data (especially in Typescript or F#), think about impossible states and see if you can make them truly impossible

We've barely scratched the surface of ADTs, there is so much more to explore!

---

## Finishing up

If you want more information about ADTs, data modelling or anything, let me know!


Michael Gold (Github: `XtraKrispi`) (Email: `XtraKrispi at gmail dot com`)

---

# Questions?
