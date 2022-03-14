# Change Log - @subsquid/substrate-typegen

This log was last generated on Mon, 14 Mar 2022 18:47:21 GMT and should not be manually modified.

## 0.4.0
Mon, 14 Mar 2022 18:47:21 GMT

### Minor changes

- add `.isExists` property to storage classes to test for storage item existence

### Patches

- don't throw from `.isV*` methods of storage classes when item doesn't exist in current chain version

## 0.3.0
Fri, 11 Mar 2022 07:38:31 GMT

### Minor changes

- typesafe classes for storage requests

## 0.2.3
Fri, 04 Mar 2022 14:30:51 GMT

_Version update only_

## 0.2.2
Wed, 02 Mar 2022 18:11:28 GMT

_Version update only_

## 0.2.1
Mon, 07 Feb 2022 15:16:41 GMT

_Version update only_

## 0.2.0
Wed, 02 Feb 2022 11:01:32 GMT

### Minor changes

- breaking: assign better names to event and call types
- breaking: normalize inline option types to `T | undefined`
- breaking: normalize inline result types to `Result<Ok, Err>`
- allow to generate all events or calls via `events: true` / `calls: true` option

### Patches

- correctly generate type for compact structs and tuples

## 0.1.0
Tue, 25 Jan 2022 12:44:12 GMT

### Minor changes

- deprecate `.isLatest`, `.asLatest`

### Patches

- fix code for extrinsics with underscore in the name

## 0.0.6
Thu, 20 Jan 2022 08:42:53 GMT

### Patches

- include src files into npm package

## 0.0.5
Tue, 18 Jan 2022 09:31:27 GMT

### Patches

- change license to GPL3

## 0.0.4
Thu, 13 Jan 2022 16:05:36 GMT

### Patches

- Don't rely on block ranges for type compatibility checks

## 0.0.3
Mon, 10 Jan 2022 17:09:28 GMT

_Version update only_

## 0.0.2
Tue, 04 Jan 2022 10:40:43 GMT

### Patches

- fix shebang in executable

## 0.0.1
Mon, 03 Jan 2022 16:07:32 GMT

### Patches

- set `publishConfig.access` to `public`

## 0.0.0
Mon, 03 Jan 2022 12:24:26 GMT

_Initial release_

