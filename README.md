# jaifnarayan.github.io

Personal portfolio of **Jai Narayan**, an Electrical Engineering student at Rice University.

🔗 **Live site:** https://jaifnarayan.github.io

It covers embedded systems, PCB/RF design, FPGA, and robotics and computer vision work, including:

| Project | Links |
|---|---|
| Autonomous RC Car (Raspberry Pi 5, OpenCV, PD control) | [Hackster](https://www.hackster.io/team-10/team-10-s-epic-car-7f15dc) · [Repo](https://github.com/JaiFNarayan/Autonomous-RC-Car-ELEC-424-) |
| QuantRWA (Hook 'Em Hacks 2026) | [Devpost](https://devpost.com/software/quantrwa) · [Repo](https://github.com/JaiFNarayan/QuantRWA-HookEmHack2026-) · [Video](https://www.youtube.com/watch?v=AVDLeIvMF40) |
| Rover Tool Detection (YOLO) | [Repo](https://github.com/JaiFNarayan/ML_Rover) |
| 12V Motor Controller PCB, 16-bit RISC Processor, RF Telemetry PCB, 144V Battery Pack, Wind Generator, Linear Encoder | see site |

## Editing

It's a plain static site with no build step:

- `index.html` holds all the content. Each project is a `<li class="project-item">`, and its pop-up details live in the `<template data-project-details>` inside it.
- `assets/images/` holds the project covers. To use a real photo, drop it in and change the card's `<img src>`. Covers are 8:5, for example 800×500.
- `assets/css/style.css` contains the template styles plus a custom section at the bottom.

GitHub Pages republishes automatically on every push to `main`.

## Credits

Based on the [vCard personal portfolio](https://github.com/codewithsadee/vcard-personal-portfolio) template by codewithsadee (MIT License, see `LICENSE`).
