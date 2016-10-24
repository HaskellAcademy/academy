# academy-lib

This is the library of functions available in Haskell Academy.
Most of this library is meant to be a thin wrapper over certain JavaScript
functions available when running the Haskell Academy web app.

This library replaces the base package typically available when compiling a
Haskell program. Most of the original base package is exposed barring certain
IO functions that have been replaced.

When using this library, remove base from your `build-depends` section and use
this module instead.
