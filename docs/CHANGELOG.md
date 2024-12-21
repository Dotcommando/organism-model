# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-12-21

### Added
- **Support for Multiple Organisms**: Introduced the ability to describe multiple organisms within the same OMXML document, enabling scenarios such as pregnancy, parasitism, or multi-organism ecosystems.
- **OrganismType**: A new top-level entity (`OrganismType`) that can function with or without Systems, allowing fully standalone organisms or more complex organisms that delegate some functionality to Systems.
- **Lifecycle Stages**: Enhanced the schema to allow each organism or system to define multiple lifecycle stages, each with its own composition, resource flows, and processes.
- **Advanced Processes**:
  - **Birth and Division**: Processes can now explicitly model birth (creating a new organism instance) or asexual division (splitting an organism into two).
  - **Organism Spawning**: A new `<organismSpawns>` element within `<process>` describes how new organisms are produced, instead of treating new organisms as resources.
- **Parasitism**: Supported modeling of parasitic relationships by allowing one organism to rely on another for resources, with resource exchanges and triggers for parasitic behavior.
- **Signals and Actions at the Organism Level**: An organism can receive external signals and perform actions directly, even without defining any Systems.

### Changed
- **Schema Layout**:
  - Moved many organism-level properties (e.g., resource flows, composition, lifecycle stages) into a dedicated `OrganismType`, paralleling the existing `SystemType` and `OrganType`.
  - Updated `<OrganismModel>` to optionally include a new `<Organisms>` block, which can contain multiple `<organism>` definitions.
- **Internal State Mechanisms**: Refined the ways internal state variables can be read, updated, or used as conditions, making it easier to track behaviors like division counts, parasite load, or stage-based growth transitions.

### Removed
- **Reliance on "dummy" Systems**: It is no longer necessary to define a “System” of type="other" just to store organism-level composition or lifecycle data.

### Notes
- This version supersedes [0.1.0], incorporating more sophisticated biological modeling features, including multi-organism interactions, birth, division, and parasitism.

## [0.1.0] - 2024-12-15

### Added
- **Initial Hierarchical Model**: Basic definitions of `Systems`, `Organs`, `Processes`, `Cycles`.
- **Resource Flows**: Ability to define resource inputs, outputs, consumption, transfers.
- **Metadata**: Introduced `metadata/id` as a unique identifier for an organism.
- **Basic Conditions and Triggers**: Simple `resourceCondition`, `organStateCondition`, and `sensoryCondition` for process activation.
- **Extensible Layout**: Provided a flexible approach to describing organisms, systems, and resource interactions.
