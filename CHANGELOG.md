# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.21.3](https://github.com/agrc/parole-and-probation/compare/v1.21.2...v1.21.3) (2025-01-03)


### Features

* **api:** update to dotnet 9 ([2e257f0](https://github.com/agrc/parole-and-probation/commit/2e257f02847fbb2fe2e182e651b631241a6b4f5b))


### Dependencies

* **api:** fy25 q3 package updates ([9df5706](https://github.com/agrc/parole-and-probation/commit/9df57065f6dd5552eaaec741f1067f6c33a0e6ca))
* **app:** fy25 q3 package updates ([1b2c449](https://github.com/agrc/parole-and-probation/commit/1b2c44966d8447ec0cc5177386a98c49cc572260))

## [1.21.2](https://github.com/agrc/parole-and-probation/compare/v1.21.1...v1.21.2) (2024-10-07)


### Features

* **api:** persist login to redis ([73247b7](https://github.com/agrc/parole-and-probation/commit/73247b7ba4a93b0245bd89e46678b34416077e5a))
* **app:** use skeleton to improve filter wait time ([f4a1920](https://github.com/agrc/parole-and-probation/commit/f4a1920843d844e2a9a4ea82da081f49cfa92654))
* dotnet 7 ([69333b8](https://github.com/agrc/parole-and-probation/commit/69333b852830a69c8e79efd88dbc00fc2b26e604))
* standardize release ([f21dc16](https://github.com/agrc/parole-and-probation/commit/f21dc163d4dce4d56e76ef5799bd776ae1080e2b))
* update release pipeline ([b6ebe6c](https://github.com/agrc/parole-and-probation/commit/b6ebe6ca6a3e4fb523b096696fa61745a34b3c99))


### Bug Fixes

* **api:** allow manifest unauthenticated ([1308d49](https://github.com/agrc/parole-and-probation/commit/1308d493963a39ff7ea4f5ff325f10af823d82d0))
* **api:** correct spa proxy settings ([d840854](https://github.com/agrc/parole-and-probation/commit/d8408540b6fdede15a0afba4435350f16a7cdd31))
* **api:** try preventing thread theft ([9647dbc](https://github.com/agrc/parole-and-probation/commit/9647dbc08688a89e8a019371d23c61bb9b779676))
* **app:** build service worker ([8b05dee](https://github.com/agrc/parole-and-probation/commit/8b05deedd191d4bd751ccf7e5e1e333a20023135))
* **app:** correct syntax for fetch request ([ad9c3f5](https://github.com/agrc/parole-and-probation/commit/ad9c3f574659c1412d2f25238983cd72a13de7f6))
* **app:** do not cache the index.html. It may be the error page ([6727e72](https://github.com/agrc/parole-and-probation/commit/6727e72dd36637af6b96b6824e8986f0fb54df96))
* **app:** fix zooming to filtered data ([729e37a](https://github.com/agrc/parole-and-probation/commit/729e37af2e6a027802651fdde50ae5943f9063fd))
* **app:** point to feature layer id ([c6b64a6](https://github.com/agrc/parole-and-probation/commit/c6b64a61b447e6454d2476d81f12cdd1af7b0964))
* **app:** replace static with assets ([f6f4165](https://github.com/agrc/parole-and-probation/commit/f6f4165976bc3bc87ff4b485aebf566b5f699a06))
* **app:** update google analytics ([595709c](https://github.com/agrc/parole-and-probation/commit/595709cc430a9234bbc91ae8e34614fe25a0891d))
* **app:** use public folder for static assets ([9d74a82](https://github.com/agrc/parole-and-probation/commit/9d74a821a42018070cdb1c8315a27ee775ab3c19))
* **app:** use referer ([76fe496](https://github.com/agrc/parole-and-probation/commit/76fe49602470afabdb674ef5096a9ece70c7b7e5))
* **app:** use request ip for tokens ([451b16f](https://github.com/agrc/parole-and-probation/commit/451b16f58a9be63a88c62cbbf8142708f3480512))
* correct all linting and accessibility errors ([4f86509](https://github.com/agrc/parole-and-probation/commit/4f86509d040cb7716212eefa1f2168ec073c51b2))
* correct usage for downshift 7 ([ed3fa3b](https://github.com/agrc/parole-and-probation/commit/ed3fa3b24772d488c9c3358932cf0017a0ee61d3))
* enable analytics debug mode in dev ([57a7233](https://github.com/agrc/parole-and-probation/commit/57a7233b193f16dc324dc465c5835fbf8ba7e059))
* february api package updates ([05c6260](https://github.com/agrc/parole-and-probation/commit/05c6260e008967753239704d156492e4e20a573e))
* february app package updates ([01a1b39](https://github.com/agrc/parole-and-probation/commit/01a1b399c630fc5149bd14f5bdb4da1c2695ae51))
* **pallet:** truncate alerts to 500 characters ([849c3ce](https://github.com/agrc/parole-and-probation/commit/849c3ce20c28793693484e9197655a2dbc38e731))
* refresh data and schema from api data snapshot ([535f3b9](https://github.com/agrc/parole-and-probation/commit/535f3b9dc9b723c552fa4b701eab8930bdee5def)), closes [#195](https://github.com/agrc/parole-and-probation/issues/195)
* remove records with no geometry ([4c4b33d](https://github.com/agrc/parole-and-probation/commit/4c4b33df0df4549c3b69eaf056e99b3fbcd3ff1b))
* send path to the composite action ([c193e94](https://github.com/agrc/parole-and-probation/commit/c193e94d7616ec00c4507336cb3b33dcd2bed4d9))
* truncate employer address data ([2fc4597](https://github.com/agrc/parole-and-probation/commit/2fc45974a9f38284d0b1c2e33642af5dad733adb))
* use run defaults ([65dade3](https://github.com/agrc/parole-and-probation/commit/65dade3ffc22fbdef56912e2946d1bc8113ad5ae))


### Dependencies

* :evergreen_tree: ([bdf3993](https://github.com/agrc/parole-and-probation/commit/bdf3993413ca3d98ef7c4e20b54cd68d03b402c7))
* **api:** Q1 package updates ([e163d91](https://github.com/agrc/parole-and-probation/commit/e163d91c2095c475196ba7f39241eaf6e2681ffa))
* **api:** q2 backend package updates ([09915f3](https://github.com/agrc/parole-and-probation/commit/09915f392a3664cb82f15a94542394cd8e8e6955))
* **api:** q4 package updates ([7b5b4fa](https://github.com/agrc/parole-and-probation/commit/7b5b4fa0439d659b6cffc4a14e16d3e7beb4c033))
* **api:** q4 updates ([dff8fcc](https://github.com/agrc/parole-and-probation/commit/dff8fcc46506add96a9b67af4808feb4b5bf7f32))
* **api:** update packages ([9827166](https://github.com/agrc/parole-and-probation/commit/98271663b785ba93dcae145106ea21506a2a9546))
* **app:** FY25 Q2 dependency updates 🌲 ([a173a9a](https://github.com/agrc/parole-and-probation/commit/a173a9a3871ff146732dda4ee9c7cc1468851986))
* **app:** Q1 package updates ([1eb9a4d](https://github.com/agrc/parole-and-probation/commit/1eb9a4d24bb43664ef4de65c8e040fdee76a7fb8))
* **app:** q2 backend package updates ([7d3f235](https://github.com/agrc/parole-and-probation/commit/7d3f2353387d4d8e6890e0309f61e7dd657b856b))
* **app:** q4 package updates ([2129fd3](https://github.com/agrc/parole-and-probation/commit/2129fd33190878abccfbb6b045264080bc513bb7))
* **app:** q4 updates ([acd74b9](https://github.com/agrc/parole-and-probation/commit/acd74b96e767104d5e144d77eb08c1b71491ed70))
* **app:** update packages ([6edc241](https://github.com/agrc/parole-and-probation/commit/6edc241800dd3f234840122d7faf8f57cd7f75bb))
* bump the safe-dependencies group across 1 directory with 30 updates ([b07ce25](https://github.com/agrc/parole-and-probation/commit/b07ce25b5f9e6443342ab686bc4b98cc0fe0a15a))
* bump the safe-dependencies group across 1 directory with 40 updates ([6002521](https://github.com/agrc/parole-and-probation/commit/6002521676939eee484709252c58f38efa269c12))
* update front end and backend packages ([db87f00](https://github.com/agrc/parole-and-probation/commit/db87f006c0019a980606032edddac9d9f612d723))


### Documentation

* :open_book: ([de0866c](https://github.com/agrc/parole-and-probation/commit/de0866c29905554cee959b8f0994d6cb652cf08d))
* add encrypt suggestion ([e6b1dab](https://github.com/agrc/parole-and-probation/commit/e6b1daba0798ded1eccb31d73fbe15c8d7b40547))
* remove outdated docs ([7976875](https://github.com/agrc/parole-and-probation/commit/797687592887534e70d577583456ea62fb2541f3))
* update for dotnet 6 ([d8f20a8](https://github.com/agrc/parole-and-probation/commit/d8f20a842021979e729dca258a77d53e1037db13))
* update instructions ([277d9c0](https://github.com/agrc/parole-and-probation/commit/277d9c03698ba274f4f7a6e1173941964015075c))


### Styles

* **app:** correct header alt tag ([88c69fd](https://github.com/agrc/parole-and-probation/commit/88c69fd8383434ee6f79db88e604cfd3616886a0))
* **app:** update styles for bootstrap 5 ([8c02209](https://github.com/agrc/parole-and-probation/commit/8c0220945af701752b8db5ba6cdf4f3946200b09))
* prettier again ([f7ea37c](https://github.com/agrc/parole-and-probation/commit/f7ea37c3cac8c51ee4a198ae0f61a8b9cf74f757))
* prettier everything ([0fe5a8c](https://github.com/agrc/parole-and-probation/commit/0fe5a8c5c89d79fb76bd714c12aea60cf11a88e4))

### [1.21.2](https://github.com/agrc/parole-and-probation/compare/v1.21.1...v1.21.2) (2021-06-28)

### Bug Fixes

- **app:** update google analytics ([595709c](https://github.com/agrc/parole-and-probation/commit/595709cc430a9234bbc91ae8e34614fe25a0891d))

### [1.21.1](https://github.com/agrc/parole-and-probation/compare/v1.21.0...v1.21.1) (2021-04-21)

### Bug Fixes

- **app:** allow regions to be unselected ([34746a9](https://github.com/agrc/parole-and-probation/commit/34746a9e7c10c853c909001ce0ca605a1108a98b)), closes [#153](https://github.com/agrc/parole-and-probation/issues/153)

## [1.21.0](https://github.com/agrc/parole-and-probation/compare/v1.20.2...v1.21.0) (2021-04-20)

### Features

- **app:** use new endpoints ([95e714d](https://github.com/agrc/parole-and-probation/commit/95e714deafd7835dd9a92979742ece8eed50aaa2)), closes [#126](https://github.com/agrc/parole-and-probation/issues/126)

### Bug Fixes

- **app:** allow multiple selections of supervisors ([221ae68](https://github.com/agrc/parole-and-probation/commit/221ae682e5423905d4e78918fc14647445f68a88))
- **app:** fix filter close button action ([fd7284a](https://github.com/agrc/parole-and-probation/commit/fd7284a1999ffcf0014948b28d5aa7fe60dce4d5)), closes [#145](https://github.com/agrc/parole-and-probation/issues/145)
- **app:** increase click distance by 3x ([608970b](https://github.com/agrc/parole-and-probation/commit/608970b4932ae80ab6694a6c8645ba06219b583c)), closes [#147](https://github.com/agrc/parole-and-probation/issues/147)

### [1.20.2](https://github.com/agrc/parole-and-probation/compare/v1.20.1...v1.20.2) (2021-03-25)

### Bug Fixes

- **app:** sync type aheads with offline layer data ([ca1f471](https://github.com/agrc/parole-and-probation/commit/ca1f471295157c7c36f7c68a38ee10254f1ff0f1))
- **app:** synchronize filters between offline and online layers ([c8363eb](https://github.com/agrc/parole-and-probation/commit/c8363ebeb2f71d4e8504a0dcc0d002dc099f5dc8))

### [1.20.1](https://github.com/agrc/parole-and-probation/compare/v1.20.0...v1.20.1) (2021-03-11)

### Bug Fixes

- **app:** update precache manifest to include esri bundles ([bf5f6f1](https://github.com/agrc/parole-and-probation/commit/bf5f6f10d00a14a31c538bd732060046d45fbc04)), closes [#142](https://github.com/agrc/parole-and-probation/issues/142)

## [1.20.0](https://github.com/agrc/parole-and-probation/compare/v1.19.1...v1.20.0) (2021-03-11)

### Features

- **app:** persist points in clientside feature layer for offline ([c5335a5](https://github.com/agrc/parole-and-probation/commit/c5335a581bf04681bb1583c9e897ae4f57ec2b56)), closes [#142](https://github.com/agrc/parole-and-probation/issues/142)

### Bug Fixes

- **api:** update challenge redirect location ([33ce6b7](https://github.com/agrc/parole-and-probation/commit/33ce6b70d38c9905dea3e45b71f2ada10a485cbf)), closes [#143](https://github.com/agrc/parole-and-probation/issues/143)

### [1.19.1](https://github.com/agrc/parole-and-probation/compare/v1.19.0...v1.19.1) (2021-03-10)

### Bug Fixes

- **app:** correct filtering logic for supervisor and all multi-selects ([fa4c93c](https://github.com/agrc/parole-and-probation/commit/fa4c93cc0d55085f36bba1f00e4b63b554535bed)), closes [#140](https://github.com/agrc/parole-and-probation/issues/140)
- **app:** correct url link generation for try again link ([738b6fc](https://github.com/agrc/parole-and-probation/commit/738b6fc5163c7083f43f4e908c576f1e54bec44b)), closes [#141](https://github.com/agrc/parole-and-probation/issues/141)

## [1.19.0](https://github.com/agrc/parole-and-probation/compare/v1.18.2...v1.19.0) (2021-03-10)

### Features

- **app:** show message on auth failure to restart login process ([a6536b5](https://github.com/agrc/parole-and-probation/commit/a6536b5c9880c1f2e9a41326920b13ef41140894)), closes [#141](https://github.com/agrc/parole-and-probation/issues/141)

### Bug Fixes

- **app:** limit multiselect results to 15 ([62c55f2](https://github.com/agrc/parole-and-probation/commit/62c55f23f39b9773fc2c95567a3f64a4dbb81663)), closes [#140](https://github.com/agrc/parole-and-probation/issues/140)
- **app:** return items when the count is less than the limit ([826b8f0](https://github.com/agrc/parole-and-probation/commit/826b8f03225a36224e931dc2aedc0b754585cd18)), closes [#140](https://github.com/agrc/parole-and-probation/issues/140)

### [1.18.2](https://github.com/agrc/parole-and-probation/compare/v1.18.0...v1.18.2) (2021-02-23)

### Bug Fixes

- **api:** change strings to chars ([04f8bd6](https://github.com/agrc/parole-and-probation/commit/04f8bd634e9ac2f9279270514cad1742f30cf1c9)), closes [#135](https://github.com/agrc/parole-and-probation/issues/135)
- **api:** fix gender query ([a8a5bdb](https://github.com/agrc/parole-and-probation/commit/a8a5bdb0321045ed838adf588c6ebaa3f70bfead)), closes [#135](https://github.com/agrc/parole-and-probation/issues/135)
- **app:** get user email from claims ([18368b5](https://github.com/agrc/parole-and-probation/commit/18368b50fb5b625c3dae368a1eefa899ff14df6d))
- **app:** type ahead filters search entire string value instead of beginning ([fd8bb45](https://github.com/agrc/parole-and-probation/commit/fd8bb45e11314a50cce9374658ee5a66db603661))
- **filters:** ignore properties that do not count towards active filters ([0bd50da](https://github.com/agrc/parole-and-probation/commit/0bd50da0e7afb1e7acc9c469730713546b1a2ea6))
- **filters:** manage state in app for all inputs ([c2315a5](https://github.com/agrc/parole-and-probation/commit/c2315a5c74d1c080035f00614517421597562a08)), closes [#136](https://github.com/agrc/parole-and-probation/issues/136)
- **pallet:** swap coordinates and supply axis ([d1a479b](https://github.com/agrc/parole-and-probation/commit/d1a479be616f301046aba86a76e55437aa5b13ad))

### [1.18.1](https://github.com/agrc/parole-and-probation/compare/v1.18.0...v1.18.1) (2021-02-23)

### Bug Fixes

- **api:** change strings to chars ([4f798c0](https://github.com/agrc/parole-and-probation/commit/4f798c0b28d07e1616d4f8df8866b28a20f4dc56)), closes [#135](https://github.com/agrc/parole-and-probation/issues/135)
- **app:** get user email from claims ([18368b5](https://github.com/agrc/parole-and-probation/commit/18368b50fb5b625c3dae368a1eefa899ff14df6d))
- **app:** type ahead filters search entire string value instead of beginning ([42770c2](https://github.com/agrc/parole-and-probation/commit/42770c26721f89971e2ad375cc87f680eca6865f))
- **filters:** ignore properties that do not count towards active filters ([d1cd9e4](https://github.com/agrc/parole-and-probation/commit/d1cd9e4d3cb2f1376398e01632ef5fb3431c1fe3))
- **filters:** manage state in app for all inputs ([8bf805c](https://github.com/agrc/parole-and-probation/commit/8bf805c809031f5ad00289b3e3483e373a800675)), closes [#136](https://github.com/agrc/parole-and-probation/issues/136)
- **pallet:** swap coordinates and supply axis ([d1a479b](https://github.com/agrc/parole-and-probation/commit/d1a479be616f301046aba86a76e55437aa5b13ad))

## [1.18.0](https://github.com/agrc/parole-and-probation/compare/v1.17.5...v1.18.0) (2021-02-08)

### Features

- **app:** create map loading indicator ([7d68af9](https://github.com/agrc/parole-and-probation/commit/7d68af9d3ff3971815e0a33c45029b090bcc8413))
- **app:** implement simple map loading indicator ([caddec9](https://github.com/agrc/parole-and-probation/commit/caddec986ffc378796b913ce71bf5e250b2e3e81)), closes [#129](https://github.com/agrc/parole-and-probation/issues/129)
- **app:** use esrijs esm and agrc npm packages ([74a27ae](https://github.com/agrc/parole-and-probation/commit/74a27aeb7f01bf8857abed5a12e60774e6c3502f)), closes [#115](https://github.com/agrc/parole-and-probation/issues/115)
- **filters:** add typeahead to city and zip ([9973577](https://github.com/agrc/parole-and-probation/commit/99735775ce4ac60a5f29e837145231e77ade5e23))
- **identify:** add offender photos ([fc71773](https://github.com/agrc/parole-and-probation/commit/fc71773d95d60f495365f632a39501395cd90083)), closes [#125](https://github.com/agrc/parole-and-probation/issues/125)
- **identify:** add offline messages to identify ([7a2dd72](https://github.com/agrc/parole-and-probation/commit/7a2dd7224480d970fd828dc9953354e4f07fcec6))
- **identify:** handle image loading ([596ccd6](https://github.com/agrc/parole-and-probation/commit/596ccd6fe0a406b1932dcc42fffc4b320fa51ab9))
- **pallet:** project data to web mercator ([d66e329](https://github.com/agrc/parole-and-probation/commit/d66e3296877daa0844adb77fd204f10f60567e90)), closes [#121](https://github.com/agrc/parole-and-probation/issues/121)

### Bug Fixes

- **api:** create pickup directory if it doesnt exist ([37ab135](https://github.com/agrc/parole-and-probation/commit/37ab135945e3eccadbe19df081efc09654bbb35c))
- **api:** fix openid redirect url creation behind load balancer ([b951075](https://github.com/agrc/parole-and-probation/commit/b951075bfc9c27e88eb6ff5c86520126aa95ff5e))
- **app:** add "add" button back and update state change events ([9e956d5](https://github.com/agrc/parole-and-probation/commit/9e956d57c7766ffaa1bc733a0433aa53c5ac4508))
- **app:** better input data for vanity story ([2b70f6d](https://github.com/agrc/parole-and-probation/commit/2b70f6da4bae03041b169831751d2c7073cb392c)), closes [#127](https://github.com/agrc/parole-and-probation/issues/127)
- **app:** don't display empty formgroup ([4513e93](https://github.com/agrc/parole-and-probation/commit/4513e93f49d2cc5791b853cc275edf1ef78761ca))
- **app:** fix linting errors ([07b8f1a](https://github.com/agrc/parole-and-probation/commit/07b8f1a0609260ea3b2cfb58e5fd47807c6898c9))
- **app:** fix map extent zoom after altering agent filter ([6415337](https://github.com/agrc/parole-and-probation/commit/641533752f535936d833e2c6ddb7324e7e1f1b54)), closes [#127](https://github.com/agrc/parole-and-probation/issues/127)
- **app:** give the county controls more space ([7d61067](https://github.com/agrc/parole-and-probation/commit/7d6106723bece0d6be44963bf4d6c0270a215624))
- **app:** make CI ignore build warnings ([0f2ed28](https://github.com/agrc/parole-and-probation/commit/0f2ed2805bde0d623f0b39fd644b5aeb4ddf126e))
- **app:** make input match menu value on selection ([c3a4e59](https://github.com/agrc/parole-and-probation/commit/c3a4e599857d394dba4e48abdec050346573e92f))
- **app:** make offender story work like the app ([b270296](https://github.com/agrc/parole-and-probation/commit/b2702963a8917cc92ef25665cb68765fde95aba7))
- **app:** make vanity user id numeric ([997f39c](https://github.com/agrc/parole-and-probation/commit/997f39ccc5c01a808a8042f0b2144bcbeba79ce7)), closes [#127](https://github.com/agrc/parole-and-probation/issues/127)
- **app:** pass the correct data when removing counties ([a67a545](https://github.com/agrc/parole-and-probation/commit/a67a545c37420ea0a60214543988e12c34952a1a))
- **app:** remove duplicate lookup data values ([4e24236](https://github.com/agrc/parole-and-probation/commit/4e24236d329e1e5205e7042ee137a5e807a364f7))
- **app:** simplify and refine combobox ([615ea1a](https://github.com/agrc/parole-and-probation/commit/615ea1a432711961e7a6b7c53d57c4014972065c))
- **app:** throw error if no item is found ([106e4b7](https://github.com/agrc/parole-and-probation/commit/106e4b71eb65714a0d3e757d73074a7a70bb843f))
- **app:** update homepage so npm start opens right path ([2d6e0fa](https://github.com/agrc/parole-and-probation/commit/2d6e0fad33fbd8f5a002471e8b894b6970acd974))
- **combobox:** event.value is null unless set ([2883f8f](https://github.com/agrc/parole-and-probation/commit/2883f8faf75c1cfae0ba939acbcfc0375865cdc6))
- **filter-agent:** when an item is selected itemToString receives null ([c14002a](https://github.com/agrc/parole-and-probation/commit/c14002a6d03349ed5fae67f2de8a943452b8a349))
- **filters:** surround sos filter with parentheses ([3780730](https://github.com/agrc/parole-and-probation/commit/3780730ccdeda8c1d240f3ca2cd2991ab8618edb))
- **inputtypeahead:** handle null input items ([0802da9](https://github.com/agrc/parole-and-probation/commit/0802da9b666a8adc5e6d8e4a94f593bf9b51beb3))

### [1.17.5](https://github.com/agrc/parole-and-probation/compare/v1.17.3...v1.17.5) (2020-12-30)

### Bug Fixes

- **app:** display special supervisions from new schema ([8b92cca](https://github.com/agrc/parole-and-probation/commit/8b92ccab2bc62e53d7f0ac20fbae7f0638f9a6c2)), closes [#84](https://github.com/agrc/parole-and-probation/issues/84)

### [1.17.4](https://github.com/agrc/parole-and-probation/compare/v1.17.3...v1.17.4) (2020-12-23)

### [1.17.3](https://github.com/agrc/parole-and-probation/compare/v1.17.2...v1.17.3) (2020-02-25)

### Bug Fixes

- **filter-offender:** allow replication of filter after reset ([de75b36](https://github.com/agrc/parole-and-probation/commit/de75b366f5063222ccee9dd00cf8a12a5eeb0d02)), closes [#98](https://github.com/agrc/parole-and-probation/issues/98)

### [1.17.2](https://github.com/agrc/parole-and-probation/compare/v1.17.1...v1.17.2) (2020-02-24)

### Bug Fixes

- update meta data for full screen app ([3814b6e](https://github.com/agrc/parole-and-probation/commit/3814b6e318b4d7191afff003a480a2f830040189))

### [1.17.1](https://github.com/agrc/parole-and-probation/compare/v1.17.0...v1.17.1) (2020-02-21)

### Bug Fixes

- **filter-offender:** clear selection on empty ([803398c](https://github.com/agrc/parole-and-probation/commit/803398cbe9a2a6e5baebd8f0bb5e484ce7b92fc0)), closes [#99](https://github.com/agrc/parole-and-probation/issues/99) [#101](https://github.com/agrc/parole-and-probation/issues/101)
- **filter-offender:** clear type ahead text on reset ([48718d0](https://github.com/agrc/parole-and-probation/commit/48718d03b80e1464f7dab7937edaa3dae6867ff8)), closes [#100](https://github.com/agrc/parole-and-probation/issues/100)
- **filter-offender:** remove chrome autocomplete ([2e70e9e](https://github.com/agrc/parole-and-probation/commit/2e70e9e7a61b8610933e25053374cda95c850a74))
- **filters:** disable autofil ([f2a1dbf](https://github.com/agrc/parole-and-probation/commit/f2a1dbf49417c619c336d674f6db35da1500206e))
- **identify:** only show if not clicking on dartboard graphic ([2377276](https://github.com/agrc/parole-and-probation/commit/2377276183e2019ab3ef69f9d26e7aa1841236cc)), closes [#102](https://github.com/agrc/parole-and-probation/issues/102)

## [1.17.0](https://github.com/agrc/parole-and-probation/compare/v1.16.0...v1.17.0) (2020-02-05)

### Features

- **dart-board:** add popuptemplate and address to graphic ([92d0408](https://github.com/agrc/parole-and-probation/commit/92d040804e27bfb2daa1f8caed9552c5d8b38d56)), closes [#96](https://github.com/agrc/parole-and-probation/issues/96)

### Bug Fixes

- **identify:** show identify on top of filters ([2a573f1](https://github.com/agrc/parole-and-probation/commit/2a573f1d100a649ee3e9be5a47e7b811f058228c))
- change layout to leave map width alone ([f4ba7e4](https://github.com/agrc/parole-and-probation/commit/f4ba7e46eeceefe6e38e504893e146d5ab729f0c)), closes [#90](https://github.com/agrc/parole-and-probation/issues/90)

## [1.16.0](https://github.com/agrc/parole-and-probation/compare/v1.15.0...v1.16.0) (2020-02-04)

### Features

- **legend:** add static legend to map ([1dbd108](https://github.com/agrc/parole-and-probation/commit/1dbd1085eadb0a6796547ee2ba32e622dd7a6643)), closes [#95](https://github.com/agrc/parole-and-probation/issues/95)
- **legend:** create a static legend component ([b72b758](https://github.com/agrc/parole-and-probation/commit/b72b758025bda7e9c37232efbba68ba863abb70a))
- **map-tool-panel:** show close button on mobile ([dcae492](https://github.com/agrc/parole-and-probation/commit/dcae4925ccdc5468c1b257265ff8068f5cb2de24)), closes [#92](https://github.com/agrc/parole-and-probation/issues/92)

### Bug Fixes

- **legend:** add key to mapped items ([0ed70cb](https://github.com/agrc/parole-and-probation/commit/0ed70cb1d42a48021987f769200ddeca9f46d5bb))
- finish migrating to 3.1 by expliciting using endpoint routing ([0163a80](https://github.com/agrc/parole-and-probation/commit/0163a808f226d54124d4b401aa0b91191e5df6e8)), closes [#94](https://github.com/agrc/parole-and-probation/issues/94)
- **map:** update extent to make mobile view larger ([1230f02](https://github.com/agrc/parole-and-probation/commit/1230f02ef9f82c0cd3215da91d94efcb1e856ab9)), closes [#89](https://github.com/agrc/parole-and-probation/issues/89)

## [1.15.0](https://github.com/agrc/parole-and-probation/compare/v1.14.0...v1.15.0) (2020-01-30)

### Features

- **identify:** add close button to no offender identify ([1ff4c0f](https://github.com/agrc/parole-and-probation/commit/1ff4c0feebdc7151a1dfecedbf08159b33adbdcb)), closes [#91](https://github.com/agrc/parole-and-probation/issues/91)

## [1.14.0](https://github.com/agrc/parole-and-probation/compare/v1.13.0...v1.14.0) (2020-01-06)

### Features

- update backend to 3.1 LTS ([96272f2](https://github.com/agrc/parole-and-probation/commit/96272f2c200e2c2c53e1d2ff652565871a61e178))
- **filters:** remove apply and auto apply filters ([c5d7304](https://github.com/agrc/parole-and-probation/commit/c5d7304cc03c9f5ddc3d1ad31c22e41ca0f7195d))
- **map:** add regions to layer selector ([832d2b9](https://github.com/agrc/parole-and-probation/commit/832d2b9e86872a1770f2b0ebab69b94194ffe7db)), closes [#77](https://github.com/agrc/parole-and-probation/issues/77)

### Bug Fixes

- use int instead of small int ([693624a](https://github.com/agrc/parole-and-probation/commit/693624a3495ec7449c8ffd043db562c89be239c3))

## [1.13.0](https://github.com/agrc/parole-and-probation/compare/v1.12.0...v1.13.0) (2019-09-20)

### Bug Fixes

- **filter-offender:** escape single quotes ([a8d70b1](https://github.com/agrc/parole-and-probation/commit/a8d70b1))

### Features

- **api:** add type ahead controller ([51d4a2f](https://github.com/agrc/parole-and-probation/commit/51d4a2f)), closes [#57](https://github.com/agrc/parole-and-probation/issues/57)
- **filter-offender:** hook up front end to api ([def9467](https://github.com/agrc/parole-and-probation/commit/def9467)), closes [#57](https://github.com/agrc/parole-and-probation/issues/57)
- use current filter state for type aheads ([c65bfe2](https://github.com/agrc/parole-and-probation/commit/c65bfe2))

## [1.12.0](https://github.com/agrc/parole-and-probation/compare/v1.11.0...v1.12.0) (2019-09-17)

### Bug Fixes

- eslint with vscode ([5b55aa6](https://github.com/agrc/parole-and-probation/commit/5b55aa6))
- **api:** shorten token time to 1 hour ([801a0a9](https://github.com/agrc/parole-and-probation/commit/801a0a9)), closes [#72](https://github.com/agrc/parole-and-probation/issues/72)
- **api:** switch to mimekit ([283ebbb](https://github.com/agrc/parole-and-probation/commit/283ebbb))
- **app:** update default zoom to 15 ([f2fedc4](https://github.com/agrc/parole-and-probation/commit/f2fedc4)), closes [#79](https://github.com/agrc/parole-and-probation/issues/79)
- **dartboard:** mixin classnames ([6763085](https://github.com/agrc/parole-and-probation/commit/6763085))
- **filter-other:** sort special supervisions by id ([1c77a4f](https://github.com/agrc/parole-and-probation/commit/1c77a4f)), closes [#70](https://github.com/agrc/parole-and-probation/issues/70)
- **geolocation:** disable button during progress ([ccc45d2](https://github.com/agrc/parole-and-probation/commit/ccc45d2))
- **identify:** remove image ([2b37de9](https://github.com/agrc/parole-and-probation/commit/2b37de9)), closes [#76](https://github.com/agrc/parole-and-probation/issues/76)
- **map:** increase point size by 25% ([c93eb51](https://github.com/agrc/parole-and-probation/commit/c93eb51))

### Features

- **api:** add middleware to create csv ([54a4c7c](https://github.com/agrc/parole-and-probation/commit/54a4c7c))
- **api:** send email with csv ([485e975](https://github.com/agrc/parole-and-probation/commit/485e975))
- **app:** add map tool panel with dartboard ([2384ad9](https://github.com/agrc/parole-and-probation/commit/2384ad9)), closes [#79](https://github.com/agrc/parole-and-probation/issues/79)
- **csv-download:** create map tool for csv ([9d4b258](https://github.com/agrc/parole-and-probation/commit/9d4b258))
- **filter-location:** add county ui and filter ([ae0f1ae](https://github.com/agrc/parole-and-probation/commit/ae0f1ae)), closes [#74](https://github.com/agrc/parole-and-probation/issues/74)
- **geolocation:** add geolocation to map ([8e3a75c](https://github.com/agrc/parole-and-probation/commit/8e3a75c)), closes [#79](https://github.com/agrc/parole-and-probation/issues/79)
- **map:** add csv export button to map and ping api ([748891e](https://github.com/agrc/parole-and-probation/commit/748891e)), closes [#56](https://github.com/agrc/parole-and-probation/issues/56)
- **map-tool:** create map tool pane ([d585c49](https://github.com/agrc/parole-and-probation/commit/d585c49)), closes [#79](https://github.com/agrc/parole-and-probation/issues/79)
- download csv if there is data ([0933e88](https://github.com/agrc/parole-and-probation/commit/0933e88)), closes [#56](https://github.com/agrc/parole-and-probation/issues/56)

## [1.11.0](https://github.com/agrc/parole-and-probation/compare/v1.10.1...v1.11.0) (2019-08-26)

### Bug Fixes

- **deps:** update deps and remove direct dep on eslint hooks ([9bd66ab](https://github.com/agrc/parole-and-probation/commit/9bd66ab))
- **identiy:** address formatting ([3555bc8](https://github.com/agrc/parole-and-probation/commit/3555bc8))

### Features

- **app:** add default extent button ([53c3120](https://github.com/agrc/parole-and-probation/commit/53c3120)), closes [#66](https://github.com/agrc/parole-and-probation/issues/66)
- **app:** hide header on small screens ([fc3f81a](https://github.com/agrc/parole-and-probation/commit/fc3f81a))
- **filter-agent:** update agent filtering list ([e6497c3](https://github.com/agrc/parole-and-probation/commit/e6497c3)), closes [#51](https://github.com/agrc/parole-and-probation/issues/51)
- **filter-date:** enable supervision contact filters ([fc867b6](https://github.com/agrc/parole-and-probation/commit/fc867b6)), closes [#55](https://github.com/agrc/parole-and-probation/issues/55)
- **filters:** add filter counts ([bbdf4f1](https://github.com/agrc/parole-and-probation/commit/bbdf4f1))

### [1.10.2](https://github.com/agrc/parole-and-probation/compare/v1.10.1...v1.10.2) (2019-08-21)

### [1.10.1](https://github.com/agrc/parole-and-probation/compare/v1.10.0...v1.10.1) (2019-08-19)

### Bug Fixes

- **identify:** adjust for fat fingers ([c523665](https://github.com/agrc/parole-and-probation/commit/c523665)), closes [#47](https://github.com/agrc/parole-and-probation/issues/47)
- **identify:** handle empty offender ([2f83e04](https://github.com/agrc/parole-and-probation/commit/2f83e04))
- **identify:** move race below name ([59eec32](https://github.com/agrc/parole-and-probation/commit/59eec32)), closes [#61](https://github.com/agrc/parole-and-probation/issues/61)

## [1.10.0](https://github.com/agrc/parole-and-probation/compare/v1.9.0...v1.10.0) (2019-08-16)

### Bug Fixes

- **identify:** add employer phone link ([9c95a2c](https://github.com/agrc/parole-and-probation/commit/9c95a2c)), closes [#58](https://github.com/agrc/parole-and-probation/issues/58)
- **identify:** do not show unknown for race ([7fb7af5](https://github.com/agrc/parole-and-probation/commit/7fb7af5))
- **identify:** order results by offender ([70f4173](https://github.com/agrc/parole-and-probation/commit/70f4173)), closes [#54](https://github.com/agrc/parole-and-probation/issues/54)
- **identify:** primary offense ([845dbf8](https://github.com/agrc/parole-and-probation/commit/845dbf8)), closes [#48](https://github.com/agrc/parole-and-probation/issues/48)
- **identify:** rename label ([778bac6](https://github.com/agrc/parole-and-probation/commit/778bac6)), closes [#50](https://github.com/agrc/parole-and-probation/issues/50)
- **identify:** update gang labels ([40023fa](https://github.com/agrc/parole-and-probation/commit/40023fa)), closes [#49](https://github.com/agrc/parole-and-probation/issues/49)

### Features

- **map:** color legal status and fugatives ([acba116](https://github.com/agrc/parole-and-probation/commit/acba116)), closes [#53](https://github.com/agrc/parole-and-probation/issues/53)

## [1.9.0](https://github.com/agrc/parole-and-probation/compare/v1.8.0...v1.9.0) (2019-08-14)

### Bug Fixes

- **app:** do not zoom to empty extent when no results found ([b98ce57](https://github.com/agrc/parole-and-probation/commit/b98ce57))
- **app:** request new scope with employee id ([10e7f13](https://github.com/agrc/parole-and-probation/commit/10e7f13)), closes [#37](https://github.com/agrc/parole-and-probation/issues/37)
- **db:** add indexes ([4b3e924](https://github.com/agrc/parole-and-probation/commit/4b3e924))
- **db:** agent_id is empty ([a64a8ea](https://github.com/agrc/parole-and-probation/commit/a64a8ea))
- **db:** convert numbers as strings otherwise they are missing ([c67e906](https://github.com/agrc/parole-and-probation/commit/c67e906))
- **db:** update connection string ([dd51e63](https://github.com/agrc/parole-and-probation/commit/dd51e63))
- **db:** update schema ([5057372](https://github.com/agrc/parole-and-probation/commit/5057372))
- **filter-agent:** switch to employee id ([c9d0b6d](https://github.com/agrc/parole-and-probation/commit/c9d0b6d)), closes [#37](https://github.com/agrc/parole-and-probation/issues/37)
- **pallet:** use new schema and simplify ([9cd5816](https://github.com/agrc/parole-and-probation/commit/9cd5816)), closes [#43](https://github.com/agrc/parole-and-probation/issues/43) [#44](https://github.com/agrc/parole-and-probation/issues/44)

### Features

- **map:** symbolize legal status ([70b4590](https://github.com/agrc/parole-and-probation/commit/70b4590))

## [1.8.0](https://github.com/agrc/parole-and-probation/compare/v1.7.4...v1.8.0) (2019-07-30)

### Features

- **app:** remove me filter to see all offenders ([2b7068b](https://github.com/agrc/parole-and-probation/commit/2b7068b))

### [1.7.4](https://github.com/agrc/parole-and-probation/compare/v1.7.3...v1.7.4) (2019-07-29)

### Bug Fixes

- **identify:** remove nulls from empty address parts ([cbd3333](https://github.com/agrc/parole-and-probation/commit/cbd3333))

### [1.7.3](https://github.com/agrc/parole-and-probation/compare/v1.7.2...v1.7.3) (2019-07-29)

### Bug Fixes

- **identify:** correct identify with no filters set ([9d07e51](https://github.com/agrc/parole-and-probation/commit/9d07e51))

### [1.7.2](https://github.com/agrc/parole-and-probation/compare/v1.7.1...v1.7.2) (2019-07-24)

### Bug Fixes

- **filter-other:** update gang sql ([a9937c0](https://github.com/agrc/parole-and-probation/commit/a9937c0))
- **filter-other:** update offense sql ([e2bfd23](https://github.com/agrc/parole-and-probation/commit/e2bfd23))
- **identify:** identify on filtered items only ([54ddada](https://github.com/agrc/parole-and-probation/commit/54ddada))

### [1.7.1](https://github.com/agrc/parole-and-probation/compare/v1.7.0...v1.7.1) (2019-07-23)

### Bug Fixes

- **identify:** create correct url for identify on stage ([77629a9](https://github.com/agrc/parole-and-probation/commit/77629a9))

## [1.7.0](https://github.com/agrc/parole-and-probation/compare/v1.6.1...v1.7.0) (2019-07-23)

### Bug Fixes

- **app:** filters should always be array ([f143136](https://github.com/agrc/parole-and-probation/commit/f143136))
- **app:** use only fields required for filters in layer ([3492891](https://github.com/agrc/parole-and-probation/commit/3492891))
- **identify:** do not create links for empty data ([93b171e](https://github.com/agrc/parole-and-probation/commit/93b171e))

### Features

- **identify:** use map data for identify ([4a6cdb1](https://github.com/agrc/parole-and-probation/commit/4a6cdb1))

### [1.6.1](https://github.com/agrc/parole-and-probation/compare/v1.6.0...v1.6.1) (2019-07-18)

### Bug Fixes

- **identify:** move all links to label ([a77e940](https://github.com/agrc/parole-and-probation/commit/a77e940))

### Tests

- **identify:** update special supervision form ([2935bb8](https://github.com/agrc/parole-and-probation/commit/2935bb8))

## [1.6.0](https://github.com/agrc/parole-and-probation/compare/v1.5.0...v1.6.0) (2019-07-18)

### Bug Fixes

- **build:** use npm scripts to build and deploy the app ([aee2201](https://github.com/agrc/parole-and-probation/commit/aee2201))
- **filter-date:** rename to out of compliance ([c3a684a](https://github.com/agrc/parole-and-probation/commit/c3a684a)), closes [#12](https://github.com/agrc/parole-and-probation/issues/12)
- **filter-date:** replace calendars with 30,60,90,180 ([77c02ba](https://github.com/agrc/parole-and-probation/commit/77c02ba)), closes [#12](https://github.com/agrc/parole-and-probation/issues/12)
- **filter-other:** active warrant spelling and value is bit ([0f8a5b1](https://github.com/agrc/parole-and-probation/commit/0f8a5b1)), closes [#11](https://github.com/agrc/parole-and-probation/issues/11)
- do not copy runtimes or build fails ([dbda284](https://github.com/agrc/parole-and-probation/commit/dbda284))
- **filter-location:** city data is uppercase ([8b3b337](https://github.com/agrc/parole-and-probation/commit/8b3b337)), closes [#9](https://github.com/agrc/parole-and-probation/issues/9)
- **filter-offender:** offender_name -> offender ([583328f](https://github.com/agrc/parole-and-probation/commit/583328f))
- **filter-other:** add no std to other ([a7b9a4c](https://github.com/agrc/parole-and-probation/commit/a7b9a4c)), closes [#11](https://github.com/agrc/parole-and-probation/issues/11)
- **filter-other:** probation and parole are uppercase ([ba0bbc1](https://github.com/agrc/parole-and-probation/commit/ba0bbc1)), closes [#11](https://github.com/agrc/parole-and-probation/issues/11)
- **idenitfy:** moce event higher if layer fails to draw ([1d43c1c](https://github.com/agrc/parole-and-probation/commit/1d43c1c))
- **identify:** add alerts ([d9dc3a5](https://github.com/agrc/parole-and-probation/commit/d9dc3a5))
- **identify:** if no value in sos, no std ([40b791b](https://github.com/agrc/parole-and-probation/commit/40b791b))
- **identify:** move gang below crime ([445197f](https://github.com/agrc/parole-and-probation/commit/445197f)), closes [#5](https://github.com/agrc/parole-and-probation/issues/5)
- **identify:** move supervision to own group ([7ad988b](https://github.com/agrc/parole-and-probation/commit/7ad988b))

### Features

- **filter-other:** add main gang groups to multi select ([dcf18f4](https://github.com/agrc/parole-and-probation/commit/dcf18f4))
- **filter-other:** multi select for special supervision ([bcb6589](https://github.com/agrc/parole-and-probation/commit/bcb6589))
- **filter-other:** offense type as multi select ([2b64587](https://github.com/agrc/parole-and-probation/commit/2b64587))
- **identify:** add cautions with highlight ([e1f0a65](https://github.com/agrc/parole-and-probation/commit/e1f0a65)), closes [#5](https://github.com/agrc/parole-and-probation/issues/5)
- **identify:** add fancy links for phone and google directions ([9413044](https://github.com/agrc/parole-and-probation/commit/9413044)), closes [#5](https://github.com/agrc/parole-and-probation/issues/5)
- **identify:** highlight active warrant ([7079501](https://github.com/agrc/parole-and-probation/commit/7079501))

### Tests

- **identify:** add cautions story ([db62bc8](https://github.com/agrc/parole-and-probation/commit/db62bc8))

## [1.5.0](https://github.com/agrc/parole-and-probation/compare/v1.4.0...v1.5.0) (2019-07-10)

### Bug Fixes

- **api:** omnisharp intellisense ([7232261](https://github.com/agrc/parole-and-probation/commit/7232261))
- **app:** correct homepage url ([a1ba0a6](https://github.com/agrc/parole-and-probation/commit/a1ba0a6))
- **app:** correct names in manifest ([e33a3ae](https://github.com/agrc/parole-and-probation/commit/e33a3ae))
- **app:** do not publish service account or alternate appsettings ([3395ef0](https://github.com/agrc/parole-and-probation/commit/3395ef0))
- **app:** send access token to api ([8b13b1f](https://github.com/agrc/parole-and-probation/commit/8b13b1f))
- **layer-selector:** remove ${syntax} as it no longer functions in 4.12 ([c2dd0a4](https://github.com/agrc/parole-and-probation/commit/c2dd0a4))
- **map:** set initial extent to state of utah ([70005f9](https://github.com/agrc/parole-and-probation/commit/70005f9))
- **pallet:** create and update shape field ([3fd85d9](https://github.com/agrc/parole-and-probation/commit/3fd85d9))
- **pallet:** generate correct schema types ([86a7611](https://github.com/agrc/parole-and-probation/commit/86a7611))
- configure api and app to use basename ([6ab2b09](https://github.com/agrc/parole-and-probation/commit/6ab2b09))
- continue to write changelog in top level ([66fa6ab](https://github.com/agrc/parole-and-probation/commit/66fa6ab))

### Features

- **api:** add console logging ([d2c7b27](https://github.com/agrc/parole-and-probation/commit/d2c7b27))
- **api:** add stackdriver logging ([aff4638](https://github.com/agrc/parole-and-probation/commit/aff4638))
- **api:** add vs code recommended extensions ([339731e](https://github.com/agrc/parole-and-probation/commit/339731e))
- **api:** create reverse proxy ([b9b74c3](https://github.com/agrc/parole-and-probation/commit/b9b74c3))
- **api:** request token and proxy requests ([c3c5443](https://github.com/agrc/parole-and-probation/commit/c3c5443))
- **api:** validate access token ([9a1327d](https://github.com/agrc/parole-and-probation/commit/9a1327d))
- **app:** add react router and oidc client ([12e3290](https://github.com/agrc/parole-and-probation/commit/12e3290))
- **app:** filter points ([6833611](https://github.com/agrc/parole-and-probation/commit/6833611))
- **filters:** apply alerts the user of the current filter state ([8914f8e](https://github.com/agrc/parole-and-probation/commit/8914f8e))
- **filters:** reset sets state to default ([70a061f](https://github.com/agrc/parole-and-probation/commit/70a061f))
- **filters:** use jwt logged in user for filters and map layer ([2227d2e](https://github.com/agrc/parole-and-probation/commit/2227d2e))
- **map:** create arcgis pro project with field map ([7387642](https://github.com/agrc/parole-and-probation/commit/7387642))
- **map:** create publish and repoint scripts ([510dd9a](https://github.com/agrc/parole-and-probation/commit/510dd9a))

## [1.4.0](https://github.com/agrc/parole-and-probation/compare/v1.3.0...v1.4.0) (2019-06-20)

### Bug Fixes

- **app:** remove reducers from function and standarize reducer objects ([1094353](https://github.com/agrc/parole-and-probation/commit/1094353))
- **filter-agent:** use immer as the reducer function ([a379f58](https://github.com/agrc/parole-and-probation/commit/a379f58))
- **filter-location:** lift state to filters ([bf552a5](https://github.com/agrc/parole-and-probation/commit/bf552a5))
- **filter-location:** use valid region numbers ([d19be1c](https://github.com/agrc/parole-and-probation/commit/d19be1c))
- **filter-offender:** allow warrant to be deselected ([31b1246](https://github.com/agrc/parole-and-probation/commit/31b1246))
- **filter-offender:** lift all state to parent ([fcede1f](https://github.com/agrc/parole-and-probation/commit/fcede1f))
- **filter-other:** legal status => radio button ([ec43689](https://github.com/agrc/parole-and-probation/commit/ec43689)), closes [#33](https://github.com/agrc/parole-and-probation/issues/33)
- **filter-other:** lift state to filters ([4f3a455](https://github.com/agrc/parole-and-probation/commit/4f3a455))
- **filter-other:** standard of supervision to checkboxes ([971b523](https://github.com/agrc/parole-and-probation/commit/971b523)), closes [#32](https://github.com/agrc/parole-and-probation/issues/32)
- **filters:** move reducer out of funcion ([41e2fff](https://github.com/agrc/parole-and-probation/commit/41e2fff))

### Features

- **identify:** create offender popup template ([227af07](https://github.com/agrc/parole-and-probation/commit/227af07)), closes [#5](https://github.com/agrc/parole-and-probation/issues/5)

## [1.3.0](https://github.com/agrc/parole-and-probation/compare/v1.2.0...v1.3.0) (2019-06-18)

### Bug Fixes

- **dartboard:** do not autocomplete street or city ([f392a01](https://github.com/agrc/parole-and-probation/commit/f392a01))

### Features

- **filter:** use accordion instead of selector ([3d5f5c5](https://github.com/agrc/parole-and-probation/commit/3d5f5c5)), closes [#27](https://github.com/agrc/parole-and-probation/issues/27)
- **filter-location:** add address geolocation zooming ([61070d6](https://github.com/agrc/parole-and-probation/commit/61070d6))

## [1.2.0](https://github.com/agrc/parole-and-probation/compare/v1.1.0...v1.2.0) (2019-06-14)

### Bug Fixes

- **filter-agent:** fix wrong selection on tab ([de848b3](https://github.com/agrc/parole-and-probation/commit/de848b3))
- **filter-date:** add no field visit ([4a2d7ea](https://github.com/agrc/parole-and-probation/commit/4a2d7ea)), closes [#11](https://github.com/agrc/parole-and-probation/issues/11) [#12](https://github.com/agrc/parole-and-probation/issues/12)
- **filter-other:** remove no field visit ([442903d](https://github.com/agrc/parole-and-probation/commit/442903d)), closes [#11](https://github.com/agrc/parole-and-probation/issues/11)

### Features

- **filter-agent:** type ahead behavior ([9adb0f8](https://github.com/agrc/parole-and-probation/commit/9adb0f8)), closes [#8](https://github.com/agrc/parole-and-probation/issues/8)
- **filter-location:** add region checkboxes ([2952e45](https://github.com/agrc/parole-and-probation/commit/2952e45)), closes [#25](https://github.com/agrc/parole-and-probation/issues/25)
- **header:** replace logo ([26564ec](https://github.com/agrc/parole-and-probation/commit/26564ec)), closes [#3](https://github.com/agrc/parole-and-probation/issues/3)

## [1.1.0](https://github.com/agrc/parole-and-probation/compare/v1.0.0...v1.1.0) (2019-06-11)

### Bug Fixes

- **filter-agent:** set me on by default ([e538145](https://github.com/agrc/parole-and-probation/commit/e538145))
- **filter-agent:** vanity check is now a function ([606bebe](https://github.com/agrc/parole-and-probation/commit/606bebe))
- **filter-location:** add buffer input ([0789104](https://github.com/agrc/parole-and-probation/commit/0789104))
- **filter-location:** remove address type ([c4d93c1](https://github.com/agrc/parole-and-probation/commit/c4d93c1))
- **filter-offender:** clicking same radio button twice deselects ([92b4c4b](https://github.com/agrc/parole-and-probation/commit/92b4c4b))
- **filter-offender:** replace location with offender number. remove age ([97a12b4](https://github.com/agrc/parole-and-probation/commit/97a12b4))

### Features

- **filter-agent:** create process to select agents ([ff01210](https://github.com/agrc/parole-and-probation/commit/ff01210)), closes [#8](https://github.com/agrc/parole-and-probation/issues/8)

## 1.0.0 (2019-06-06)

### Bug Fixes

- widen sidebar for filter fit ([87e4a11](https://github.com/agrc/parole-and-probation/commit/87e4a11))

### Features

- fix environments and publish to test ([a8e9e94](https://github.com/agrc/parole-and-probation/commit/a8e9e94))
- mock filter architecture ([ee07cd9](https://github.com/agrc/parole-and-probation/commit/ee07cd9)), closes [#7](https://github.com/agrc/parole-and-probation/issues/7) [#8](https://github.com/agrc/parole-and-probation/issues/8) [#9](https://github.com/agrc/parole-and-probation/issues/9) [#10](https://github.com/agrc/parole-and-probation/issues/10) [#11](https://github.com/agrc/parole-and-probation/issues/11) [#12](https://github.com/agrc/parole-and-probation/issues/12)
- use convention-commit to generate changelog ([c46d85e](https://github.com/agrc/parole-and-probation/commit/c46d85e)), closes [#21](https://github.com/agrc/parole-and-probation/issues/21)
- use standard-version ([ffaacaf](https://github.com/agrc/parole-and-probation/commit/ffaacaf))
