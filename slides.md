---
title: Boolean Blindness
theme: solarized
---

# Boolean Blindness

## The power of Abstract Data Types

---

## We've all seen functions like this before

```csharp
public int GetVal(bool includeCalc1, bool includeCalc2)
```

```csharp
var x = GetVal(false, true);
```

We can't know what the booleans mean without looking at the function definition

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

Unfortunately, it is not very easy to fix in C#, but languages like **Typescript** and **F#** make this possible

---

## Problem

Let's look at the following function

```ts
const Fn = (myData: Data, saveId: boolean, saveName: boolean) => {...}
```

We can disambiguate the booleans with _Abstract Data Types (aka Discriminated Unions)_

---

# Wall of code incoming

---

## Typescript

```ts
interface SaveId {
  type: "SAVEID";
}

interface DontSaveId {
  type: "DONTSAVEID";
}

interface SaveName {
  type: "SAVENAME";
}

interface DontSaveName {
  type: "DONTSAVENAME";
}

const saveId = {
  type: "SAVEID"
};

const dontSaveId = {
  type: "DONTSAVEID"
};

const saveName = {
  type: "SAVENAME"
};

const dontSaveName = {
  type: "DONTSAVENAME"
};

type IdSaveState = SaveId | DontSaveId;

type NameSaveState = SaveName | DontSaveName;
```

```ts
const fn = (myData: Data, saveId: IdSaveState, saveName: NameSaveState) => {...}
```

---

F#

```
type IdSaveState =
| SaveId | DontSaveId

type NameSaveState =
| SaveName | DontSaveName
```

```
let fn (myData: Data) (saveId: IdSaveState) (saveName: NameSaveState) = ...
```

---

## Call sites

```ts
fn(myData, dontSaveId, saveName);
```

```
fn myData DontSaveId SaveName
```

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

### This data model allows for `data`, `errorMessage`, AND `loading` to all be set at the same time...

---

## Does this sound familiar?

_"But this **should** never happen"_

---

## What If

What if we could make the impossible states **compiler** errors?

What if we could ensure that only one of the three states is allowed at a time?

---

## ADTs to the rescue

ADTs are not just glorified enums, they are much more powerful.

We can add data to our ADTs

---

## Modelling Data

Here's how we model Remote Data in F# (it's much more terse, but it's easy in Typescript as well):

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

## Final Thoughts

Next time you want to reach for a boolean, think twice. If there's another way to model your data, try it out!

When modelling data (especially in Typescript), think about impossible states and see if you can make them truly impossible

We've barely scratched the surface of ADTs, there is so much more to explore!

---

## Finishing up

If you want more information about ADTs, data modelling or anything, let me know!

---

# Questions?
