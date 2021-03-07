**Memory Game**
-

- initializing the board 
  -
  - create grid
  - randomize the pictures
  - add class


- the game
  -
  - state object:
    - how many cards are open
    - sucsess 
    - failing

  - event listner:
    - add 1 to state.how many cards are open
    - fliping the card

    -  how many cards are open?
    - if state.how many cards are open === 2:
      - round timer 
        - when starts: disable cards
        - when ends: able cards && state.how many cards are open = 0
      - check if cards classes are equle:
        - if so:
          - remove the cards event listner
          - updte sucsses
          - check if sucsses === 6 : if so, game-end(win)
        - else
          - flip them
          - update failing
          - state.how many cards are open = 0
    - if state.how many cards are open === 1: do nothing

  - game timer
    - start on load
    - when ends, check if sucsses = 6:
      - if so: game-end(win)
      - else: game-end(game-over)

- game-end(winOrGameOver){
  -
  - show msg overlay
  - show btn: if usr click it:
    - destroy the board
    - call initializing

}