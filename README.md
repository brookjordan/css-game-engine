# CSS Game Engine
A game engine for creating web-based games that compile to only CSS and HTML. ie: no JavaScript.

Currently totally work in progress with many parts waaaaay too coupled, and others waaaaay too wet.




## To view the example

Compile all `.pug` files in-place with [Pug](https://pugjs.org/).

Compile all `.scss` files in-place with [Sass](https://sass-lang.com/).

Open `index.html` in your favourite (up-to-date) browser.




## SCSS Mixins

Most of your game creation will happen in here.



### `build-game`
This function is called LAST, after all of the rest of your set-up has been completed.

Despite it being CSS, this function uses a lot of state which gets set using the following functions and macros. In fact, some of the following macros don't appear to do anything until after `build-game` has been ran.

#### example
```scss
@include build-game;
```



### `prop`
Style a named prop.

This can be used with some sugar properties to make sizing and positioning easier.

#### parameters
Name | Type | Default | Description
-- | -- | -- | --
`$name` | unquoted string | *required* | The name of the prop
`$w` | number | `null` | The relative width of the prop
`$h` | number | `null` | The relative height of the prop
`$x` | number | `null` | The relative x position of the prop
`$y` | number | `null` | The relative y position of the prop
`$z` | number | `null` | The z-index of the prop

#### example
```scss
@include prop(character) {
  background-image: url('//game.game/char.svg');
};

@include prop(trap-door,
  $w: 80, $h: 60,
  $x: 50, $y: 20, $z: 0
) {
  background-image: url('//game.game/trap-door.svg');
};
```



### `value-getter`
Style a named value-getter.

This can be used with some sugar properties to make sizing and positioning easier.

Name | Type | Default | Description
-- | -- | -- | --
`$name` | unquoted string | *required* | The name of the value-getter
`$w` | number | `null` | The relative width of the value-getter
`$h` | number | `null` | The relative height of the value-getter
`$x` | number | `null` | The relative x position of the value-getter
`$y` | number | `null` | The relative y position of the value-getter
`$z` | number | `null` | The z-index of the value-getter

#### example
```scss
@include value-getter(key-1) {
  background-image: url('//game.game/key.svg');
};

@include value-getter(key-2,
  $w: 80, $h: 60,
  $x: 50, $y: 20, $z: 0
) {
  background-image: url('//game.game/key.svg');
};
```



### `value-getter-type`
Style all value-getter-sprites of a given value-type.

This can be used with some sugar properties to make sizing and positioning easier.

Name | Type | Default | Description
-- | -- | -- | --
`$name` | unquoted string | *required* | The type of the value-getter
`$w` | number | `null` | The relative width of the value-getter
`$h` | number | `null` | The relative height of the value-getter
`$x` | number | `null` | The relative x position of the value-getter
`$y` | number | `null` | The relative y position of the value-getter
`$z` | number | `null` | The z-index of the value-getter

#### example
```scss
@include value-getter(key) {
  background-image: url('//game.game/key.svg');
};

@include value-getter-type(door,
  $w: 80, $h: 60,
  $x: 50, $y: 20, $z: 0
) {
  background-image: url('//game.game/door.svg');
};
```



### `map-block`
Style a map-block

#### parameters
Name | Type | Default | Description
-- | -- | -- | --
`$name` | unquoted string | `null` | The name of the map-block

*OR*

Name | Type | Default | Description
-- | -- | -- | --
`$x` | number | `null` | The x co-ordinate of the map-block
`$y` | number | `null` | The y co-ordinate of the map-block

#### example
```scss
@include map-block(entrance) { // ($name: entrance)
  background-image: url('//game.game/entance-block.svg');
};

// or

@include map-block(1, 1) { // ($x: 1, $y: 1)
  background-image: url('//game.game/entance-block.svg');
};
```



### `if-in-block-alt`
Style this differently when the game is inside an alternating map-block.

Mostly added to allow switching out animations when moving between map-blocks.

The value must be `a` or `b` where these represent map blocks in the following pattern:
```
a b a b
b a b a
a b a b
b a b a
```

#### parameters
Name | Type | Default | Description
-- | -- | -- | --
`$name` | `a` or `b` | *required* | The name of the prop
`$fixed` | boolean | `false` | If this sprite is positioned game-relative

#### example
```scss
@include prop(character) {
  @include if-in-block-alt(a, $fixed: true) {
    animation: walk-a $default-block-transition-duration;
  }

  @include if-in-block-alt(b, $fixed: true) {
    animation: walk-b $default-block-transition-duration;
  }
}
```

#### parameters
Name | Type | Default | Description
-- | -- | -- | --
$type |  |  |
$fixed |  | false |



### `if-got`
Apply this style if a named-value has been collected

#### parameters
Name | Type | Default | Description
-- | -- | -- | --
`$value` | unquoted string | *required* | The name of the value to have been gotten

#### example
```scss
@include prop(character) {
  @include if-got(legendary-armour) {
    background-image: url('//game.game/char-with-legendary-armour.svg');
  }
}
```



### `if-got-type`
Apply this style if a named-value has been collected

#### parameters
Name | Type | Default | Description
-- | -- | -- | --
$value-type | unquoted string | *required* | The name of the value-type being collected
$quantity | `number` | 1 | How many of this type must have been gotten

#### example
```scss
@include prop(trap-door) {
  @include if-got-type(key, 3) {
    display: none;
  }
}
```



### `size`
Size the sprite relative to the board.

Unincluded properties are not included in the styles.

**Note**: This is usually better done using the sugar in [`prop`](#prop) or [`value-getter`](#value-getter).

#### parameters
Name | Type | Default | Description
-- | -- | -- | --
`$w` | number | `null` | The relative width of the sprite
`$h` | number | `null` | The relative height of the sprite

#### example
```scss
@include prop(trap-door) {
  @include if-got-type(key, 3) {
    @include size(50, 20);
  }
}
```



### `pos`
Position the sprite relative to the board

This is usually better done using the sugar in [`prop`](#prop) or [`value-getter`](#value-getter).

#### parameters
Name | Type | Default | Description
-- | -- | -- | --
`$x` | number | `null` | The relative horizontal position of the sprite
`$y` | number | `null` | The relative vertical position of the sprite

#### example
```scss
@include prop(trap-door) {
  @include if-got-type(key, 3) {
    @include pos(50, 20);
  }
}
```



### `align`
Size and position the sprite relative to the board.

This is usually better done using the sugar in [`prop`](#prop) or [`value-getter`](#value-getter).

#### parameters
Name | Type | Default | Description
-- | -- | -- | --
`$w` | number | `null` | The relative width of the sprite
`$h` | number | `null` | The relative height of the sprite
`$x` | number | `null` | The relative horizontal position of the sprite
`$y` | number | `null` | The relative vertical position of the sprite
`$z` | number | `null` | The z-index of the sprite

#### example
```scss
@include prop(trap-door) {
  @include if-got-type(key, 3) {
    @include align(
      $w: 50, $h: 20,
      $x: 50, $y: 20, $z: 2
    );
  }
}
```



### `named-element` [private]
Used internally to calculate [`prop`](#prop) and [`value-getter`](#value-getter)

### `element-type` [private]
Used internally to calculate [`value-getter-type`](value-getter-type)
