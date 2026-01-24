---
title: 'Kickoff: CUDA on Cloud GPUs + M1 Mac dev workflow'
description: 'macOS isn’t a CUDA target, so I moved the workflow to a GPU VM. Here’s the VM spec, a tiny vector_add benchmark, and what Nsight Systems reveals'
pubDate: 'Jan 22 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

macOS is a great daily driver for development, but it is **not a practical CUDA target**: CUDA requires an NVIDIA GPU and driver stack, which is typically unavailable on modern Macs. For CUDA experiments and profiling, the pragmatic path is a **GPU-backed cloud VM** where the CUDA toolchain and the NVIDIA drivers are first-class citizens.

This post documents a small end-to-end workflow: selecting a cloud GPU, recording **VM specs**, running a minimal **`vector_add`** benchmark, and profiling the kernel using **Nsight Systems (`nsys`)**. The goal is not a heroic benchmark—just a reproducible baseline and a clean “what happens on the timeline” view.

---

## Why cloud for CUDA (and why macOS doesn’t qualify)

CUDA is tied to NVIDIA’s ecosystem (hardware + drivers + tooling). In practice, that means:
- You need an **NVIDIA GPU** and compatible **NVIDIA driver**.
- You need a CUDA-capable runtime + toolchain (e.g., `nvcc`, CUDA libraries).
- You want deterministic profiling tools (Nsight Systems / Nsight Compute).

On macOS, that stack is either unavailable or not supported in a way that enables a modern CUDA workflow. A cloud VM gives you:
- Reliable access to NVIDIA GPUs on demand
- A standard Linux environment for CUDA
- Repeatable provisioning (and thus repeatable performance baselines)

---
## My VM Configuration
Cloud provider / instance type: Google Cloud g2-standard-4 (4 vCPUs, 16 GB memory).  
GPU: NVIDIA L4.  
NVIDIA driver: NVIDIA-SMI 550.90.07.  
CUDA version: 12.4.  

---
## Microbenchmark: `vector_add`

I used a minimal CUDA kernel (`c[i] = a[i] + b[i]`) as a sanity check for compilation, driver/runtime correctness, and a first-order read on memory throughput.

### Implementation notes

- **Problem size:** `N = 2^24 = 16,777,216` float elements (~64 MiB per vector).
- **Kernel launch:** `block = 256`, `grid = ceil(N / 256)`.
- **Timing method:** `cudaEventElapsedTime()` around **a single kernel launch**.
- **Data movement:** inputs are copied H2D before timing; the result is copied D2H after timing.
  - The reported time is **kernel-only**, not end-to-end (copies excluded).
- **Bandwidth estimate:** for `c = a + b`, I approximate bytes moved as:
  - read `a` (4B) + read `b` (4B) + write `c` (4B) = **12 bytes/element**
  - total bytes ≈ `3 * N * sizeof(float)`

### Build & run

```bash
nvcc -O3 vector_add.cu -o vector_add
./vector_add
```

### Result of the single run


```
C[0]=3.000000  time=69.008446 ms  approx GB/s=2.92
```


- This number is not a peak-bandwidth result; it is a baseline from a single launch with default pageable host memory and without repeated iterations (no averaging) or additional tuning.
---

