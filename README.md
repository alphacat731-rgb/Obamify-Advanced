# Obamify Advanced

A community-enhanced fork of [Obamify](https://github.com/Spu7Nix/obamify), the image-transformation experiment by Spu7Nix. This edition focuses on a more readable dark interface, higher-resolution transformations, bounded processing effort, and easier web deployment.

## Features in this fork

- **Dark slate + lime interface** with clearer resolution feedback.
- **64–512 cells per side** when using the fast algorithm.
- **Adaptive fast-algorithm budget** that keeps per-generation work near the 128 × 128 baseline instead of multiplying it by every extra pixel.
- **Bounded search schedule** so a difficult local minimum cannot leave a job running indefinitely.
- **WebAssembly build** and a GitHub Pages deployment workflow.
- A relative-path web manifest and cacheable same-origin assets for project-page hosting.

The **Optimal** algorithm is limited to 128 × 128 because its assignment problem becomes expensive rapidly as image size grows. For higher resolutions, use **fast algorithm**. Higher resolution still costs more overall and can take longer, especially in a browser.

## Try it online

After enabling GitHub Pages with **Settings → Pages → Build and deployment → Source: GitHub Actions**, a successful deployment from `main` will publish the web app here:

https://alphacat731-rgb.github.io/Obamify-Advanced/

## Run locally

### Native app

1. Install [Rust](https://www.rust-lang.org/tools/install).
2. Clone this repository.
3. Run `cargo run --release` in the project folder.

### Web app

1. Install [Rust](https://www.rust-lang.org/tools/install).
2. Add the WebAssembly target: `rustup target add wasm32-unknown-unknown`.
3. Install Trunk: `cargo install --locked trunk`.
4. Run `trunk serve --release --open`.

For a production build, Trunk is configured to build the WASM app into `dist/`. The GitHub Actions workflow sets the project-page public URL automatically for deployment.

## License and attribution

The upstream project is MIT-licensed. This fork retains the original license and source attribution; see [LICENSE](LICENSE) and the [upstream repository](https://github.com/Spu7Nix/obamify).
