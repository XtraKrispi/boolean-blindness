module RemoteData

type RemoteData<'tSuccess, 'tFailure> =
    | NotAsked
    | Loading
    | Success of 'tSuccess
    | Failure of 'tFailure

let map fn data =
    match data with
    | Success d -> Success <| fn d
    | NotAsked -> NotAsked
    | Loading -> Loading
    | Failure e -> Failure e
