# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-12-15

### Added
- Added an organism identifier (uses `metadata/id`).
- Expanded the ability to describe resource flows between the organism, systems, organs, cells, and organelles.
- Renamed elements `transferToSystems` and `receiveFromSystems` to `transferTo` and `receiveFrom`.
- Introduced the convention: `sourceId="external"` or `targetId="external"` denotes the external world.
- Added the `resourceFlows` element to `OrganType` to allow organs (and thus cells and organelles) to describe their resource flows.
