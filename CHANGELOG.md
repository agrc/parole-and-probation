# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.7.3](https://github.com/agrc/parole-and-probation/compare/v1.7.2...v1.7.3) (2019-07-29)


### Bug Fixes

* **identify:** correct identify with no filters set ([9d07e51](https://github.com/agrc/parole-and-probation/commit/9d07e51))



### [1.7.2](https://github.com/agrc/parole-and-probation/compare/v1.7.1...v1.7.2) (2019-07-24)


### Bug Fixes

* **filter-other:** update gang sql ([a9937c0](https://github.com/agrc/parole-and-probation/commit/a9937c0))
* **filter-other:** update offense sql ([e2bfd23](https://github.com/agrc/parole-and-probation/commit/e2bfd23))
* **identify:** identify on filtered items only ([54ddada](https://github.com/agrc/parole-and-probation/commit/54ddada))



### [1.7.1](https://github.com/agrc/parole-and-probation/compare/v1.7.0...v1.7.1) (2019-07-23)


### Bug Fixes

* **identify:** create correct url for identify on stage ([77629a9](https://github.com/agrc/parole-and-probation/commit/77629a9))



## [1.7.0](https://github.com/agrc/parole-and-probation/compare/v1.6.1...v1.7.0) (2019-07-23)


### Bug Fixes

* **app:** filters should always be array ([f143136](https://github.com/agrc/parole-and-probation/commit/f143136))
* **app:** use only fields required for filters in layer ([3492891](https://github.com/agrc/parole-and-probation/commit/3492891))
* **identify:** do not create links for empty data ([93b171e](https://github.com/agrc/parole-and-probation/commit/93b171e))


### Features

* **identify:** use map data for identify ([4a6cdb1](https://github.com/agrc/parole-and-probation/commit/4a6cdb1))



### [1.6.1](https://github.com/agrc/parole-and-probation/compare/v1.6.0...v1.6.1) (2019-07-18)


### Bug Fixes

* **identify:** move all links to label ([a77e940](https://github.com/agrc/parole-and-probation/commit/a77e940))


### Tests

* **identify:** update special supervision form ([2935bb8](https://github.com/agrc/parole-and-probation/commit/2935bb8))



## [1.6.0](https://github.com/agrc/parole-and-probation/compare/v1.5.0...v1.6.0) (2019-07-18)


### Bug Fixes

* **build:** use npm scripts to build and deploy the app ([aee2201](https://github.com/agrc/parole-and-probation/commit/aee2201))
* **filter-date:** rename to out of compliance ([c3a684a](https://github.com/agrc/parole-and-probation/commit/c3a684a)), closes [#12](https://github.com/agrc/parole-and-probation/issues/12)
* **filter-date:** replace calendars with 30,60,90,180 ([77c02ba](https://github.com/agrc/parole-and-probation/commit/77c02ba)), closes [#12](https://github.com/agrc/parole-and-probation/issues/12)
* **filter-other:** active warrant spelling and value is bit ([0f8a5b1](https://github.com/agrc/parole-and-probation/commit/0f8a5b1)), closes [#11](https://github.com/agrc/parole-and-probation/issues/11)
* do not copy runtimes or build fails ([dbda284](https://github.com/agrc/parole-and-probation/commit/dbda284))
* **filter-location:** city data is uppercase ([8b3b337](https://github.com/agrc/parole-and-probation/commit/8b3b337)), closes [#9](https://github.com/agrc/parole-and-probation/issues/9)
* **filter-offender:** offender_name -> offender ([583328f](https://github.com/agrc/parole-and-probation/commit/583328f))
* **filter-other:** add no std to other ([a7b9a4c](https://github.com/agrc/parole-and-probation/commit/a7b9a4c)), closes [#11](https://github.com/agrc/parole-and-probation/issues/11)
* **filter-other:** probation and parole are uppercase ([ba0bbc1](https://github.com/agrc/parole-and-probation/commit/ba0bbc1)), closes [#11](https://github.com/agrc/parole-and-probation/issues/11)
* **idenitfy:** moce event higher if layer fails to draw ([1d43c1c](https://github.com/agrc/parole-and-probation/commit/1d43c1c))
* **identify:** add alerts ([d9dc3a5](https://github.com/agrc/parole-and-probation/commit/d9dc3a5))
* **identify:** if no value in sos, no std ([40b791b](https://github.com/agrc/parole-and-probation/commit/40b791b))
* **identify:** move gang below crime ([445197f](https://github.com/agrc/parole-and-probation/commit/445197f)), closes [#5](https://github.com/agrc/parole-and-probation/issues/5)
* **identify:** move supervision to own group ([7ad988b](https://github.com/agrc/parole-and-probation/commit/7ad988b))


### Features

* **filter-other:** add main gang groups to multi select ([dcf18f4](https://github.com/agrc/parole-and-probation/commit/dcf18f4))
* **filter-other:** multi select for special supervision ([bcb6589](https://github.com/agrc/parole-and-probation/commit/bcb6589))
* **filter-other:** offense type as multi select ([2b64587](https://github.com/agrc/parole-and-probation/commit/2b64587))
* **identify:** add cautions with highlight ([e1f0a65](https://github.com/agrc/parole-and-probation/commit/e1f0a65)), closes [#5](https://github.com/agrc/parole-and-probation/issues/5)
* **identify:** add fancy links for phone and google directions ([9413044](https://github.com/agrc/parole-and-probation/commit/9413044)), closes [#5](https://github.com/agrc/parole-and-probation/issues/5)
* **identify:** highlight active warrant ([7079501](https://github.com/agrc/parole-and-probation/commit/7079501))


### Tests

* **identify:** add cautions story ([db62bc8](https://github.com/agrc/parole-and-probation/commit/db62bc8))



## [1.5.0](https://github.com/agrc/parole-and-probation/compare/v1.4.0...v1.5.0) (2019-07-10)


### Bug Fixes

* **api:** omnisharp intellisense ([7232261](https://github.com/agrc/parole-and-probation/commit/7232261))
* **app:** correct homepage url ([a1ba0a6](https://github.com/agrc/parole-and-probation/commit/a1ba0a6))
* **app:** correct names in manifest ([e33a3ae](https://github.com/agrc/parole-and-probation/commit/e33a3ae))
* **app:** do not publish service account or alternate appsettings ([3395ef0](https://github.com/agrc/parole-and-probation/commit/3395ef0))
* **app:** send access token to api ([8b13b1f](https://github.com/agrc/parole-and-probation/commit/8b13b1f))
* **layer-selector:** remove ${syntax} as it no longer functions in 4.12 ([c2dd0a4](https://github.com/agrc/parole-and-probation/commit/c2dd0a4))
* **map:** set initial extent to state of utah ([70005f9](https://github.com/agrc/parole-and-probation/commit/70005f9))
* **pallet:** create and update shape field ([3fd85d9](https://github.com/agrc/parole-and-probation/commit/3fd85d9))
* **pallet:** generate correct schema types ([86a7611](https://github.com/agrc/parole-and-probation/commit/86a7611))
* configure api and app to use basename ([6ab2b09](https://github.com/agrc/parole-and-probation/commit/6ab2b09))
* continue to write changelog in top level ([66fa6ab](https://github.com/agrc/parole-and-probation/commit/66fa6ab))


### Features

* **api:** add console logging ([d2c7b27](https://github.com/agrc/parole-and-probation/commit/d2c7b27))
* **api:** add stackdriver logging ([aff4638](https://github.com/agrc/parole-and-probation/commit/aff4638))
* **api:** add vs code recommended extensions ([339731e](https://github.com/agrc/parole-and-probation/commit/339731e))
* **api:** create reverse proxy ([b9b74c3](https://github.com/agrc/parole-and-probation/commit/b9b74c3))
* **api:** request token and proxy requests ([c3c5443](https://github.com/agrc/parole-and-probation/commit/c3c5443))
* **api:** validate access token ([9a1327d](https://github.com/agrc/parole-and-probation/commit/9a1327d))
* **app:** add react router and oidc client ([12e3290](https://github.com/agrc/parole-and-probation/commit/12e3290))
* **app:** filter points ([6833611](https://github.com/agrc/parole-and-probation/commit/6833611))
* **filters:** apply alerts the user of the current filter state ([8914f8e](https://github.com/agrc/parole-and-probation/commit/8914f8e))
* **filters:** reset sets state to default ([70a061f](https://github.com/agrc/parole-and-probation/commit/70a061f))
* **filters:** use jwt logged in user for filters and map layer ([2227d2e](https://github.com/agrc/parole-and-probation/commit/2227d2e))
* **map:** create arcgis pro project with field map ([7387642](https://github.com/agrc/parole-and-probation/commit/7387642))
* **map:** create publish and repoint scripts ([510dd9a](https://github.com/agrc/parole-and-probation/commit/510dd9a))



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
