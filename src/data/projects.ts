export interface Project {
	title: string;
	period: string;
	status?: 'in-progress';
	description: string;
	tags: string[];
	link?: { href: string; label: string };
	note?: string;
	featured: boolean;
}

export const projects: Project[] = [
	{
		title: 'MaxEnt Actor-Critic for Portfolio Allocation',
		period: 'Side project · 2026',
		description:
			'Soft Actor-Critic agent for long-only daily portfolio allocation. Reproducible training stack with seeded runs and config snapshots, ablation sweeps across entropy and transaction costs, and risk-aware evaluation: Sharpe, max drawdown, and turnover.',
		tags: ['PyTorch', 'MaxEnt RL / SAC', 'Gymnasium', 'Quant Finance'],
		link: {
			href: 'https://github.com/SakkarinKt/maxent-actorcritic-portfolio',
			label: 'View on GitHub',
		},
		featured: true,
	},
	{
		title: 'rag-fin-qa — Financial Q&A with GPU-Optimized RAG',
		period: '2026',
		status: 'in-progress',
		description:
			'RAG system answering questions over SEC filings and earnings calls. TensorRT-LLM + Triton serving of a quantized Llama-3.1-8B, FAISS-to-Milvus/cuVS retrieval, and Ragas faithfulness evals — built against explicit KPIs (TTFT < 1.5 s p95, faithfulness ≥ 0.85).',
		tags: ['TensorRT-LLM', 'Triton', 'RAG', 'Ragas', 'FastAPI'],
		// TODO: push the repo to GitHub, then add
		// link: { href: 'https://github.com/SakkarinKt/rag-fin-qa', label: 'View on GitHub' },
		note: 'Write-up coming as the build progresses.',
		featured: true,
	},
	{
		title: 'CUDA on Cloud GPUs — Reproducible Dev Workflow',
		period: 'Side project · 2026',
		description:
			'A macOS-friendly CUDA workflow on GPU-backed cloud VMs: VM spec selection, a vector_add benchmark baseline, tensor-core GEMM experiments, and kernel timelines profiled with Nsight Systems.',
		tags: ['CUDA', 'Nsight Systems', 'Cloud GPU'],
		link: {
			href: `${import.meta.env.BASE_URL}blog/first-post/`,
			label: 'Read the write-up',
		},
		featured: true,
	},
	{
		title: 'janus-chrysalis — Open World-Model Research',
		period: '2026',
		status: 'in-progress',
		description:
			'Multi-agent world-model research run in public, co-authored with Claude: architecture decision records, literature notes, and a daily autonomous agent loop that opens PRs with stand-up reports.',
		tags: ['Multi-Agent RL', 'World Models', 'Agentic Workflows', 'TypeScript'],
		link: {
			href: 'https://github.com/SakkarinKt/janus-chrysalis',
			label: 'Follow the research',
		},
		// Flip to true once Phase 2 lands code worth showcasing.
		featured: false,
	},
];
