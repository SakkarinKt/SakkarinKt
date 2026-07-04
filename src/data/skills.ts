export interface SkillGroup {
	category: string;
	items: string[];
}

export const skills: SkillGroup[] = [
	{
		category: 'LLM & Agentic Systems',
		items: [
			'Prompt & Context Engineering',
			'RAG Pipelines',
			'Agentic Workflow Design',
			'LLM Evals',
		],
	},
	{
		category: 'Machine Learning & RL',
		items: [
			'PyTorch',
			'Reinforcement Learning (SAC · PPO · IRL)',
			'CUDA',
			'Predictive Modeling',
		],
	},
	{
		category: 'Data & Backend',
		items: ['Python', 'C#', 'PostgreSQL', 'TypeScript / JavaScript'],
	},
	{
		category: 'Cloud & Infrastructure',
		items: ['Google Cloud (Cloud Run)', 'Docker', 'AWS'],
	},
	{
		category: 'Frontend',
		items: ['Nuxt.js', 'Astro', 'Tailwind CSS'],
	},
];
