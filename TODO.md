# TODO

## Game

- [ ] Game loop
- [x] Add spymaster interface
- [x] Fix chat size
- [ ] Delete game on last quit
- [ ] Fix goback with websocket ??
- [ ] Add word picking/board generation
- [ ] implement win condition
- [ ] Add english board generation

### Lobby

- [x] Lobby
- [x] Add room overview
- [ ] Add gamemaster commands
- [ ] Disable startGame for nonGameMaster

### History

- [x] Handle card reveal
- [x] Handle disconnect
- [x] Fix text alignment
- [x] Handle set spy master
- [x] Hanldle set game master
- [x] Fix all of the above


## Tests

- [ ] Begin

## Cleanup

- [x] `this.player[playerUUID] -> player`  vv
- [x] Get rid of spymaster red and blue properties
- [ ] use maps to get rid of @ts-ignore
- [ ] sort Game.ts methods
- [x] fix get spies and admins
- [ ] unify admin and GameMaster
- [ ] get rid of GameMasterUUID
- [ ] make setter to dispatch players changed event