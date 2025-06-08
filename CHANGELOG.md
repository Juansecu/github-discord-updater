# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1]

### Fixed

- Added helmet middleware to prevent security vulnerabilities
- Updated dependencies to fix security vulnerabilities
- Disabled Swagger UI in production environment
- Added CORS configuration to allow requests from GitHub only in production
- Removed duplicated port from Swagger documentation

## [1.0.0]

### Added

- Support for the `gollum` event from GitHub
- API documentation using Swagger
- Security checks to only allow requests from GitHub
