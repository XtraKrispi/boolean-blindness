---
title: Boolean Blindness
theme: night
---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?a=1" data-background-opacity="0.3" -->

# Boolean Blindness

### Using domain modelling to make your code (more) bug free


---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?b=1" data-background-opacity="0.3" -->
# About me

<img src="images/goldie-pic.jpg" style="margin:0;background:0;border:0;box-shadow:none;" /> 

* Lead Software Engineer, Analytics @ SPS Commerce
* Passionate about functional programming
* Always happy to teach, mentor, help

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?c=1" data-background-opacity="0.3" -->

## We've all seen function calls like this before

```csharp
var x = GetVal(false, true);
```

How do we know which boolean is which without looking at the function definition? Did we get it right? What does `true` vs `false` mean for these arguments?

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?d=1" data-background-opacity="0.3" -->

## What are booleans, really?

- Only indicate `true` or `false`: there's no _context_ or _meaning_

- Very easy to mix up the order of things

- Very easy to name booleans ambiguously, making it unclear what `true` means

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?e=1" data-background-opacity="0.3" -->

### Has anyone ever had a bug where they had the wrong state for a boolean, or put it in the wrong spot in a function call?

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?f=1" data-background-opacity="0.3" -->

## What if we could add some meaning to our binary data types?

### And have the compiler help us?

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?g=1" data-background-opacity="0.3" -->

## Adding meaning

This would

- Reduce bugs with call order
- Allow for more context at call sites
- Be absolutely clear about what state is active

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?h=1" data-background-opacity="0.3" -->

## Language dependent

Unfortunately, it is not very easy to fix in languages like C# and Java, but languages like **Typescript** and **F#** make this possible

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?i=1" data-background-opacity="0.3" -->

## Problem

Let's look at the following function

```ts
const fn = (myData: Data, saveId: boolean, saveName: boolean) => {...}
```

We have to refer back to the function argument names in order to understand what the `booleans` mean, and even then it can still be confusing!


---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?j=1" data-background-opacity="0.3" -->

### We can disambiguate the booleans with _Abstract Data Types (aka Discriminated Unions)_

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?k=1" data-background-opacity="0.3" -->

## What are Abstract Data Types?

### First, we have to understand *Product*  types

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?l=1" data-background-opacity="0.3" -->

## What are Product Types?

### The types you use everyday (classes, structs, tuples, records)

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?m=1" data-background-opacity="0.3" -->

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
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?n=1" data-background-opacity="0.3" -->

## Why *Product*?

The number of possible values of `MyInterface`:
* 2 * number of possibilities of `number`. Why?

There is one boolean in this datatype, so the result is 2 (states in `boolean`) * incredibly high number (states in `number`)

This is a *Product* type: we can find out all possible combinations by multiplying each field's possibilities with the others.

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?o=1" data-background-opacity="0.3" -->

## Why is this relevant?

### We can think of Abstract Data Types as *Sum* types

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?p=1" data-background-opacity="0.3" -->

## Sum types

When we declare an ADT, we give multiples *choices* for values:

```ts
type YesNoOrMaybe = "Yes" | "No" | "Maybe"
```

Notice the `|`, which acts as an `or`.  Now, what is the number of possibilities for this data type?

It's 1 (`Yes`) + 1 (`No`) + 1 (`Maybe`).  The data type itself has three distinct possibilities.

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?q=1" data-background-opacity="0.3" -->

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
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?r=1" data-background-opacity="0.3" -->

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
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?s=1" data-background-opacity="0.3" -->


## How can we utilize Abstract Data Types?

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?t=1" data-background-opacity="0.3" -->

## We can start by replacing booleans with more meaningful representations

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?u=1" data-background-opacity="0.3" -->

## Typescript

```ts
type IdSaveState = "SaveId" | "DontSaveId";

type NameSaveState = "SaveName" | "DontSaveName";
```

```ts
const fn = (myData: Data, saveId: IdSaveState, saveName: NameSaveState) => {...}
```

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?v=1" data-background-opacity="0.3" -->

## Call sites

```ts
fn(myData, "DontSaveId", "SaveName");
```


---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?w=1" data-background-opacity="0.3" -->

## Demo

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?x=1" data-background-opacity="0.3" -->

### This has a ripple effect through the code:

- Much clearer at the call site what is happening
- Impossible to mix up the values between params, it's a compiler error
- Handling the code in the function is more explicit (no copy-pasta errors with bools)

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?y=1" data-background-opacity="0.3" -->

## We don't have to stop there though, we can model even more of our data with ADTs

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?z=1" data-background-opacity="0.3" -->

## Let's talk about the Remote Data problem

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?aa=1" data-background-opacity="0.3" -->

### Who has seen this in their code before:

```ts
interface PageState {
  loading: boolean;
  errorMessage?: string;
  data?: MyData;
}
```
---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?bb=1" data-background-opacity="0.3" -->

### There is a problem with this that can lead to bugs in your code!

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?cc=1" data-background-opacity="0.3" -->

### This data model allows for `data`, `errorMessage`, AND `loading` to all be set at the same time...

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?dd=1" data-background-opacity="0.3" -->

## Does this sound familiar?

_"But this **should** never happen"_

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?ee=1" data-background-opacity="0.3" -->

## What If

What if we could make the impossible states **compiler** errors?

What if we could ensure that only one of the three states is allowed at a time?

We can reduce entire classes of bugs by modelling our data so that invalid states are **impossible**

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?ff=1" data-background-opacity="0.3" -->

## ADTs to the rescue

ADTs are not just glorified enums, they are much more powerful.

We can add data to our ADTs

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?gg=1" data-background-opacity="0.3" -->

## Modelling Data

Here's how we can model Remote Data in Typescript :

```ts
type RemoteData<TData,TError> =
| { type: "NOT_ASKED" }
| { type: "LOADING" }
| { type: "SUCCESS", data: TData }
| { type: "FAILURE", error: TError }
```

```ts
type MyState = RemoteData<MyData, string>
```

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?hh=1" data-background-opacity="0.3" -->

## Modelling Data

And now where you need to build your UI, or do your business logic, it looks like this:

```ts
switch (state.type) {
  case "NOT_ASKED": 
    ...
    break;
  case "LOADING":
    ...
    break;
  case "SUCCESS":
    ...
    break;
  case "FAILURE":
    ...
    break;
}
```

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?ii=1" data-background-opacity="0.3" -->

## Demo

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?jj=1" data-background-opacity="0.3" -->

## What have we learned

- It is **impossible** to have a loading status with data
- It is **impossible** to have both data and an error message, and the compiler will prevent this, and we don't have to think about it

_We must handle all possible states in our code, so bugs can't happen where we forgot something._

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?kk=1" data-background-opacity="0.3" -->

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
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?ll=1" data-background-opacity="0.3" -->

## What have we learned

ADTs represent ORs in our data:

```
type Foo =
| D1 of Data1
| D2 of Data2
```

Now `Foo` is a `Data1` **OR** `Data2`

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?mm=1" data-background-opacity="0.3" -->

## What have we learned

This allows us to represent data in ways we never thought possible, since we are able to combine them as much as we want!

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?nn=1" data-background-opacity="0.3" -->

## Some more advanced data modelling

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?oo=1" data-background-opacity="0.3" -->

## Let's continue to make invalid states impossible

### Scenario: A user entry form that allows for a primary phone number or an email address for contact information

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?pp=1" data-background-opacity="0.3" -->

## Some may model this like so

```ts
interface UserEntryForm {
  primaryPhone: string | null;
  email: string | null
}
```

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?qq=1" data-background-opacity="0.3" -->

Our business logic indicates that we can't have both a primary phone and an email, but in our data model we can easily represent that:

```ts
const myValue = { primaryPhone: "555-5555", email: "test@test.com" }

const myOtherValue = { primaryPhone: null, email: null }
```

Our code now needs to handle these scenarios...
---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?rr=1" data-background-opacity="0.3" -->

## We can do better

With ADTs, modelling this becomes trivial:

```ts
type ContactMethod = 
    { type: "PRIMARY_PHONE", phoneNumber: string } 
  | { type: "EMAIL", email: string}

interface UserEntryForm {
  contactMethod: ContactMethod
}
```

By doing it this way, it is not possible to have both, or even none of the contact methods. We have eliminated a bug from our code, using the compiler, without ever having to deal with an invalid case!

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?ss=1" data-background-opacity="0.3" -->

## Let's see some more!

### Live demo time

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?tt=1" data-background-opacity="0.3" -->

## Final Thoughts

* Next time you want to reach for a boolean, think twice. If there's another way to model your data, try it out!

* When modelling data (especially in Typescript or F#), think about impossible states and see if you can make them truly impossible

We've barely scratched the surface of ADTs, there is so much more to explore!

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?uu=1" data-background-opacity="0.3" -->

## Finishing up

If you want more information about ADTs, data modelling or anything, let me know!

---
<!-- .slide: data-background="https://source.unsplash.com/random/1920x1080?vv=1" data-background-opacity="0.3" -->

# Questions?

<img src="images/GitHub-Mark-Light-64px.png" style="margin:0; height: 64px; width: 64px;background:0;border:0;box-shadow:none;" />  `XtraKrispi`

