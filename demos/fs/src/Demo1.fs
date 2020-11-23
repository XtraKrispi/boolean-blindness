namespace Demo1

module Helpers =
    let giveSpeech (txt: string) (yelling: bool) (questioning: bool) =
        sprintf "%s%s" (if yelling then txt.ToUpper() else txt) (if questioning then "?" else "")

module Demo1 =

    open Fable.React
    open Fable.React.Props

    type Demo1Data =
        { Txt: string
          Yelling: bool
          Questioning: bool }

    type Demo1Msg =
        | UpdateTxt of string
        | ToggleYelling
        | ToggleQuestioning

    let init () =
        { Txt = ""
          Yelling = false
          Questioning = false }

    let update (msg: Demo1Msg) (model: Demo1Data) =
        match msg with
        | UpdateTxt txt -> { model with Txt = txt }
        | ToggleYelling ->
            { model with
                  Yelling = not model.Yelling }
        | ToggleQuestioning ->
            { model with
                  Questioning = not model.Questioning }

    let view (model: Demo1Data) (dispatch: Demo1Msg -> unit) =
        div [] [
            input [ Value model.Txt
                    OnChange(fun e -> dispatch (UpdateTxt e.Value)) ]
            label [ HtmlFor "yelling" ] [
                str "Yelling:"
            ]
            input [ Type "checkbox"
                    Id "yelling"
                    Checked model.Yelling
                    OnChange(fun _ -> dispatch ToggleYelling) ]
            label [ HtmlFor "questioning" ] [
                str "Questioning:"
            ]
            input [ Type "checkbox"
                    Id "questioning"
                    Checked model.Questioning
                    OnChange(fun _ -> dispatch ToggleQuestioning) ]
            p [] []
        ]
