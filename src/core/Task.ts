import { UUID, randomUUID } from "crypto";
import fs from "node:fs/promises";
import { TaskInterface, UpdateTask } from "../@types/task";

interface CreateTask {
  title: string;
  description: string;
}

export class Task {
	private id!: UUID;
	private title!: string;
	private description!: string;
	private completed_at!: Date | null;
	private created_at!: Date;
	private updated_at!: Date | null;
	private jsonUrl: URL;
	private database: TaskInterface[];

	constructor() {
		this.jsonUrl = new URL("../database/databaseTasks.json", import.meta.url);
		this.database = [];
	}

	private setId() {
		this.id = randomUUID();
	}

	private async readDatabase() {
		try {
			const data = await fs.readFile(this.jsonUrl, "utf8");

			if (data.trim() !== "") {
				this.database = JSON.parse(data);
			}
		} catch (error) {
			console.error("Erro ao ler o arquivo JSON:", error);
		}
	}

	private async saveOneTaskOnJson(taskObject : TaskInterface){
		await this.readDatabase();
		this.database.push(taskObject);

		try {
			await fs.writeFile(this.jsonUrl, JSON.stringify(this.database, null, 2), "utf-8");
			console.log("Tarefa criada e salva com sucesso!");
		} catch (error) {
			console.error("Erro ao salvar a tarefa:", error);
		}
	}

	private async saveAllTaskOnJson(taskObject : TaskInterface[]){
		await this.readDatabase();

		try {
			await fs.writeFile(this.jsonUrl, JSON.stringify(taskObject, null, 2), "utf-8");
			console.log("Tarefa criada e salva com sucesso!");
		} catch (error) {
			console.error("Erro ao salvar a tarefa:", error);
		}
	}

	public async createTask(task: CreateTask) {
		this.setId();
		this.title = task.title;
		this.description = task.description;
		this.completed_at = null;
		this.created_at = new Date();
		this.updated_at = null;

		const taskObject = {
			id: this.id,
			title: this.title,
			description: this.description,
			completed_at: this.completed_at,
			created_at: this.created_at,
			updated_at: this.updated_at,
		};
		await this.saveOneTaskOnJson(taskObject);

	}

	public async getAlltask(){
		await this.readDatabase();
		return this.database;
	}

	public async findtaskByTitulo(title: string){
		await this.readDatabase();
		
		return this.database.filter(data => data.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
	} 

	public async findtaskByDescricao(description: string){
		await this.readDatabase();		
		return this.database.filter(data => data.description.toLocaleLowerCase().includes(description.toLocaleLowerCase()));
	} 

	public async findtaskById(id: UUID){
		await this.readDatabase();		
		return this.database.find(data => data.id === id) || null;
	} 

	public async updateTaskById(task: UpdateTask){
		await this.readDatabase();
		const indexTask = this.database.findIndex(data => String(data.id) == String(task.id));		
		
		if (indexTask >= 0) {
			const taskOld = this.database[indexTask];
			const taskUpdated = {
				id: taskOld.id,
				title: task.title || taskOld.title,
				description: task.description ||taskOld.description,
				completed_at: taskOld.completed_at,
				created_at: taskOld.created_at,
				updated_at: new Date()
			};			
			
			this.database = this.database.filter(data => data.id !== task.id);
			this.database.push(taskUpdated);
			this.saveAllTaskOnJson(this.database);
			return taskUpdated;
		}
	}

	public async deleteTaskById(id: string){
		await this.readDatabase();
		this.database = this.database.filter(data => data.id !== id);
		this.saveAllTaskOnJson(this.database);		
	}

	public async completeTaskById(id: string){
		await this.readDatabase();
		const indexTask = this.database.findIndex(data => String(data.id) == String(id));		
		
		if (indexTask >= 0) {
			const taskOld = this.database[indexTask];
			const taskUpdated = {
				...taskOld,
				completed_at: taskOld.completed_at,
				updated_at: new Date()
			};			
			
			this.database = this.database.filter(data => data.id !== id);
			this.database.push(taskUpdated);
			this.saveAllTaskOnJson(this.database);
			return taskUpdated;
		}
	}

}
