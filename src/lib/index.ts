
export enum ExecEnv {
	client = 'Client',
	server = 'Server'
}

export const getExecEnv = () => (typeof window !== 'undefined') ?
	ExecEnv.client : ExecEnv.server;

export const isClient = () => getExecEnv() == ExecEnv.client;
export const isServer = () => getExecEnv() == ExecEnv.server;