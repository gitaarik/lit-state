# LitState Changelog

### 1.1.0

- Created changelog.
- Changed behavior of `asyncStateVar()`:
    - You can now have a **getter** and **setter**.
    - `getValue()` won't return the error from the promise's reject callback in
      case of an error anymore. You can get the error with the method
      `getError()` (for the error of the last get or set), `getErrorGet()` (for
      the error of the last get) or `getErrorSet()` (for the error of the last
      set).
- Updated demo app to showcase `asyncStateVar` better.
