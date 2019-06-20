# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://github.com/agrc/parole-and-probation/compare/v1.3.0...v1.4.0) (2019-06-20)


### Bug Fixes

* **app:** remove reducers from function and standarize reducer objects ([1094353](https://github.com/agrc/parole-and-probation/commit/1094353))
* **filter-agent:** use immer as the reducer function ([a379f58](https://github.com/agrc/parole-and-probation/commit/a379f58))
* **filter-location:** lift state to filters ([bf552a5](https://github.com/agrc/parole-and-probation/commit/bf552a5))
* **filter-location:** use valid region numbers ([d19be1c](https://github.com/agrc/parole-and-probation/commit/d19be1c))
* **filter-offender:** allow warrant to be deselected ([31b1246](https://github.com/agrc/parole-and-probation/commit/31b1246))
* **filter-offender:** lift all state to parent ([fcede1f](https://github.com/agrc/parole-and-probation/commit/fcede1f))
* **filter-other:** legal status => radio button ([ec43689](https://github.com/agrc/parole-and-probation/commit/ec43689)), closes [#33](https://github.com/agrc/parole-and-probation/issues/33)
* **filter-other:** lift state to filters ([4f3a455](https://github.com/agrc/parole-and-probation/commit/4f3a455))
* **filter-other:** standard of supervision to checkboxes ([971b523](https://github.com/agrc/parole-and-probation/commit/971b523)), closes [#32](https://github.com/agrc/parole-and-probation/issues/32)
* **filters:** move reducer out of funcion ([41e2fff](https://github.com/agrc/parole-and-probation/commit/41e2fff))


### Features

* **identify:** create offender popup template ([227af07](https://github.com/agrc/parole-and-probation/commit/227af07)), closes [#5](https://github.com/agrc/parole-and-probation/issues/5)



## [1.3.0](https://github.com/agrc/parole-and-probation/compare/v1.2.0...v1.3.0) (2019-06-18)


### Bug Fixes

* **dartboard:** do not autocomplete street or city ([f392a01](https://github.com/agrc/parole-and-probation/commit/f392a01))


### Features

* **filter:** use accordion instead of selector ([3d5f5c5](https://github.com/agrc/parole-and-probation/commit/3d5f5c5)), closes [#27](https://github.com/agrc/parole-and-probation/issues/27)
* **filter-location:** add address geolocation zooming ([61070d6](https://github.com/agrc/parole-and-probation/commit/61070d6))



## [1.2.0](https://github.com/agrc/parole-and-probation/compare/v1.1.0...v1.2.0) (2019-06-14)


### Bug Fixes

* **filter-agent:** fix wrong selection on tab ([de848b3](https://github.com/agrc/parole-and-probation/commit/de848b3))
* **filter-date:** add no field visit ([4a2d7ea](https://github.com/agrc/parole-and-probation/commit/4a2d7ea)), closes [#11](https://github.com/agrc/parole-and-probation/issues/11) [#12](https://github.com/agrc/parole-and-probation/issues/12)
* **filter-other:** remove no field visit ([442903d](https://github.com/agrc/parole-and-probation/commit/442903d)), closes [#11](https://github.com/agrc/parole-and-probation/issues/11)


### Features

* **filter-agent:** type ahead behavior ([9adb0f8](https://github.com/agrc/parole-and-probation/commit/9adb0f8)), closes [#8](https://github.com/agrc/parole-and-probation/issues/8)
* **filter-location:** add region checkboxes ([2952e45](https://github.com/agrc/parole-and-probation/commit/2952e45)), closes [#25](https://github.com/agrc/parole-and-probation/issues/25)
* **header:** replace logo ([26564ec](https://github.com/agrc/parole-and-probation/commit/26564ec)), closes [#3](https://github.com/agrc/parole-and-probation/issues/3)



## [1.1.0](https://github.com/agrc/parole-and-probation/compare/v1.0.0...v1.1.0) (2019-06-11)


### Bug Fixes

* **filter-agent:** set me on by default ([e538145](https://github.com/agrc/parole-and-probation/commit/e538145))
* **filter-agent:** vanity check is now a function ([606bebe](https://github.com/agrc/parole-and-probation/commit/606bebe))
* **filter-location:** add buffer input ([0789104](https://github.com/agrc/parole-and-probation/commit/0789104))
* **filter-location:** remove address type ([c4d93c1](https://github.com/agrc/parole-and-probation/commit/c4d93c1))
* **filter-offender:** clicking same radio button twice deselects ([92b4c4b](https://github.com/agrc/parole-and-probation/commit/92b4c4b))
* **filter-offender:** replace location with offender number. remove age ([97a12b4](https://github.com/agrc/parole-and-probation/commit/97a12b4))


### Features

* **filter-agent:** create process to select agents ([ff01210](https://github.com/agrc/parole-and-probation/commit/ff01210)), closes [#8](https://github.com/agrc/parole-and-probation/issues/8)



## 1.0.0 (2019-06-06)


### Bug Fixes

* widen sidebar for filter fit ([87e4a11](https://github.com/agrc/parole-and-probation/commit/87e4a11))


### Features

* fix environments and publish to test ([a8e9e94](https://github.com/agrc/parole-and-probation/commit/a8e9e94))
* mock filter architecture ([ee07cd9](https://github.com/agrc/parole-and-probation/commit/ee07cd9)), closes [#7](https://github.com/agrc/parole-and-probation/issues/7) [#8](https://github.com/agrc/parole-and-probation/issues/8) [#9](https://github.com/agrc/parole-and-probation/issues/9) [#10](https://github.com/agrc/parole-and-probation/issues/10) [#11](https://github.com/agrc/parole-and-probation/issues/11) [#12](https://github.com/agrc/parole-and-probation/issues/12)
* use convention-commit to generate changelog ([c46d85e](https://github.com/agrc/parole-and-probation/commit/c46d85e)), closes [#21](https://github.com/agrc/parole-and-probation/issues/21)
* use standard-version ([ffaacaf](https://github.com/agrc/parole-and-probation/commit/ffaacaf))
