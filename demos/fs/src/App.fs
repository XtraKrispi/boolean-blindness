module App.View

open Elmish
open Elmish.Navigation
open Elmish.UrlParser
open Fable.Core
open Fable.Core.JsInterop

importAll "../sass/main.sass"

open Fable.React
open Fable.React.Props

open Demo1


type Model = { Demo1Data: Demo1.Demo1Data }


type Msg = Demo1Msg of Demo1.Demo1Msg

let init () = { Demo1Data = Demo1.init () }


let update (msg: Msg) (model: Model) =
    match msg with
    | Demo1Msg m ->
        { model with
              Demo1Data = Demo1.update m model.Demo1Data }

let view (model: Model) (dispatch: Msg -> unit) =
    div [] [
        Demo1.view model.Demo1Data (dispatch << Demo1Msg)
    ]

open Elmish.React
open Elmish.Debug
open Elmish.HMR

// App
Program.mkSimple init update view
#if DEBUG
|> Program.withDebugger
#endif
|> Program.withReactBatched "elmish-app"
|> Program.run
